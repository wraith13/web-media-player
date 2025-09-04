import { Library } from "@library";
//import { Tools } from "@tools";
import { Media } from "./media";
export namespace Visualizer
{
    export type VisualizerDom = HTMLDivElement;
    export const VisualizerDom = HTMLDivElement;
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
    export const step = (_media: Media.Entry, playerDom: HTMLMediaElement, visualDom: VisualizerDom, frequencyDataArray: Uint8Array<ArrayBuffer> | null): void =>
    {
        makeSureIcon(visualDom).catch(console.error);
        makeSureProgressCircle(visualDom).style.setProperty("--progress", `${(playerDom.currentTime /playerDom.duration) *360}deg`);
        makeSureProgressCircle(visualDom).style.setProperty("--volume", `${getVolume(frequencyDataArray)}`);
    };
    export const getVolume = (frequencyDataArray: Uint8Array<ArrayBuffer> | null): number =>
        Math.sqrt(getRawVolume(frequencyDataArray));
    export const getRawVolume = (frequencyDataArray: Uint8Array<ArrayBuffer> | null): number =>
    {
        if (frequencyDataArray && 0 < frequencyDataArray.length)
        {
            return (Math.hypot(...Array.from(frequencyDataArray)) / Math.sqrt(frequencyDataArray.length)) /255.0;
        }
        return 0;
    };
}
