import { Hash } from "./hash";
export namespace Random
{
    export type Function = (index?: number, prime?: number) => number;
    export const makeInteger = (size: number, random: Function = () => Math.random(), index?: number, prime?: number) =>
        Math.floor(random(index, prime) *size);
    export const select = <T>(list: T[], random: Function = Math.random, index?: number, prime?: number): T =>
        list[makeInteger(list.length, random, index, prime)];
    export class IndexedRandom
    {
        public index: number = 0;
        constructor(private hash32: (key: string) => number = Hash.fnv1a_32, private seed: number | string = Math.random(), private prime: number = 31)
            { }
        public get = (index?: number, prime?: number): number =>
            this.hash32(`${this.seed}:${(prime ?? this.prime) *(index ?? (this.index++))}`) /0xFFFFFFFF;
        public getFunction = (): Function =>
            this.get.bind(this);
        public setIndex = (index: number) =>
            this.index = index;
        public resetIndex = () =>
            this.setIndex(0);
    }
}
