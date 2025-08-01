import { Controller } from "@controller";
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
            adjustPlayButtonSize(3);
            shuffleAnimation();
            break;
        case "twitter-card":
            fixCanvasSize("1200px", "630px");
            adjustPlayButtonSize(2);
            shuffleAnimation();
            break;
        case "black":
            UI.screenBody.classList.add("black");
            break;
        case "sample":
            shuffleAnimation();
            break;
        }
    };
    export const shuffleAnimation = (): void =>
    {
        Controller.Animation.shuffleAnimation();
    }
    export const fixCanvasSize = (width: string, height: string): void =>
    {
        [ "min-width", "max-width", ].forEach
        (
            i => UI.canvas.style.setProperty(i, width)
        );
        [ "min-height", "max-height", ].forEach
        (
            i => UI.canvas.style.setProperty(i, height)
        );
        Controller.Animation.animator.updateDiagonalSize();
    }
    export const adjustPlayButtonSize = (rate: number): void =>
    {
        UI.playButton.dom.style.setProperty("border-width", `${rate}px`);
        UI.playButton.dom.style.setProperty("width", `${11 * rate}rem`);
        UI.playButton.dom.style.setProperty("height", `${11 * rate}rem`);
        UI.playButton.dom.style.setProperty("border-radius", `${1.5 * rate}rem`);
        UI.playButton.dom.style.setProperty("padding", `${1.5 * rate}rem`);
    }
}
