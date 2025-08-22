import { Library } from "@library";
import { Tools } from "@tools";
import { Media } from "./media";
export namespace Visualizer
{
    export type VisualizerDom = HTMLDivElement;
    export const VisualizerDom = HTMLDivElement;
    export const make = (media: Media.Entry): VisualizerDom =>
    {
        const visualDom = Library.UI.createElement({ tag: "div", className: "visualizer" });
        switch(media.type)
        {
        case "audio":
            //visualDom.classList.add("audio");
            break;
        }
        return visualDom;
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
    export const step = (_media: Media.Entry, playerDom: HTMLMediaElement, visualDom: VisualizerDom): void =>
    {

        Library.UI.setTextContent
        (
            makeSureTextSpan(visualDom),
            `${Tools.Timespan.toMediaTimeString(playerDom.currentTime *1000)} / ${Tools.Timespan.toMediaTimeString(playerDom.duration *1000)}`
        );
    };
}
