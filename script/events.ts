import { Tools } from "@tools";
import { Library } from "@library";
import { Features } from "@features";
import { Media } from "@features/media";
import { MediaList } from "./medialist";
import { UI } from "./ui";
import { Url } from "./url";
import config from "@resource/config.json";
import control from "@resource/control.json";
export namespace Events
{
    const updateShowFps = () =>
    {
        UI.fpsDisplay.classList.toggle("hide", ! UI.showFpsCheckbox.get());
    }
    const brightnessTimer = new Library.UI.ToggleClassForWhileTimer();
    export const updateBrightness = () =>
    {
        const value = UI.brightnessRange.get();
        console.log("💡 Brightness changed:", value);
        brightnessTimer.start(UI.mediaScreen, "disable-transition", 100);
        Library.UI.setStyle(UI.mediaScreen, "opacity", `${value / 100}`);
        mousemove();
    };
    const updateLoopShortMedia = () =>
    {
        Features.Player.updateLoopShortMedia();
    };
    const updateClock = () =>
    {
        control.clock.enum.forEach
        (
            i => UI.clockDisplay.classList.toggle(i, i === UI.clockSelect.get())
        );
    };
    const updateClockPosition = () =>
    {
        control.clockPosition.enum.forEach
        (
            i => UI.clockDisplay.classList.toggle(i, i === UI.clockPositionSelect.get())
        );
    };
    const updateUrlAnchor = (params: Record<string, string>) =>
        UI.urlAnchor.href = Url.make(params);
    const dragover = (event: DragEvent): void =>
    {
        const files = event.dataTransfer?.files;
        if (files && 0 < files.length)
        {
            const hasMedia = Array.from(files).some(file => Media.isMediaFile(file));
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
                MediaList.addMediaSerial(file);
            }
        }
    };
    const isSeekingTimer = new Tools.Timer.ExtendableTimer
    (
        () =>
        {
            document.body.classList.add("is-seeking");
            if (Features.Player.isPlaying())
            {
                Features.Player.temporaryPause();
            }
        },
        () =>
        {
            document.body.classList.remove("is-seeking");
            if (Features.Player.isPlaying())
            {
                Features.Player.temporaryResume();
                Features.Player.seek(UI.seekRange.valueAsNumber);
            }
        },
        500
    );
    const updateSeek = () =>
    {
        isSeekingTimer.kick();
        Features.Player.seek(UI.seekRange.valueAsNumber);
    };
    const mouseMoveTimer = new Library.UI.ToggleClassForWhileTimer();
    export const mousemove = () =>
        mouseMoveTimer.start(document.body, "mousemove", config.ui.mousemoveTimeout);
    export const loadToggleButtonParameter = <T extends HTMLElement>(button: Library.Control.Button<T>, params: Record<string, string>) =>
    {
        const value = params[button.getId() as string];
        if (undefined !== value)
        {
            button.dom.classList.toggle("on", "true" === value.toLowerCase());
        }
    };
    export const initialize = () =>
    {
        window.addEventListener("dragover", event => event.preventDefault());
        window.addEventListener("drop", event => event.preventDefault());
        window.addEventListener("resize", () => Features.Player.updateStretch());
        window.addEventListener("orientationchange", () => Features.Player.updateStretch());
        window.addEventListener
        (
            "keydown",
            event =>
            {
                if (["Space", " "].includes(event.key) && ! event.repeat)
                {
                    event.preventDefault();
                    if (Features.Player.isPlaying())
                    {
                        Features.Player.pause();
                        MediaList.updateMediaListDisplay();
                        MediaList.updateInformationDisplay();
                    }
                    else
                    {
                        Features.Player.play();
                    }
                }
                if (["ArrowLeft"].includes(event.key) && ! event.repeat)
                {
                    event.preventDefault();
                    if (Features.Player.isPlaying())
                    {
                        Features.Player.previous();
                    }
                    else
                    {
                        Features.Player.play();
                    }
                }
                if (["ArrowRight"].includes(event.key) && ! event.repeat)
                {
                    event.preventDefault();
                    if (Features.Player.isPlaying())
                    {
                        Features.Player.next();
                    }
                    else
                    {
                        Features.Player.play();
                    }
                }
                if (["ArrowUp"].includes(event.key))
                {
                    event.preventDefault();
                    UI.volumeRange.set(UI.volumeRange.get() + 5);
                    UI.volumeRange.fire();
                }
                if (["ArrowDown"].includes(event.key))
                {
                    event.preventDefault();
                    UI.volumeRange.set(UI.volumeRange.get() - 5);
                    UI.volumeRange.fire();
                }
                if (["Escape"].includes(event.key) && ! event.repeat)
                {
                    event.preventDefault();
                    UI.settingButton.dom.classList.toggle("on", false);
                    UI.volumeButton.dom.classList.toggle("on", false);
                }
                if ("F" === event.key.toUpperCase() && ! event.repeat)
                {
                    event.preventDefault();
                    if (Library.UI.fullscreenEnabled)
                    {
                        UI.withFullscreenCheckbox.toggle();
                        Features.Player.updateFullscreenState();
                    }
                }
                if ("P" === event.key.toUpperCase() && ! event.repeat)
                {
                    //event.preventDefault();
                    UI.paddingCheckbox.toggle();
                    Features.Player.updateStretch();
                }
                if ("R" === event.key.toUpperCase() && ! event.repeat)
                {
                    //event.preventDefault();
                    UI.repeatButton.dom.classList.toggle("on");
                }
                if ("S" === event.key.toUpperCase() && ! event.repeat)
                {
                    //event.preventDefault();
                    UI.shuffleButton.dom.classList.toggle("on");
                }
            }
        );
        document.body.addEventListener("dragover", dragover);
        document.body.addEventListener("drop", drop);
        //document.body.className = "play";
        document.body.className = "list";
        UI.screenBody.addEventListener
        (
            "click",
            () => document.body.classList.toggle("show-ui")
        );
        const applyParam = (key: string, value: string) =>
        {
            Url.addParameter(Url.params, key, value);
            updateUrlAnchor(Url.params);
        };
        navigator.mediaSession.setActionHandler("play", Features.Player.play);
        navigator.mediaSession.setActionHandler("pause", Features.Player.pause);
        navigator.mediaSession.setActionHandler("previoustrack", Features.Player.previous);
        navigator.mediaSession.setActionHandler("nexttrack", Features.Player.next);
        UI.mediaList.addEventListener
        (
            "scroll",
            () => document.body.classList.toggle
            (
                "show-paused-media",
                UI.screenBody.classList.contains("paused") && UI.isScrolledToMediaListBottom()
            )
        )
        UI.addMediaButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            UI.inputFile.click();
        };
        UI.inputFile.addEventListener("click", event => event.stopPropagation());
        UI.inputFile.addEventListener
        (
            "change",
            async () =>
            {
                const files = UI.inputFile.files;
                for (const file of Array.from(files ?? []))
                {
                    console.log("📂 File selected:", file);
                    MediaList.addMediaSerial(file);
                }
                UI.inputFile.value = "";
            }
        );
        UI.playButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            if (Features.Player.isPlaying())
            {
                Features.Player.pause();
                MediaList.updateMediaListDisplay();
                MediaList.updateInformationDisplay();
            }
            else
            {
                Features.Player.play();
            }
        };
        UI.nextButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            Features.Player.next();
        };
        UI.backBUtton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            Features.Player.previous();
        }
        UI.fastForwardButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            Features.Player.fastForward();
        };
        UI.rewindButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            Features.Player.rewind();
        };
        UI.shuffleButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            UI.shuffleButton.dom.classList.toggle("on");
            applyParam("shuffle", `${UI.shuffleButton.dom.classList.contains("on")}`);
        };
        UI.repeatButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            UI.repeatButton.dom.classList.toggle("on");
            applyParam("repeat", `${UI.repeatButton.dom.classList.contains("on")}`);
        };
        UI.volumeButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            if (Tools.Environment.isSafari())
            {
                UI.volumeRange.set(UI.volumeRange.get() <= 0 ? 100 : 0);
            }
            else
            {
                UI.volumeButton.dom.classList.toggle("on");
            }
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
            //Media.setVolume(value);
            mousemove();
        };
        UI.settingButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            UI.settingButton.dom.classList.toggle("on");
            UI.volumeButton.dom.classList.toggle("on", false);
        };
        UI.mediaLength.click = () =>
        {
            MediaList.updateMediaListDisplay();
            MediaList.updateInformationDisplay();
        };
        UI.withFullscreenCheckbox.options ||= { }
        UI.withFullscreenCheckbox.options.change = (_event, _checkbox) =>
        {
            if (document.body.classList.contains("play"))
            {
                if (Library.UI.fullscreenEnabled)
                {
                    Features.Player.updateFullscreenState();
                }
            }
        };
        UI.brightnessRange.options ||= { }
        UI.brightnessRange.options.change = updateBrightness;
        UI.stretchRange.options ||= { }
        UI.stretchRange.options.change = (_event, range) =>
        {
            const value = range.get();
            console.log("📏 Stretch changed:", value);
            //Features.Media.setStretch(value / 100);
            Features.Player.updateStretch();
            mousemove();
        };
        UI.imageSpanSelect.options ||= { }
        UI.imageSpanSelect.options.change = (_event, select) =>
        {
            const value = select.get();
            console.log("⏱️ Image span changed:", value);
            MediaList.updateInformationDisplay();
        };
        UI.loopShortMediaCheckbox.options ||= { }
        UI.loopShortMediaCheckbox.options.change = (_event, _checkbox) =>
        {
            console.log("🔁 Loop short media changed:", UI.loopShortMediaCheckbox.get());
            updateLoopShortMedia();
        };
        UI.mediaTitle.addEventListener
        (
            "click",
            event =>
            {
                event.stopPropagation();
                document.body.classList.toggle("show-seek-bar");
            }
        );
        UI.mediaTime.addEventListener
        (
            "click",
            event =>
            {
                event.stopPropagation();
                document.body.classList.toggle("show-seek-bar");
            }
        );
        UI.seekRange.addEventListener("click", event => event.stopPropagation());
        UI.seekRange.addEventListener("change", updateSeek);
        UI.seekRange.addEventListener("input", updateSeek);
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
        UI.shuffleButton.dom.classList.toggle("on", "true" === (Url.params["shuffle"] ?? "false").toLowerCase());
        UI.repeatButton.dom.classList.toggle("on", "true" === (Url.params["repeat"] ?? "false").toLowerCase());
        UI.volumeRange.loadParameter(Url.params, applyParam).setChange(UI.volumeRange.options.change);
        UI.crossFadeSelect.loadParameter(Url.params, applyParam); //.setChange(UI.transitionCheckbox.options.change);
        UI.imageSpanSelect.loadParameter(Url.params, applyParam).setChange(UI.imageSpanSelect.options.change);
        UI.loopShortMediaCheckbox.loadParameter(Url.params, applyParam);
        UI.withFullscreenCheckbox.loadParameter(Url.params, applyParam).setChange(UI.withFullscreenCheckbox.options.change);
        UI.showFpsCheckbox.loadParameter(Url.params, applyParam).setChange(updateShowFps);
        UI.clockSelect.loadParameter(Url.params, applyParam).setChange(updateClock);
        UI.clockPositionSelect.loadParameter(Url.params, applyParam).setChange(updateClockPosition);
        UI.brightnessRange.loadParameter(Url.params, applyParam).setChange(UI.brightnessRange.options.change);
        UI.stretchRange.loadParameter(Url.params, applyParam).setChange(UI.stretchRange.options.change);
        UI.paddingCheckbox.loadParameter(Url.params, applyParam).setChange(() => Features.Player.updateStretch());
        UI.languageSelect.loadParameter(Url.params, applyParam).setChange(UI.updateLanguage);
        document.body.addEventListener
        (
            "mousemove",
            event =>
            {
                if (config.log.mousemove && ! mouseMoveTimer.isInTimer())
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
            UI.showFpsCheckbox,
        ].forEach(i => i.fire());
        document.addEventListener
        (
            "visibilitychange", () =>
            {
                console.log(`👀 visibilitychange: document.hidden: ${document.hidden}`);
                Features.Fps.reset();
                if ( ! document.hidden)
                {
                    Features.Player.resume();
                }
            }
        );
        updateBrightness();
        Features.Player.updateStretch();
        updateClock();
        updateClockPosition();
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
                        UI.withFullscreenCheckbox,
                        UI.showFpsCheckbox,
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
