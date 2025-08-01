import { Library } from "@library";
import { Features } from "@features";
import { Controller } from "@controller";
import { UI } from "./ui";
import { Url } from "./url";
import config from "@resource/config.json";
import control from "@resource/control.json";
export namespace Events
{
    const update = (setter?: () => unknown) =>
    {
        setter?.();
        if ( ! Controller.Animation.isInAnimation())
        {
            Controller.Animation.animator.update();
        }
    };
    const updateDiagonalSize = () =>
        update(() => Controller.Animation.animator.updateDiagonalSize());
    const updateColorspace = () =>
    {
        update(() => Controller.Animation.animator.setColorspace(UI.colorspaceSelect.get()));
    };
    const updateColoring = (): unknown =>
        update(() => Controller.Animation.animator.setColoring(UI.coloringSelect.get()));
    const updatePattern = () =>
        update(() => Controller.Animation.animator.setPattern(UI.patternSelect.get()));
    const updateLayers = () =>
    {
        update(() => Controller.Animation.animator.setLayers(parseInt(UI.layersSelect.get())));
    };
    const updateSpotsLayers = () =>
    {
        update(() => Controller.Animation.animator.setSpotsLayers(parseInt(UI.spotslayersSelect.get()) /100.0));
    };
    const setCanvasSize = (size: string) =>
    {
        [ "width", "height", ].forEach
        (
            i => UI.canvas.style.setProperty(i, size)
        );
        updateDiagonalSize();
    };
    const updateCanvasSize = () =>
    {
        const newCanvasSize = parseFloat(UI.canvasSizeSelect.get());
        const newCanvasSizeRate = Math.sqrt(newCanvasSize /100.0);
        const canvasSize = newCanvasSizeRate *100.0;
        setCanvasSize(`${canvasSize}%`);
    };
    const updateCycleSpan = (): void =>
        update(() => Controller.Animation.animator.setCycleSpan(parseInt(UI.cycleSpanSelect.get())));
    const updateFuseFps = (): number =>
        Features.Fps.fuseFps = parseFloat(UI.fuseFpsSelect.get());
    const updateEasing = () =>
        update(() => Controller.Animation.animator.setEasing(UI.easingCheckbox.get()));
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
    const updateBrightness = () =>
        Controller.Animation.updateOpacity();;
    const updateUrlAnchor = (params: Record<string, string>) =>
        UI.urlAnchor.href = Url.make(params);
    export const initialize = () =>
    {
        const applyParam = (key: string, value: string) =>
        {
            Url.addParameter(Url.params, key, value);
            updateUrlAnchor(Url.params);
        };
        UI.playButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            Controller.toggleAnimation();
        };
        UI.runBenchmarkButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            Controller.Benchmark.runBenchmark();
        };
        UI.introductionButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            UI.introductionPanel.classList.toggle("force-show", true);
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
        UI.colorspaceSelect.loadParameter(Url.params, applyParam).setChange(updateColorspace);
        UI.coloringSelect.loadParameter(Url.params, applyParam).setChange(updateColoring);
        UI.patternSelect.loadParameter(Url.params, applyParam).setChange(updatePattern);
        UI.canvasSizeSelect.loadParameter(Url.params, applyParam).setChange(updateCanvasSize);
        UI.layersSelect.loadParameter(Url.params, applyParam).setChange(updateLayers);
        UI.spotslayersSelect.loadParameter(Url.params, applyParam).setChange(updateSpotsLayers);
        UI.cycleSpanSelect.loadParameter(Url.params, applyParam).setChange(updateCycleSpan);
        UI.fuseFpsSelect.loadParameter(Url.params, applyParam).setChange(updateFuseFps);
        UI.easingCheckbox.loadParameter(Url.params, applyParam).setChange(updateEasing);
        UI.showFps.loadParameter(Url.params, applyParam).setChange(updateShowFps);
        UI.clockSelect.loadParameter(Url.params, applyParam).setChange(updateClock);
        UI.brightnessSelect.loadParameter(Url.params, applyParam).setChange(updateBrightness);
        UI.languageSelect.loadParameter(Url.params, applyParam).setChange(UI.updateLanguage);
        UI.benchmarkAbortButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            Controller.Benchmark.stopBenchmark();
        };
        UI.benchmarkResultCloseButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            //Controller.Benchmark.runBenchmark();
            document.body.classList.toggle("immersive", false);
            document.body.classList.toggle("benchmark-result", false);
        };
        UI.canvas.addEventListener
        (
            "click",
            event =>
            {
                event.stopPropagation();
                if (Controller.Benchmark.isInBenchmark())
                {
                    console.log("👆 canvas.Click: stopBenchmark", event, UI.canvas);
                    Controller.Benchmark.stopBenchmark();
                }
                else
                {
                    console.log("👆 canvas.Click: pauseAnimation", event, UI.canvas);
                    Controller.Animation.pauseAnimation();
                }
            }
        );
        UI.benchmarkCanvas.addEventListener
        (
            "click",
            event =>
            {
                event.stopPropagation();
                console.log("👆 benchmarkCanvas.Click: stopBenchmark", event, UI.benchmarkCanvas);
                Controller.Benchmark.stopBenchmark();
            }
        );
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
        Library.Shortcuts.setCommandMap
        ({
            "nop": () => { },
            "toggleHideUI": () =>
            {
                document.body.classList.toggle("hide-ui");
                if (document.body.classList.contains("hide-ui"))
                {
                    UI.keyboardShortcut.classList.toggle("show", false);
                }
            },
            "toggleAnimation": () => Controller.toggleAnimation(),
            "switchColoringForward": () => UI.coloringSelect.cycle(true),
            "switchColoringBackward": () => UI.coloringSelect.cycle(false),
            "switchPatternForward": () => UI.patternSelect.cycle(true),
            "switchPatternBackward": () => UI.patternSelect.cycle(false),
            "increaseFrameDelay": () => UI.frameDelaySelect.switch(false),
            "decreaseFrameDelay": () => UI.frameDelaySelect.switch(true),
            "increaseCanvasSize": () => UI.canvasSizeSelect.switch(true),
            "decreaseCanvasSize": () => UI.canvasSizeSelect.switch(false),
            "increaseLayer": () => UI.layersSelect.switch(true),
            "decreaseLayer": () => UI.layersSelect.switch(false),
            "speedDown": () => UI.cycleSpanSelect.switch(true),
            "speedUp": () => UI.cycleSpanSelect.switch(false),
            "toggleFullScreen": () =>
            {
                if (Controller.Animation.isInAnimation())
                {
                    if (Library.UI.fullscreenEnabled)
                    {
                        if ((null !== Library.UI.getFullscreenElement()) === UI.withFullscreen.get())
                        {
                            UI.withFullscreen.toggle();
                        }
                        Controller.Base.updateFullscreenState();
                    }
                }
                else
                {
                    UI.withFullscreen.toggle();
                }
            },
            "toggleShowFps": () =>
            {
                UI.showFps.toggle();
                updateShowFps();
            },
            "switchClockForward": () => UI.clockSelect.cycle(false),
            "switchClockBackward": () => UI.clockSelect.cycle(true),
            "unknownKeyDown": () =>
            {
                if ( ! Controller.Benchmark.isInBenchmarkOrResult())
                {
                    showShortcutsTimer.start(UI.keyboardShortcut, "show", 3000);
                }
            }
        });
        const showShortcutsTimer = new Library.UI.ToggleClassForWhileTimer();
        window.addEventListener("resize", () => updateDiagonalSize());
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
                Controller.Benchmark.abortBenchmark();
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
