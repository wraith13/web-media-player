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
    export const clearRect = (context: CanvasRenderingContext2D, rect: Rect = getElementRect(context.canvas)): void =>
        context.clearRect(rect.x, rect.y, rect.width, rect.height);
    export const fillRect = (context: CanvasRenderingContext2D, fillStyle: string | CanvasGradient | CanvasPattern, rect: Rect): void =>
    {
        context.fillStyle = fillStyle;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
    };
    export const moveTo = (context: CanvasRenderingContext2D, point: Point): void =>
        context.moveTo(point.x, point.y);
    export const lineTo = (context: CanvasRenderingContext2D, point: Point): void =>
        context.lineTo(point.x, point.y);
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
    export const makeSureCanvas = (visualDom: VisualizerDom): HTMLCanvasElement =>
    {
        let result = visualDom.querySelector(".visual-canvas") as HTMLCanvasElement;
        if ( ! result)
        {
            result = Library.UI.createElement({ tag: "canvas", className: "visual-canvas" });
            visualDom.appendChild(result);
        }
        return result;
    };
    export const fitCanvas = (visualDom: VisualizerDom, canvas: HTMLCanvasElement): void =>
    {
        const { width, height } = getElementSize(visualDom);
        if (canvas.width !== width || canvas.height !== height)
        {
            canvas.width = width;
            canvas.height = height;
        }
    };
    export const drawPlaneFrequency = (context: CanvasRenderingContext2D, rect: Rect, analyser: Analyser.Entry): void =>
    {
        const frequencyDataArray = analyser.getByteFrequencyData() ?? null;
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
                    const barHeight = zeroLevel +(value *(rect.height -zeroLevel));
                    const point = makePoint(i *barWidth, (rect.height -barHeight) /2);
                    fillRect
                    (
                        context,
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
                    const barWidth = zeroLevel +(value *(rect.width -zeroLevel));
                    const point = makePoint((rect.width -barWidth) /2, rect.height -((i +1) *barHeight));
                    fillRect
                    (
                        context,
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
    export const drawPlaneWaveform = (context: CanvasRenderingContext2D, rect: Rect, analyser: Analyser.Entry): void =>
    {
        const timeDomainDataArray = analyser.getByteTimeDomainData() ?? null;
        if (context && timeDomainDataArray)
        {
            const maxIndex = timeDomainDataArray.length;
            context.lineWidth = config.visualizer.waveform.lineWidth;
            context.strokeStyle = config.visualizer.waveform.strokeStyle;
            context.beginPath();
            if (rect.height <= rect.width)
            {
                const sliceWidth = rect.width /maxIndex;
                moveTo(context, offsetPointY(rect, rect.height /2));
                for (let i = 0; i < maxIndex; ++i)
                {
                    const value = timeDomainDataArray[i] /255.0;
                    const x = i *sliceWidth;
                    const y = value *rect.height;
                    lineTo(context, addPoints(rect, { x, y }));
                }
                lineTo(context, addPoints(rect, makePoint(rect.width, rect.height /2)));
            }
            else
            {
                const sliceHeight = rect.height /maxIndex;
                moveTo(context, offsetPointX(rect, rect.width /2));
                for (let i = 0; i < maxIndex; ++i)
                {
                    const value = timeDomainDataArray[i] /255.0;
                    const x = value *rect.width;
                    const y = i *sliceHeight;
                    lineTo(context, addPoints(rect, { x, y }));
                }
                lineTo(context, addPoints(rect, makePoint(rect.width /2, rect.height)));
            }
            context.stroke();
        }
    };
    export const drawArcFrequency = (context: CanvasRenderingContext2D, rect: Rect, analyser: Analyser.Entry): void =>
    {
        const frequencyDataArray = analyser.getByteFrequencyData() ?? null;
        if (context && frequencyDataArray)
        {
            const startAngle = circleRadians *(arcConfig.startAngleRate +((1 -arcConfig.angleRate)/2));
            const radius = (rect.width +rect.height) *arcConfig.radiusRate;
            const center = getCenterPoint(rect);
            const maxIndex = frequencyDataArray.length *config.visualizer.frequencyDataLengthRate;
            const lineWidth = (circleRadians *radius) /maxIndex *0.8;
            const zeroLevel = 1;
            context.lineWidth = lineWidth;
            for (let i = 0; i < maxIndex; i++)
            {
                const hue = (i /maxIndex) *config.visualizer.maxHue;
                const angle = ((circleRadians *arcConfig.angleRate *i) /maxIndex) +startAngle;
                const value = frequencyDataArray[i] /255.0;
                const barLength = radius *value +zeroLevel;
                context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
                context.beginPath();
                moveTo(context, getPointAtAngle(center, angle, radius -(barLength /2)));
                lineTo(context, getPointAtAngle(center, angle, radius +(barLength /2)));
                context.stroke();
            }
        }
    };
    export const step = (_media: Media.Entry, playerDom: HTMLMediaElement, visualDom: VisualizerDom, analyser: Analyser.Entry | null): void =>
    {
        makeSureAudioIcon(visualDom).catch(console.error);
        if (playerDom.muted)
        {
            makeSureMuteIcon(visualDom).catch(console.error);
        }
        if (isSimpleMode())
        {
            const frequencyDataArray = analyser?.getByteFrequencyData() ?? null;
            makeSureProgressCircle(visualDom).style.setProperty("--progress", `${(playerDom.currentTime /playerDom.duration) *360}deg`);
            makeSureProgressCircle(visualDom).style.setProperty("--volume", `${getVolume(frequencyDataArray)}`);
        }
        if (isPlaneFrequencyMode())
        {
            const canvas = makeSureCanvas(visualDom);
            const context = canvas.getContext("2d");
            if (context && analyser)
            {
                fitCanvas(visualDom, canvas);
                clearRect(context);
                drawPlaneFrequency(context, getElementRect(visualDom), analyser);
            }
        }
        if (isPlaneWaveformMode())
        {
            const canvas = makeSureCanvas(visualDom);
            const context = canvas.getContext("2d");
            if (context && analyser)
            {
                fitCanvas(visualDom, canvas);
                clearRect(context);
                drawPlaneWaveform(context, getElementRect(visualDom), analyser);
            }
        }
        if (isArcFrequencyMode())
        {
            const canvas = makeSureCanvas(visualDom);
            const context = canvas.getContext("2d");
            if (context && analyser)
            {
                fitCanvas(visualDom, canvas);
                clearRect(context);
                drawArcFrequency(context, getElementRect(visualDom), analyser);
            }
        }
        if (isArcWaveformMode())
        {
            const timeDomainDataArray = analyser?.getByteTimeDomainData() ?? null;
            const canvas = makeSureCanvas(visualDom);
            const context = canvas.getContext("2d");
            if (context && timeDomainDataArray)
            {
                fitCanvas(visualDom, canvas);
                clearRect(context);
                const rect = getElementRect(visualDom);
                const startAngle = circleRadians *(arcConfig.startAngleRate +((1 -arcConfig.angleRate)/2));
                const radius = (rect.width +rect.height) *arcConfig.radiusRate;
                const center = getCenterPoint(rect);
                const maxIndex = timeDomainDataArray.length;
                context.lineWidth = config.visualizer.waveform.lineWidth;
                context.strokeStyle = config.visualizer.waveform.strokeStyle;
                context.beginPath();
                moveTo(context, getPointAtAngle(center, startAngle, radius));
                for (let i = 0; i < maxIndex; i++)
                {
                    const value = timeDomainDataArray[i] /255.0;
                    const barLength = (radius *(value -0.5)) *2.0;
                    const angle = ((circleRadians *arcConfig.angleRate *i) /maxIndex) +startAngle;
                    lineTo(context, getPointAtAngle(center, angle, radius +barLength));
                }
                lineTo(context, getPointAtAngle(center, startAngle +circleRadians *arcConfig.angleRate, radius));
                context.stroke();
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
