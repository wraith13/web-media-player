import { Tools } from "@tools";
import { Library } from "@library";
import { UI } from "../ui";
import { ElementPool } from "./elementpool";
import { Media } from "./media";
import { Analyser } from "./analyser";
import { Visualizer } from "./visualizer";
import { FlounderStyle } from "flounder.style.js";
import config from "@resource/config.json";
export const hasValidGainNode = (track: Track): track is Track & { analyser: Analyser.Entry & { gainNode: GainNode } } =>
{
    return track.analyser instanceof Analyser.Entry && track.analyser.gainNode instanceof GainNode;
}
export class Track
{
    static locale: string | undefined = undefined;
    playerElement: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null;
    paddingElement: HTMLImageElement | HTMLVideoElement | null = null;
    visualElement: HTMLDivElement | Visualizer.VisualizerDom | null;
    media: Media.Entry;
    index: number;
    startTime: number | null = null;
    elapsedTime: number | null = null;
    fadeRate: number = 0.0;
    currentTimeForValidation: number = 0.0;
    analyser: Analyser.Entry | null = null;
    randomTransition: "alpha" | "blur" | "wipe" | null = null;
    transtionPattern: FlounderStyle.Type.Arguments | null = null;
    isReverseWipe: boolean = false;
    constructor(media: Media.Entry, index: number)
    {
        this.media = media;
        this.index = index;
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
            if (this.playerElement && Media.isPixelatedImage(media))
            {
                this.playerElement.classList.add("pixelated");
            }
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
                ElementPool.makeSureAnalyser(this.playerElement)
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
    step(truckType: "current" | "fadingout"): void
    {
        this.analyser?.step();
        if (this.playerElement instanceof HTMLAudioElement && this.visualElement instanceof Visualizer.VisualizerDom)
        {
            Visualizer.step(this.media, this.playerElement, this.visualElement, this.analyser);
        }
        if ("current" === truckType)
        {
            if (this.playerElement instanceof HTMLVideoElement && UI.SettingsPanel.withVisualizerCheckbox.get())
            {
                UI.OverlayPanel.visualizer.classList.toggle("on", true);
                UI.OverlayPanel.visualizer.classList.toggle("odd", 0 !== (this.index %2));
                Visualizer.step(this.media, this.playerElement, UI.OverlayPanel.visualizer, this.analyser);
            }
            else
            {
                UI.OverlayPanel.visualizer.classList.toggle("on", false);
            }
            //const valueMin = 0;
            const valueMax = this.getDuration();
            const valueNow = this.getElapsedTime();
            //Library.UI.setAttribute(UI.TransportPanel.seekRange, "aria-valuemin", valueMin);
            Library.UI.setAttribute(UI.TransportPanel.seekRange, "aria-valuemax", `${valueMax}`);
            Library.UI.setAttribute(UI.TransportPanel.seekRange, "aria-valuenow", `${valueNow}`);
            Library.UI.setAttribute(UI.TransportPanel.seekRange, "aria-valuetext", `${Tools.Timespan.toMediaTimeString(valueNow, Track.locale)} / ${Tools.Timespan.toMediaTimeString(valueMax, Track.locale)}`);
            if (this.playerElement instanceof HTMLMediaElement && ! this.isLoop())
            {
                UI.TransportPanel.seekRange.valueAsNumber = (this.playerElement.currentTime *1000) / this.getDuration();
            }
            else
            {
                UI.TransportPanel.seekRange.valueAsNumber = this.getElapsedTime() / this.getDuration();
            }
        }
    }
    isLoop(): boolean
    {
        const loopShortMedia = UI.SettingsPanel.loopShortMediaCheckbox.get();
        const imageSpan = this.getImageDuration();
        return loopShortMedia && null !== this.media.duration && this.media.duration <= imageSpan;
    }
    getImageDuration(): number
    {
        return Tools.Timespan.parse(UI.SettingsPanel.imageSpanSelect.get()) ?? 0;
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
    updateStretch(truckType: "current" | "fadingout"): void
    {
        if (this.visualElement)
        {
            if (this.media.area)
            {
                const StretchRate = UI.SettingsPanel.stretchRange.get() /100;
                const isFit = this.appleyStretch(this.playerElement as HTMLImageElement | HTMLVideoElement, StretchRate);
                if (UI.SettingsPanel.paddingCheckbox.get())
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
            if (this.playerElement instanceof HTMLAudioElement && this.visualElement instanceof Visualizer.VisualizerDom)
            {
                Visualizer.updateStretch(this.visualElement);
                Visualizer.step(this.media, this.playerElement, this.visualElement, this.analyser);
            }
            if ("current" === truckType)
            {
                if (this.playerElement instanceof HTMLVideoElement && UI.SettingsPanel.withVisualizerCheckbox.get())
                {
                    Visualizer.updateStretch(UI.OverlayPanel.visualizer);
                    Visualizer.step(this.media, this.playerElement, UI.OverlayPanel.visualizer, this.analyser);
                }
            }
        }
        if ("current" === truckType)
        {
            Visualizer.updateStretch(UI.OverlayPanel.visualizer);
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
    isMuteCondition(volume: number, rate?: number, fade?: "fadeIn" | "fadeOut"): boolean
    {
        if (Tools.Environment.isSafari())
        {
            if (hasValidGainNode(this))
            {
                switch(fade)
                {
                case "fadeIn":
                    return false;
                case "fadeOut":
                    return true;
                default:
                    break;
                }
            }
            if (undefined !== rate)
            {
                return volume <= 0 || rate <= 0.5;
            }
        }
        return volume <= 0;
    }
    setVolume(volume: number, rate?: number, fade?: "fadeIn" | "fadeOut"): void
    {
        if (this.playerElement instanceof HTMLMediaElement)
        {
            const finalVolume = volume *(rate ?? 1.0);
            if (hasValidGainNode(this))
            {
                if (finalVolume !== this.analyser.gainNode.gain.value)
                {
                    this.analyser.gainNode.gain.value = finalVolume;
                }
            }
            else
            {
                if (finalVolume !== this.playerElement.volume)
                {
                    this.playerElement.volume = finalVolume;
                }
            }
            this.playerElement.muted = this.isMuteCondition(volume, rate, fade);
        }
        if ("fadeOut" !== fade && this.visualElement instanceof Visualizer.VisualizerDom && this.playerElement instanceof HTMLMediaElement)
        {
            this.visualElement.classList.toggle("muted", this.playerElement.muted);
        }
    }
    setOpacity(rate: number): void
    {
        const finalOpacity = rate;
        this.fadeRate = finalOpacity;
        if (this.visualElement)
        {
            Library.UI.setStyle(this.visualElement, "opacity", `${finalOpacity.toFixed(config.rendering.opacitiyFractionalDigits)}`);
        }
    }
    easingForBlur(rate: number): number
    {
        return Math.pow(rate, config.player.blurEasing);
    }
    setBlur(rate: number): void
    {
        const maxBlur = config.player.maxBlur;
        const finalBlur = maxBlur *this.easingForBlur(rate);
        if (this.visualElement)
        {
            Library.UI.setStyle(this.visualElement, "--blur", `calc(${finalBlur.toFixed(config.rendering.viewportFractionalDigits)}vw + ${finalBlur.toFixed(config.rendering.viewportFractionalDigits)}vh)`);
        }
    }
    getEnoughPatternFractionDigits = (): number =>
    {
        const { innerWidth, innerHeight, devicePixelRatio } = window;
        const diagonal = Math.hypot(innerWidth, innerHeight) * devicePixelRatio;
        const circumference = Math.PI * diagonal;
        if (circumference <= 1)
        {
            // Client area is effectively zero (viewport collapsed); no fractional digits required
            return 0;
        }
        else
        {
            return Math.ceil(Math.log10(circumference));
        }
    };
    patternEasing(rate: number): number
    {
        if (0 < rate && rate < 1)
        {
            if (rate < 0.5)
            {
                return Math.pow(rate *2, config.rendering.patternEasingExponent) /2;
            }
            else
            {
                return 1 - (Math.pow((1 - rate) *2, config.rendering.patternEasingExponent) /2);
            }
        }
        return rate;
    }
    makeSureTranstionPattern(): FlounderStyle.Type.Arguments
    {
        if (null === this.transtionPattern)
        {
            const foregroundColor = "white";
            const randomSelect = Tools.Random.select;
            const makeRandomSpotArguments = (type: FlounderStyle.Type.SpotArguments["type"], intervalSize: number): FlounderStyle.Type.Arguments =>
            ({
                type,
                layoutAngle: randomSelect([ "regular", "alternative", ]),
                foregroundColor,
                intervalSize,
                depth: 0.0,
                maxPatternSize: Tools.Environment.isSafari() ?
                    undefined: // Disabled on Safari because pattern animations cause significant jitter
                    randomSelect([ undefined, intervalSize /4, ]),
                maximumFractionDigits: this.getEnoughPatternFractionDigits(),
            });
            const makeRandomTrispotArguments = (intervalSize: number) =>
                makeRandomSpotArguments("trispot", intervalSize);
            const makeRandomTetraspotArguments = (intervalSize: number) =>
                makeRandomSpotArguments("tetraspot", intervalSize);
            const makeRandomLineArguments = (type: FlounderStyle.Type.LineArguments["type"], intervalSize: number): FlounderStyle.Type.Arguments =>
            ({
                type,
                layoutAngle: Math.random(),
                foregroundColor,
                intervalSize,
                depth: 0.0,
                maxPatternSize: randomSelect([ undefined, intervalSize /(2 +Tools.Random.makeInteger(9)), ]),
                anglePerDepth: randomSelect([ undefined, "auto", "-auto", ]),
                maximumFractionDigits: this.getEnoughPatternFractionDigits(),
            });
            const makeRandomStripeArguments = (intervalSize: number) =>
                makeRandomLineArguments("stripe", intervalSize);
            const makeRandomDilineArguments = (intervalSize: number) =>
                makeRandomLineArguments("diline", intervalSize);
            const makeRandomTrilineArguments = (intervalSize: number) =>
                makeRandomLineArguments("triline", intervalSize);
            const diagonal = Math.hypot(window.innerWidth, window.innerHeight) /100;
            const makeRandomArguments = () => randomSelect
                ([
                    makeRandomTrispotArguments,
                    makeRandomTetraspotArguments,
                    makeRandomStripeArguments,
                    makeRandomDilineArguments,
                    makeRandomTrilineArguments,
                ])
                (diagonal *(3 +Tools.Random.makeInteger(30)));
            this.transtionPattern = makeRandomArguments();
            this.isReverseWipe = randomSelect([ true, false, ]);
        }
        return this.transtionPattern;
    }
    backgroundToMask(backgroundStyle: FlounderStyle.Style): FlounderStyle.Style
    {
        const maskStyle: FlounderStyle.Style =
        {
            //"mask-color": backgroundStyle["background-color"],
            "mask-image": backgroundStyle["background-image"],
            "mask-size": backgroundStyle["background-size"],
            "mask-position": backgroundStyle["background-position"],
        };
        return maskStyle;
    }
    setPattern(rate: number, opposite: Track | null): void
    {
        if (this.visualElement)
        {
            const isReverseWipe = new Boolean(this.isReverseWipe && opposite?.visualElement).valueOf();
            if (opposite?.visualElement)
            {
                opposite.visualElement.classList.toggle("reverse-wipe", isReverseWipe);
            }
            if (rate < 1)
            {
                const target = isReverseWipe ? opposite?.visualElement!: this.visualElement;
                const data = this.makeSureTranstionPattern();
                // In flounder.style.js, when depth is 0 or 1 only the background-color is produced and no pattern is generated, so avoid 0.
                data.depth = Math.max(config.rendering.minPatternDepth, this.patternEasing(isReverseWipe ? (1 - rate) : rate));
                FlounderStyle.setStyle(target!, this.backgroundToMask(FlounderStyle.makeStyle(data)));
                if (isReverseWipe)
                {
                    this.clearPattern();
                }
            }
            else
            {
                this.clearPattern();
            }
        }
    };
    clearPattern()
    {
        if (this.visualElement)
        {
            const maskStyle =
            {
                //"mask-color": undefined,
                "mask-image": undefined,
                "mask-size": undefined,
                "mask-position": undefined,
            };
            FlounderStyle.setStyle(this.visualElement, maskStyle);
        }
    }
    makeSureRandomTransition(): "alpha" | "blur" | "wipe"
    {
        if (null === this.randomTransition)
        {
            this.randomTransition = Tools.Random.select([ "alpha", "blur", "wipe", ]);
        }
        return this.randomTransition;
    };
    release(): void
    {
        ElementPool.release(this.playerElement);
        ElementPool.release(this.paddingElement);
    }
}
