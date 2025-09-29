import { Tools } from "@tools";
import { Library } from "@library";
import control from "@resource/control.json";
import poweredBy from "@resource/powered-by.json";
export namespace UI
{
    export const manifest =
        Library.UI.getElementById("link", "manifest");
    export const noscript =
        Library.UI.getElementById("div", "noscript");
    export const screenBody =
        Library.UI.getElementById("div", "screen-body");
    export const mediaScreen =
        Library.UI.getElementById("div", "media-screen");
    export const elementPool =
        Library.UI.getElementById("div", "element-pool");
    export const playButton =
        new Library.Control.Button({ id: "play-button", });
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
    export const shuffleButton =
        new Library.Control.Button({ id: "shuffle-button", });
    export const repeatButton =
        new Library.Control.Button({ id: "repeat-button", });
    export const volumeButton =
        new Library.Control.Button({ id: "volume-button", });
    export const volumeRange =
        new Library.Control.Range(control.volume);
    export const settingButton =
        new Library.Control.Button({ id: "setting-button", });
    export const mediaList =
        Library.UI.getElementById("div", "media-list");
    export const isScrolledToMediaListBottom = () =>
        UI.mediaList.scrollHeight <= UI.mediaList.scrollTop + (UI.mediaList.clientHeight *1) +(UI.addMediaButtonHeight *0.3);
    export const progressCircle =
        Library.UI.getElementById("div", "progress-circle");
    export const addMediaButton =
        new Library.Control.Button({ id: "add-media", });
    export const addMediaButtonHeight = 84;
    export const inputFile =
        Library.UI.getElementById("input", "add-file");
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
    export const crossFadeSelect = new Library.Control.Select
    (
        control.crossFade,
        {
            makeLabel: value => value <= 0 ?
                Library.Locale.map("cross-fade-0"):
                Tools.Timespan.toDisplayString(value)
        }
    );
    export const imageSpanSelect =
        new Library.Control.Select(control.imageSpan, { makeLabel: Tools.Timespan.toDisplayString });
    export const loopShortMediaCheckbox =
        new Library.Control.Checkbox(control.loopShortMedia);
    export const visualizerSelect =
        new Library.Control.Select(control.visualizer, { makeLabel: i => Library.Locale.map(`visualizer-${i}` as Library.Locale.Label), });
    export const overlayStyleSelect =
        new Library.Control.Select(control.overlayStyle, { makeLabel: i => Library.Locale.map(i as Library.Locale.Label), });
    export const clockPositionSelect =
        new Library.Control.Select(control.overlayPosition, { makeLabel: i => Library.Locale.map(i as Library.Locale.Label), });
    export const withClockCheckbox =
        new Library.Control.Checkbox(control.withClock);
    export const withWeatherCheckbox =
        new Library.Control.Checkbox(control.withWeather);
    export const withCalenderCheckbox =
        new Library.Control.Checkbox(control.withCalendar);
    export const showFpsCheckbox =
        new Library.Control.Checkbox(control.showFps);
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
                        `${i}: `
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
    export const fpsDisplay =
        Library.UI.getElementById("div", "fps");
    export const clockDisplay =
        Library.UI.getElementById("div", "clock-panel");
    export const calendar =
        Library.UI.getElementById("div", "calendar");
    export const weather =
        Library.UI.getElementById("span", "weather");
    export const date =
        Library.UI.getElementById("span", "date");
    export const time =
        Library.UI.getElementById("span", "time");
    export const keyboardShortcut =
        Library.UI.getElementById("div", "keyboard-shortcut");
    export const updateLanguage = () =>
    {
        Library.Locale.setLocale(UI.languageSelect.get() as Library.Locale.Language | "Auto");
        const lang = Library.Locale.getLocale();
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", Library.Locale.getDirection(lang));
        manifest.setAttribute("href", `web.manifest/generated/${lang}.json`);
        UI.overlayStyleSelect.reloadOptions();
        UI.languageSelect.reloadOptions();
        Library.UI.querySelectorAllWithFallback("span", [ "[data-lang-key]" ])
            .forEach(i => updateLabel(i));
        Library.UI.replaceChildren
        (
            UI.keyboardShortcut,
            Library.Shortcuts.getDisplayList().map
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
    }
    export const initialize = () =>
    {
        noscript.style.setProperty("display", "none");
        if ( ! Library.UI.fullscreenEnabled && withFullscreenCheckbox.dom.parentElement)
        {
            withFullscreenCheckbox.dom.parentElement.style.setProperty("display", "none");
        }
        Library.UI.setTextContent(Library.UI.querySelector("span", "#powered-by .title"), "powered by");
        Library.UI.replaceChildren
        (
            Library.UI.querySelector("ul", "#powered-by ul"),
            Object.entries(poweredBy).map
            (
                ([ text, href, ]) => ({ tag: "li", children: [ Library.UI.createElement({ tag: "a", text, attributes: { href, } }), ], })
            )
        );
    };
    export const getDataLangKey = (element: HTMLSpanElement) =>
        element.getAttribute("data-lang-key") as Library.Locale.Label;
    export const updateLabel = (element: HTMLSpanElement) =>
        Library.UI.setTextContent(element, Library.Locale.map(getDataLangKey(element)));
    export const setLabel = (element: HTMLSpanElement, label: Library.Locale.Label) =>
        element.setAttribute("data-lang-key", label);
    export const setAndUpdateLabel = (element: HTMLSpanElement, label: Library.Locale.Label) =>
    {
        setLabel(element, label);
        updateLabel(element);
    };
}
