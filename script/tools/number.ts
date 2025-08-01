export namespace Number
{
    export const toString = (value: number, maximumFractionDigits?: number) =>
        value.toLocaleString("en-US", { useGrouping: false, maximumFractionDigits, });
}
