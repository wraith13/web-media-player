import { Fps } from "./fps";
import { Clock } from "./clock";
import { Library } from "@library";
import { UI } from "../ui";
export namespace Player
{
    let loopHandle: number | null = null;
    export const updateFullscreenState = (fullscreen?: boolean) =>
    {
        if (Library.UI.fullscreenEnabled)
        {
            if (fullscreen ?? UI.withFullscreen.get())
            {
                Library.UI.requestFullscreen(document.body);
                setTimeout(() => document.body.focus(), 100);
            }
            else
            {
                Library.UI.exitFullscreen();
            }
        }
    };
    export const play = () =>
    {
        updateFullscreenState();
        if (null !== loopHandle)
        {
            window.cancelAnimationFrame(loopHandle);
        }
        loopHandle = window.requestAnimationFrame(loop);
    };
    export const pause = () =>
    {
        if (null !== loopHandle)
        {
            window.cancelAnimationFrame(loopHandle);
        }
        UI.clockDisplay.style.removeProperty("opacity");
        updateFullscreenState(false);
    };
    export const updateFps = () =>
    {
        if (UI.showFps.get())
        {
            Library.UI.setTextContent(UI.fpsDisplay, Fps.getText());
        }
    }
    export const loop = (now: number) =>
    {
        if (document.body.classList.contains("play"))
        {
            Clock.update(now);
            Fps.step(now);
            updateFps();
            loopHandle = window.requestAnimationFrame(loop);
        }
        else
        {
            loopHandle = null;
        }
    };
}