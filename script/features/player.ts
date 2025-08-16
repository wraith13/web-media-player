import { Fps } from "./fps";
import { Clock } from "./clock";
import { Library } from "@library";
import { UI } from "../ui";
import { Media } from "./media";
import { Visualizer } from "./visualizer";
import * as config from "@resource/config.json";
export namespace Player
{
    export class TransitionSession
    {

    }
    export class Track
    {
        playerDom: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null;
        visualDom: HTMLImageElement | Visualizer.VisualizerDom | HTMLVideoElement | null;
        media: Media.Entry;
        startTime: number | null = null;
        elapsedTime: number | null = null;
        constructor(media: Media.Entry)
        {
            this.media = media;
            switch(media.type)
            {
            case "image":
                this.playerDom = Library.UI.createElement
                ({
                    tag: "img",
                    className: "player",
                    attributes:
                    {
                        src: media.url,
                        alt: media.name,
                    },
                });
                this.visualDom = this.playerDom;
                break;
            case "audio":
                this.playerDom = Library.UI.createElement
                ({
                    tag: "audio",
                    className: "player",
                    attributes:
                    {
                        src: media.url,
                        controls: false,
                        autoplay: false,
                        loop: this.isLoop(),
                    },
                });
                this.visualDom = Visualizer.make(media);
                break;
            case "video":
                this.playerDom = Library.UI.createElement
                ({
                    tag: "video",
                    className: "player",
                    attributes:
                    {
                        src: media.url,
                        controls: false,
                        autoplay: false,
                        loop: this.isLoop(),
                    },
                });
                this.visualDom = Library.UI.createElement({ tag: "div", className: "visual" });
                break;
            default:
                console.error("🦋 Unknown media type:", media.type, media);
                this.playerDom = null;
                this.visualDom = null;
                break;
            }
            // this.startTime = Date.now();
            // this.endTime = this.startTime + (media.duration ?? parseFloat(UI.imageSpanSelect.get()));
        }
        play(): void
        {
            if (this.playerDom instanceof HTMLMediaElement)
            {
                this.playerDom.play();
            }
            if (null !== this.elapsedTime)
            {
                this.startTime = Date.now() - this.elapsedTime;
            }
            else
            {
                this.startTime = Date.now();
            }
        }
        pause(): void
        {
            if (this.playerDom instanceof HTMLMediaElement)
            {
                this.playerDom.pause();
            }
            if (null !== this.startTime)
            {
                this.elapsedTime = Date.now() - this.startTime;
            }
        }
        setPositionState(): void
        {
            navigator.mediaSession.setPositionState
            ({
                duration: this.getDuration(),
                playbackRate: this.playerDom instanceof HTMLMediaElement ? this.playerDom.playbackRate : 1.0,
                position: this.getElapsedTime() /1000,
            });
        }
        step(): void
        {
            if (this.playerDom instanceof HTMLAudioElement && ! this.playerDom.paused)
            {
                Visualizer.step(this.media, this.playerDom, this.visualDom as Visualizer.VisualizerDom);
            }
            this.setPositionState(); // 🔥 これはここでやっちゃダメ！
        }
        isLoop(): boolean
        {
            const loopShortMedia = UI.loopShortMediaCheckbox.get();
            const imageSpan = parseFloat(UI.imageSpanSelect.get());
            return loopShortMedia && null !== this.media.duration && this.media.duration < imageSpan;
        }
        getDuration(): number
        {
            const imageSpan = parseFloat(UI.imageSpanSelect.get());
            if (this.isLoop())
            {
                return imageSpan;
            }
            else
            {
                return this.media.duration ?? imageSpan;
            }
        }
        getEndTime(): number
        {
            if (null === this.startTime)
            {
                return 0;
            }
            else
            if (this.playerDom instanceof HTMLMediaElement && ! this.isLoop())
            {
                return Date.now() +((this.playerDom.duration - this.playerDom.currentTime) * 1000);
            }
            else
            {
                return this.startTime + this.getDuration();
            }
        }
        getElapsedTime(): number
        {
            if (null === this.startTime)
            {
                return 0;
            }
            else
            if (this.playerDom instanceof HTMLMediaElement && ! this.isLoop())
            {
                return this.playerDom.currentTime * 1000;
            }
            else
            {
                return Date.now() - this.startTime;
            }
        }
        getRemainingTime(): number
        {
            if (null === this.startTime)
            {
                return 0;
            }
            else
            if (this.playerDom instanceof HTMLMediaElement && ! this.isLoop())
            {
                return (this.playerDom.duration - this.playerDom.currentTime) * 1000;
            }
            else
            {
                return this.getEndTime() - Date.now();
            }
        }
        updateMinVisibleRate(): void
        {
            if (this.visualDom)
            {
                const minVisibleRate = (100 -UI.stretchRange.get()) /100;
                if (this.media.area)
                {
                    const widthScale = this.media.area.width /document.body.clientWidth;
                    const heightScale = this.media.area.height /document.body.clientHeight;
                    const minScale = Math.min(widthScale, heightScale);
                    const maxScale = Math.max(widthScale, heightScale);
                    const maxStreach = minScale /maxScale;
                    const ratio = Math.min(maxStreach, minVisibleRate);
                    const scale = minScale /ratio;
                    const scaledWidth = this.media.area.width *scale;
                    const scaledHeight = this.media.area.height *scale;
                    Library.UI.setStyle(this.visualDom, "width", `${scaledWidth}px`);
                    Library.UI.setStyle(this.visualDom, "height", `${scaledHeight}px`);
                }
                else
                {
                    Library.UI.setStyle(this.visualDom, "width", "100%");
                    Library.UI.setStyle(this.visualDom, "height", "100%");
                }
            }
        }
        setVolume(volume: number): void
        {
            if (this.playerDom instanceof HTMLMediaElement)
            {
                this.playerDom.volume = volume;
            }
        }
        transitionStep(rate: number): void
        {
            if (this.visualDom)
            {
                this.visualDom.style.opacity = `${rate}`;
            }
        }
    }
    const noMediaTimer = new Library.UI.ToggleClassForWhileTimer();
    let loopHandle: number | null = null;
    export const updateFullscreenState = (fullscreen?: boolean) =>
    {
        if (Library.UI.fullscreenEnabled)
        {
            if (fullscreen ?? UI.withFullscreenCheckbox.get())
            {
                Library.UI.requestFullscreen(document.body);
                setTimeout(() => document.body.focus(), 100);
            }
            else
            {
                Library.UI.exitFullscreen();
            }
        }
    };
    export const play = () =>
    {
        updateFullscreenState();
        if (null !== loopHandle)
        {
            window.cancelAnimationFrame(loopHandle);
        }
        loopHandle = window.requestAnimationFrame(loop);
        navigator.mediaSession.metadata = new MediaMetadata
        ({
            title: config.applicationTitle,
            artist: "Unknown Artist",
            album: "Temporary Media List",
            artwork:
            [
                {
                    src: "./image/appicon.png",
                    type: "image/png",
                },
            ],
        });
        navigator.mediaSession.playbackState = "playing";
        document.body.classList.toggle("list", false);
        document.body.classList.toggle("play", true);
        if (Media.mediaList.length <= 0)
        {
            noMediaTimer.start(document.body, "no-media", 5000);
        }
    };
    export const pause = () =>
    {
        if (null !== loopHandle)
        {
            window.cancelAnimationFrame(loopHandle);
        }
        UI.clockDisplay.style.removeProperty("opacity");
        updateFullscreenState(false);
        navigator.mediaSession.playbackState = "paused";
        document.body.classList.toggle("list", true);
        document.body.classList.toggle("play", false);
    };
    export const previous = () =>
    {
    };
    export const next = () =>
    {
    };
    export const updateFps = () =>
    {
        if (UI.showFpsCheckbox.get())
        {
            Library.UI.setTextContent(UI.fpsDisplay, Fps.getText());
        }
    }
    export const loop = (now: number) =>
    {
        if (document.body.classList.contains("play"))
        {
            Clock.update(now);
            Fps.step(now);
            updateFps();
            loopHandle = window.requestAnimationFrame(loop);
        }
        else
        {
            loopHandle = null;
        }
    };
    export const playMedia = (entry: Media.Entry) =>
    {
        navigator.mediaSession.metadata = new MediaMetadata
        ({
            title: entry.name,
            artist: "Unknown Artist",
            album: "Temporary Media List",
            artwork: [{ src: entry.thumbnail, }],
        });
        switch(entry.type)
        {
        case "image":
            break;
        case "audio":
            break;
        case "video":
            break;
        default:
            console.error("🦋 Unknown media type:", entry.type, entry);
            return;
        }
    };
}