import { Library } from "@library";
import { NumberTools } from "./number";
export namespace Timespan
{
    export const toHumanizedString = (value: number, maximumFractionDigits?: number, locales?: Intl.LocalesArgument) =>
    {
        let result: string[] = [];
        if (value < 1000)
        {
            result.push(`${NumberTools.toString(value, maximumFractionDigits, locales)} ${Library.Locale.map("timeUnitMs")}`);
        }
        else
        {
            const days = Math.floor(value /(24 *60 *60 *1000));
            if (0 < days)
            {
                result.push(`${days} ${Library.Locale.map("timeUnitD")}`);
            }
            const hours = Math.floor(value /(60 *60 *1000)) %24;
            if (0 < hours)
            {
                result.push(`${hours} ${Library.Locale.map("timeUnitH")}`);
            }
            const minutes = Math.floor(value /(60 *1000)) %60;
            if (0 < minutes)
            {
                result.push(`${minutes} ${Library.Locale.map("timeUnitM")}`);
            }
            const seconds = (value %(60 *1000)) /1000;
            if (0 < seconds)
            {
                result.push(`${seconds} ${Library.Locale.map("timeUnitS")}`);
            }
        }
        return result.join(" ");
    };
    export const toMediaTimeString = (value: number): string =>
    {
        if (Number.isNaN(value))
        {
            return "NaN";
        }
        else
        if (value < 0 || ! Number.isFinite(value))
        {
            return "00:00";
        }
        else
        {
            const seconds = Math.floor(value /1000);
            const hours = Math.floor(seconds /3600);
            const minutes = Math.floor((seconds %3600) /60);
            const secs = seconds %60;
            if (hours === 0)
            {
                return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
            }
            {
                return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
            }
        }
    };
    export const parse = (timespan: string): number | null =>
    {
        try
        {
            switch(typeof timespan)
            {
            case "number":
                return timespan;
            case "string":
                if (timespan.endsWith("ms"))
                {
                    return parseFloat(timespan.substring(0, timespan.length -2).trim());
                }
                else
                if (timespan.endsWith("s"))
                {
                    return parseFloat(timespan.substring(0, timespan.length -1).trim()) *1000;
                }
                else
                if (timespan.endsWith("m"))
                {
                    return parseFloat(timespan.substring(0, timespan.length -1).trim()) *60 *1000;
                }
                else
                if (timespan.endsWith("h"))
                {
                    return parseFloat(timespan.substring(0, timespan.length -1).trim()) *60 *60 *1000;
                }
                else
                if (timespan.endsWith("d"))
                {
                    return parseFloat(timespan.substring(0, timespan.length -1).trim()) *24 *60 *60 *1000;
                }
                else
                if (timespan.endsWith("w"))
                {
                    return parseFloat(timespan.substring(0, timespan.length -1).trim()) *7 *24 *60 *60 *1000;
                }
                else
                if (timespan.endsWith("y"))
                {
                    return parseFloat(timespan.substring(0, timespan.length -1).trim()) *365.2425 *24 *60 *60 *1000;
                }
                else
                {
                    return parseInt(timespan.trim());
                }
            }
        }
        catch(err)
        {
            console.error(err);
        }
        return null;
    };
}
