import { Library } from "@library";
import { Number } from "./number";
export namespace Timespan
{
    export const toDisplayString = (value: number, maximumFractionDigits?: number) =>
        value < 1000 ? `${Number.toString(value, maximumFractionDigits)} ${Library.Locale.map("timeUnitMs")}`:
        value < 60 *1000 ? `${Number.toString(value /1000, maximumFractionDigits)} ${Library.Locale.map("timeUnitS")}`:
        value < 60 *60 *1000 ?`${Number.toString(value /(60 *1000), maximumFractionDigits)} ${Library.Locale.map("timeUnitM")}`:
        value < 24 *60 *60 *1000 ?`${Number.toString(value /(60 *60 *1000), maximumFractionDigits)} ${Library.Locale.map("timeUnitH")}`:
            `${Number.toString(value /(24 *60 *60 *1000), maximumFractionDigits)} ${Library.Locale.map("timeUnitD")}`;
}
