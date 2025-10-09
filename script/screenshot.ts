import { Library } from "@library";
import { UI } from "./ui";
export namespace Screenshot
{
    export const initialize = (params: Record<string, string>): void =>
    {
        const screenshot = params["screenshot"];
        switch (screenshot)
        {
        case "favicon":
            fixCanvasSize("1024px", "1024px");
            toCenterControlPanel(10);
            Library.UI.getElementById("div", "control-panel").style.setProperty("padding", "0px");
            setDisplayNone([ "#media-screen", "#background-screen", ".item.add", "#shuffle-button", "#repeat-button", "#volume-button", "#settings-button", ]);
            break;
        case "twitter-card":
            fixCanvasSize("1200px", "630px");
            toCenterControlPanel(3.5);
            setDisplayNone([ "#media-screen", "#background-screen", ".item.add", ]);
            break;
        }
    };
    export const setDisplayNone = (querySelectors: string[]): void => querySelectors.forEach
    (
        selector =>
        {
            const element = document.querySelector(selector) as HTMLElement | null;
            if (element)
            {
                element.style.setProperty("display", "none");
            }
        }
    );
    export const fixCanvasSize = (width: string, height: string): void =>
    {
        UI.screenBody.style.setProperty("background-color", "white");
        UI.screenBody.style.setProperty("display", "flex");
        UI.screenBody.style.setProperty("flex-direction", "column");
        UI.screenBody.style.setProperty("align-items", "center");
        UI.screenBody.style.setProperty("justify-content", "center");
        UI.mediaList.style.setProperty("position", "relative");
        UI.mediaList.style.setProperty("background-color", "black");
        [ "min-width", "max-width", ].forEach
        (
            i => UI.mediaList.style.setProperty(i, width)
        );
        [ "min-height", "max-height", ].forEach
        (
            i => UI.mediaList.style.setProperty(i, height)
        );
    }
    export const toCenterControlPanel = (rate: number): void =>
    {
        const controlPanel = Library.UI.getElementById("div", "control-panel");
        controlPanel.style.setProperty("inset-block-end", "50%");
        controlPanel.style.setProperty("transform", `translate(-50%, 50%) scale(${rate})`);
    }
}
