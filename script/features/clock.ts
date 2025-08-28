import { phiColors } from "phi-colors";
import { Library } from "../library";
import { Tools } from "@tools";
import { UI } from "../ui";
import config from "@resource/config.json";
export namespace Clock
{
    export let title: string | undefined = undefined;
    export let subtitle: string | undefined = undefined;
    export const makeDate = (local: string | undefined): string =>
        new Date().toLocaleDateString
        (
            local,
            config.clock.dateFormat as Intl.DateTimeFormatOptions
        );
    export const makeTime = (local: string | undefined): string =>
        new Date().toLocaleTimeString
        (
            local,
            config.clock.timeFormat as Intl.DateTimeFormatOptions
        );
    export const updateText = (local: string | undefined): void =>
    {
        Library.UI.setTextContent(UI.date, subtitle ?? makeDate(local));
        Library.UI.setTextContent(UI.time, title ?? makeTime(local));
    };
    export const setColor = (color: string | undefined): void =>
    {
        Library.UI.setStyle(UI.date, "color", color);
        Library.UI.setStyle(UI.time, "color", color);
    };
    export let cloclLocale: string | undefined = undefined;
    const regulateH = (h: number) => Tools.Math.scale(phiColors.HslHMin, phiColors.HslHMax)(h);
    const regulateS = (s: number) => Tools.Math.scale(phiColors.HslSMin, phiColors.HslSMax)(s);
    const regulateL = (l: number) => Tools.Math.scale(phiColors.HslLMin, phiColors.HslLMax)(l);
    const RgbHueUnit = 1 / 3;
    const makeRgb = (step: number) => phiColors.clipRgb
    (
        phiColors.hslToRgb
        ({
            h: regulateH(((RgbHueUnit *step)) %1),
            s: regulateS(config.clock.phiColors.saturation),
            l: regulateL(config.clock.phiColors.lightness),
        })
    );
    export const update = (now: number) =>
    {
        const clockOption = UI.clockSelect.get();
        if ("hide" !== clockOption)
        {
            Clock.updateText(cloclLocale);
            switch(clockOption)
            {
            case "alternate":
                const isWhite = (new Date().getTime() /config.clock.alternate.span) %2 < 1.0;
                UI.clockDisplay.classList.toggle("white", isWhite);
                UI.clockDisplay.classList.toggle("black", ! isWhite);
                Clock.setColor(undefined);
                break;
            case "rainbow":
                Clock.setColor(phiColors.rgbForStyle(makeRgb((now / 7500) /phiColors.phi)));
                break;
            default:
                Clock.setColor(undefined);
                break;
            }
        }
    };
    export const initialize = (params: Record<string, string>) =>
    {
        title = params["title"];
        subtitle = params["subtitle"];
        UI.time.classList.toggle("text", undefined !== title);
    }
}
