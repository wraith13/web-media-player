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
        const width = visualDom.clientWidth;
        const height = visualDom.clientHeight;
        if (canvas.width !== width || canvas.height !== height)
        {
            canvas.width = width;
            canvas.height = height;
        }
    }
    export const step = (_media: Media.Entry, playerDom: HTMLMediaElement, visualDom: VisualizerDom, analyser: Analyser.Entry | null): void =>
    {
        makeSureAudioIcon(visualDom).catch(console.error);
        if (playerDom.muted)
        {
            makeSureMuteIcon(visualDom).catch(console.error);
        }
        visualDom.classList.toggle("muted", playerDom.muted);
        if (isSimpleMode())
        {
            const frequencyDataArray = analyser?.getByteFrequencyData() ?? null;
            makeSureProgressCircle(visualDom).style.setProperty("--progress", `${(playerDom.currentTime /playerDom.duration) *360}deg`);
            makeSureProgressCircle(visualDom).style.setProperty("--volume", `${getVolume(frequencyDataArray)}`);
        }
        if (isPlaneFrequencyMode())
        {
            const frequencyDataArray = analyser?.getByteFrequencyData() ?? null;
            const canvas = makeSureCanvas(visualDom);
            const context = canvas.getContext("2d");
            if (context && frequencyDataArray)
            {
                fitCanvas(visualDom, canvas);
                const width = visualDom.clientWidth;
                const height = visualDom.clientHeight;
                const maxIndex = frequencyDataArray.length *config.visualizer.frequencyDataLengthRate;
                const zeroLevel = 1;
                context.clearRect(0, 0, width, height);
                if (height <= width)
                {
                    const barWidth = width /maxIndex;
                    for (let i = 0; i < maxIndex; i++)
                    {
                        const value = frequencyDataArray[i] /255.0;
                        const barHeight = zeroLevel +(value *(height -zeroLevel));
                        const x = i *barWidth;
                        const y = (height -barHeight) /2;
                        const hue = (i /maxIndex) *config.visualizer.maxHue;
                        context.fillStyle = `hsl(${hue}, 100%, 50%)`;
                        context.fillRect(x, y, barWidth, barHeight);
                    }
                }
                else
                {
                    const barHeight = height /maxIndex;
                    for (let i = 0; i < maxIndex; i++)
                    {
                        const value = frequencyDataArray[i] /255.0;
                        const barWidth = zeroLevel +(value *(width -zeroLevel));
                        const x = (width -barWidth) /2;
                        const y = height -((i +1) *barHeight);
                        const hue = (i /maxIndex) *config.visualizer.maxHue;
                        context.fillStyle = `hsl(${hue}, 100%, 50%)`;
                        context.fillRect(x, y, barWidth, barHeight);
                    }
                }
            }
        }
        if (isPlaneWaveformMode())
        {
            const timeDomainDataArray = analyser?.getByteTimeDomainData() ?? null;
            const canvas = makeSureCanvas(visualDom);
            const context = canvas.getContext("2d");
            if (context && timeDomainDataArray)
            {
                fitCanvas(visualDom, canvas);
                const width = visualDom.clientWidth;
                const height = visualDom.clientHeight;
                const maxIndex = timeDomainDataArray.length;
                context.clearRect(0, 0, width, height);
                context.lineWidth = 2;
                context.strokeStyle = "hsl(200, 100%, 50%)";
                context.beginPath();
                if (height <= width)
                {
                    const sliceWidth = width /maxIndex;
                    context.moveTo(0, height /2);
                    for (let i = 0; i < maxIndex; i++)
                    {
                        const value = timeDomainDataArray[i] /255.0;
                        const x = i *sliceWidth;
                        const y = value *height;
                        context.lineTo(x, y);
                    }
                    context.lineTo(width, height /2);
                }
                else
                {
                    const sliceHeight = height /maxIndex;
                    context.moveTo(width /2, 0);
                    for (let i = 0; i < maxIndex; i++)
                    {
                        const value = timeDomainDataArray[i] /255.0;
                        const x = value *width;
                        const y = i *sliceHeight;
                        context.lineTo(x, y);
                    }
                    context.lineTo(width /2, height);
                }
                context.stroke();
            }
        }
        if (isArcFrequencyMode())
        {
            const frequencyDataArray = analyser?.getByteFrequencyData() ?? null;
            const canvas = makeSureCanvas(visualDom);
            const context = canvas.getContext("2d");
            if (context && frequencyDataArray)
            {
                fitCanvas(visualDom, canvas);
                const startAngle = circleRadians *(arcConfig.startAngleRate +((1 -arcConfig.angleRate)/2));
                const width = visualDom.clientWidth;
                const height = visualDom.clientHeight;
                const radius = (width +height) *arcConfig.radiusRate;
                const centerX = width /2;
                const centerY = height /2;
                const maxIndex = frequencyDataArray.length *config.visualizer.frequencyDataLengthRate;
                const lineWidth = (circleRadians *radius) /maxIndex *0.8;
                const zeroLevel = 1;
                context.clearRect(0, 0, width, height);
                context.lineWidth = lineWidth;
                for (let i = 0; i < maxIndex; i++)
                {
                    const value = frequencyDataArray[i] /255.0;
                    const barLength = radius *value +zeroLevel;
                    const angle = ((circleRadians *arcConfig.angleRate *i) /maxIndex) +startAngle;
                    const hue = (i /maxIndex) *config.visualizer.maxHue;
                    context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
                    context.beginPath();
                    context.moveTo
                    (
                        centerX +Math.cos(angle) *(radius -(barLength /2)),
                        centerY +Math.sin(angle) *(radius -(barLength /2))
                    );
                    context.lineTo
                    (
                        centerX +Math.cos(angle) *(radius +(barLength /2)),
                        centerY +Math.sin(angle) *(radius +(barLength /2))
                    );
                    context.stroke();
                }
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
                const startAngle = circleRadians *(arcConfig.startAngleRate +((1 -arcConfig.angleRate)/2));
                const width = visualDom.clientWidth;
                const height = visualDom.clientHeight;
                const radius = (width +height) *arcConfig.radiusRate;
                const centerX = width /2;
                const centerY = height /2;
                const maxIndex = timeDomainDataArray.length;
                context.clearRect(0, 0, width, height);
                context.lineWidth = 2;
                context.strokeStyle = "hsl(200, 100%, 50%)";
                context.beginPath();
                context.moveTo
                (
                    centerX +Math.cos(startAngle) *radius,
                    centerY +Math.sin(startAngle) *radius,
                );
                for (let i = 0; i < maxIndex; i++)
                {
                    const value = timeDomainDataArray[i] /255.0;
                    const barLength = (radius *(value -0.5)) *2.0;
                    const angle = ((circleRadians *arcConfig.angleRate *i) /maxIndex) +startAngle;
                    const x = centerX +Math.cos(angle) *(radius +barLength);
                    const y = centerY +Math.sin(angle) *(radius +barLength);
                    context.lineTo(x, y);
                }
                context.lineTo
                (
                    centerX +Math.cos(startAngle +circleRadians *arcConfig.angleRate) *radius,
                    centerY +Math.sin(startAngle +circleRadians *arcConfig.angleRate) *radius,
                );
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
