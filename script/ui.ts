import { Tools } from "@tools";
import { Library } from "@library";
import { Url } from "./url";
import control from "@resource/control.json";
import shortcuts from "@resource/shortcuts.json";
export namespace UI
{
    export let locale: string | undefined = undefined;
    export const manifest =
        Library.UI.getElementById("link", "manifest");
    export const noscript =
        Library.UI.getElementById("noscript", "noscript");
    export const screenBody =
        Library.UI.getElementById("div", "screen-body");
    export const mediaScreen =
        Library.UI.getElementById("div", "media-screen");
    export const darkCurtain =
        Library.UI.getElementById("div", "dark-curtain");
    export const elementPool =
        Library.UI.getElementById("div", "element-pool");
    export class VisibilityApplier
    {
        hideTimer: ReturnType<typeof setTimeout> | null = null;
        constructor(public element: HTMLElement, public options: { delay?: number, bodyClassToggle?: string } = {})
        {
            // This class serves two purposes:
            // 1. Prevent hidden UI from receiving input focus via the Tab key by correctly toggling
            //    visibility before and after UI element transitions.
            // 2. Ensure the aria-hidden attribute is set appropriately according to the element's
            //    visibility so screen readers do not announce hidden UI.
            // To accomplish this correctly, visibility is applied at the start of the transition,
            // while hiding is performed after the transition has finished.
        }
        show(visibility: boolean = true): void
        {
            this.clearHideTimer();
            if (visibility)
            {
                this.element.style.removeProperty("display");
                this.element.setAttribute("aria-hidden", "false");
                if (this.options.bodyClassToggle)
                {
                    document.body.classList.toggle(this.options.bodyClassToggle, true);
                }
            }
            else
            {
                this.hideTimer = setTimeout
                (
                    () =>
                    {
                        this.hideTimer = null;
                        this.immediateHide();
                    },
                    this.options.delay ?? 750
                );
                if (this.options.bodyClassToggle)
                {
                    document.body.classList.toggle(this.options.bodyClassToggle, false);
                }
            }
        }
        hide(): void
        {
            this.show(false);
        }
        clearHideTimer(): void
        {
            if (this.hideTimer)
            {
                clearTimeout(this.hideTimer);
                this.hideTimer = null;
            }
        }
        immediateHide(): void
        {
            this.clearHideTimer();
            this.element.style.setProperty("display", "none");
            this.element.setAttribute("aria-hidden", "true");
            if (this.options.bodyClassToggle)
            {
                document.body.classList.toggle(this.options.bodyClassToggle, false);
            }
        }
    }
    export namespace MessagePanel
    {
        export const noMediaPanelVisibilityApplier =
            new VisibilityApplier(Library.UI.getElementById("div", "no-media-panel"));
        export const notSupportedMediaPanelVisibilityApplier =
            new VisibilityApplier(Library.UI.getElementById("div", "not-supported-media-panel"));
        export const wakeUpTimerNotWorkingPanelVisibilityApplier =
            new VisibilityApplier(Library.UI.getElementById("div", "wakeup-timer-not-working-panel"));
        export const wakeUpTimerRequiresActivePagePanelVisibilityApplier =
            new VisibilityApplier(Library.UI.getElementById("div", "wakeup-timer-requires-active-page-panel"));
    }
    export namespace ControlPanel
    {
        export const panel =
            Library.UI.getElementById("div", "control-panel");
        export const wakeUpButton = new Library.Control.Checkbox(control.wakeUpButton);
        export const shuffle = new Library.Control.Checkbox(control.shuffle);
        export const repeat = new Library.Control.Checkbox(control.repeat);
        export const playButton = new Library.Control.Button({ id: "play-button", });
        export const volumeButton = new Library.Control.Checkbox(control.volumeButton);
        export const settingsButton = new Library.Control.Checkbox(control.settingsButton);
        export const sleepButton = new Library.Control.Checkbox(control.sleepButton);
        export const wakeupPanel =
            Library.UI.getElementById("div", "wakeup-panel");
        export const volumePanel =
            Library.UI.getElementById("div", "volume-panel");
        export const settingsPanel =
            Library.UI.getElementById("div", "settings-panel");
        export const sleepPanel =
            Library.UI.getElementById("div", "sleep-panel");
        export const wakeupPanelVisibilityApplier =
            new VisibilityApplier(wakeupPanel, { bodyClassToggle: "show-wakeup-panel", });
        export const volumePanelVisibilityApplier =
            new VisibilityApplier(volumePanel);
        export const settingsPanelVisibilityApplier =
            new VisibilityApplier(settingsPanel);
        export const sleepPanelVisibilityApplier =
            new VisibilityApplier(sleepPanel, { bodyClassToggle: "show-sleep-panel", });
    }
    export namespace TransportPanel
    {
        export const panel =
            Library.UI.getElementById("div", "transport-panel");
        export const mediaIndex =
            Library.UI.getElementById("span", "media-index");
        export const mediaTitle =
            Library.UI.getElementById("span", "media-title");
        export const mediaTime =
            Library.UI.getElementById("span", "media-time");
        export const seekRange =
            Library.UI.getElementById("input", "seek");
        export const nextButton =
            new Library.Control.Button({ id: "next-button", });
        export const backBUtton =
            new Library.Control.Button({ id: "back-button", });
        export const fastForwardButton =
            new Library.Control.Button({ id: "fast-forward-button", });
        export const rewindButton =
            new Library.Control.Button({ id: "rewind-button", });
        export const visibilityApplier =
            new VisibilityApplier(panel);
        // export const mediaIndexVisibilityApplier =
        //     new VisibilityApplier(mediaIndex);
        // export const mediaTitleVisibilityApplier =
        //     new VisibilityApplier(mediaTitle);
        export const seekRangeVisibilityApplier =
            new VisibilityApplier(seekRange);
        export const updateSeekRangeVisibility = () =>
        {
            const isShowSeekBar = document.body.classList.contains("show-seek-bar");
            // UI.TransportPanel.mediaIndexVisibilityApplier.show( ! isShowSeekBar);
            // UI.TransportPanel.mediaTitleVisibilityApplier.show( ! isShowSeekBar);
            UI.TransportPanel.seekRangeVisibilityApplier.show(isShowSeekBar);
        }
    }
    export const volumeLabel =
        Library.UI.querySelector("label", "label[for='volume-button']");
    export const volumeRange =
        new Library.Control.Range(control.volume);
    export const mediaList =
        Library.UI.getElementById("div", "media-list");
    export const mediaListVisibilityApplier =
        new VisibilityApplier(mediaList);
    export const isScrolledToMediaListBottom = () =>
        UI.mediaList.scrollHeight <= UI.mediaList.scrollTop + (UI.mediaList.clientHeight *1) +(UI.addMediaButtonHeight *0.3);
    export const progressCircle =
        Library.UI.getElementById("div", "progress-circle");
    export const progressCircleVisibilityApplier =
        new VisibilityApplier(progressCircle);
    export namespace AnalogClock
    {
        export const panel = Library.UI.getElementById("time", "analog-clock-panel");
        export const background = Library.UI.getElementById("div", "analog-clock-background");
        export const monthPanel = Library.UI.getElementById("div", "month-panel");
        export const yearNiddle = Library.UI.getElementById("div", "year-niddle");
        export const monthNiddle = Library.UI.getElementById("div", "month-niddle");
        export const weekNiddle = Library.UI.getElementById("div", "week-niddle");
        export const dayNiddle = Library.UI.getElementById("div", "day-niddle");
        export const hoursNiddle = Library.UI.getElementById("div", "hours-niddle");
        export const minutesNiddle = Library.UI.getElementById("div", "minutes-niddle");
        export const secondsNiddle = Library.UI.getElementById("div", "seconds-niddle");
        export const milliSecondsNiddle = Library.UI.getElementById("div", "milli-seconds-niddle");
        export const visibilityApplier =
            new VisibilityApplier(panel);
        export const updateVisibility = () =>
        {
            if (isPlaying())
            {
                visibilityApplier.show(UI.SettingsPanel.analogClockCheckbox.get());
            }
        };
    };
    export namespace OverlayPanel
    {
        export const panel =
            Library.UI.getElementById("div", "overlay-panel");
        export const weather =
            Library.UI.getElementById("div", "weather");
        export const weatherVisibilityApplier =
            new VisibilityApplier(weather);
        export const date =
            Library.UI.getElementById("time", "date");
        export const dateVisibilityApplier =
            new VisibilityApplier(date);
        export const time =
            Library.UI.getElementById("time", "time");
        export const timeVisibilityApplier =
            new VisibilityApplier(time);
        export const calendar =
            Library.UI.getElementById("div", "calendar");
        // export const calendarVisibilityApplier =
        //     new VisibilityApplier(calendar);
        export const visualizer =
            Library.UI.getElementById("div", "visualizer");
        // export const visualizerVisibilityApplier =
        //     new VisibilityApplier(visualizer);
        export const updateWeatherVisibility = () =>
        {
            if (isPlaying())
            {
                weatherVisibilityApplier.show(UI.SettingsPanel.withWeatherCheckbox.get());
            }
        };
        export const updateDateVisibility = () =>
        {
            if (isPlaying())
            {
                dateVisibilityApplier.show(UI.SettingsPanel.withDateCheckbox.get());
            }
        };
        export const updateTimeVisibility = () =>
        {
            if (isPlaying())
            {
                timeVisibilityApplier.show(UI.SettingsPanel.withClockCheckbox.get());
            }
        };
        // export const updateCalendarVisibility = () =>
        // {
        //     if (isPlaying())
        //     {
        //         calendarVisibilityApplier.show(UI.SettingsPanel.withCalenderCheckbox.get());
        //     }
        // };
        // export const updateVisualizerVisibility = () =>
        // {
        //     if (isPlaying())
        //     {
        //         visualizerVisibilityApplier.show(UI.SettingsPanel.withVisualizerCheckbox.get());
        //     }
        // };
    }
    export const addMediaButton =
        new Library.Control.Button({ id: "add-media", });
    export const addMediaButtonHeight = 84;
    export const inputFile =
        Library.UI.getElementById("input", "add-file");
    export namespace SettingsPanel
    {
        export const mediaCount =
            Library.UI.getElementById("span", "media-count");
        export const mediaLength =
            Library.UI.getElementById("span", "media-length");
        export const withFullscreenCheckbox =
            new Library.Control.Checkbox(control.withFullscreen);
        export const brightnessRange =
            new Library.Control.Range(control.brightness);
        export const stretchRange =
            new Library.Control.Range(control.stretch);
        export const paddingCheckbox =
            new Library.Control.Checkbox(control.padding);
        export const imageSpanSelect =
            new Library.Control.Select
            (
                control.imageSpan,
                {
                    makeLabel: value => Tools.Timespan.toHumanizedString(Tools.Timespan.parse(value) ?? 0, undefined, locale)
                }
            );
        export const loopShortMediaCheckbox =
            new Library.Control.Checkbox(control.loopShortMedia);
        export const visualizerSelect =
            new Library.Control.Select(control.visualizer, { makeLabel: i => Library.Locale.map(`visualizer-${i}` as Library.Locale.Label), });
        export const crossFadeSelect = new Library.Control.Select
        (
            control.crossFade,
            {
                makeLabel: value => "off" === value ?
                    Library.Locale.map("off"):
                    Tools.Timespan.toHumanizedString(Tools.Timespan.parse(value) ?? 0, undefined, locale)
            }
        );
        export const crossFadeTransitionSelect =
            new Library.Control.Select(control.crossFadeTransition, { makeLabel: i => Library.Locale.map(i as Library.Locale.Label), });
        export const analogClockCheckbox =
            new Library.Control.Checkbox(control.analogClock);
        export const dayHandCheckbox =
            new Library.Control.Checkbox(control.dayHand);
        export const dateHandsCheckbox =
            new Library.Control.Checkbox(control.dateHands);
        export const millisecondHandCheckbox =
            new Library.Control.Checkbox(control.millisecondHand);
        export const overlayStyleSelect =
            new Library.Control.Select(control.overlayStyle, { makeLabel: i => Library.Locale.map(i as Library.Locale.Label), });
        export const overlayPositionSelect =
            new Library.Control.Select(control.overlayPosition, { makeLabel: i => Library.Locale.map(i as Library.Locale.Label), });
        export const withWeatherCheckbox =
            new Library.Control.Checkbox(control.withWeather);
        export const weatherLocationSelect =
            new Library.Control.Select(control.weatherLocation, { makeLabel: i => Library.Locale.map(i as Library.Locale.Label), });
        export const withClockCheckbox =
            new Library.Control.Checkbox(control.withClock);
        export const withDateCheckbox =
            new Library.Control.Checkbox(control.withDate);
        export const withCalenderCheckbox =
            new Library.Control.Checkbox(control.withCalendar);
        export const withVisualizerCheckbox =
            new Library.Control.Checkbox(control.withVisualizer);
        export const showFpsCheckbox =
            new Library.Control.Checkbox(control.showFps);
        export const updateShowFps = () =>
        {
            if (isPlaying())
            {
                UI.fpsDisplay.classList.toggle("hide", ! UI.SettingsPanel.showFpsCheckbox.get());
                UI.fpsVisibilityApplier.show(UI.SettingsPanel.showFpsCheckbox.get());
            }
        };
        export const shortcutsSelect = new Library.Control.Select
        (
            {
                id: "shortcuts",
                enum: Object.keys(shortcuts),
                default: "apple",
            },
            {
                makeLabel: i => shortcuts[i as keyof typeof shortcuts].label,
            }
        );
        export const languageSelect =
            new Library.Control.Select
            (
                {
                    id: control.language.id,
                    enum: Library.Locale.getLocaleList(),
                    default: control.language.default,
                },
                {
                    makeLabel: i => "Auto" === i ?
                        Library.Locale.map("Auto"):
                        (
                            `${i}${Library.Locale.getColonSuffix()} `
                            +Library.Locale.toRtl
                            (
                                Library.Locale.map("lang-label", i as Library.Locale.Language),
                                Library.Locale.isRtl() && Library.Locale.isLtr(i as Library.Locale.Language)
                            )
                        ),
                }
            );
        export const urlAnchor =
            Library.UI.getElementById("a", "url");
    }
    export const fpsDisplay =
        Library.UI.getElementById("div", "fps");
    export const fpsVisibilityApplier =
        new VisibilityApplier(fpsDisplay);
    export const keyboardShortcut =
        Library.UI.getElementById("div", "keyboard-shortcut");
    export const pressedKey =
        Library.UI.getElementById("div", "pressed-key");
    export const updateShortcuts = () =>
    {
        Library.UI.replaceChildren
        (
            UI.keyboardShortcut,
            Library.Shortcuts.getDisplayList
            (
                i =>
                {
                    switch(i.description)
                    {
                    case "FullScreen":
                        return Library.UI.fullscreenEnabled;
                    default:
                        return true;
                    }
                }
            ).map
            (
                i =>
                [
                    {
                        tag: "span",
                        children: i.keyss
                            .map(j => j.map(key => ({ tag: "kbd", text: key })))
                            .reduce
                            (
                                (accumulator, item, i) =>
                                [
                                    ...accumulator,
                                    ...(0 < i ? [{ tag: "span", className: "separator" , text: "/", }]: []),
                                    ...item,
                                ],
                                [] as Library.UI.ElementSource[]
                            ),
                    } as const,
                    { tag: "span", text: Library.Locale.map(i.description as Library.Locale.Label), } as const
                ]
            )
            .reduce((a, b) => a.concat(b), [])
        );
        Library.Shortcuts.updateAriaKeyshortcuts();
    };
    export const updateLanguage = () =>
    {
        Library.Locale.setLocale(UI.SettingsPanel.languageSelect.get() as Library.Locale.Language | "Auto", Url.params["locale"]);
        const lang = Library.Locale.getLocale();
        document.documentElement.setAttribute("lang", lang);
        const localeDirection = Library.Locale.getDirection(lang);
        document.documentElement.setAttribute("dir", localeDirection);
        Library.Shortcuts.setLocaleDirection(localeDirection);
        manifest.setAttribute("href", `web.manifest/generated/${lang}.json`);
        UI.SettingsPanel.imageSpanSelect.reloadOptions();
        UI.SettingsPanel.visualizerSelect.reloadOptions();
        UI.SettingsPanel.crossFadeSelect.reloadOptions();
        UI.SettingsPanel.crossFadeTransitionSelect.reloadOptions();
        UI.SettingsPanel.overlayStyleSelect.reloadOptions();
        UI.SettingsPanel.overlayPositionSelect.reloadOptions();
        UI.SettingsPanel.weatherLocationSelect.reloadOptions();
        UI.SettingsPanel.languageSelect.reloadOptions();
        UI.wakeUpSelect.reloadOptions();
        UI.fadeInSelect.reloadOptions();
        UI.sleepSelect.reloadOptions();
        UI.fadeOutSelect.reloadOptions();
        Library.UI.querySelectorAllWithFallback("span", [ "[data-lang-key]" ])
            .forEach(i => updateLabel(i));
        Array.from(document.querySelectorAll<HTMLElement>("[data-aria-lang-key]"))
            .forEach(i => updateAriaLabel(i));
        updateShortcuts();
    };
    export const wakeUpProgressCircle =
        Library.UI.getElementById("div", "wakeup-progress-circle");
    export const wakeUpTimerLabel =
        Library.UI.getElementById("label", "wakeup-timer");
    export const wakeUpTimerLabelVisibilityApplier =
        new VisibilityApplier(wakeUpTimerLabel);
    export const wakeUpToggle =
        new Library.Control.ToggleLabel(control.wakeUpToggle);
    export const wakeUpSelect =
        new Library.Control.Select<typeof control.wakeUpTime.enum[number]>
        (
            control.wakeUpTime,
            {
                makeLabel: value => Tools.Timespan.toHumanizedString(Tools.Timespan.parse(value) ?? 0, undefined, locale)
            }
        );
    export const fadeInSelect =
        new Library.Control.Select
        (
            control.fadeIn,
            {
                makeLabel: value => "off" === value ?
                    Library.Locale.map("off"):
                    Tools.Timespan.toHumanizedString(Tools.Timespan.parse(value) ?? 0, undefined, locale)
            }
        );
    export const noMediaLabel =
        Library.UI.getElementById("label", "no-media");
    export const noMediaLabelVisibilityApplier =
        new VisibilityApplier(noMediaLabel);
    export const sleepProgressCircle =
        Library.UI.getElementById("div", "sleep-progress-circle");
    export const sleepTimerLabel =
        Library.UI.getElementById("label", "sleep-timer");
    export const sleepTimerLabelVisibilityApplier =
        new VisibilityApplier(sleepTimerLabel);
    export const sleepToggle =
        new Library.Control.ToggleLabel(control.sleepToggle);
    export const sleepSelect =
        new Library.Control.Select<typeof control.sleepTime.enum[number]>
        (
            control.sleepTime,
            {
                makeLabel: value => Tools.Timespan.toHumanizedString(Tools.Timespan.parse(value) ?? 0, undefined, locale)
            }
        );
    export const fadeOutSelect =
        new Library.Control.Select
        (
            control.fadeOut,
            {
                makeLabel: value => "off" === value ?
                    Library.Locale.map("off"):
                    Tools.Timespan.toHumanizedString(Tools.Timespan.parse(value) ?? 0, undefined, locale)
            }
        );
    export const noRepeatLabel =
        Library.UI.getElementById("label", "no-repeat");
    export const noRepeatLabelVisibilityApplier =
        new VisibilityApplier(noRepeatLabel);
    export const initialize = (params: Record<string, string>) =>
    {
        locale = params["locale"];
        noscript.style.setProperty("display", "none");
        if ( ! Library.UI.fullscreenEnabled && SettingsPanel.withFullscreenCheckbox.dom.parentElement)
        {
            SettingsPanel.withFullscreenCheckbox.dom.parentElement.style.setProperty("display", "none");
        }
        [
            progressCircleVisibilityApplier,
            AnalogClock.visibilityApplier,
            OverlayPanel.weatherVisibilityApplier,
            OverlayPanel.dateVisibilityApplier,
            OverlayPanel.timeVisibilityApplier,
            // OverlayPanel.calendarVisibilityApplier,
            // OverlayPanel.visualizerVisibilityApplier,
            MessagePanel.noMediaPanelVisibilityApplier,
            MessagePanel.notSupportedMediaPanelVisibilityApplier,
            MessagePanel.wakeUpTimerNotWorkingPanelVisibilityApplier,
            MessagePanel.wakeUpTimerRequiresActivePagePanelVisibilityApplier,
            fpsVisibilityApplier,
            ControlPanel.wakeupPanelVisibilityApplier,
            ControlPanel.volumePanelVisibilityApplier,
            ControlPanel.settingsPanelVisibilityApplier,
            ControlPanel.sleepPanelVisibilityApplier,
            wakeUpTimerLabelVisibilityApplier,
            sleepTimerLabelVisibilityApplier,
            noMediaLabelVisibilityApplier,
            noRepeatLabelVisibilityApplier,
            TransportPanel.visibilityApplier,
        ]
        .forEach(i => i.immediateHide());
        TransportPanel.updateSeekRangeVisibility();
    };
    export const isPlaying = (): boolean =>
        document.body.classList.contains("play");
    export const isSeeking = (): boolean =>
        document.body.classList.contains("is-seeking");
    export const onPlaybackStarted = () =>
    {
        mediaListVisibilityApplier.hide();
        TransportPanel.visibilityApplier.show();
        document.body.classList.toggle("show-ui", false);
        document.body.classList.toggle("list", false);
        document.body.classList.toggle("play", true);
        document.body.classList.toggle("show-paused-media", false);
        screenBody.classList.toggle("paused", false);
        AnalogClock.updateVisibility();
        OverlayPanel.updateWeatherVisibility();
        OverlayPanel.updateDateVisibility();
        OverlayPanel.updateTimeVisibility();
        // OverlayPanel.updateCalendarVisibility();
        // OverlayPanel.updateVisualizerVisibility();
        SettingsPanel.updateShowFps();
    };
    export const onPlaybackPaused = () =>
    {
        OverlayPanel.panel.style.removeProperty("opacity");
        //updateFullscreenState(false);
        navigator.mediaSession.playbackState = "paused";
        document.body.classList.toggle("list", true);
        document.body.classList.toggle("play", false);
        mediaListVisibilityApplier.show();
        [
            AnalogClock.visibilityApplier,
            OverlayPanel.weatherVisibilityApplier,
            OverlayPanel.dateVisibilityApplier,
            OverlayPanel.timeVisibilityApplier,
            // OverlayPanel.calendarVisibilityApplier,
            // OverlayPanel.visualizerVisibilityApplier,
            fpsVisibilityApplier,
            TransportPanel.visibilityApplier,
        ]
        .forEach(i => i.hide());
    };
    export const getDataLangKey = (element: HTMLSpanElement) =>
        element.getAttribute("data-lang-key") as Library.Locale.Label;
    export const updateLabel = (element: HTMLSpanElement) =>
    {
        const label = Library.Locale.map(getDataLangKey(element));
        if (undefined !== label)
        {
            Library.UI.setTextContent(element, label);
        }
        else
        {
            console.warn(`🚫 Missing locale label for key: ${getDataLangKey(element)}`);
        }
    };
    export const updateAriaLabel = (element: HTMLElement) =>
    {
        const labelKey = element.getAttribute("data-aria-lang-key") as Library.Locale.Label;
        if (labelKey)
        {
            const label = Library.Locale.map(labelKey);
            if (undefined !== label)
            {
                element.setAttribute("aria-label", label);
            }
            else
            {
                console.warn(`🚫 Missing locale label for key: ${labelKey}`);
            }
        }
    };
    export const setLabel = (element: HTMLSpanElement, label: Library.Locale.Label) =>
        element.setAttribute("data-lang-key", label);
    export const setAndUpdateLabel = (element: HTMLSpanElement, label: Library.Locale.Label) =>
    {
        setLabel(element, label);
        updateLabel(element);
    };
    export const popupCheckboxList =
    [
        {
            visibilityApplier: ControlPanel.wakeupPanelVisibilityApplier,
            checkbox: ControlPanel.wakeUpButton
        },
        {
            visibilityApplier: ControlPanel.volumePanelVisibilityApplier,
            checkbox: ControlPanel.volumeButton
        },
        {
            visibilityApplier: ControlPanel.settingsPanelVisibilityApplier,
            checkbox: ControlPanel.settingsButton
        },
        {
            visibilityApplier: ControlPanel.sleepPanelVisibilityApplier,
            checkbox: ControlPanel.sleepButton
        },
    ];
    export const updateParentClassBasedOnCheckbox = (checkbox: Library.Control.Checkbox, checked: boolean = checkbox.get()): void =>
    {
        const parent: HTMLElement = checkbox.dom.parentElement!;
        parent.classList.toggle("checked", checked);
    };
    export const closeOtherPopups = (except: Library.Control.Checkbox) =>
    {
        popupCheckboxList.forEach
        (
            i =>
            {
                if (except !== i.checkbox)
                {
                    i.checkbox.toggle(false, "preventOnChange");
                }
                const checked = i.checkbox.get();
                setTimeout
                (
                    () =>
                    {
                        updateParentClassBasedOnCheckbox(i.checkbox);
                    },
                    0
                );
                i.visibilityApplier.show(checked);
            }
        );
    }
}
