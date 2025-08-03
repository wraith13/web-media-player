import { Library } from "@library";
import { Features } from "@features";
import { UI } from "./ui";
import { Url } from "./url";
import config from "@resource/config.json";
import control from "@resource/control.json";
export namespace Events
{
    const updateFuseFps = (): number =>
        Features.Fps.fuseFps = parseFloat(UI.fuseFpsSelect.get());
    const updateShowFps = () =>
    {
        UI.fpsDisplay.classList.toggle("hide", ! UI.showFps.get());
    }
    const updateClock = () =>
    {
        control.clock.enum.forEach
        (
            i => UI.clockDisplay.classList.toggle(i, i === UI.clockSelect.get())
        );
    };
    const updateUrlAnchor = (params: Record<string, string>) =>
        UI.urlAnchor.href = Url.make(params);
    export const initialize = () =>
    {
        document.body.className = "list";
        const applyParam = (key: string, value: string) =>
        {
            Url.addParameter(Url.params, key, value);
            updateUrlAnchor(Url.params);
        };
        UI.playButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            //Controller.toggleAnimation();
        };
        UI.introductionPanel.addEventListener
        (
            "click",
            event =>
            {
                event.stopPropagation();
                UI.introductionPanel.classList.toggle("force-show", false);
            }
        );
        UI.introductionPanel.classList.toggle("force-show", true);
        setTimeout
        (
            () => UI.introductionPanel.classList.toggle("force-show", false),
            15000
        );
        UI.fuseFpsSelect.loadParameter(Url.params, applyParam).setChange(updateFuseFps);
        UI.showFps.loadParameter(Url.params, applyParam).setChange(updateShowFps);
        UI.clockSelect.loadParameter(Url.params, applyParam).setChange(updateClock);
        UI.languageSelect.loadParameter(Url.params, applyParam).setChange(UI.updateLanguage);
        const mouseMoveTimer = new Library.UI.ToggleClassForWhileTimer();
        UI.screenBody.addEventListener
        (
            "mousemove",
            _event =>
            {
                if (config.log.mousemove && ! mouseMoveTimer.isOn())
                {
                    console.log("🖱️ MouseMove:", event, UI.screenBody);
                }
                mouseMoveTimer.start(document.body, "mousemove", 1000)
            }
        );
        Library.UI.querySelectorAllWithFallback("label", [ "label[for]:has(select)", "label[for]" ])
            .forEach(label => Library.UI.showPickerOnLabel(label));
        [
            UI.colorspaceSelect,
            UI.coloringSelect,
            UI.patternSelect,
            UI.canvasSizeSelect,
            UI.layersSelect,
            UI.spotslayersSelect,
            UI.cycleSpanSelect,
            UI.fuseFpsSelect,
            UI.easingCheckbox,
            // UI.withFullscreen,
            UI.showFps,
        ].forEach(i => i.fire());
        document.addEventListener
        (
            "visibilitychange", () =>
            {
                console.log(`👀 visibilitychange: document.hidden: ${document.hidden}`);
                Features.Fps.reset();
            }
        );
        updateClock();
        UI.updateLanguage();
        updateUrlAnchor(Url.params);
        document.addEventListener
        (
            "DOMContentLoaded",
            () =>
            {
                // Catch up input values that the web browser quietly restores without firing events when a previously closed page is restored
                setTimeout
                (
                    () =>
                    [
                        UI.colorspaceSelect,
                        UI.coloringSelect,
                        UI.patternSelect,
                        UI.canvasSizeSelect,
                        UI.layersSelect,
                        UI.spotslayersSelect,
                        UI.cycleSpanSelect,
                        UI.fuseFpsSelect,
                        UI.frameDelaySelect,
                        UI.easingCheckbox,
                        UI.withFullscreen,
                        UI.showFps,
                        UI.clockSelect,
                        UI.brightnessSelect,
                        UI.languageSelect,
                    ]
                    .forEach(i => i.catchUpRestore(Url.params)),
                    25
                );
            }
        );
        window.addEventListener
        (
            "languagechange",
            () =>
            {
                console.log("🌐 languagechange:", navigator.language, navigator.languages);
                const old = Library.Locale.getLocale();
                Library.Locale.setLocale(UI.languageSelect.get() as Library.Locale.Language | "Auto");
                if (old !== Library.Locale.getLocale())
                {
                    UI.updateLanguage();
                }
            }
        );
    };
}
