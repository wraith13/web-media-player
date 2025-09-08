import { Library } from "@library";
//import { Tools } from "@tools";
import { Media } from "./media";
import { UI } from "../ui";
export namespace Visualizer
{
    export type VisualizerDom = HTMLDivElement;
    export const VisualizerDom = HTMLDivElement;
    export const isSimpleMode = (): boolean =>
        UI.mediaScreen.classList.contains("simple");
    export const isRawFrequencyData = (): boolean =>
        UI.mediaScreen.classList.contains("raw-frequency-data");
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
    export const makeSureIcon = async (visualDom: VisualizerDom): Promise<SVGElement> =>
    {
        let result = visualDom.querySelector(".visual-icon") as SVGElement;
        if ( ! result)
        {
            result = await Library.Svg.loadSvg("audio-icon");
            result.classList.add("visual-icon");
            visualDom.appendChild(result);
        }
        return result;
    };
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
    export const makeRawFrequencyDataCanvas = (visualDom: VisualizerDom): HTMLCanvasElement =>
    {
        let result = visualDom.querySelector(".visual-raw-frequency-data") as HTMLCanvasElement;
        if ( ! result)
        {
            result = Library.UI.createElement({ tag: "canvas", className: "visual-raw-frequency-data" });
            visualDom.appendChild(result);
        }
        return result;
    }
    export const step = (_media: Media.Entry, playerDom: HTMLMediaElement, visualDom: VisualizerDom, frequencyDataArray: Uint8Array<ArrayBuffer> | null): void =>
    {
        makeSureIcon(visualDom).catch(console.error);
        if (isSimpleMode())
        {
            makeSureProgressCircle(visualDom).style.setProperty("--progress", `${(playerDom.currentTime /playerDom.duration) *360}deg`);
            makeSureProgressCircle(visualDom).style.setProperty("--volume", `${getVolume(frequencyDataArray)}`);
        }
        if (isRawFrequencyData())
        {
            const canvas = makeRawFrequencyDataCanvas(visualDom);
            const context = canvas.getContext("2d");
            if (context && frequencyDataArray)
            {
                const devicePixelRatio = window.devicePixelRatio || 1;
                const width = visualDom.clientWidth /devicePixelRatio;
                const height = visualDom.clientHeight /devicePixelRatio;
                context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
                context.clearRect(0, 0, width, height);
                const barWidth = (width /frequencyDataArray.length) |0;
                for (let i = 0; i < frequencyDataArray.length; i++)
                {
                    const value = frequencyDataArray[i];
                    const barHeight = Math.sqrt(value /255.0) *height;
                    const x = i *barWidth;
                    const y = height -barHeight;
                    const hue = (i /frequencyDataArray.length) *360;
                    context.fillStyle = `hsl(${hue}, 100%, 50%)`;
                    context.fillRect(x, y, barWidth, barHeight);
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
