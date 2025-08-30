//import { History } from "./history";
// import { UI } from "../ui";
import { Library } from "@library";
import { Tools } from "../tools";
import * as Config from "@resource/config.json";
export namespace Media
{
    export interface Entry
    {
        //file: File;
        url: string;
        type: string;
        category: Category;
        name: string;
        thumbnail: string;
        size: number;
        duration: number | null;
        area: { width: number; height: number; } | null;
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
    const canvasImageSourceToDataUrl = (canvasImageSource: CanvasImageSource, width: number, height: number): string =>
    {
        if (width <= 0 || height <= 0)
        {
            console.warn("🚫 Invalid dimensions for canvas image source:", { width, height, canvasImageSource });
        }
        else
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
        }
        return "SVG:error";
    };
    export const imageToEntry = (category: Category, file: File): Promise<Entry | null> =>
    {
        return new Promise(async (resolve) =>
        {
            const img = new Image();
            const url = getUrl(file);
            img.onload = () => resolve
            ({
                //file,
                url,
                type: file.type,
                category,
                name: getName(file),
                thumbnail: canvasImageSourceToDataUrl(img, img.width, img.height),
                size: file.size,
                duration: null,
                area: { width: img.width, height: img.height },
            });
            img.onerror = error =>
            {
                console.error("🚫 Error loading image metadata:", error);
                resolve(null)
            };
            img.src = url;
        });
    };
    export const audioToEntry = (category: Category, file: File): Promise<Entry | null> =>
    {
        return new Promise
        (
            async (resolve) =>
            {
                const url = getUrl(file);
                const audio = document.createElement("audio");
                let loadedmetadataCalled = false;
                let failed = false;
                const finish = () => resolve
                ({
                    //file,
                    url,
                    type: file.type,
                    category,
                    name: getName(file),
                    thumbnail: "SVG:audio",
                    size: file.size,
                    duration: audio.duration *1000,
                    area: null,
                });
                audio.addEventListener
                (
                    "loadedmetadata", () =>
                    {
                        loadedmetadataCalled = true;
                        finish();
                    }
                );
                audio.addEventListener
                (
                    "error", error =>
                    {
                        console.error("🚫 Error loading audio metadata:", error);
                        failed = true;
                        resolve(null)
                    }
                );
                audio.src = url;
                Tools.Timer.sleep(1000).then
                (
                    () =>
                    {
                        if (!loadedmetadataCalled && !failed)
                        {
                            console.warn("⏳ Audio metadata not loaded in time, trying to finish anyway.");
                            finish();
                        }
                    }
                );
            }
        );
    };
    export const videoToEntry = (category: Category, file: File): Promise<Entry | null> =>
    {
        return new Promise
        (
            async (resolve) =>
            {
                const url = getUrl(file);
                const video = document.createElement("video");
                video.muted = true;
                video.playsInline = true;
                const finish = (skipThumbnail?: "skipThumbnail") => resolve
                ({
                    //file,
                    url,
                    type: file.type,
                    category,
                    name: getName(file),
                    thumbnail: skipThumbnail ?
                        "SVG:error":
                        canvasImageSourceToDataUrl(video, video.videoWidth, video.videoHeight),
                    size: file.size,
                    duration: video.duration *1000,
                    area: { width: video.videoWidth, height: video.videoHeight },
                });
                let loadedmetadataCalled = false;
                let loadeddataCalled = false;
                let failed = false;
                const tryFinish = () =>
                {
                    if (loadedmetadataCalled && loadeddataCalled)
                    {
                        finish();
                    }
                };
                video.addEventListener
                (
                    "loadedmetadata", () =>
                    {
                        loadedmetadataCalled = true;
                        tryFinish();
                    }
                );
                video.addEventListener
                (
                    "loadeddata", () =>
                    {
                        loadeddataCalled = true;
                        tryFinish();
                    }
                );
                video.addEventListener
                (
                    "error", error =>
                    {
                        console.error("🚫 Error loading video metadata:", error);
                        failed = true;
                        resolve(null);
                    }
                );
                video.src = url;
                video.currentTime = 0.1;
                Tools.Timer.sleep(1000).then(() =>
                {
                    video.play().finally
                    (
                        () =>
                        {
                            video.pause();
                            if (( ! loadedmetadataCalled || ! loadeddataCalled) && ! failed)
                            {
                                console.warn("⏳ Video metadata not loaded in time, trying to finish anyway.");
                                finish("skipThumbnail");
                            }
                        }
                    );
                });
            }
        );
    };
    export const fileToEntry = async (file: File): Promise<Entry | null> =>
    {
        const category = getMediaCategory(file);
        switch (category)
        {
        case "image":
            return await imageToEntry(category, file);
        case "audio":
            return await audioToEntry(category, file);
        case "video":
            return await videoToEntry(category, file);
        default:
            console.warn("🚫 Unsupported media type:", file.type, file);
            return null;
        }
    }
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
}
