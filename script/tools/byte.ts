import { NumberTools } from "./number";
export namespace Byte
{
    const toString = (value: number, maximumDigits?: number, locale?: Intl.LocalesArgument) =>
        value.toLocaleString
        (
            locale,
            {
                maximumFractionDigits:
                    undefined === maximumDigits ? undefined:
                    Math.max(0, maximumDigits -NumberTools.getIntegralDigits(value)),

            }
        );
    export const toDisplayString = (value: number, maximumDigits?: number, locale?: Intl.LocalesArgument) =>
        value < 1024 ? `${toString(value, maximumDigits, locale)} B`:
        value < 1024 *1024 ? `${toString(value /1024, maximumDigits, locale)} KiB`:
        value < 1024 *1024 *1024 ? `${toString(value /(1024 *1024), maximumDigits, locale)} MiB`:
        value < 1024 *1024 *1024 *1024 ? `${toString(value /(1024 *1024 *1024 *1024), maximumDigits, locale)} GiB`:
            `${toString(value /(1024 *1024 *1024 *1024 *1024), maximumDigits, locale)} TiB`;
}
