import { Tools } from "@tools";
import { Library } from "@library";
import config from "@resource/config.json";
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
    export const canvas =
        Library.UI.getElementById("div", "canvas");
    export const playButton =
        new Library.Control.Button({ id: "play-button", });
    export const runBenchmarkButton =
        new Library.Control.Button({ id: "run-benchmark", });
    export const introductionButton =
        new Library.Control.Button({ id: "introduction-button", });
    export const colorspaceSelect =
        new Library.Control.Select(control.colorspace);
    export const coloringSelect =
        new Library.Control.Select(control.coloring);
    export const patternSelect =
        new Library.Control.Select(control.pattern, { makeLabel: i => Library.Locale.map(i as Library.Locale.Label), });
    export const canvasSizeSelect =
        new Library.Control.Select(control.canvasSize, { makeLabel: i => `${i} %` });
    export const layersSelect =
        new Library.Control.Select(control.layers);
    export const spotslayersSelect =
        new Library.Control.Select(control.spotsLayers, { makeLabel: i => `${i} %` });
    export const cycleSpanSelect =
        new Library.Control.Select(control.cycleSpan, { makeLabel: Tools.Timespan.toDisplayString });
    export const fuseFpsSelect =
        new Library.Control.Select(control.fuseFps);
    export const getFrameDelayLabel = (i: number) => Tools.Timespan.toDisplayString(i);
    export const frameDelaySelect =
        new Library.Control.Select(control.frameDelay, { makeLabel: getFrameDelayLabel });
    export const easingCheckbox =
        new Library.Control.Checkbox(control.easing);
    export const withFullscreen =
        new Library.Control.Checkbox(control.withFullscreen);
    export const showFps =
        new Library.Control.Checkbox(control.showFps);
    export const clockSelect =
        new Library.Control.Select(control.clock, { makeLabel: i => Library.Locale.map(i as Library.Locale.Label), });
    export const brightnessSelect =
        new Library.Control.Select(control.brightness, { makeLabel: i => `${i} %` });
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
    export const introductionPanel =
        Library.UI.getElementById("div", "popup-introduction-panel");
    export const fpsDisplay =
        Library.UI.getElementById("div", "fps");
    export const clockDisplay =
        Library.UI.getElementById("div", "clock-panel");
    export const date =
        Library.UI.getElementById("span", "date");
    export const time =
        Library.UI.getElementById("span", "time");
    export const benchmarkProgressBar =
        Library.UI.getElementById("div", "benchmark-progress-bar");
    export const benchmarkCanvas =
        Library.UI.getElementById("div", "benchmark-canvas");
    export const keyboardShortcut =
        Library.UI.getElementById("div", "keyboard-shortcut");
    export const benchmarkTotalScore =
        Library.UI.getElementById("span", "benchmark-total-score");
    export const benchmarkScorePerFullHD =
        Library.UI.getElementById("span", "benchmark-score-per-fullhd");
    export const benchmarkCalculationScore =
        Library.UI.getElementById("span", "benchmark-calculation-score");
    export const benchmarkLinesCalculationScore =
        Library.UI.getElementById("span", "benchmark-lines-calculation-score");
    export const benchmarkSpotsCalculationScore =
        Library.UI.getElementById("span", "benchmark-spots-calculation-score");
    export const benchmarkLinesRenderingScore =
        Library.UI.getElementById("span", "benchmark-lines-rendering-score");
    export const benchmarkSpotsRenderingScore =
        Library.UI.getElementById("span", "benchmark-spots-rendering-score");
    export const benchmarkDisplayScore =
        Library.UI.getElementById("span", "benchmark-display-score");
    export const benchmarkFpsScore =
        Library.UI.getElementById("span", "benchmark-fps-score");
    export const benchmarkScreenResolutionScore =
        Library.UI.getElementById("span", "benchmark-screen-resolution-score");
    export const benchmarkScreenWidth =
        Library.UI.getElementById("span", "benchmark-screen-width");
    export const benchmarkScreenHeight =
        Library.UI.getElementById("span", "benchmark-screen-height");
    export const benchmarkDevicePixelRatio =
        Library.UI.getElementById("span", "benchmark-device-pixel-ratio");
    export const benchmarkScreenColorDepth =
        Library.UI.getElementById("span", "benchmark-screen-color-depth");
    export const benchmarkPopupLabel =
        Library.UI.getElementById("span", "benchmark-popup-label");
    export const benchmarkPopupValue =
        Library.UI.getElementById("span", "benchmark-popup-value");
    export const benchmarkAbortButton =
        new Library.Control.Button({ id: "benchmark-abort-button", });
    export const benchmarkResultCloseButton =
        new Library.Control.Button({ id: "benchmark-result-close-button", });
    export const updateLanguage = () =>
    {
        Library.Locale.setLocale(UI.languageSelect.get() as Library.Locale.Language | "Auto");
        const lang = Library.Locale.getLocale();
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", Library.Locale.getDirection(lang));
        manifest.setAttribute("href", `web.manifest/generated/${lang}.json`);
        UI.colorspaceSelect.reloadOptions();
        UI.coloringSelect.reloadOptions();
        UI.patternSelect.reloadOptions();
        UI.canvasSizeSelect.reloadOptions();
        UI.layersSelect.reloadOptions();
        UI.cycleSpanSelect.reloadOptions();
        UI.fuseFpsSelect.reloadOptions();
        UI.frameDelaySelect.reloadOptions();
        UI.clockSelect.reloadOptions();
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
        Library.UI.replaceChildren
        (
            Library.UI.getElementById("ul", "information-list"),
            config.informations.map(i => ({ tag: "li", text: Library.Locale.map(<Library.Locale.Label>i), }))
        );
    }
    export const initialize = () =>
    {
        noscript.style.setProperty("display", "none");
        if ( ! Library.UI.fullscreenEnabled && withFullscreen.dom.parentElement)
        {
            withFullscreen.dom.parentElement.style.setProperty("display", "none");
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
