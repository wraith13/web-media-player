import { Number } from "./number";
export namespace Byte
{
    const toString = (value: number, maximumDigits?: number) =>
        value.toLocaleString
        (
            undefined,
            {
                maximumFractionDigits:
                    undefined === maximumDigits ? undefined:
                    Math.max(0, maximumDigits -Number.getIntegralDigits(value)),

            }
        );
    export const toDisplayString = (value: number, maximumDigits?: number) =>
        value < 1024 ? `${toString(value, maximumDigits)} B`:
        value < 1024 *1024 ? `${toString(value /1024, maximumDigits)} KiB`:
        value < 1024 *1024 *1024 ? `${toString(value /(1024 *1024), maximumDigits)} MiB`:
        value < 1024 *1024 *1024 *1024 ? `${toString(value /(1024 *1024 *1024 *1024), maximumDigits)} GiB`:
            `${toString(value /(1024 *1024 *1024 *1024 *1024), maximumDigits)} TiB`;
}
