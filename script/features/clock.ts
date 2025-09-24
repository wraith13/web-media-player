import { Library } from "../library";
import { UI } from "../ui";
import config from "@resource/config.json";
const phi = (1 + Math.sqrt(5)) / 2;
export namespace Clock
{
    export let title: string | undefined = undefined;
    export let subtitle: string | undefined = undefined;
    export const makeDate = (date: Date, local: string | undefined): string =>
        date.toLocaleDateString
        (
            local,
            config.clock.dateFormat as Intl.DateTimeFormatOptions
        );
    export const makeTime = (date: Date, local: string | undefined): string =>
        date.toLocaleTimeString
        (
            local,
            config.clock.timeFormat as Intl.DateTimeFormatOptions
        );
    export const updateText = (local: string | undefined): void =>
    {
        const date = new Date();
        const dateText = makeDate(date, local);
        Library.UI.setTextContent(UI.date, subtitle ?? dateText);
        Library.UI.setTextContent(UI.time, title ?? makeTime(date, local));
        if (UI.clockDisplay.classList.contains("rotate"))
        {
            const direction = ((new Date().getHours() %12) /3) |0;
            [
                "top-right",
                "bottom-right",
                "bottom-left",
                "top-left",
            ]
            .forEach((i, ix) => UI.clockDisplay.classList.toggle(i, direction === ix));
        }
        if (UI.calendar.attributes.getNamedItem("data-date")?.value !== dateText)
        {
            const attribute = document.createAttribute("data-date");
            attribute.value = dateText;
            UI.calendar.attributes.setNamedItem(attribute);
            const weeks: string[] = [];
            const currentDate = new Date(date);
            const currentDay = currentDate.getDay();
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDay);
            for (let w = -3; w <= 3; ++w)
            {
                const weekDays: Date[] = [];
                for (let d = 0; d < 7; ++d)
                {
                    const day = new Date(startOfWeek);
                    day.setDate(startOfWeek.getDate() + w * 7 + d);
                    weekDays.push(day);
                }
                weeks.push(`<div class="week">${weekDays.map(day => `<span class="day${currentDate.getMonth() === day.getMonth() && currentDate.getDate() === day.getDate() ? " today": ""}${currentDate.getMonth() === day.getMonth() ? " current-month": ""}">${day.getDate().toString()}</span>`).join("")}</div>`);
            }
            UI.calendar.innerHTML = weeks.join("");
        }
    };
    export const setColor = (color: string | undefined): void =>
    {
        Library.UI.setStyle(UI.calendar, "color", color);
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
