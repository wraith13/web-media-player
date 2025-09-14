import { Library } from "../library";
import { UI } from "../ui";
import config from "@resource/config.json";
const phi = (1 + Math.sqrt(5)) / 2;
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
                Clock.setColor(`hsl(${(now *360) / (24000 *phi)}, 100%, 50%)`);
                
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
