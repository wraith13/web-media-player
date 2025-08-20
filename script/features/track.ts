import { Tools } from "@tools";
import { Library } from "@library";
import { UI } from "../ui";
import { ElementPool } from "./elementpool";
import { Media } from "./media";
import { Visualizer } from "./visualizer";
export class Track
{
    playerElement: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null;
    paddingElement: HTMLImageElement | HTMLVideoElement | null = null;
    visualElement: HTMLDivElement | Visualizer.VisualizerDom | null;
    media: Media.Entry;
    startTime: number | null = null;
    elapsedTime: number | null = null;
    fadeRate: number = 0.0;
    currentTimeForValidation: number = 0.0;
    constructor(media: Media.Entry)
    {
        this.media = media;
        switch(media.category)
        {
        case "image":
            this.playerElement = this.makePlayerElement();
            this.visualElement = Library.UI.createElement
            ({
                tag: "div",
                className: "track-frame",
                children: [ this.playerElement,]
            });
            break;
        case "audio":
            this.playerElement = this.makePlayerElement();
            this.visualElement = Visualizer.make(media);
            break;
        case "video":
            this.playerElement = this.makePlayerElement();
            this.visualElement = Library.UI.createElement
            ({
                tag: "div",
                className: "track-frame",
                children: [ this.playerElement,]
            });
            break;
        default:
            console.error("🦋 Unknown media type:", media.type, media);
            this.playerElement = null;
            this.visualElement = null;
            break;
        }
        if (this.playerElement instanceof HTMLMediaElement)
        {
            if (this.isLoop())
            {
                this.playerElement.loop = true;
            }
            else
            {
                this.playerElement.removeAttribute("loop");
            }
        }
    }
    selfValidate(): boolean
    {
        if (this.playerElement instanceof HTMLMediaElement)
        {
            if (this.currentTimeForValidation +(60 *60) < this.playerElement.currentTime && this.playerElement.paused)
            {
                const actualDuration = this.currentTimeForValidation * 1000;
                if (null === this.media.duration || (actualDuration +(60 *60 *1000)) < this.media.duration)
                {
                    this.media.duration = actualDuration;
                    console.log("🦋 Updated media duration:", this.media.name, this.media.duration);
                    if (this.isLoop())
                    {
                        this.playerElement.loop = true;
                        this.playerElement.play();
                    }
                    return true;
                }
            }
            else
            {
                this.currentTimeForValidation = this.playerElement.currentTime;
            }
        }
        return false;
    }
    makePlayerElement(): HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null
    {
        return ElementPool.get(this.media);
    }
    isPlaying(): boolean
    {
        return null !== this.startTime;
    }
    async play(): Promise<void>
    {
        if (this.playerElement instanceof HTMLMediaElement)
        {
            await this.playerElement.play();
            if (null !== this.media.duration && this.isLoop())
            {
                this.playerElement.currentTime = ((this.elapsedTime ?? 0) /1000) %this.media.duration;
            }
            else
            {
                this.playerElement.currentTime = (this.elapsedTime ?? 0) /1000;
            }
            this.currentTimeForValidation = this.playerElement.currentTime;
            if (this.paddingElement instanceof HTMLMediaElement)
            {
                await this.paddingElement.play();
                this.paddingElement.currentTime = this.playerElement.currentTime;
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
        if (this.playerElement instanceof HTMLMediaElement)
        {
            this.playerElement.pause();
            if (this.paddingElement instanceof HTMLMediaElement)
            {
                this.paddingElement.pause();
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
            playbackRate: this.playerElement instanceof HTMLMediaElement ? this.playerElement.playbackRate : 1.0,
            position: this.getElapsedTime() /1000,
        });
    }
    step(): void
    {
        if (this.playerElement instanceof HTMLAudioElement && ! this.playerElement.paused)
        {
            Visualizer.step(this.media, this.playerElement, this.visualElement as Visualizer.VisualizerDom);
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
        if (this.visualElement)
        {
            if (this.media.area)
            {
                const StretchRate = UI.stretchRange.get() /100;
                const isFit = this.appleyStretch(this.playerElement as HTMLImageElement | HTMLVideoElement, StretchRate);
                if (UI.paddingCheckbox.get())
                {
                    if ( ! isFit)
                    {
                        if (null === this.paddingElement)
                        {
                            this.paddingElement = this.makePlayerElement() as HTMLImageElement | HTMLVideoElement;
                            this.paddingElement.classList.add("padding");
                            if (this.paddingElement instanceof HTMLMediaElement)
                            {
                                const playerDom = this.playerElement as HTMLMediaElement;
                                this.paddingElement.volume = 0;
                                this.paddingElement.muted = true;
                                this.paddingElement.loop = playerDom.loop;
                                this.paddingElement.currentTime = playerDom.currentTime;
                                if (this.playerElement instanceof HTMLMediaElement && ! this.playerElement.paused)
                                {
                                    this.paddingElement.play().then
                                    (
                                        () =>
                                        {
                                            if (this.paddingElement instanceof HTMLVideoElement && this.playerElement instanceof HTMLVideoElement)
                                            {
                                                this.paddingElement.currentTime = this.playerElement.currentTime;
                                            }
                                        }
                                    );
                                }
                            }
                            this.visualElement.insertBefore(this.paddingElement, this.playerElement);
                        }
                        this.appleyStretch(this.paddingElement, 1.0);
                    }
                }
                else
                {
                    if (null !== this.paddingElement)
                    {
                        if (this.paddingElement instanceof HTMLMediaElement)
                        {
                            this.paddingElement.pause();
                        }
                        ElementPool.release(this.paddingElement);
                        this.paddingElement = null;
                    }
                }
            }
            else
            {
                Library.UI.setStyle(this.visualElement, "width", `100%`);
                Library.UI.setStyle(this.visualElement, "height", `100%`);
            }
        }
    }
    isMuteCondition(volume: number, rate?: number): boolean
    {
        if (undefined !== rate && Tools.Environment.isSafari() && this.playerElement instanceof HTMLMediaElement)
        {
            return rate <= 0.5;
        }
        else
        {
            return volume <= 0;
        }
    }
    setVolume(volume: number, rate?: number): void
    {
        if (this.playerElement instanceof HTMLMediaElement)
        {
            this.playerElement.volume = volume *(rate ?? 1.0);
            this.playerElement.muted = this.isMuteCondition(volume, rate);
        }
    }
    crossFadeStep(rate: number): void
    {
        this.fadeRate = rate;
        if (this.visualElement)
        {
            this.visualElement.style.opacity = `${rate * rate}`;
        }
    }
    release(): void
    {
        ElementPool.release(this.playerElement);
        ElementPool.release(this.paddingElement);
    }
}
