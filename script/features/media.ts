import { UI } from "../ui";
import { Library } from "@library";
import { Tools } from "../tools";
import * as Config from "@resource/config.json";
export namespace Media
{
    export interface Entry
    {
        file: File;
        url: string;
        type: string;
        category: Category;
        name: string;
        thumbnail: string;
        size: number;
        duration: number | null;
    };
    export const mediaList: Entry[] = [];
    export type Category = "image" | "audio" | "video";
    export const getMediaCategory = (file: File): Category | null =>
    {
        if (file && file.type)
        {
            switch (true)
            {
            case file.type.startsWith("image/"):
                return "image";
            case file.type.startsWith("audio/"):
                return "audio";
            case file.type.startsWith("video/"):
                return "video";
            default:
                console.warn("🚫 Unsupported media type:", file.type);
                return null;
            }
        }
        else
        {
            console.warn("🚫 Invalid file or file type:", file);
            return null;
        }
    };
    export const isMediaFile = (file: File): boolean =>
        null !== getMediaCategory(file);
    export const getUrl = (file: File): string =>
        URL.createObjectURL(file);
    export const getName = (file: File): string =>
        file.name || "Unknown File";
    export const getThumbnail = async (mediaType: Category, url: string): Promise<string> =>
    {
        if (mediaType === "image")
        {
            return await getImageThumbnail(url);
        }
        if (mediaType === "audio")
        {
            return "SVG:audio";
        }
        if (mediaType === "video")
        {
            return await getVideoThumbnail(url);
        }
        return "SVG:error";
    };
    const canvasImageSourceToDataUrl = (canvasImageSource: CanvasImageSource, width: number, height: number): string =>
    {
        const maxSize = Config.thumbnail.maxSize;
        if (width > maxSize || height > maxSize)
        {
            const scale = Math.min(maxSize / width, maxSize / height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
        }
        else
        {
            if (canvasImageSource instanceof HTMLImageElement)
            {
                return canvasImageSource.src;
            }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx)
        {
            ctx.drawImage(canvasImageSource, 0, 0, width, height);
            return canvas.toDataURL(Config.thumbnail.type, Config.thumbnail.quality);
        }
        else
        {
            return "SVG:error";
        }
    };
    const getImageThumbnail = (url: string): Promise<string> => new Promise
    (
        (resolve) =>
        {
            const img = new Image();
            img.onload = () => resolve(canvasImageSourceToDataUrl(img, img.width, img.height));
            img.onerror = () => resolve("SVG:error");
            img.src = url;
        }
    );
    const getVideoThumbnail = (url: string): Promise<string> => new Promise
    (
        (resolve) =>
        {
            const video = document.createElement("video");
            video.src = url;
            video.currentTime = 0.1;
            video.muted = true;
            video.playsInline = true;
            video.onloadeddata = () => resolve(canvasImageSourceToDataUrl(video, video.videoWidth, video.videoHeight));
            video.onerror = () => resolve("SVG:error");
        }
    );
    export const getDuration = (mediaType: Category, url: string): Promise<number | null> =>
    {
        return new Promise((resolve) =>
        {
            if (mediaType === "audio" || mediaType === "video")
            {
                const media = document.createElement(mediaType);
                media.src = url;
                media.addEventListener
                (
                    "loadedmetadata", () =>
                    {
                        resolve(media.duration *1000);
                        URL.revokeObjectURL(url);
                    }
                );
                media.addEventListener
                (
                    "error", () =>
                    {
                        resolve(null);
                        URL.revokeObjectURL(url);
                    }
                );
            }
            else
            {
                resolve(null);
            }
        });
    };
    export const addMedia = async (file: File): Promise<void> =>
    {
        console.log("📂 Adding media:", file);
        const category = getMediaCategory(file);
        if (null !== category)
        {
            console.log("✅ Valid media file:", file);
            const url = getUrl(file);
            const entry: Entry =
            {
                file,
                url,
                type: file.type,
                category,
                name: getName(file),
                thumbnail: await getThumbnail(category, url),
                size: file.size,
                duration: await getDuration(category, url),
            };
            mediaList.push(entry);
            UI.mediaList.insertBefore(await makeMediaEntryDom(entry), UI.addMediaButton.dom);
            console.log("📂 Media added:", mediaList[mediaList.length - 1]);
        }
        else
        {
            console.warn("🚫 Invalid media file:", file);
        }
    };
    let addMediaQueue: Promise<void> = Promise.resolve();
    export const addMediaSerial = (file: File): void =>
    {
        addMediaQueue = addMediaQueue.then(() => addMedia(file));
    };
    export const isPixelatedImage = (entry: Entry): boolean =>
        [ "image/png", "image/gif" ].includes(entry.type);
    export const isThumbnailPixelatedImage = (entry: Entry): boolean =>
        isPixelatedImage(entry) && entry.url === entry.thumbnail;
    export const makeThumbnailElement = async (entry: Entry): Promise<Library.UI.ElementSource<"img"> | SVGElement> =>
    {
        if (Library.Svg.isEmbeddedImage(entry.thumbnail))
        {
            const svg = await Library.Svg.getSvg(entry.thumbnail);
            svg.classList.add("thumbnail");
            svg.setAttribute("alt", entry.name);
            return svg;
        }
        else
        {
            const img: Library.UI.ElementSource<"img"> =
            {
                tag: "img",
                className: "thumbnail" +(isThumbnailPixelatedImage(entry) ? " pixelated" : ""),
                attributes:
                {
                    src: entry.thumbnail,
                    alt: entry.name,
                },
            };
            return img;
        }
    };
    export const removeButton = async (entry: Entry): Promise<Library.UI.ElementSource<"button">> =>
    ({
        tag: "button",
        className: "remove-button",
        children:
        [
            await Library.Svg.getSvg("SVG:close"),
        ],
        events:
        {
            "click": async (event: MouseEvent) =>
            {
                event.stopPropagation();
                (event.target as HTMLButtonElement)?.blur();
                const index = mediaList.indexOf(entry);
                if (0 <= index && index < mediaList.length)
                {
                    console.log("🗑️ Removing media:", mediaList[index]);
                    URL.revokeObjectURL(mediaList[index].url);
                    mediaList.splice(index, 1);
                    await updateMediaListDisplay();
                }
            }
        },
    });
    export const makeMediaEntryDom = async (entry: Entry): Promise<HTMLDivElement> =>
    {
        const ix = mediaList.indexOf(entry);
        const item = Library.UI.createElement
        ({
            tag: "div",
            className: "item",
            attributes: { draggable: "true", "data-index": ix },
            children:
            [
                await makeThumbnailElement(entry),
                { tag: "span", className: "name", text: entry.name, },
                { tag: "span", className: "type", text: entry.category, },
                { tag: "span", className: "size", text: Tools.Byte.toDisplayString(entry.size, 3), },
                { tag: "span", className: "duration", text: null !== entry.duration ? Tools.Timespan.toMediaTimeString(entry.duration) : "", },
                await removeButton(entry),
            ]
        }) as HTMLDivElement;
        item.addEventListener
        (
            "dragstart",
            (event: DragEvent) =>
            {
                UI.mediaList.classList.add("dragging");
                item.classList.add("dragging");
                event.dataTransfer?.setData("text/plain", String(ix));
            }
        );
        item.addEventListener
        (
            "dragend",
            async () =>
            {
                UI.mediaList.classList.remove("dragging");
                item.classList.remove("dragging");
                await updateMediaListDisplay();
            }
        );
        item.addEventListener
        (
            "dragover",
            (event: DragEvent) =>
            {
                event.preventDefault();
                item.classList.add("drag-over");
            }
        );
        item.addEventListener
        (
            "dragleave",
            () =>
            {
                item.classList.remove("drag-over");
            }
        );
        item.addEventListener
        (
            "drop",
            async (event: DragEvent) =>
            {
                event.preventDefault();
                item.classList.remove("drag-over");
                const fromIndex = Number(event.dataTransfer?.getData("text/plain"));
                const toIndex = ix;
                if (fromIndex !== null && fromIndex !== toIndex)
                {
                    const moved = mediaList.splice(fromIndex, 1)[0];
                    mediaList.splice(toIndex, 0, moved);
                }
                await updateMediaListDisplay();
            }
        );
        return item;
    };
    export const updateMediaListDisplay = async (): Promise<void> =>
    {
        Array.from(UI.mediaList.children).forEach
        (
            child =>
            {
                if (child instanceof HTMLDivElement && UI.addMediaButton.dom !== child)
                {
                    child.remove();
                };
            }
        );
        for (const entry of mediaList)
        {
            UI.mediaList.insertBefore(await makeMediaEntryDom(entry), UI.addMediaButton.dom);
        }
    };
}
