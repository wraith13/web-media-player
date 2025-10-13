import { Library } from "@library";
//import { Tools } from "@tools";
import { Media } from "./media";
import { Analyser } from "./analyser";
import { UI } from "../ui";
import config from "@resource/config.json";
const circleRadians = 2 *Math.PI;
const arcConfig = config.visualizer.arc[config.visualizer.arcType as "arc" | "circle"];
export namespace Visualizer
{
    export interface Point
    {
        x: number;
        y: number;
    }
    export interface Size
    {
        width: number;
        height: number;
    }
    export interface Rect extends Point, Size
    {
    }
    export const makePoint = (x: number, y: number): Point =>
    ({
        x,
        y,
    });
    export const makeSize = (width: number, height: number): Size =>
    ({
        width,
        height,
    });
    export const makeRect = (point: Point, size: Size): Rect =>
    {
        const { x, y } = point;
        const { width, height } = size;
        return { x, y, width, height };
    };
    export const addPoints = (a: Point, b: Point): Point =>
        makePoint(a.x +b.x, a.y +b.y);
    export const offsetPointX = (a: Point, x: number): Point =>
        makePoint(a.x +x, a.y);
    export const offsetPointY = (a: Point, y: number): Point =>
        makePoint(a.x, a.y +y);
    export const scalePoint = (point: Point, scale: number): Point =>
        makePoint(point.x *scale, point.y *scale);
    export const scaleSize = (size: Size, scale: number): Size =>
        makeSize(size.width *scale, size.height *scale);
    export const sizeToPoint = (size: Size): Point =>
        makePoint(size.width, size.height);
    export const scaleRect = (rect: Rect, scale: number): Rect =>
        makeRect
        (
            addPoints(rect, sizeToPoint(scaleSize(rect, (1 -scale) /2))),
            scaleSize(rect, scale)
        );
    export const getElementSize = (element: HTMLElement): Size =>
        makeSize(element.clientWidth, element.clientHeight);
    export const getElementRect = (element: HTMLElement): Rect =>
        makeRect(makePoint(0, 0), getElementSize(element));
    export const getCenterPoint = (rect: Rect): Point => addPoints
    (
        rect,
        sizeToPoint(scaleSize(rect, 0.5)),
    );
    export const angleToPoint = (angle: number): Point => makePoint(Math.cos(angle), Math.sin(angle));
    export const getPointAtAngle = (center: Point, angle: number, radius: number): Point => addPoints
    (
        center,
        scalePoint(angleToPoint(angle), radius)
    );
    export class CanvasContext2D
    {
        context: CanvasRenderingContext2D;
        rect: Rect;
        constructor(public canvas: HTMLCanvasElement)
        {
            const context = canvas.getContext("2d");
            if ( ! context)
            {
                throw new Error("Failed to get 2D context");
            }
            this.context = context;
            this.rect = getElementRect(canvas);
        }
        clear(rect: Rect = getElementRect(this.canvas)): void
        {
            this.context.clearRect(rect.x, rect.y, rect.width, rect.height);
        }
        fill(fillStyle: string | CanvasGradient | CanvasPattern, rect: Rect = this.rect): void
        {
            this.context.fillStyle = fillStyle;
            this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
        moveTo(point: Point): void
        {
            this.context.moveTo(point.x, point.y);
        }
        lineTo(point: Point): void
        {
            this.context.lineTo(point.x, point.y);
        }
        beginPath(data?: { lineWidth?: number, strokeStyle?: string | CanvasGradient | CanvasPattern, }): void
        {
            if (undefined !== data)
            {
                if (undefined !== data.lineWidth)
                {
                    this.context.lineWidth = data.lineWidth;
                }
                if (undefined !== data.strokeStyle)
                {
                    this.context.strokeStyle = data.strokeStyle;
                }
            }
            this.context.beginPath();
        }
        stroke(): void
        {
            this.context.stroke();
        }
    }
    export type VisualizerDom = HTMLDivElement;
    export const VisualizerDom = HTMLDivElement;
    export const isSimpleMode = (): boolean =>
        UI.mediaScreen.classList.contains("simple");
    export const isPlaneFrequencyMode = (): boolean =>
        UI.mediaScreen.classList.contains("plane-frequency");
    export const isPlaneWaveformMode = (): boolean =>
        UI.mediaScreen.classList.contains("plane-waveform");
    export const isArcFrequencyMode = (): boolean =>
        UI.mediaScreen.classList.contains("arc-frequency");
    export const isArcWaveformMode = (): boolean =>
        UI.mediaScreen.classList.contains("arc-waveform");
    export const isDoubleArcMode = (): boolean =>
        UI.mediaScreen.classList.contains("double-arc");
    export const isStereoArcFrequencyMode = (): boolean =>
        UI.mediaScreen.classList.contains("stereo-arc-frequency");
    export const isStereoArcWaveformMode = (): boolean =>
        UI.mediaScreen.classList.contains("stereo-arc-waveform");
    export const isStereoDoubleArcMode = (): boolean =>
        UI.mediaScreen.classList.contains("stereo-double-arc");
    export const make = (media: Media.Entry, index: number): VisualizerDom =>
    {
        const visualDom = Library.UI.createElement({ tag: "div", className: "visualizer" });
        switch(media.type)
        {
        case "audio":
            //visualDom.classList.add("audio");
            break;
        }
        visualDom.classList.toggle("odd", 0 !== (index %2));
        return visualDom;
    };
    export const makeSureIcon = (cssClass: string, icon: Library.Svg.KeyType) => async (visualDom: VisualizerDom): Promise<SVGElement> =>
    {
        const baseCssClass = "visual-icon";
        let result = visualDom.querySelector(`.${baseCssClass}.${cssClass}`) as SVGElement;
        if ( ! result)
        {
            result = await Library.Svg.loadSvg(icon);
            result.classList.add(baseCssClass);
            result.classList.add(cssClass);
            visualDom.appendChild(result);
        }
        return result;
    };
    export const makeSureAudioIcon = makeSureIcon("audio-icon", "audio-icon");
    export const makeSureMuteIcon = makeSureIcon("mute-icon", "error-icon");
    export const makeSureProgressCircle = (visualDom: VisualizerDom): HTMLDivElement =>
    {
        let result = visualDom.querySelector(".visual-progress-circle") as HTMLDivElement;
        if ( ! result)
        {
            result = Library.UI.createElement({ tag: "div", className: "visual-progress-circle" });
            visualDom.appendChild(result);
        }
        return result;
    };
    export const makeSureTextSpan = (visualDom: VisualizerDom): HTMLSpanElement =>
    {
        let result = visualDom.querySelector(".visual-text") as HTMLSpanElement;
        if ( ! result)
        {
            result = Library.UI.createElement({ tag: "span", className: "visual-text" });
            visualDom.appendChild(result);
        }
        return result;
    };
    export const getCanvasOrNull = (visualDom: VisualizerDom): HTMLCanvasElement =>
        visualDom.querySelector(".visual-canvas") as HTMLCanvasElement || null;
    export const makeCanvas = (visualDom: VisualizerDom): HTMLCanvasElement =>
    {
        const result = Library.UI.createElement({ tag: "canvas", className: "visual-canvas" });
        visualDom.appendChild(result);
        fitCanvas(visualDom, result);
        return result;
    };
    export const makeSureCanvas = (visualDom: VisualizerDom): HTMLCanvasElement =>
        getCanvasOrNull(visualDom) ?? makeCanvas(visualDom);
    export const fitCanvas = (visualDom: VisualizerDom, canvas: HTMLCanvasElement): void =>
    {
        const { width, height } = getElementSize(visualDom);
        if (canvas.width !== width || canvas.height !== height)
        {
            canvas.width = width;
            canvas.height = height;
        }
    };
    export const updateStretch = (visualDom: VisualizerDom): void =>
    {
        const canvas = getCanvasOrNull(visualDom);
        if (canvas)
        {
            fitCanvas(visualDom, canvas);
        }
    };
    export const drawPlaneFrequency = (context: CanvasContext2D, rect: Rect, scale: number, analyser: Analyser.Entry): void =>
    {
        const frequencyDataArray = analyser.getByteFrequencyData("mono") ?? null;
        if (context && frequencyDataArray)
        {
            const maxIndex = frequencyDataArray.length *config.visualizer.frequencyDataLengthRate;
            const zeroLevel = 1;
            if (rect.height <= rect.width)
            {
                const barWidth = rect.width /maxIndex;
                for (let i = 0; i < maxIndex; ++i)
                {
                    const value = frequencyDataArray[i] /255.0;
                    const hue = (i /maxIndex) *config.visualizer.maxHue;
                    const barHeight = zeroLevel +(scale *value *(rect.height -zeroLevel));
                    const point = makePoint(i *barWidth, (rect.height -barHeight) /2);
                    context.fill
                    (
                        `hsl(${hue}, 100%, 50%)`,
                        makeRect
                        (
                            addPoints(rect, point),
                            makeSize(barWidth, barHeight)
                        )
                    );
                }
            }
            else
            {
                const barHeight = rect.height /maxIndex;
                for (let i = 0; i < maxIndex; ++i)
                {
                    const value = frequencyDataArray[i] /255.0;
                    const hue = (i /maxIndex) *config.visualizer.maxHue;
                    const barWidth = zeroLevel +(scale *value *(rect.width -zeroLevel));
                    const point = makePoint((rect.width -barWidth) /2, rect.height -((i +1) *barHeight));
                    context.fill
                    (
                        `hsl(${hue}, 100%, 50%)`,
                        makeRect
                        (
                            addPoints(rect, point),
                            makeSize(barWidth, barHeight)
                        )
                    );
                }
            }
        }
    };
    export const drawPlaneWaveform = (context: CanvasContext2D, rect: Rect, scale: number, analyser: Analyser.Entry): void =>
    {
        const timeDomainDataArray = analyser.getByteTimeDomainData("mono") ?? null;
        if (context && timeDomainDataArray)
        {
            const maxIndex = timeDomainDataArray.length;
            context.beginPath(config.visualizer.waveform);
            if (rect.height <= rect.width)
            {
                const sliceWidth = rect.width /maxIndex;
                context.moveTo(offsetPointY(rect, rect.height /2));
                for (let i = 0; i < maxIndex; ++i)
                {
                    const value = timeDomainDataArray[i] /255.0;
                    const x = rect.width -i *sliceWidth;
                    const y = scale *value *rect.height;
                    context.lineTo(addPoints(rect, { x, y }));
                }
                context.lineTo(addPoints(rect, makePoint(0, rect.height /2)));
            }
            else
            {
                const sliceHeight = rect.height /maxIndex;
                context.moveTo(offsetPointX(rect, rect.width /2));
                for (let i = 0; i < maxIndex; ++i)
                {
                    const value = timeDomainDataArray[i] /255.0;
                    const x = scale *value *rect.width;
                    const y = rect.height -i *sliceHeight;
                    context.lineTo(addPoints(rect, { x, y }));
                }
                context.lineTo(addPoints(rect, makePoint(rect.width /2, 0)));
            }
            context.stroke();
        }
    };
    export const getStartAngle = (channel: Analyser.ChannelType): number =>
    {
        switch(channel)
        {
        case "left":
            return circleRadians *(arcConfig.startAngleRate +((1 -arcConfig.angleRate)/4));
        case "right":
            return circleRadians *(arcConfig.startAngleRate -((1 -arcConfig.angleRate)/4));
        case "mono":
        default:
            return circleRadians *(arcConfig.startAngleRate +((1 -arcConfig.angleRate)/2));
        }
    };
    export const getAngle = (channel: Analyser.ChannelType, rate: number): number =>
    {
        const base = circleRadians *arcConfig.angleRate *rate;
        switch(channel)
        {
        case "left":
            return base *0.5;
        case "right":
            return base *-0.5;
        case "mono":
        default:
            return base;
        }
    };
    export const drawArcFrequency = (context: CanvasContext2D, channel: Analyser.ChannelType, rect: Rect, scale: number, analyser: Analyser.Entry): void =>
    {
        const frequencyDataArray = analyser.getByteFrequencyData(channel) ?? null;
        if (context && frequencyDataArray)
        {
            const startAngle = getStartAngle(channel);
            const radius = (rect.width +rect.height) *arcConfig.radiusRate;
            const center = getCenterPoint(rect);
            const maxIndex = frequencyDataArray.length *config.visualizer.frequencyDataLengthRate;
            const lineWidth = (circleRadians *radius) /maxIndex *0.8;
            const zeroLevel = 1;
            for (let i = 0; i < maxIndex; i++)
            {
                const hue = (i /maxIndex) *config.visualizer.maxHue;
                const angle = startAngle +getAngle(channel, i /maxIndex);
                const value = frequencyDataArray[i] /255.0;
                const barLength = scale *radius *value +zeroLevel;
                const strokeStyle = `hsl(${hue}, 100%, 50%)`;
                context.beginPath({ lineWidth, strokeStyle,});
                context.moveTo(getPointAtAngle(center, angle, radius -(barLength /2)));
                context.lineTo(getPointAtAngle(center, angle, radius +(barLength /2)));
                context.stroke();
            }
        }
    };
    export const drawArcWaveform = (context: CanvasContext2D, channel: Analyser.ChannelType, rect: Rect, scale: number, analyser: Analyser.Entry): void =>
    {
        const timeDomainDataArray = analyser.getByteTimeDomainData(channel) ?? null;
        if (context && timeDomainDataArray)
        {
            const startAngle = getStartAngle(channel);
            const radius = (rect.width +rect.height) *arcConfig.radiusRate;
            const center = getCenterPoint(rect);
            const maxIndex = timeDomainDataArray.length;
            context.beginPath(config.visualizer.waveform);
            context.moveTo(getPointAtAngle(center, startAngle +getAngle(channel, 1.0), radius));
            for (let i = 0; i < maxIndex; i++)
            {
                const value = timeDomainDataArray[i] /255.0;
                const barLength = scale *(radius *(value -0.5)) *2.0;
                const angle = startAngle +getAngle(channel, 1.0 -(i /maxIndex));
                context.lineTo(getPointAtAngle(center, angle, radius +barLength));
            }
            context.lineTo(getPointAtAngle(center, startAngle, radius));
            context.stroke();
        }
    };
    export const step = (_media: Media.Entry, playerDom: HTMLMediaElement, visualDom: VisualizerDom, analyser: Analyser.Entry | null): void =>
    {
        if (playerDom instanceof HTMLAudioElement)
        {
            makeSureAudioIcon(visualDom).catch(console.error);
            if (playerDom.muted)
            {
                makeSureMuteIcon(visualDom).catch(console.error);
            }
        }
        if (isSimpleMode())
        {
            const frequencyDataArray = analyser?.getByteFrequencyData("mono") ?? null;
            makeSureProgressCircle(visualDom).style.setProperty("--progress", `${(playerDom.currentTime /playerDom.duration) *360}deg`);
            makeSureProgressCircle(visualDom).style.setProperty("--volume", `${getVolume(frequencyDataArray)}`);
        }
        else
        {
            const canvas = makeSureCanvas(visualDom);
            const context = new CanvasContext2D(canvas);
            if (context && analyser)
            {
                context.clear();
                const rect = getElementRect(visualDom);
                if (isPlaneFrequencyMode())
                {
                    drawPlaneFrequency(context, rect, 1.0, analyser);
                }
                if (isPlaneWaveformMode())
                {
                    drawPlaneWaveform(context, rect, 1.0, analyser);
                }
                if (isArcFrequencyMode())
                {
                    drawArcFrequency(context, "mono", rect, 1.0, analyser);
                }
                if (isArcWaveformMode())
                {
                    drawArcWaveform(context, "mono", rect, 1.0, analyser);
                }
                if (isDoubleArcMode())
                {
                    drawArcFrequency(context, "mono", scaleRect(rect, 1.2), 0.6, analyser);
                    drawArcWaveform(context, "mono", scaleRect(rect, 0.8), 0.7, analyser);
                }
                if (isStereoArcFrequencyMode())
                {
                    drawArcFrequency(context, "left", rect, 1.0, analyser);
                    drawArcFrequency(context, "right", rect, 1.0, analyser);
                }
                if (isStereoArcWaveformMode())
                {
                    drawArcWaveform(context, "left", rect, 1.0, analyser);
                    drawArcWaveform(context, "right", rect, 1.0, analyser);
                }
                if (isStereoDoubleArcMode())
                {
                    drawArcFrequency(context, "left", scaleRect(rect, 1.2), 0.6, analyser);
                    drawArcWaveform(context, "left", scaleRect(rect, 0.8), 0.7, analyser);
                    drawArcFrequency(context, "right", scaleRect(rect, 1.2), 0.6, analyser);
                    drawArcWaveform(context, "right", scaleRect(rect, 0.8), 0.7, analyser);
                }
            }
        }
    };
    export const isValidFrequencyDataArray = (frequencyDataArray: Uint8Array<ArrayBuffer> | null): frequencyDataArray is Uint8Array<ArrayBuffer> =>
        0 < (frequencyDataArray?.length ?? 0);
    export const getVolume = (frequencyDataArray: Uint8Array<ArrayBuffer> | null): number =>
        isValidFrequencyDataArray(frequencyDataArray) ?
            Math.sqrt(getRawVolume(frequencyDataArray)):
            0.5;
    export const getRawVolume = (frequencyDataArray: Uint8Array<ArrayBuffer>): number =>
        (Math.hypot(...Array.from(frequencyDataArray)) / Math.sqrt(frequencyDataArray.length)) /255.0;
}
