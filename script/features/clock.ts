import { Library } from "../library";
import { UI } from "../ui";
import config from "@resource/config.json";
export namespace Clock
{
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
    export const update = (local: string | undefined): void =>
    {
        Library.UI.setTextContent(UI.date, makeDate(local));
        Library.UI.setTextContent(UI.time, makeTime(local));
    };
    export const setColor = (color: string | undefined): void =>
    {
        Library.UI.setStyle(UI.date, "color", color);
        Library.UI.setStyle(UI.time, "color", color);
    };
}
