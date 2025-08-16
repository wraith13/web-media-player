import { Library } from "@library";
import { Tools } from "@tools";
import { Media } from "./media";
export namespace Visualizer
{
    export type VisualizerDom = HTMLDivElement;
    export const make = (media: Media.Entry): VisualizerDom =>
    {
        const visualDom = Library.UI.createElement({ tag: "div", className: "visual" });
        switch(media.type)
        {
        case "audio":
            //visualDom.classList.add("audio");
            break;
        }
        return visualDom;
    };
    export const step = (_media: Media.Entry, playerDom: HTMLMediaElement, visualDom: VisualizerDom): void =>
    {
        Library.UI.setTextContent
        (
            visualDom,
            `${Tools.Timespan.toMediaTimeString(playerDom.currentTime)} / ${Tools.Timespan.toMediaTimeString(playerDom.duration)}`
        );
    };
}
