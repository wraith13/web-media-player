import { TypeGuards } from "./type-guards";
import { Math } from "./math";
export namespace Array
{
    export const cycleSelect = <T extends unknown[], Index extends number>(list: T, ix: Index) =>
        (
            0 < list.length ?
                list[Math.mod(ix, list.length)]:
                undefined
        ) as T[Index] extends never ? undefined: T[Index];
    export const joinable = <T>(value: T, condition?: boolean) =>
        TypeGuards.hasValue(value) && (condition ?? true) ? [ value, ]: [];
    export const uniqueFilter = <T>(i: T, ix:number, list: T[]) =>
        ix === list.indexOf(i);
    export const lookupValue = <T>(list: T[], value: T): T | undefined =>
        list.includes(value) ? value : undefined;
}
