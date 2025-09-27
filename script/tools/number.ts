export namespace NumberTools
{
    export const getIntegralDigits = (value: number): number =>
        1 <= value ? Math.floor(Math.log10(value)) +1: 0;
    export const toString = (value: number, maximumFractionDigits?: number) =>
        value.toLocaleString("en-US", { useGrouping: false, maximumFractionDigits, });
    export const parseInt = (text: string): number | undefined =>
    {
        const value = Number.parseInt(text, 10);
        return Number.isNaN(value) ? undefined : value;
    }
}
