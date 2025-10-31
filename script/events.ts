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
    const updateVisualizer = () =>
    {
        const value = UI.visualizerSelect.get();
        control.visualizer.enum.forEach
        (
            i => UI.mediaScreen.classList.toggle(i, i === value)
        );
    };
    const updateOverlayStyle = () =>
    {
        control.overlayStyle.enum.forEach
        (
            i => UI.overlay.classList.toggle(i, i === UI.overlayStyleSelect.get())
        );
    };
    const updateOverlayPosition = () =>
    {
        control.overlayPosition.enum.forEach
        (
            i => UI.overlay.classList.toggle(i, i === UI.overlayPositionSelect.get())
        );
    };
    const updateWeatherLocation = () =>
    {
        if ("geolocation" === UI.weatherLocationSelect.get())
        {
            Features.Location.requestToGetGeolocation();
        }
    };
    const updateShortcuts = () =>
    {
        const value = UI.shortcutsSelect.get();
        console.log("⌨️ Keyboard Shortcuts style changed:", value);
        Library.Shortcuts.setStyle(value as Library.Shortcuts.StyleKey);
        UI.updateShortcuts();
    };
    const updateUrlAnchor = (params: Record<string, string>) =>
        UI.urlAnchor.href = Url.make(params);
    export const makeTimerLabel = (remainingTime: number | null): string =>
    {
        if (null === remainingTime || remainingTime <= 0 || isNaN(remainingTime))
        {
            //return Library.Locale.map("off");
            return "";
        }
        else
        {
            return Tools.Timespan.toMediaTimeString(remainingTime);
        }
    };
    export const updateWakeUpTimer = (remainingTime = Features.Timer.getTimeUntilWakeUp()) =>
    {
        Library.UI.setTextContent(UI.wakeUpTimerLabel, makeTimerLabel(remainingTime));
        UI.wakeUpProgressCircle.style.setProperty("--progress", `${(Features.Timer.getProgressUntilWakeUp() ?? 1) * 360}deg`);
    };
    export const updateSleepTimer = (remainingTime = Features.Timer.getTimeUntilSleep()) =>
    {
        Library.UI.setTextContent(UI.sleepTimerLabel, makeTimerLabel(remainingTime));
        UI.sleepProgressCircle.style.setProperty("--progress", `${(Features.Timer.getProgressUntilSleep() ?? 1) * 360}deg`);
    };
    let wakeUpCountDownTimer: ReturnType<typeof setTimeout> | null = null;
    export const wakeUpCountDownTimerLoop = (): void =>
    {
        if (null !== wakeUpCountDownTimer)
        {
            clearTimeout(wakeUpCountDownTimer);
            wakeUpCountDownTimer = null;
        }
        const remainingTime = Features.Timer.getTimeUntilWakeUp();
        updateWakeUpTimer(remainingTime);
        if (null !== remainingTime && 0 < remainingTime)
        {
            wakeUpCountDownTimer = setTimeout
            (
                () =>
                {
                    wakeUpCountDownTimer = null;
                    wakeUpCountDownTimerLoop();
                },
                remainingTime %1000 || 1000
            );
        }
    };
    export const updateWakeUp = (): void =>
    {
        const value = UI.wakeUp.get();
        console.log("⏰ Wake-up Timer changed:", value);
        const timespan = Tools.Timespan.parse(value);
        Features.Timer.setWakeUpTimer(timespan);
        wakeUpCountDownTimerLoop();
        updateNoMediaLabel();
    };
    export const updateFadeIn = (): void =>
    {
        const value = UI.fadeIn.get();
        console.log("🌅 Wake-up Fade-in Time changed:", value);
        Features.Timer.setWakeUpFadeInSpan(Tools.Timespan.parse(value) ?? 0);
    };
    export const updateNoMediaLabel = () =>
    {
        MediaList.updateNoMediaLabel();
    };
    export const updateFadeOut = (): void =>
    {
        const value = UI.fadeOut.get();
        console.log("🌃 Sleep Fade-out Time changed:", value);
        Features.Timer.setSleepFadeOutSpan(Tools.Timespan.parse(value) ?? 0);
    };
    export const updateSleep = (): void =>
    {
        const value = UI.sleep.get();
        console.log("💤 Sleep Timer changed:", value);
        const timespan = Tools.Timespan.parse(value);
        Features.Timer.setSleepTimer(timespan);
        sleepCountDownTimerLoop();
        updateNoRepeatLabel();
    };
    export const updateNoRepeatLabel = (): void =>
    {
        const noRepeat = "off" !== UI.sleep.get() && ! UI.repeat.get();
        UI.noRepeatLabel.classList.toggle("hide", ! noRepeat);
    };
    let sleepCountDownTimer: ReturnType<typeof setTimeout> | null = null;
    export const sleepCountDownTimerLoop = (): void =>
    {
        if (null !== sleepCountDownTimer)
        {
            clearTimeout(sleepCountDownTimer);
            sleepCountDownTimer = null;
        }
        const remainingTime = Features.Timer.getTimeUntilSleep();
        updateSleepTimer(remainingTime);
        if (null !== remainingTime && 0 < remainingTime)
        {
            sleepCountDownTimer = setTimeout
            (
                () =>
                {
                    sleepCountDownTimer = null;
                    sleepCountDownTimerLoop();
                },
                remainingTime %1000 || 1000
            );
        }
    };
    export const updateLanguage = () =>
    {
        UI.updateLanguage();
        updateWakeUpTimer();
        updateSleepTimer();
    };
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
    let lastVolume = 100;
    export const toggleMute = () =>
    {
        if (UI.volumeRange.get() <= 0)
        {
            UI.volumeRange.set(lastVolume);
        }
        else
        {
            lastVolume = UI.volumeRange.get();
            UI.volumeRange.set(0);
        }
    };
    export const initialize = () =>
    {
        window.addEventListener("dragover", event => event.preventDefault());
        window.addEventListener("drop", event => event.preventDefault());
        window.addEventListener("resize", () => Features.Player.updateStretch());
        window.addEventListener("orientationchange", () => Features.Player.updateStretch());
        Library.Shortcuts.setCommandMap
        ({
            "toggleShuffle": () => UI.shuffle.toggle(),
            "toggleRepeat": () => UI.repeat.toggle(),
            "togglePlay": () =>
            {
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
            },
            "toggleMute": () => toggleMute(),
            "volumeUp": () =>
            {
                UI.volumeRange.set(UI.volumeRange.get() +config.volume.step);
                UI.volumeRange.fire();
            },
            "volumeDown": () =>
            {
                UI.volumeRange.set(UI.volumeRange.get() -config.volume.step);
                UI.volumeRange.fire();
            },
            "seekBackward": () =>
            {
                Features.Player.rewind();
            },
            "seekForward": () =>
            {
                Features.Player.fastForward();
            },
            "goPreviousMedia": () => Features.Player.previous(),
            "goNextMedia": () => Features.Player.next(),
            "toggleFullscreen": () =>
            {
                if (Library.UI.fullscreenEnabled)
                {
                    UI.withFullscreenCheckbox.toggle();
                    Features.Player.updateFullscreenState();
                }
            }
        });
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
        navigator.mediaSession.setActionHandler("play", () => Features.Player.play());
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
        UI.shuffle.setChange
        (
            (event, button) =>
            {
                event?.stopPropagation();
                button.dom.blur();
                applyParam("shuffle", `${UI.shuffle.get()}`);
            }
        );
        UI.volumeButton.setChange
        (
            (event, button) =>
            {
                event?.stopPropagation();
                button.dom.blur();
                if (Tools.Environment.isSafari() && ! Features.Analyser.isSupported())
                {
                    UI.volumeRange.set(UI.volumeRange.get() <= 0 ? 100 : 0);
                    UI.volumeButton.toggle(false, "preventOnChange")
                }
                UI.closeOtherPopups(UI.volumeButton);
            }
        );
        UI.volumeRange.options ||= { }
        UI.volumeRange.options.change = (_event, range) =>
        {
            const value = range.get();
            const rank = Math.ceil(value / 25);
            console.log("🔊 Volume changed:", value, rank);
            UI.volumeLabel.classList.toggle("volume-mute", rank <= 0);
            UI.volumeLabel.classList.toggle("volume-0", 1 === rank);
            UI.volumeLabel.classList.toggle("volume-1", 2 === rank);
            UI.volumeLabel.classList.toggle("volume-2", 3 === rank);
            UI.volumeLabel.classList.toggle("volume-3", 4 <= rank);
            //Media.setVolume(value);
            mousemove();
        };
        UI.settingsButton.setChange
        (
            (event, button) =>
            {
                event?.stopPropagation();
                button.dom.blur();
                UI.closeOtherPopups(UI.settingsButton);
            }
        );
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
        UI.wakeUpButton.setChange
        (
            (event, button) =>
            {
                event?.stopPropagation();
                button.dom.blur();
                UI.closeOtherPopups(UI.wakeUpButton);
            }
        );
        UI.sleepButton.setChange
        (
            (event, button) =>
            {
                event?.stopPropagation();
                button.dom.blur();
                UI.closeOtherPopups(UI.sleepButton);
            }
        );
        UI.seekRange.addEventListener("click", event => event.stopPropagation());
        UI.seekRange.addEventListener("change", updateSeek);
        UI.seekRange.addEventListener("input", updateSeek);
        UI.shuffle.loadParameter(Url.params, applyParam);
        UI.repeat.loadParameter(Url.params, applyParam).setChange(() => updateNoRepeatLabel());
        //UI.volumeButton.loadParameter(Url.params, applyParam);
        UI.volumeRange.loadParameter(Url.params, applyParam).setChange(UI.volumeRange.options.change);
        //UI.settingsButton.loadParameter(Url.params, applyParam);
        UI.withFullscreenCheckbox.loadParameter(Url.params, applyParam).setChange(UI.withFullscreenCheckbox.options.change);
        UI.brightnessRange.loadParameter(Url.params, applyParam).setChange(UI.brightnessRange.options.change);
        UI.stretchRange.loadParameter(Url.params, applyParam).setChange(UI.stretchRange.options.change);
        UI.paddingCheckbox.loadParameter(Url.params, applyParam).setChange(() => Features.Player.updateStretch());
        UI.crossFadeSelect.loadParameter(Url.params, applyParam); //.setChange(UI.transitionCheckbox.options.change);
        UI.imageSpanSelect.loadParameter(Url.params, applyParam).setChange(UI.imageSpanSelect.options.change);
        UI.loopShortMediaCheckbox.loadParameter(Url.params, applyParam);
        UI.visualizerSelect.loadParameter(Url.params, applyParam).setChange(updateVisualizer);
        UI.overlayStyleSelect.loadParameter(Url.params, applyParam).setChange(updateOverlayStyle);
        UI.overlayPositionSelect.loadParameter(Url.params, applyParam).setChange(updateOverlayPosition);
        UI.withWeatherCheckbox.loadParameter(Url.params, applyParam);
        UI.weatherLocationSelect.loadParameter(Url.params, applyParam).setChange(updateWeatherLocation);
        UI.withClockCheckbox.loadParameter(Url.params, applyParam);
        UI.withDateCheckbox.loadParameter(Url.params, applyParam);
        UI.withCalenderCheckbox.loadParameter(Url.params, applyParam);
        UI.showFpsCheckbox.loadParameter(Url.params, applyParam).setChange(updateShowFps);
        UI.shortcutsSelect.loadParameter(Url.params, applyParam).setChange(updateShortcuts);
        UI.languageSelect.loadParameter(Url.params, applyParam).setChange(updateLanguage);
        UI.fadeIn.loadParameter(Url.params, applyParam).setChange(updateFadeIn);
        UI.wakeUp.loadParameter(Url.params, applyParam).setChange(updateWakeUp);
        UI.fadeOut.loadParameter(Url.params, applyParam).setChange(updateFadeOut);
        UI.sleep.loadParameter(Url.params, applyParam).setChange(updateSleep);
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
        Library.UI.querySelectorAllWithFallback("label", [ "label[for]:has(select):not(.icon-button)", "label[for]:not(.icon-button)" ])
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
        updateVisualizer();
        updateOverlayStyle();
        updateOverlayPosition();
        updateLanguage();
        updateShortcuts();
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
                        UI.shuffle,
                        UI.repeat,
                        UI.withFullscreenCheckbox,
                        UI.brightnessRange,
                        UI.stretchRange,
                        UI.paddingCheckbox,
                        UI.crossFadeSelect,
                        UI.imageSpanSelect,
                        UI.loopShortMediaCheckbox,
                        UI.visualizerSelect,
                        UI.overlayStyleSelect,
                        UI.overlayPositionSelect,
                        UI.withWeatherCheckbox,
                        UI.weatherLocationSelect,
                        UI.withClockCheckbox,
                        UI.withDateCheckbox,
                        UI.withCalenderCheckbox,
                        UI.showFpsCheckbox,
                        UI.shortcutsSelect,
                        UI.languageSelect,
                        UI.wakeUp,
                        UI.fadeIn,
                        UI.sleep,
                        UI.fadeOut,
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
                    updateLanguage();
                }
            }
        );
    };
}
