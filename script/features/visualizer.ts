import { Library } from "@library";
//import { Tools } from "@tools";
import { Media } from "./media";
import { UI } from "../ui";
import config from "@resource/config.json";
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
        makeSureAudioIcon(visualDom).catch(console.error);
        if (playerDom.muted)
        {
            makeSureMuteIcon(visualDom).catch(console.error);
        }
        visualDom.classList.toggle("muted", playerDom.muted);
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
                const width = visualDom.clientWidth;
                const height = visualDom.clientHeight;
                if (canvas.width !== width || canvas.height !== height)
                {
                    canvas.width = width;
                    canvas.height = height;
                }
                context.clearRect(0, 0, width, height);
                const maxIndex = frequencyDataArray.length *config.visualizer.frequencyDataLengthRate;
                const zeroLevel = 1;
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
