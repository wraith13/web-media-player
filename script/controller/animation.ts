import { phiColors } from "phi-colors"
import { Features } from "@features";
import { Library } from "@library";
import { Base } from "./base";
import { UI } from "../ui";
import config from "@resource/config.json";
export namespace Animation
{
    export const animator = new Features.Animation.Animator(UI.canvas, Math.random);
    export let cloclLocale: string | undefined = undefined;
    export const getOpacity = () =>
        `${parseFloat(UI.brightnessSelect.get())}%`;
    export const updateOpacity = () =>
    {
        if (isInAnimation())
        {
            document.body.style.setProperty("opacity", getOpacity());
            UI.canvas.style.removeProperty("opacity");
        }
        else
        {
            document.body.style.removeProperty("opacity");
            UI.canvas.style.setProperty("opacity", getOpacity());
        }
    }
    export const isInAnimation = () =>
        Base.isInMode("animation");
    export const isFullscreenEnabled = () =>
        Library.UI.fullscreenEnabled && UI.withFullscreen.get();
    export const playAnimation = () =>
    {
        Base.intoMode("animation");
        updateFps();
        updateOpacity();
        setTimeout
        (
            () => start(),
            isFullscreenEnabled() ? config.fullscreenAdditionalWait: 0
        );
    };
    export const pauseAnimation = () =>
    {
        if (isInAnimation())
        {
            console.log
            (
                "📈 fps",
                {
                    count: Features.Fps.standardDeviation.count,
                    mean: Features.Fps.standardDeviation.mean,
                    standardDeviation: Features.Fps.standardDeviation.getStandardDeviation(),
                }
            );
        }
        Base.exitMode("animation");
        updateOpacity();
    };
    export const isAnimationStepTiming = (now: number) =>
        parseInt(UI.frameDelaySelect.get()) <= animator.getNowDifference(now);
    export const updateClock = () =>
    {
        const clockOption = UI.clockSelect.get();
        if ("hide" !== clockOption)
        {
            Features.Clock.update(cloclLocale);
            switch(clockOption)
            {
            case "alternate":
                const isWhite = (new Date().getTime() /config.clock.alternate.span) %2 < 1.0;
                UI.clockDisplay.classList.toggle("white", isWhite);
                UI.clockDisplay.classList.toggle("black", ! isWhite);
                Features.Clock.setColor(undefined);
                break;
            case "rainbow":
                Features.Clock.setColor
                (
                    animator.phiColoring.makeSrgbColor
                    (
                        animator.phiColoring.makeRgb(animator.universalStep /phiColors.phi)
                    )
                );
                break;
            default:
                Features.Clock.setColor(undefined);
                break;
            }
        }
    };
    export const loopAnimation = (now: number) =>
    {
        if (isInAnimation())
        {
            updateClock();
            Features.Fps.step(now);
            updateFps();
            if (Features.Fps.isUnderFuseFps())
            {
                pauseAnimation();
            }
            else
            {
                if (isAnimationStepTiming(now))
                {
                    animator.step(now);
                }
                window.requestAnimationFrame(loopAnimation);
            }
        }
    };
    export const start = () => setTimeout
    (
        () => window.requestAnimationFrame
        (
            now =>
            {
                animator.startStep(now);
                loopAnimation(now);
            }
        ),
        config.startWait
    );
    export const updateFps = () =>
    {
        if (UI.showFps.get())
        {
            Library.UI.setTextContent(UI.fpsDisplay, Features.Fps.getText());
        }
    }
    export const shuffleAnimation = () =>
        animator.shuffleStep();
    export const initialize = (params: Record<string, string>) =>
    {
        cloclLocale = params["clock-locale"];
    }
}
