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
    export let locale: string | undefined = undefined;
    export const updateVolume = (disableLog?: "disableLog") =>
    {
        const value = UI.volumeRange.get();
        const rank = Math.ceil(value / 25);
        if ("disableLog" !== disableLog)
        {
            console.log("🔊 Volume changed:", value, rank);
        }
        UI.volumeLabel.classList.toggle("volume-mute", rank <= 0);
        UI.volumeLabel.classList.toggle("volume-0", 1 === rank);
        UI.volumeLabel.classList.toggle("volume-1", 2 === rank);
        UI.volumeLabel.classList.toggle("volume-2", 3 === rank);
        UI.volumeLabel.classList.toggle("volume-3", 4 <= rank);
        //Media.setVolume(value);
        mousemove();
    };
    const updateShowFps = () =>
    {
        UI.fpsDisplay.classList.toggle("hide", ! UI.SettingsPanel.showFpsCheckbox.get());
    }
    //const brightnessTimer = new Library.UI.ToggleClassForWhileTimer();
    export const updateBrightness = (disableLog?: "disableLog") =>
    {
        const value = UI.SettingsPanel.brightnessRange.get();
        if ("disableLog" !== disableLog)
        {
            console.log("💡 Brightness changed:", value);
        }
        //brightnessTimer.start(UI.mediaScreen, "disable-transition", 100);
        //Library.UI.setStyle(UI.mediaScreen, "opacity", `${value / 100}`);
        Library.UI.setStyle(UI.mediaScreen, "--screen-brightness", `${value / 100}`);
        mousemove();
    };
    const updateLoopShortMedia = () =>
    {
        Features.Player.updateLoopShortMedia();
    };
    const updateVisualizer = () =>
    {
        const value = UI.SettingsPanel.visualizerSelect.get();
        control.visualizer.enum.forEach
        (
            i => UI.mediaScreen.classList.toggle(i, i === value)
        );
    };
    const updateOverlayStyle = () =>
    {
        control.overlayStyle.enum.forEach
        (
            i => UI.overlay.classList.toggle(i, i === UI.SettingsPanel.overlayStyleSelect.get())
        );
    };
    const updateOverlayPosition = () =>
    {
        control.overlayPosition.enum.forEach
        (
            i => UI.overlay.classList.toggle(i, i === UI.SettingsPanel.overlayPositionSelect.get())
        );
    };
    const updateWeatherLocation = () =>
    {
        if ("geolocation" === UI.SettingsPanel.weatherLocationSelect.get())
        {
            Features.Location.requestToGetGeolocation();
        }
    };
    const updateShortcuts = (disableLog?: "disableLog") =>
    {
        const value = UI.SettingsPanel.shortcutsSelect.get();
        if ("disableLog" !== disableLog)
        {
            console.log("⌨️ Keyboard Shortcuts style changed:", value);
        }
        Library.Shortcuts.setStyle(value as Library.Shortcuts.StyleKey);
        UI.updateShortcuts();
    };
    const updateUrlAnchor = (params: Record<string, string>) =>
        UI.SettingsPanel.urlAnchor.href = Url.make(params);
    export const makeTimerLabel = (remainingTime: number | null, locale?: Intl.LocalesArgument): string =>
    {
        if (null === remainingTime || remainingTime <= 0 || isNaN(remainingTime))
        {
            //return Library.Locale.map("off");
            return "";
        }
        else
        {
            return Tools.Timespan.toMediaTimeString(remainingTime, locale);
        }
    };
    export const updateWakeUpTimer = (remainingTime = Features.Timer.getTimeUntilWakeUp()) =>
    {
        Library.UI.setTextContent(UI.wakeUpTimerLabel, makeTimerLabel(remainingTime, locale));
        if (Features.Timer.isWakeUpFading())
        {
            UI.wakeUpProgressCircle.classList.toggle("fading-in", true);
            UI.wakeUpProgressCircle.style.setProperty("--progress", `${Features.Timer.getProgressUntilFadeInComplete() ?? 1}`);
        }
        else
        {
            UI.wakeUpProgressCircle.classList.toggle("fading-in", false);
            UI.wakeUpProgressCircle.style.setProperty("--progress", `${Features.Timer.getProgressUntilWakeUp() ?? 1}`);
        }
    };
    export const updateSleepTimer = (remainingTime = Features.Timer.getTimeUntilSleep()) =>
    {
        Library.UI.setTextContent(UI.sleepTimerLabel, makeTimerLabel(remainingTime, locale));
        UI.sleepProgressCircle.style.setProperty("--progress", `${Features.Timer.getProgressUntilSleep() ?? 1}`);
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
        const isRunning = Features.Timer.isWaitingForWakeUp() || Features.Timer.isWakeUpFading();
        if (isRunning)
        {
            wakeUpCountDownTimer = setTimeout
            (
                () =>
                {
                    wakeUpCountDownTimer = null;
                    wakeUpCountDownTimerLoop();
                },
                Features.Timer.getWakeUpCountDownTimerLoopSpan(remainingTime) ??
                Features.Timer.getFadeInCountDownTimerLoopSpan() ??
                100
            );
        }
        else
        {
            UI.wakeUpToggle.toggle(false, "preventOnChange");
        }
    };
    export const updateWakeUp = (): void =>
    {
        const isOn = UI.wakeUpToggle.get();
        const value = UI.wakeUpSelect.get();
        console.log("⏰ Wake-up Timer changed:", isOn, value);
        const timespan = isOn ? Tools.Timespan.parse(value): null;
        Features.Timer.setWakeUpTimer(timespan);
        wakeUpCountDownTimerLoop();
        updateNoMediaLabel();
        document.body.classList.toggle
        (
            "wake-up-timer-not-working",
            isOn && ! Tools.Environment.canAutoplay()
        );
    };
    export const updateWakeUpSelect = (): void =>
    {
        const value = UI.wakeUpSelect.get();
        console.log("⏰ Wake-up Select changed:", value);
        UI.wakeUpToggle.toggle(true, "preventOnChange");
        updateWakeUp();
    };
    export const updateFadeIn = (disableLog?: "disableLog"): void =>
    {
        const value = UI.fadeInSelect.get();
        if ("disableLog" !== disableLog)
        {
            console.log("🌅 Wake-up Fade-in Time changed:", value);
        }
        Features.Timer.setWakeUpFadeInSpan(Tools.Timespan.parse(value) ?? 0);
    };
    export const updateNoMediaLabel = () =>
    {
        MediaList.updateNoMediaLabel();
    };
    export const updateSleep = (): void =>
    {
        const isOn = UI.sleepToggle.get();
        const value = UI.sleepSelect.get();
        console.log("💤 Sleep Timer changed:", isOn, value);
        const timespan = isOn ? Tools.Timespan.parse(value): null;
        Features.Timer.setSleepTimer(timespan);
        sleepCountDownTimerLoop();
        updateNoRepeatLabel();
    };
    export const updateSleepSelect = (): void =>
    {
        const value = UI.sleepSelect.get();
        console.log("💤 Sleep Select changed:", value);
        UI.sleepToggle.toggle(true, "preventOnChange");
        updateSleep();
    };
    export const updateFadeOut = (disableLog?: "disableLog"): void =>
    {
        const value = UI.fadeOutSelect.get();
        if ("disableLog" !== disableLog)
        {
            console.log("🌃 Sleep Fade-out Time changed:", value);
        }
        Features.Timer.setSleepFadeOutSpan(Tools.Timespan.parse(value) ?? 0);
    };
    export const updateNoRepeatLabel = (): void =>
    {
        const noRepeat = UI.sleepToggle.get() && ! UI.ControlPanel.repeat.get();
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
        const loopSpan = Features.Timer.getSleepCountDownTimerLoopSpan(remainingTime);
        if (null !== loopSpan)
        {
            sleepCountDownTimer = setTimeout
            (
                () =>
                {
                    sleepCountDownTimer = null;
                    sleepCountDownTimerLoop();
                },
                loopSpan
            );
        }
        else
        {
            updateNoRepeatLabel();
        }
    };
    export const onChangedSleepMode = (isSleeped: boolean): void =>
    {
        document.body.classList.toggle("sleeped", isSleeped);
    }
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
                Features.Player.seek(UI.TransportPanel.seekRange.valueAsNumber);
            }
        },
        500
    );
    const updateSeek = () =>
    {
        isSeekingTimer.kick();
        Features.Player.seek(UI.TransportPanel.seekRange.valueAsNumber);
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
    export const addKeyboardClickListener = (label: HTMLLabelElement) =>
    {
        label.addEventListener
        (
            "keydown",
            event =>
            {
                if (" " === event.key || "Enter" === event.key)
                {
                    event.preventDefault();
                    event.stopPropagation();
                    label.click();
                }
            }
        );
    };
    export const initialize = (params: Record<string, string>) =>
    {
        locale = params["locale"];
        window.addEventListener("dragover", event => event.preventDefault());
        window.addEventListener("drop", event => event.preventDefault());
        window.addEventListener("resize", () => Features.Player.updateStretch());
        window.addEventListener("orientationchange", () => Features.Player.updateStretch());
        Library.Shortcuts.setCommandMap
        ({
            "toggleShuffle":
            {
                control: UI.ControlPanel.shuffle.dom,
                fire: () => UI.ControlPanel.shuffle.toggle()
            },
            "toggleRepeat":
            {
                control: UI.ControlPanel.repeat.dom,
                fire: () => UI.ControlPanel.repeat.toggle()
            },
            "togglePlay":
            {
                control: UI.ControlPanel.playButton.dom,
                fire: () =>
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
                }
            },
            "toggleMute":
            {
                fire: () => toggleMute()
            },
            "volumeUp":
            {
                fire: () =>
                {
                    UI.volumeRange.set(UI.volumeRange.get() +config.volume.step);
                    UI.volumeRange.fire();
                }
            },
            "volumeDown":
            {
                fire: () =>
                {
                    UI.volumeRange.set(UI.volumeRange.get() -config.volume.step);
                    UI.volumeRange.fire();
                }
            },
            "seekBackward":
            {
                control: UI.TransportPanel.rewindButton.dom,
                fire: () =>
                {
                    Features.Player.rewind();
                }
            },
            "seekForward":
            {
                control: UI.TransportPanel.fastForwardButton.dom,
                fire: () =>
                {
                    Features.Player.fastForward();
                }
            },
            "goPreviousMedia":
            {
                control: UI.TransportPanel.backBUtton.dom,
                fire: () => Features.Player.previous()
            },
            "goNextMedia":
            {
                control: UI.TransportPanel.nextButton.dom,
                fire: () => Features.Player.next()
            },
            "toggleFullscreen":
            {
                control: UI.SettingsPanel.withFullscreenCheckbox.dom,
                fire: () =>
                {
                    if (Library.UI.fullscreenEnabled)
                    {
                        UI.SettingsPanel.withFullscreenCheckbox.toggle();
                        Features.Player.updateFullscreenState();
                    }
                }
            },
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

        addKeyboardClickListener(Library.UI.querySelector("label", "label[for='wakeup-button']"));
        addKeyboardClickListener(Library.UI.querySelector("label", "label[for='volume-button']"));
        addKeyboardClickListener(Library.UI.querySelector("label", "label[for='settings-button']"));
        addKeyboardClickListener(Library.UI.querySelector("label", "label[for='sleep-button']"));

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
        UI.ControlPanel.playButton.data.click = (event, button) =>
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
        UI.TransportPanel.nextButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            Features.Player.next();
        };
        UI.TransportPanel.backBUtton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            Features.Player.previous();
        }
        UI.TransportPanel.fastForwardButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            Features.Player.fastForward();
        };
        UI.TransportPanel.rewindButton.data.click = (event, button) =>
        {
            event?.stopPropagation();
            button.dom.blur();
            Features.Player.rewind();
        };
        UI.ControlPanel.shuffle.setChange
        (
            (event, button) =>
            {
                event?.stopPropagation();
                button.dom.blur();
                UI.updateParentClassBasedOnCheckbox(UI.ControlPanel.shuffle);
            }
        );
        UI.ControlPanel.repeat.setChange
        (
            (event, button) =>
            {
                event?.stopPropagation();
                button.dom.blur();
                UI.updateParentClassBasedOnCheckbox(UI.ControlPanel.repeat);
                updateNoRepeatLabel();
            }
        );
        UI.ControlPanel.volumeButton.setChange
        (
            (event, button) =>
            {
                event?.stopPropagation();
                button.dom.blur();
                if (Tools.Environment.isSafari() && ! Features.Analyser.isSupported())
                {
                    UI.volumeRange.set(UI.volumeRange.get() <= 0 ? 100 : 0);
                    UI.ControlPanel.volumeButton.toggle(false, "preventOnChange")
                }
                UI.closeOtherPopups(UI.ControlPanel.volumeButton);
            }
        );
        // UI.volumeRange.options ||= { }
        // UI.volumeRange.options.change = () => updateVolume();
        UI.ControlPanel.settingsButton.setChange
        (
            (event, button) =>
            {
                event?.stopPropagation();
                button.dom.blur();
                UI.closeOtherPopups(UI.ControlPanel.settingsButton);
                document.body.classList.toggle("show-settings-panel", UI.ControlPanel.settingsButton.get());
            }
        );
        UI.SettingsPanel.mediaLength.click = () =>
        {
            MediaList.updateMediaListDisplay();
            MediaList.updateInformationDisplay();
        };
        UI.SettingsPanel.withFullscreenCheckbox.options ||= { }
        UI.SettingsPanel.withFullscreenCheckbox.options.change = (_event, _checkbox) =>
        {
            if (document.body.classList.contains("play"))
            {
                if (Library.UI.fullscreenEnabled)
                {
                    Features.Player.updateFullscreenState();
                }
            }
        };
        UI.SettingsPanel.brightnessRange.options ||= { }
        UI.SettingsPanel.brightnessRange.options.change = () => updateBrightness();
        UI.SettingsPanel.stretchRange.options ||= { }
        UI.SettingsPanel.stretchRange.options.change = (_event, range) =>
        {
            const value = range.get();
            console.log("📏 Stretch changed:", value);
            //Features.Media.setStretch(value / 100);
            Features.Player.updateStretch();
            mousemove();
        };
        UI.SettingsPanel.imageSpanSelect.options ||= { }
        UI.SettingsPanel.imageSpanSelect.options.change = (_event, select) =>
        {
            const value = select.get();
            console.log("⏱️ Image span changed:", value);
            MediaList.updateInformationDisplay();
        };
        UI.SettingsPanel.loopShortMediaCheckbox.options ||= { }
        UI.SettingsPanel.loopShortMediaCheckbox.options.change = (_event, _checkbox) =>
        {
            console.log("🔁 Loop short media changed:", UI.SettingsPanel.loopShortMediaCheckbox.get());
            updateLoopShortMedia();
        };
        UI.TransportPanel.mediaTitle.addEventListener
        (
            "click",
            event =>
            {
                event.stopPropagation();
                document.body.classList.toggle("show-seek-bar");
            }
        );
        UI.TransportPanel.mediaTime.addEventListener
        (
            "click",
            event =>
            {
                event.stopPropagation();
                document.body.classList.toggle("show-seek-bar");
            }
        );
        UI.ControlPanel.wakeUpButton.setChange
        (
            (event, button) =>
            {
                event?.stopPropagation();
                button.dom.blur();
                UI.closeOtherPopups(UI.ControlPanel.wakeUpButton);
            }
        );
        UI.ControlPanel.sleepButton.setChange
        (
            (event, button) =>
            {
                event?.stopPropagation();
                button.dom.blur();
                UI.closeOtherPopups(UI.ControlPanel.sleepButton);
            }
        );
        Library.Shortcuts.setPressedKeyDiv(UI.pressedKey);
        UI.TransportPanel.seekRange.addEventListener("click", event => event.stopPropagation());
        UI.TransportPanel.seekRange.addEventListener("change", updateSeek);
        UI.TransportPanel.seekRange.addEventListener("input", updateSeek);
        UI.ControlPanel.shuffle.loadParameter(Url.params, applyParam);
        UI.ControlPanel.repeat.loadParameter(Url.params, applyParam);
        //UI.volumeButton.loadParameter(Url.params, applyParam);
        UI.volumeRange.loadParameter(Url.params, applyParam).setChange(() => updateVolume());
        //UI.settingsButton.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.withFullscreenCheckbox.loadParameter(Url.params, applyParam).setChange(UI.SettingsPanel.withFullscreenCheckbox.options.change);
        UI.SettingsPanel.brightnessRange.loadParameter(Url.params, applyParam).setChange(UI.SettingsPanel.brightnessRange.options.change);
        UI.SettingsPanel.stretchRange.loadParameter(Url.params, applyParam).setChange(UI.SettingsPanel.stretchRange.options.change);
        UI.SettingsPanel.paddingCheckbox.loadParameter(Url.params, applyParam).setChange(() => Features.Player.updateStretch());
        UI.SettingsPanel.imageSpanSelect.loadParameter(Url.params, applyParam).setChange(UI.SettingsPanel.imageSpanSelect.options.change);
        UI.SettingsPanel.loopShortMediaCheckbox.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.visualizerSelect.loadParameter(Url.params, applyParam).setChange(updateVisualizer);
        UI.SettingsPanel.crossFadeSelect.loadParameter(Url.params, applyParam); //.setChange(UI.transitionCheckbox.options.change);
        UI.SettingsPanel.crossFadeTransitionSelect.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.analogClockCheckbox.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.dayHandCheckbox.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.dateHandsCheckbox.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.millisecondHandCheckbox.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.overlayStyleSelect.loadParameter(Url.params, applyParam).setChange(updateOverlayStyle);
        UI.SettingsPanel.overlayPositionSelect.loadParameter(Url.params, applyParam).setChange(updateOverlayPosition);
        UI.SettingsPanel.withWeatherCheckbox.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.weatherLocationSelect.loadParameter(Url.params, applyParam).setChange(updateWeatherLocation);
        UI.SettingsPanel.withClockCheckbox.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.withDateCheckbox.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.withCalenderCheckbox.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.withVisualizerCheckbox.loadParameter(Url.params, applyParam);
        UI.SettingsPanel.showFpsCheckbox.loadParameter(Url.params, applyParam).setChange(updateShowFps);
        UI.SettingsPanel.shortcutsSelect.loadParameter(Url.params, applyParam).setChange(() => updateShortcuts());
        UI.SettingsPanel.languageSelect.loadParameter(Url.params, applyParam).setChange(updateLanguage);
        UI.wakeUpToggle.setChange(updateWakeUp);
        UI.wakeUpSelect.loadParameter(Url.params, applyParam).setChange(updateWakeUpSelect);
        UI.fadeInSelect.loadParameter(Url.params, applyParam).setChange(() => updateFadeIn());
        UI.sleepToggle.setChange(updateSleep);
        UI.sleepSelect.loadParameter(Url.params, applyParam).setChange(updateSleepSelect);
        UI.fadeOutSelect.loadParameter(Url.params, applyParam).setChange(() => updateFadeOut());
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
            // UI.withFullscreen,
            UI.SettingsPanel.showFpsCheckbox,
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
        updateVolume("disableLog");
        updateBrightness("disableLog");
        Features.Player.updateStretch();
        updateVisualizer();
        updateOverlayStyle();
        updateOverlayPosition();
        updateLanguage();
        updateShortcuts("disableLog");
        updateUrlAnchor(Url.params);
        updateFadeIn("disableLog");
        updateFadeOut("disableLog");
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
                        UI.ControlPanel.shuffle,
                        UI.ControlPanel.repeat,
                        UI.SettingsPanel.withFullscreenCheckbox,
                        UI.SettingsPanel.brightnessRange,
                        UI.SettingsPanel.stretchRange,
                        UI.SettingsPanel.paddingCheckbox,
                        UI.SettingsPanel.imageSpanSelect,
                        UI.SettingsPanel.loopShortMediaCheckbox,
                        UI.SettingsPanel.visualizerSelect,
                        UI.SettingsPanel.crossFadeSelect,
                        UI.SettingsPanel.crossFadeTransitionSelect,
                        UI.SettingsPanel.analogClockCheckbox,
                        UI.SettingsPanel.dayHandCheckbox,
                        UI.SettingsPanel.dateHandsCheckbox,
                        UI.SettingsPanel.millisecondHandCheckbox,
                        UI.SettingsPanel.overlayStyleSelect,
                        UI.SettingsPanel.overlayPositionSelect,
                        UI.SettingsPanel.withWeatherCheckbox,
                        UI.SettingsPanel.weatherLocationSelect,
                        UI.SettingsPanel.withClockCheckbox,
                        UI.SettingsPanel.withDateCheckbox,
                        UI.SettingsPanel.withCalenderCheckbox,
                        UI.SettingsPanel.showFpsCheckbox,
                        UI.SettingsPanel.shortcutsSelect,
                        UI.SettingsPanel.languageSelect,
                        UI.wakeUpSelect,
                        UI.fadeInSelect,
                        UI.sleepSelect,
                        UI.fadeOutSelect,
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
                Library.Locale.setLocale(UI.SettingsPanel.languageSelect.get() as Library.Locale.Language | "Auto");
                if (old !== Library.Locale.getLocale())
                {
                    updateLanguage();
                }
            }
        );
    };
}
