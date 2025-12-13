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
    export const elementPool =
        Library.UI.getElementById("div", "element-pool");
    export class VisibilityApplier
    {
        hideTimer: ReturnType<typeof setTimeout> | null = null;
        constructor(public element: HTMLElement, public delay: number = 750)
        {
        }
        show(visibility: boolean = true): void
        {
            this.clearHideTimer();
            if (visibility)
            {
                this.element.style.setProperty("display", "");
                this.element.setAttribute("aria-hidden", "false");
            }
            else
            {
                this.hideTimer = setTimeout
                (
                    () =>
                    {
                        this.hideTimer = null;
                        this.clearHideTimer();
                    },
                    this.delay
                );
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
        }
    }
    export namespace ControlPanel
    {
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
            new VisibilityApplier(wakeupPanel);
        export const volumePanelVisibilityApplier =
            new VisibilityApplier(volumePanel);
        export const settingsPanelVisibilityApplier =
            new VisibilityApplier(settingsPanel);
        export const sleepPanelVisibilityApplier =
            new VisibilityApplier(sleepPanel);
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
    }
    export const volumeLabel =
        Library.UI.querySelector("label", "label[for='volume-button']");
    export const volumeRange =
        new Library.Control.Range(control.volume);
    export const mediaList =
        Library.UI.getElementById("div", "media-list");
    export const isScrolledToMediaListBottom = () =>
        UI.mediaList.scrollHeight <= UI.mediaList.scrollTop + (UI.mediaList.clientHeight *1) +(UI.addMediaButtonHeight *0.3);
    export const progressCircle =
        Library.UI.getElementById("div", "progress-circle");
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
    };
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
    export const overlay =
        Library.UI.getElementById("div", "overlay-panel");
    export const visualizer =
        Library.UI.getElementById("div", "visualizer");
    export const calendar =
        Library.UI.getElementById("div", "calendar");
    export const weather =
        Library.UI.getElementById("div", "weather");
    export const date =
        Library.UI.getElementById("time", "date");
    export const time =
        Library.UI.getElementById("time", "time");
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
    export const sleepProgressCircle =
        Library.UI.getElementById("div", "sleep-progress-circle");
    export const sleepTimerLabel =
        Library.UI.getElementById("label", "sleep-timer");
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
    export const initialize = (params: Record<string, string>) =>
    {
        locale = params["locale"];
        noscript.style.setProperty("display", "none");
        if ( ! Library.UI.fullscreenEnabled && SettingsPanel.withFullscreenCheckbox.dom.parentElement)
        {
            SettingsPanel.withFullscreenCheckbox.dom.parentElement.style.setProperty("display", "none");
        }
        ControlPanel.wakeupPanelVisibilityApplier.immediateHide();
        ControlPanel.volumePanelVisibilityApplier.immediateHide();
        ControlPanel.settingsPanelVisibilityApplier.immediateHide();
        ControlPanel.sleepPanelVisibilityApplier.immediateHide();
        TransportPanel.visibilityApplier.immediateHide();
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
