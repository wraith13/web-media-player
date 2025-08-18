import { Library } from "@library";
import { UI } from "../ui";
import { Media } from "./media";
import { Visualizer } from "./visualizer";
export class Track
{
    playerDom: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null;
    paddingDom: HTMLImageElement | HTMLVideoElement | null = null;
    visualDom: HTMLDivElement | Visualizer.VisualizerDom | null;
    media: Media.Entry;
    startTime: number | null = null;
    elapsedTime: number | null = null;
    constructor(media: Media.Entry)
    {
        this.media = media;
        switch(media.category)
        {
        case "image":
            this.playerDom = this.makePlayerDom();
            this.visualDom = Library.UI.createElement
            ({
                tag: "div",
                className: "track-frame",
                children: [ this.playerDom,]
            });
            break;
        case "audio":
            this.playerDom = this.makePlayerDom();
            this.visualDom = Visualizer.make(media);
            break;
        case "video":
            this.playerDom = this.makePlayerDom();
            this.visualDom = Library.UI.createElement
            ({
                tag: "div",
                className: "track-frame",
                children: [ this.playerDom,]
            });
            break;
        default:
            console.error("🦋 Unknown media type:", media.type, media);
            this.playerDom = null;
            this.visualDom = null;
            break;
        }
        if (this.playerDom instanceof HTMLMediaElement && this.isLoop())
        {
            this.playerDom.loop = true;
        }
        // this.startTime = Date.now();
        // this.endTime = this.startTime + (media.duration ?? parseFloat(UI.imageSpanSelect.get()));
    }
    makePlayerDom(): HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null
    {
        switch(this.media.category)
        {
        case "image":
            return Library.UI.createElement
            ({
                tag: "img",
                className: "player",
                attributes:
                {
                    src: this.media.url,
                    alt: this.media.name,
                },
            });
        case "audio":
            return Library.UI.createElement
            ({
                tag: "audio",
                className: "player",
                attributes:
                {
                    src: this.media.url,
                    controls: false,
                    autoplay: false,
                },
            });
        case "video":
            return Library.UI.createElement
            ({
                tag: "video",
                className: "player",
                attributes:
                {
                    src: this.media.url,
                    //controls: false,
                    autoplay: false,
                },
            });
        default:
            console.error("🦋 Unknown media type:", this.media.type, this.media);
            return null;
        }
    }
    isPlaying(): boolean
    {
        return null !== this.startTime;
    }
    play(): void
    {
        if (this.playerDom instanceof HTMLMediaElement)
        {
            this.playerDom.play();
            this.playerDom.currentTime = (this.elapsedTime ?? 0) /1000;
            if (this.paddingDom instanceof HTMLMediaElement)
            {
                this.paddingDom.play();
                this.paddingDom.currentTime = this.playerDom.currentTime;
            }
        }
        if (null !== this.elapsedTime)
        {
            this.startTime = Date.now() - this.elapsedTime;
            this.elapsedTime = null;
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
            if (this.paddingDom instanceof HTMLMediaElement)
            {
                this.paddingDom.pause();
            }
        }
        if (null !== this.startTime)
        {
            this.elapsedTime = Date.now() - this.startTime;
            this.startTime = null;
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
        {
            return Date.now() - this.startTime;
        }
    }
    getRemainingTime(): number
    {
        if (null === this.startTime)
        {
            return this.getDuration();
        }
        else
        {
            return this.getEndTime() - Date.now();
        }
    }
    appleyStretch(dom: HTMLImageElement | HTMLVideoElement, StretchRate: number): boolean
    {
        if (this.media.area)
        {
            const widthScale = window.innerWidth /this.media.area.width;
            const heightScale = window.innerHeight /this.media.area.height;
            const minScale = Math.min(widthScale, heightScale);
            const maxScale = Math.max(widthScale, heightScale);
            const maxStreach = maxScale /minScale; // 1以上
            const ratio = 1 /Math.max(1 /maxStreach, 1 -StretchRate);
            const scale = ratio *minScale;
            const scaledWidth = this.media.area.width *scale;
            const scaledHeight = this.media.area.height *scale;
            Library.UI.setStyle(dom, "width", `${scaledWidth}px`);
            Library.UI.setStyle(dom, "height", `${scaledHeight}px`);
            if (maxStreach <= ratio)
            {
                return true;
            }
        }
        return false;
    }
    updateStretch(): void
    {
        if (this.visualDom)
        {
            if (this.media.area)
            {
                const StretchRate = UI.stretchRange.get() /100;
                const isFit = this.appleyStretch(this.playerDom as HTMLImageElement | HTMLVideoElement, StretchRate);
                if (UI.paddingCheckbox.get())
                {
                    if ( ! isFit)
                    {
                        if (null === this.paddingDom)
                        {
                            this.paddingDom = this.makePlayerDom() as HTMLImageElement | HTMLVideoElement;
                            if (this.playerDom instanceof HTMLMediaElement && this.isLoop())
                            {
                                this.playerDom.loop = true;
                            }
                            this.paddingDom.classList.add("padding");
                            if (this.paddingDom instanceof HTMLMediaElement)
                            {
                                const playerDom = this.playerDom as HTMLMediaElement;
                                this.paddingDom.volume = 0;
                                this.paddingDom.muted = true;
                                this.paddingDom.loop = playerDom.loop;
                                this.paddingDom.currentTime = playerDom.currentTime;
                            }
                            this.visualDom.insertBefore(this.paddingDom, this.playerDom);
                        }
                        this.appleyStretch(this.paddingDom, 1.0);
                    }
                }
                else
                {
                    if (null !== this.paddingDom)
                    {
                        this.visualDom.removeChild(this.paddingDom);
                        this.paddingDom = null;
                    }
                }
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
            this.playerDom.muted = volume <= 0;
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
