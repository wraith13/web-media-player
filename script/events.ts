import { Library } from "@library";
import { Features } from "@features";
import { UI } from "./ui";
import { Url } from "./url";
import config from "@resource/config.json";
import control from "@resource/control.json";
export namespace Events
{
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
    const dragover = (event: DragEvent): void =>
    {
        const files = event.dataTransfer?.files;
        if (files && 0 < files.length)
        {
            const hasMedia = Array.from(files).some(file => Features.Media.isMediaFile(file));
            if (hasMedia)
            {
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy";
                UI.addMediaButton.dom.classList.add("dragover");
            }
            else
            {
                event.dataTransfer.dropEffect = "none";
            }
        }
    };
    const drop = async (event: DragEvent): Promise<void> =>
    {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer && event.dataTransfer.files && 0 < event.dataTransfer.files.length)
        {
            for (const file of Array.from(event.dataTransfer.files))
            {
                console.log("📂 File dropped:", file);
                Features.Media.addMediaSerial(file);
            }
        }
    };
    const mouseMoveTimer = new Library.UI.ToggleClassForWhileTimer();
    export const mousemove = () =>
        mouseMoveTimer.start(document.body, "mousemove", 3000);

    export const initialize = () =>
    {
        window.addEventListener("dragover", event => event.preventDefault());
        window.addEventListener("drop", event => event.preventDefault());
        document.body.addEventListener("dragover", dragover);
        document.body.addEventListener("drop", drop);
        //document.body.className = "play";
        document.body.className = "list";
        const applyParam = (key: string, value: string) =>
        {
            Url.addParameter(Url.params, key, value);
            updateUrlAnchor(Url.params);
        };
        const noMediaTimer = new Library.UI.ToggleClassForWhileTimer();
        UI.playButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            if (document.body.classList.contains("list") && Features.Media.mediaList.length <= 0)
            {
                noMediaTimer.start(document.body, "no-media", 5000);
            }
            document.body.classList.toggle("list");
            document.body.classList.toggle("play");
            if (document.body.classList.contains("play"))
            {
                Features.Player.play();
            }
            else
            {
                Features.Player.pause();
            }
        };
        UI.shuffleButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            UI.shuffleButton.dom.classList.toggle("on");
        };
        UI.repeatButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            UI.repeatButton.dom.classList.toggle("on");
        };
        UI.volumeButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            UI.volumeButton.dom.classList.toggle("on");
            UI.settingButton.dom.classList.toggle("on", false);
        };
        UI.volumeRange.options ||= { }
        UI.volumeRange.options.change = (_event, range) =>
        {
            const value = range.get();
            console.log("🔊 Volume changed:", value);
            UI.volumeButton.dom.classList.toggle("volume-mute", value <= 0);
            UI.volumeButton.dom.classList.toggle("volume-0", 0 < value && value <= 25);
            UI.volumeButton.dom.classList.toggle("volume-1", 25 < value && value <= 50);
            UI.volumeButton.dom.classList.toggle("volume-2", 50 < value && value <= 75);
            UI.volumeButton.dom.classList.toggle("volume-3", 75 < value);
            //Features.Media.setVolume(value);
            mousemove();
        };
        UI.settingButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            UI.settingButton.dom.classList.toggle("on");
            UI.volumeButton.dom.classList.toggle("on", false);
        };
        UI.addMediaButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            UI.inputFile.click();
        };
        UI.inputFile.addEventListener
        (
            "change",
            async () =>
            {
                const files = UI.inputFile.files;
                for (const file of Array.from(files ?? []))
                {
                    console.log("📂 File selected:", file);
                    Features.Media.addMediaSerial(file);
                }
                UI.inputFile.value = "";
            }
        );
        UI.imageSpanSelect.options ||= { }
        UI.imageSpanSelect.options.change = (_event, select) =>
        {
            const value = select.get();
            console.log("⏱️ Image span changed:", value);
            Features.Media.updateInformationDisplay();
        };
        UI.withFullscreen.options ||= { }
        UI.withFullscreen.options.change = (_event, _checkbox) =>
        {
            if (document.body.classList.contains("play"))
            {
                if (Library.UI.fullscreenEnabled)
                {
                    Features.Player.updateFullscreenState();
                }
            }
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
        UI.brightnessRange.options ||= { }
        UI.brightnessRange.options.change = (_event, range) =>
        {
            const value = range.get();
            console.log("💡 Brightness changed:", value);
            Library.UI.setStyle(UI.mediaScreen, "opacity", `${value / 100}`);
            if (document.body.classList.contains("play"))
            {
                Library.UI.setStyle(UI.clockDisplay, "opacity", `${value / 100}`);
            }
            mousemove();
        };
        UI.stretchRange.options ||= { }
        UI.stretchRange.options.change = (_event, range) =>
        {
            const value = range.get();
            console.log("📏 Stretch changed:", value);
            //Features.Media.setStretch(value / 100);
            mousemove();
        };
        UI.showFps.loadParameter(Url.params, applyParam).setChange(updateShowFps);
        UI.clockSelect.loadParameter(Url.params, applyParam).setChange(updateClock);
        UI.languageSelect.loadParameter(Url.params, applyParam).setChange(UI.updateLanguage);
        document.body.addEventListener
        (
            "mousemove",
            event =>
            {
                if (config.log.mousemove && ! mouseMoveTimer.isOn())
                {
                    console.log("🖱️ MouseMove:", event, UI.screenBody);
                }
                mousemove();
            }
        );
        Library.UI.querySelectorAllWithFallback("label", [ "label[for]:has(select)", "label[for]" ])
            .forEach(label => Library.UI.showPickerOnLabel(label));
        [
            UI.volumeRange,
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
                        UI.withFullscreen,
                        UI.showFps,
                        UI.clockSelect,
                        UI.brightnessRange,
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
