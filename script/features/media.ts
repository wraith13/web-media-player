import { UI } from "../ui";
import { Library } from "@library";
import { Tools } from "../tools";
export namespace Media
{
    export interface Entry
    {
        file: File;
        type: MediaType;
        name: string;
        thumbnail: string;
        duration: number | null;
    };
    export const mediaList: Entry[] = [];
    export type MediaType = "image" | "audio" | "video";
    export const getMediaType = (file: File): MediaType | null =>
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
        null !== getMediaType(file);
    export const getName = (file: File): string =>
        file.name || "Unknown File";
    export const getThumbnail = async (file: File): Promise<string> =>
    {
        const mediaType = getMediaType(file);
        if (mediaType === "image")
        {
            return URL.createObjectURL(file);
        }
        if (mediaType === "audio")
        {
            return "SVG:audio";
        }
        if (mediaType === "video")
        {
            return await getVideoThumbnail(file);
        }
        return "SVG:error";
    };
    const getVideoThumbnail = (file: File): Promise<string> =>
    {
        return new Promise((resolve) =>
        {
            const url = URL.createObjectURL(file);
            const video = document.createElement("video");
            video.src = url;
            video.currentTime = 0.1;
            video.muted = true;
            video.playsInline = true;
            video.addEventListener
            (
                "loadeddata", () =>
                {
                    const canvas = document.createElement("canvas");
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const ctx = canvas.getContext("2d");
                    if (ctx)
                    {
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        resolve(canvas.toDataURL("image/png"));
                    }
                    else
                    {
                        resolve("SVG:error");
                    }
                    URL.revokeObjectURL(url);
                }
            );
            video.addEventListener
            (
                "error", () =>
                {
                    resolve("SVG:error");
                    URL.revokeObjectURL(url);
                }
            );
        });
    };
    export const getDuration = (file: File): Promise<number | null> =>
    {
        return new Promise((resolve) =>
        {
            const mediaType = getMediaType(file);
            if (mediaType === "audio" || mediaType === "video")
            {
                const url = URL.createObjectURL(file);
                const media = document.createElement(mediaType);
                media.src = url;
                media.addEventListener
                (
                    "loadedmetadata", () =>
                    {
                        resolve(media.duration);
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
        const type = getMediaType(file);
        if (null !== type)
        {
            console.log("✅ Valid media file:", file);
            mediaList.push
            ({
                file,
                type,
                name: getName(file),
                thumbnail: await getThumbnail(file),
                duration: await getDuration(file),
            });
            console.log("📂 Media added:", mediaList[mediaList.length - 1]);
        }
        else
        {
            console.warn("🚫 Invalid media file:", file);
        }
    };
    export const updateMediaListDisplay = (): void =>
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
        mediaList.forEach
        (
            (entry, ix) =>
            {
                const item = Library.UI.createElement
                ({
                    tag: "div",
                    className: "item",
                    attributes: { draggable: "true", "data-index": ix },
                    children:
                    [
                        { tag: "img", className: "thumbnail", attributes: { src: entry.thumbnail, alt: entry.name, }, },
                        { tag: "span", className: "name", text: entry.name, },
                        { tag: "span", className: "type", text: entry.type, },
                        { tag: "span", className: "duration", text: null !== entry.duration ? Tools.Timespan.toMediaTimeString(entry.duration * 1000) : "", },
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
                    () =>
                    {
                        UI.mediaList.classList.remove("dragging");
                        item.classList.remove("dragging");
                        updateMediaListDisplay();
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
                    (event: DragEvent) =>
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
                        updateMediaListDisplay();
                    }
                );
                UI.mediaList.insertBefore(item, UI.addMediaButton.dom);
            }
        );
    };
}
