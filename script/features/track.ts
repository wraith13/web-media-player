import { Tools } from "@tools";
import { Library } from "@library";
import { UI } from "../ui";
import { ElementPool } from "./elementpool";
import { Media } from "./media";
import { Analyser } from "./analyser";
import { Visualizer } from "./visualizer";
import config from "@resource/config.json";
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
    analyser: Analyser.Entry | null = null;
    constructor(media: Media.Entry, index: number)
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
            this.playerElement = this.makePlayerElement() as HTMLAudioElement;
            this.visualElement = Visualizer.make(media, index);
            this.visualElement.appendChild(this.playerElement);
            if (Analyser.isSupported())
            {
                ElementPool.makeSureAnalyser(this.playerElement)
                    .then((analyser) => this.setAnalyser(analyser))
                    .catch(console.error);
            }
            break;
        case "video":
            this.playerElement = this.makePlayerElement() as HTMLVideoElement;
            this.visualElement = Library.UI.createElement
            ({
                tag: "div",
                className: "track-frame",
                children: [ this.playerElement,]
            });
            if (Analyser.isSupported())
            {
                ElementPool.makeSureAnalyser(this.playerElement, "gainOnly")
                    .then((analyser) => this.setAnalyser(analyser))
                    .catch(console.error);
            }
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
        // this.visualElement?.addEventListener
        // (
        //     "click",
        //     () => document.body.classList.toggle("mousemove")
        // );
    }
    setAnalyser(analyser: Analyser.Entry | null): void
    {
        this.analyser = analyser;
        if (this.analyser instanceof Analyser.Entry && this.analyser.gainNode instanceof GainNode && this.playerElement instanceof HTMLMediaElement)
        {
            this.analyser.gainNode.gain.value = this.playerElement.volume;
            this.playerElement.volume = 1.0;
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
        this.startTime = Date.now() -(this.elapsedTime ?? 0);
        if (this.playerElement instanceof HTMLMediaElement)
        {
            await this.playerElement.play();
            this.currentTimeForValidation = this.playerElement.currentTime;
            if (this.paddingElement instanceof HTMLMediaElement)
            {
                await this.paddingElement.play();
                this.paddingElement.currentTime = this.playerElement.currentTime;
            }
            if ( ! this.isLoop())
            {
                this.startTime = Date.now() -(this.playerElement.currentTime *1000);
            }
        }
        this.elapsedTime = null;
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
    seek(seekPosition: number): void
    {
        seekPosition = Math.max(0, Math.min(seekPosition, this.getDuration()));
        if (this.playerElement instanceof HTMLMediaElement)
        {
            const singleSeekPosition = this.isLoop() ?
                    seekPosition %this.getSingleDuration():
                    seekPosition;
            this.playerElement.currentTime = singleSeekPosition /1000;
            if (this.paddingElement instanceof HTMLMediaElement)
            {
                this.paddingElement.currentTime = singleSeekPosition /1000;
            }
        }
        if (null !== this.startTime)
        {
            this.startTime = Date.now() -seekPosition;
        }
        if (null !== this.elapsedTime)
        {
            this.elapsedTime = seekPosition;
        }
    }
    getSeek(): number
    {
        if (this.playerElement instanceof HTMLMediaElement && ! this.isLoop())
        {
            return this.playerElement.currentTime *1000;
        }
        else
        {
            return this.elapsedTime ?? this.getElapsedTime();
        }
    }
    diffSeek(seekDiff: number): void
    {
        this.seek(this.getSeek() +seekDiff);
    }
    rateSeek(rate: number): void
    {
        this.seek(this.getDuration() *rate);
    }
    fastForward(): void
    {
        this.diffSeek(config.player.fastFowardSpan);
    }
    rewind(): void
    {
        this.diffSeek(-config.player.rewindSpan);
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
        if (this.playerElement instanceof HTMLMediaElement && this.visualElement instanceof Visualizer.VisualizerDom)
        {
            Visualizer.step(this.media, this.playerElement, this.visualElement, this.analyser?.getByteFrequencyData() ?? null);
        }
        if (this.playerElement instanceof HTMLMediaElement && ! this.isLoop())
        {
            UI.seekRange.valueAsNumber = (this.playerElement.currentTime *1000) / this.getDuration();
        }
        else
        {
            UI.seekRange.valueAsNumber = this.getElapsedTime() / this.getDuration();
        }
    }
    isLoop(): boolean
    {
        const loopShortMedia = UI.loopShortMediaCheckbox.get();
        const imageSpan = this.getImageDuration();
        return loopShortMedia && null !== this.media.duration && this.media.duration <= imageSpan;
    }
    getImageDuration(): number
    {
        return parseFloat(UI.imageSpanSelect.get());
    }
    getDuration(): number
    {
        if (this.isLoop())
        {
            return this.getImageDuration();
        }
        else
        {
            return this.getSingleDuration();
        }
    }
    getSingleDuration(): number
    {
        return this.media.duration ?? this.getImageDuration();
    }
    getEndTime(): number
    {
        if (null !== this.startTime)
        {
            return this.startTime + this.getDuration();
        }
        else
        {
            return 0;
        }
    }
    getElapsedTime(): number
    {
        if (null !== this.startTime)
        {
            return Date.now() - this.startTime;
        }
        else
        {
            return this.elapsedTime ?? 0;
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
    updateLoopShortMedia(isPlaying: boolean): void
    {
        if (this.playerElement instanceof HTMLMediaElement)
        {
            if (this.isLoop())
            {
                this.playerElement.loop = true;
                if (this.playerElement.paused && isPlaying)
                {
                    this.playerElement.play();
                }
                if (this.paddingElement instanceof HTMLMediaElement)
                {
                    this.paddingElement.loop = true;
                    if (this.paddingElement.paused && isPlaying)
                    {
                        this.paddingElement.play();
                    }
                }
            }
            else
            {
                this.playerElement.removeAttribute("loop");
                if (this.paddingElement instanceof HTMLMediaElement)
                {
                    this.paddingElement.removeAttribute("loop");
                }
            }
        }
    }
    isMuteCondition(volume: number, rate?: number): boolean
    {
        if (undefined !== rate && Tools.Environment.isSafari() && this.playerElement instanceof HTMLMediaElement)
        {
            return volume <= 0 || rate <= 0.5;
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
            if (this.analyser instanceof Analyser.Entry && this.analyser.gainNode instanceof GainNode)
            {
                this.analyser.gainNode.gain.value = volume *(rate ?? 1.0);
            }
            else
            {
                this.playerElement.volume = volume *(rate ?? 1.0);
            }
            this.playerElement.muted = this.isMuteCondition(volume, rate);
        }
    }
    crossFadeStep(rate: number): void
    {
        this.fadeRate = rate;
        if (this.visualElement)
        {
            this.visualElement.style.opacity = `${rate}`;
        }
    }
    release(): void
    {
        ElementPool.release(this.playerElement);
        ElementPool.release(this.paddingElement);
    }
}
