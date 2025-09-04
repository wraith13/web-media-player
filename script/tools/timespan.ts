import { Library } from "@library";
import { NumberTools } from "./number";
export namespace Timespan
{
    export const toDisplayString = (value: number, maximumFractionDigits?: number) =>
        value < 1000 ? `${NumberTools.toString(value, maximumFractionDigits)} ${Library.Locale.map("timeUnitMs")}`:
        value < 60 *1000 ? `${NumberTools.toString(value /1000, maximumFractionDigits)} ${Library.Locale.map("timeUnitS")}`:
        value < 60 *60 *1000 ?`${NumberTools.toString(value /(60 *1000), maximumFractionDigits)} ${Library.Locale.map("timeUnitM")}`:
        value < 24 *60 *60 *1000 ?`${NumberTools.toString(value /(60 *60 *1000), maximumFractionDigits)} ${Library.Locale.map("timeUnitH")}`:
            `${NumberTools.toString(value /(24 *60 *60 *1000), maximumFractionDigits)} ${Library.Locale.map("timeUnitD")}`;
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
}
