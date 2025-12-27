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
    export const setAnalogClockNeedleAngle = (needle: HTMLDivElement, angle: number) =>
        Library.UI.setStyle(needle, "--progress", angle.toFixed(angleFractionDigits));
    export const getEnoughAngleFractionDigits = (): number =>
    {
        const { innerWidth, innerHeight, devicePixelRatio } = window;
        // const diagonal = Math.hypot(innerWidth, innerHeight) * devicePixelRatio;
        // const circumference = Math.PI * diagonal;
        // Ideally this should be calculated by the expression above, but here — for the precision of the analog clock hands — we use the short side instead
        const shortSide = Math.min(innerWidth, innerHeight) * devicePixelRatio;
        const circumference = Math.PI * shortSide;
        if (circumference <= 1)
        {
            // Client area is effectively zero (viewport collapsed); no fractional digits required
            return 0;
        }
        else
        {
            return Math.ceil(Math.log10(circumference));
        }
    };
    let angleFractionDigits = getEnoughAngleFractionDigits();
    export const updateStretch = () =>
    {
        Library.UI.setStyle // Manually update --short-side for legacy browser compatibility
        (
            document.documentElement,
            "--short-side",
            `${(Math.min(window.innerWidth, window.innerHeight) /100).toFixed(3)}px`
        );
        const newAngleFractionDigits = getEnoughAngleFractionDigits();
        if (angleFractionDigits !== newAngleFractionDigits)
        {
            angleFractionDigits = newAngleFractionDigits;
            console.log(`📈 Updated angleFractionDigits to ${newAngleFractionDigits}`);
        }
    };
    export const getAnalogClockSize = (): number | null =>
    {
        const analogClockOption = UI.SettingsPanel.analogClockSelect.get();
        switch(analogClockOption)
        {
        case "oversize":
        case "regular":
        case "half":
        case "petit":
            return config.analogClock.sizeMap[analogClockOption] ?? null;
        default:
            return null;
        }
    };
    export const updateAnalogClock = (date: Date): void =>
    {
        const analogClockSize = getAnalogClockSize();
        const isAnalogClockEnabled = null !== analogClockSize;
        const isSlimClockEnabled = UI.SettingsPanel.analogClockSlimCheckbox.get();
        UI.AnalogClock.panel.classList.toggle("slim", isSlimClockEnabled);
        UI.AnalogClock.panel.classList.toggle("hide", ! isAnalogClockEnabled);
        UI.AnalogClock.background.classList.toggle("hide", ! isAnalogClockEnabled);
        if (analogClockSize)
        {
            Library.UI.setStyle
            (
                UI.AnalogClock.panel,
                "--analog-clock-size",
                `${(analogClockSize).toFixed(3)}`
            );
            Library.UI.setStyle
            (
                UI.AnalogClock.background,
                "--analog-clock-size",
                `${(analogClockSize).toFixed(3)}`
            );
            const is24HoursHandEnabled = UI.SettingsPanel.dayHandCheckbox.get();
            const isDateHandsEnabled = UI.SettingsPanel.dateHandsCheckbox.get();
            const isMillisecondHandEnabled = UI.SettingsPanel.millisecondHandCheckbox.get();
            UI.AnalogClock.milliSecondsNeedle.classList.toggle("hide", ! isMillisecondHandEnabled);
            UI.AnalogClock.dayNeedle.classList.toggle("hide", ! is24HoursHandEnabled);
            UI.AnalogClock.yearNeedle.classList.toggle("hide", ! isDateHandsEnabled);
            UI.AnalogClock.monthNeedle.classList.toggle("hide", ! isDateHandsEnabled);
            UI.AnalogClock.weekNeedle.classList.toggle("hide", ! isDateHandsEnabled);
            const milliSeconds = date.getMilliseconds();
            const seconds = date.getSeconds() + (milliSeconds /1000);
            const minutes = date.getMinutes() + (seconds /60);
            const hours = date.getHours() + (minutes /60);
            const secondsAngle = seconds /60;
            const minutesAngle = minutes /60;
            const hoursAngle = hours %12 /12;
            const milliSecondsAngle = milliSeconds /1000;
            if (isDateHandsEnabled)
            {
                const week = date.getDay() + (hours /24);
                const month = (date.getDate() -1) + (hours /24);
                const daysOfThisMonth = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
                const year = date.getMonth() + (month /daysOfThisMonth);
                const weekAngle = week /7;
                const monthAngle = month /daysOfThisMonth;
                const yearAngle = year /12;
                if (! (UI.AnalogClock.monthNeedle.style.getPropertyValue("--progress") ?? "").startsWith(monthAngle.toFixed(1)))
                {
                    if (monthAngle < 0.5)
                    {
                        // Case where the trace crosses a month boundary
                        const daysOfLastMonth = new Date
                        (
                            0 === date.getMonth() ? date.getFullYear() -1 : date.getFullYear(),
                            date.getMonth(),
                            0
                        ).getDate();
                        // Because the latter half represents days from the previous month, set the order to `${daysOfThisMonth}${daysOfLastMonth}`
                        Library.UI.setAttribute(UI.AnalogClock.monthPanel, "data-days", `${daysOfThisMonth}${daysOfLastMonth}`);
                    }
                    else
                    {
                        Library.UI.setAttribute(UI.AnalogClock.monthPanel, "data-days", `${daysOfThisMonth}${daysOfThisMonth}`);
                    }
                }
                setAnalogClockNeedleAngle(UI.AnalogClock.weekNeedle, weekAngle);
                setAnalogClockNeedleAngle(UI.AnalogClock.monthNeedle, monthAngle);
                setAnalogClockNeedleAngle(UI.AnalogClock.yearNeedle, yearAngle);
            }
            if (is24HoursHandEnabled)
            {
                const dayAngle = hours /24;
                setAnalogClockNeedleAngle(UI.AnalogClock.dayNeedle, dayAngle);
            }
            setAnalogClockNeedleAngle(UI.AnalogClock.milliSecondsNeedle, milliSecondsAngle);
            setAnalogClockNeedleAngle(UI.AnalogClock.secondsNeedle, secondsAngle);
            setAnalogClockNeedleAngle(UI.AnalogClock.minutesNeedle, minutesAngle);
            setAnalogClockNeedleAngle(UI.AnalogClock.hoursNeedle, hoursAngle);
            Library.UI.setAttribute(UI.AnalogClock.panel, "datatime", date.toISOString().replace(/\.\d{3}Z$/, "Z"));
            Library.UI.setStyle(UI.AnalogClock.background, "--clock-outer-size", isMillisecondHandEnabled ? "96": "95");
            Library.UI.setStyle
            (
                UI.AnalogClock.background,
                "--clock-inner-size",
                isDateHandsEnabled ? (isSlimClockEnabled ? "60": "25"):
                is24HoursHandEnabled ? (isSlimClockEnabled ? "72.5": "50"):
                    (isSlimClockEnabled ? "75": "55")
            );
        }
        else
        {
            Library.UI.setAttribute(UI.AnalogClock.panel, "datatime", undefined);
        }
    };
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
        if (UI.OverlayPanel.panel.classList.contains("rotate"))
        {
            const direction = ((date.getHours() %12) /3) |0;
            [
                "top-right",
                "bottom-right",
                "bottom-left",
                "top-left",
            ]
            .forEach((i, ix) => UI.OverlayPanel.panel.classList.toggle(i, direction === ix));
        }
    };
    export const updateWeather = (): void =>
    {
        if (UI.SettingsPanel.withWeatherCheckbox.get())
        {
            const weather = Weather.get();
            if (UI.OverlayPanel.weather.attributes.getNamedItem("data-weather")?.value !== weather)
            {
                const attribute = document.createAttribute("data-weather");
                attribute.value = weather;
                UI.OverlayPanel.weather.attributes.setNamedItem(attribute);
                const firstLetter = weather.match(/\S+/)?.[0] ?? "";
                const tail = weather.slice(firstLetter.length).trim();
                Library.UI.replaceChildren
                (
                    UI.OverlayPanel.weather,
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
            Library.UI.setTextContent(UI.OverlayPanel.weather, "");
        }
    };
    export const updateTime = (date: Date): void =>
    {
        if (UI.SettingsPanel.withClockCheckbox.get())
        {
            Library.UI.setTextContent(UI.OverlayPanel.time, title ?? makeTime(date, locale));
            Library.UI.setAttribute(UI.OverlayPanel.time, "datatime", makeTime(date, "ja-JP"));
        }
        else
        {
            Library.UI.setTextContent(UI.OverlayPanel.time, "");
            Library.UI.setAttribute(UI.OverlayPanel.time, "datatime", undefined);
        }
    };
    export const updateDate = (date: Date): void =>
    {
        if (UI.SettingsPanel.withDateCheckbox.get())
        {
            Library.UI.setTextContent(UI.OverlayPanel.date, subtitle ?? makeDate(date, locale));
            Library.UI.setAttribute(UI.OverlayPanel.date, "datatime", date.toISOString().slice(0, 10));
        }
        else
        {
            Library.UI.setTextContent(UI.OverlayPanel.date, "");
            Library.UI.setAttribute(UI.OverlayPanel.date, "datatime", undefined);
        }
    };
    export const updateCalendar = (date: Date): void =>
    {
        const dateDate = UI.SettingsPanel.withCalenderCheckbox.get() ? makeDate(date, locale): "";
        if (UI.OverlayPanel.calendar.attributes.getNamedItem("data-date")?.value !== dateDate)
        {
            const attribute = document.createAttribute("data-date");
            attribute.value = dateDate;
            UI.OverlayPanel.calendar.attributes.setNamedItem(attribute);
            if ("" === dateDate)
            {
                Library.UI.removeAllChildren(UI.OverlayPanel.calendar);
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
                    UI.OverlayPanel.calendar,
                    weeks,
                );
            }
        }
    };
    export const setColor = (color: string | undefined): void =>
    {
        Library.UI.setStyle(UI.OverlayPanel.calendar, "color", color);
        Library.UI.setStyle(UI.OverlayPanel.weather, "color", color);
        Library.UI.setStyle(UI.OverlayPanel.date, "color", color);
        Library.UI.setStyle(UI.OverlayPanel.time, "color", color);
    };
    export const update = (now: number) =>
    {
        const overlayOption = UI.SettingsPanel.overlayStyleSelect.get();
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
                UI.OverlayPanel.panel.classList.toggle("white", isWhite);
                UI.OverlayPanel.panel.classList.toggle("black", ! isWhite);
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
        UI.OverlayPanel.time.classList.toggle("text", undefined !== title);
    }
}
