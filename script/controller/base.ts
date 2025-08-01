import { Library } from "@library";
import { Features } from "@features";
import { UI } from "@script/ui";
export namespace Base
{
    export const isInMode = (mode: string) =>
        document.body.classList.contains("immersive") && document.body.classList.contains(mode);
    export const intoMode = (mode: string) =>
    {
        document.body.classList.toggle("immersive", true);
        document.body.classList.toggle(mode, true);
        document.body.classList.toggle("mousemove", false);
        UI.keyboardShortcut.classList.toggle("show", false);
        updateFullscreenState();
        Features.Fps.reset();
    }
    export const exitMode = (mode: string) =>
    {
        document.body.classList.toggle("immersive", false);
        document.body.classList.toggle(mode, false);
        updateFullscreenState(false);
    };
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
}
