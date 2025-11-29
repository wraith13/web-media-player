import { Library } from "../library";
import { Tools } from "../tools";
import { UI } from "../ui";
import { Weather } from "./weather";
import config from "@resource/config.json";
const phi = (1 + Math.sqrt(5)) / 2;
export namespace Overlay
{
    export let firstDayOfWeek: number = config.clock.firstDayOfWeek;
    export let locale: string | undefined = undefined;
    export let title: string | undefined = undefined;
    export let subtitle: string | undefined = undefined;
    export const updateAnalogClock = (date: Date): void =>
    {
        const isAnalogClockEnabled = UI.analogClockCheckbox.get();
        UI.analogClock.panel.classList.toggle("hide", ! isAnalogClockEnabled);
        if (isAnalogClockEnabled)
        {
            UI.analogClock.milliSecondsNiddle.classList.toggle("hide", ! UI.millisecondHandCheckbox.get());
            const milliSeconds = date.getMilliseconds();
            const seconds = date.getSeconds() + (milliSeconds /1000);
            const minutes = date.getMinutes() + (seconds /60);
            const hours = date.getHours() %12 + (minutes /60);
            const milliSecondsAngle = milliSeconds /1000;
            const secondsAngle = seconds /60;
            const minutesAngle = minutes /60;
            const hoursAngle = hours /12;
            Library.UI.setStyle(UI.analogClock.milliSecondsNiddle, "--progress", `${milliSecondsAngle}`);
            Library.UI.setStyle(UI.analogClock.secondsNiddle, "--progress", `${secondsAngle}`);
            Library.UI.setStyle(UI.analogClock.minutesNiddle, "--progress", `${minutesAngle}`);
            Library.UI.setStyle(UI.analogClock.hoursNiddle, "--progress", `${hoursAngle}`);
        }
    }
    export const makeDate = (date: Date, locale: string | undefined): string =>
        date.toLocaleDateString
        (
            locale,
            config.clock.dateFormat as Intl.DateTimeFormatOptions
        );
    export const makeTime = (date: Date, locale: string | undefined): string =>
        date.toLocaleTimeString
        (
            locale,
            config.clock.timeFormat as Intl.DateTimeFormatOptions
        );
    export const updateLayout = (date: Date): void =>
    {
        if (UI.overlay.classList.contains("rotate"))
        {
            const direction = ((date.getHours() %12) /3) |0;
            [
                "top-right",
                "bottom-right",
                "bottom-left",
                "top-left",
            ]
            .forEach((i, ix) => UI.overlay.classList.toggle(i, direction === ix));
        }
    };
    export const updateWeather = (): void =>
    {
        if (UI.withWeatherCheckbox.get())
        {
            const weather = Weather.get();
            if (UI.weather.attributes.getNamedItem("data-weather")?.value !== weather)
            {
                const attribute = document.createAttribute("data-weather");
                attribute.value = weather;
                UI.weather.attributes.setNamedItem(attribute);
                const firstLetter = weather.match(/\S+/)?.[0] ?? "";
                const tail = weather.slice(firstLetter.length).trim();
                Library.UI.replaceChildren
                (
                    UI.weather,
                    [
                        {
                            tag: "span",
                            className: "first-letter",
                            text: firstLetter,
                        },
                        {
                            tag: "span",
                            className: "tail",
                            text: tail,
                        }
                    ]
                );
            }
        }
        else
        {
            Library.UI.setTextContent(UI.weather, "");
        }
    };
    export const updateTime = (date: Date): void =>
    {
        if (UI.withClockCheckbox.get())
        {
            Library.UI.setTextContent(UI.time, title ?? makeTime(date, locale));
        }
        else
        {
            Library.UI.setTextContent(UI.time, "");
        }
    };
    export const updateDate = (date: Date): void =>
    {
        if (UI.withDateCheckbox.get())
        {
            Library.UI.setTextContent(UI.date, subtitle ?? makeDate(date, locale));
        }
        else
        {
            Library.UI.setTextContent(UI.date, "");
        }
    };
    export const updateCalendar = (date: Date): void =>
    {
        const dateDate = UI.withCalenderCheckbox.get() ? makeDate(date, locale): "";
        if (UI.calendar.attributes.getNamedItem("data-date")?.value !== dateDate)
        {
            const attribute = document.createAttribute("data-date");
            attribute.value = dateDate;
            UI.calendar.attributes.setNamedItem(attribute);
            if ("" === dateDate)
            {
                Library.UI.removeAllChildren(UI.calendar);
            }
            else
            {
                const weeks: Library.UI.ElementSource<"div">[] = [];
                const currentDate = new Date(date);
                const currentDay = currentDate.getDay();
                const offset = (currentDay - firstDayOfWeek + 7) % 7;
                const startOfWeek = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() - offset);
                for (let w = -3; w <= 3; ++w)
                {
                    const weekDays: Library.UI.ElementSource<"span">[] = [];
                    for (let d = 0; d < 7; ++d)
                    {
                        const day = new Date(startOfWeek);
                        day.setDate(startOfWeek.getDate() + w * 7 + d);
                        weekDays.push
                        ({
                            tag: "span",
                            className: `day${currentDate.getMonth() === day.getMonth() && currentDate.getDate() === day.getDate() ? " today": ""}${currentDate.getMonth() === day.getMonth() ? " current-month": ""}`,
                            text: day.getDate().toString(),
                        });
                    }
                    weeks.push
                    ({
                        tag: "div",
                        className: "week",
                        children: weekDays,
                    });
                }
                Library.UI.replaceChildren
                (
                    UI.calendar,
                    weeks,
                );
            }
        }
    };
    export const setColor = (color: string | undefined): void =>
    {
        Library.UI.setStyle(UI.calendar, "color", color);
        Library.UI.setStyle(UI.weather, "color", color);
        Library.UI.setStyle(UI.date, "color", color);
        Library.UI.setStyle(UI.time, "color", color);
    };
    export const update = (now: number) =>
    {
        const overlayOption = UI.overlayStyleSelect.get();
        if ("hide" !== overlayOption)
        {
            const date = new Date();
            updateAnalogClock(date);
            updateLayout(date);
            updateWeather();
            updateTime(date);
            updateDate(date);
            updateCalendar(date);
            switch(overlayOption)
            {
            case "alternate":
                const isWhite = (new Date().getTime() /config.clock.alternate.span) %2 < 1.0;
                UI.overlay.classList.toggle("white", isWhite);
                UI.overlay.classList.toggle("black", ! isWhite);
                setColor(undefined);
                break;
            case "rainbow":
                setColor(`hsl(${(now *360) / (24000 *phi)}, 100%, 50%)`);
                break;
            default:
                setColor(undefined);
                break;
            }
        }
    };
    export const initialize = (params: Record<string, string>) =>
    {
        firstDayOfWeek = (Tools.Number.parseInt(params["first-day-of-week"]) ?? config.clock.firstDayOfWeek) %7;
        locale = params["locale"];
        title = params["title"];
        subtitle = params["subtitle"];
        UI.time.classList.toggle("text", undefined !== title);
    }
}
