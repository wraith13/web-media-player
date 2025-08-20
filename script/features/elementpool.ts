import { Library } from "@library";
import { UI } from "../ui";
import { Media } from "./media";
export namespace ElementPool
{
    export const makeSure = (data: { image: Media.Entry | null; audio: Media.Entry | null; video: Media.Entry | null; }): Promise<void> =>
    {
        let result: Promise<void> = Promise.resolve();
        if (data.image)
        {
            while(UI.elementPool.getElementsByTagName("img").length < 4)
            {
                const imgElement = Library.UI.createElement
                ({
                        tag: "img",
                        className: "player",
                        attributes:
                        {
                            src: data.image.url,
                            alt: data.image.name,
                        },
                }) as HTMLImageElement;
                UI.elementPool.appendChild(imgElement);
            }
        }
        if (data.audio)
        {
            const url = data.audio.url;
            let count = UI.elementPool.getElementsByTagName("audio").length;
            while(count++ < 2)
            {
                result = result.then
                (
                    () =>
                    {
                        const audioElement = Library.UI.createElement
                        ({
                            tag: "audio",
                            className: "player",
                            attributes:
                            {
                                src: url,
                                //controls: false,
                                autoplay: false,
                            },
                        }) as HTMLAudioElement;
                        UI.elementPool.appendChild(audioElement);
                        audioElement.volume = 0;
                        audioElement.muted = false;
                        return audioElement.play().then(() => { audioElement.pause(); audioElement.currentTime = 0;});
                    }
                );
            }
        }
        if (data.video)
        {
            const url = data.video.url;
            let count = UI.elementPool.getElementsByTagName("video").length;
            while(count++ < 4)
            {
                result = result.then
                (
                    () =>
                    {
                        const videoElement = Library.UI.createElement
                        ({
                            tag: "video",
                            className: "player",
                            attributes:
                            {
                                src: url,
                                //controls: false,
                                autoplay: false,
                                playsinline: true,
                                webkitPlaysinline: true,
                            },
                        }) as HTMLVideoElement;
                        UI.elementPool.appendChild(videoElement);
                        videoElement.volume = 0;
                        videoElement.muted = false;
                        return videoElement.play().then(() => { videoElement.pause(); videoElement.currentTime = 0;});
                    }
                );
            }
        }
        return result.then(() => undefined);
    }
    export const get = (media: Media.Entry): HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null =>
    {
        switch(media.category)
        {
        case "image":
            const imgElement = UI.elementPool.getElementsByTagName("img")[0] as HTMLImageElement | undefined;
            if (imgElement)
            {
                imgElement.src = media.url;
                imgElement.alt = media.name;
                return imgElement;
            }
            break;
        case "audio":
            const audioElement = UI.elementPool.getElementsByTagName("audio")[0] as HTMLAudioElement | undefined;
            if (audioElement)
            {
                audioElement.src = media.url;
                audioElement.controls = false;
                audioElement.autoplay = false;
                audioElement.currentTime = 0;
                audioElement.volume = 0;
                audioElement.muted = false;
                return audioElement;
            }
            break;
        case "video":
            const videoElement = UI.elementPool.getElementsByTagName("video")[0] as HTMLVideoElement | undefined;
            if (videoElement)
            {
                videoElement.src = media.url;
                videoElement.autoplay = false;
                videoElement.currentTime = 0;
                videoElement.volume = 0;
                videoElement.muted = false;
                return videoElement;
            }
            break;
        default:
            console.error("🦋 Unknown media type:", media.type, media);
            return null;
        }
        console.error("🦋 No element found in the pool for media:", media);
        return null;
    }
    export const release = (element: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null) =>
    {
        if (element)
        {
            element.className = "player";
            UI.elementPool.appendChild(element);
        }
    }
}
