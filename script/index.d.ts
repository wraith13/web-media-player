declare module "script/tools/type-guards" {
    export namespace TypeGuards {
        const hasValue: <T>(value: T | null | undefined) => value is T;
        const has: <KeyType extends string | string[]>(keyOrKeys: KeyType) => <ObjectType>(object: ObjectType | undefined) => object is ObjectType & (KeyType extends string ? { [PropertyName in KeyType]: Exclude<PropertyName extends keyof ObjectType ? ObjectType[PropertyName] : any, undefined>; } : KeyType extends string[] ? { [Prop in KeyType[number]]: Exclude<Prop extends keyof ObjectType ? ObjectType[Prop] : any, undefined>; } : never);
    }
}
declare module "script/tools/number" {
    export namespace Number {
        const toString: (value: number, maximumFractionDigits?: number) => string;
    }
}
declare module "script/tools/math" {
    export namespace Math {
        const scale: (min: number, max: number) => (r: number) => number;
        const sum: (numbers: number[]) => number;
        const mod: (n: number, m: number) => number;
    }
}
declare module "script/tools/array" {
    export namespace Array {
        const cycleSelect: <T extends unknown[], Index extends number>(list: T, ix: Index) => T[Index] extends never ? undefined : T[Index];
        const joinable: <T>(value: T, condition?: boolean) => T[];
        const uniqueFilter: <T>(i: T, ix: number, list: T[]) => boolean;
        const lookupValue: <T>(list: T[], value: T) => T | undefined;
    }
}
declare module "locale/generated/master" {
    export const localeMaster: {
        en: {
            "lang-label": string;
            "lang-direction": string;
            Auto: string;
            description: string;
            "colorspace-label": string;
            "coloring-label": string;
            "pattern-label": string;
            lines: string;
            spots: string;
            both: string;
            "canvas-size-label": string;
            "layers-label": string;
            "spots-layers-label": string;
            "cycle-span-label": string;
            "fuse-fps-label": string;
            "frame-delay-label": string;
            "easing-label": string;
            "with-fullscreen-label": string;
            "show-fps-label": string;
            "clock-label": string;
            "brightness-label": string;
            hide: string;
            blend: string;
            white: string;
            black: string;
            system: string;
            alternate: string;
            rainbow: string;
            "language-label": string;
            "url-label": string;
            "run-benchmark-label": string;
            informationFuseFps: string;
            timeUnitMs: string;
            timeUnitS: string;
            timeUnitM: string;
            timeUnitH: string;
            timeUnitD: string;
            ago: string;
            "Hide UI": string;
            "Play / Pause": string;
            "Switch Pattern": string;
            "Switch Coloring": string;
            "Scaling Canvas Size": string;
            "Increase / Decrease Frame Delay": string;
            "Increase / Decrease Layer": string;
            "Speed Down / Up": string;
            FullScreen: string;
            "Show FPS": string;
            "Switch Clock": string;
            "noscript-message": string;
            "noscript-introduction-title": string;
            "noscript-introduction-description": string;
        };
        ja: {
            "lang-label": string;
            "lang-direction": string;
            Auto: string;
            description: string;
            "colorspace-label": string;
            "coloring-label": string;
            "pattern-label": string;
            lines: string;
            spots: string;
            both: string;
            "canvas-size-label": string;
            "layers-label": string;
            "spots-layers-label": string;
            "cycle-span-label": string;
            "fuse-fps-label": string;
            "frame-delay-label": string;
            "easing-label": string;
            "with-fullscreen-label": string;
            "show-fps-label": string;
            "clock-label": string;
            "brightness-label": string;
            hide: string;
            blend: string;
            white: string;
            black: string;
            system: string;
            alternate: string;
            rainbow: string;
            "language-label": string;
            "url-label": string;
            "run-benchmark-label": string;
            informationFuseFps: string;
            timeUnitMs: string;
            timeUnitS: string;
            timeUnitM: string;
            timeUnitH: string;
            timeUnitD: string;
            ago: string;
            "Hide UI": string;
            "Play / Pause": string;
            "Switch Pattern": string;
            "Switch Coloring": string;
            "Scaling Canvas Size": string;
            "Increase / Decrease Frame Delay": string;
            "Increase / Decrease Layer": string;
            "Speed Down / Up": string;
            FullScreen: string;
            "Show FPS": string;
            "Switch Clock": string;
            "noscript-message": string;
            "noscript-introduction-title": string;
            "noscript-introduction-description": string;
        };
    };
}
declare module "script/library/locale" {
    export namespace Locale {
        const master: {
            en: {
                "lang-label": string;
                "lang-direction": string;
                Auto: string;
                description: string;
                "colorspace-label": string;
                "coloring-label": string;
                "pattern-label": string;
                lines: string;
                spots: string;
                both: string;
                "canvas-size-label": string;
                "layers-label": string;
                "spots-layers-label": string;
                "cycle-span-label": string;
                "fuse-fps-label": string;
                "frame-delay-label": string;
                "easing-label": string;
                "with-fullscreen-label": string;
                "show-fps-label": string;
                "clock-label": string;
                "brightness-label": string;
                hide: string;
                blend: string;
                white: string;
                black: string;
                system: string;
                alternate: string;
                rainbow: string;
                "language-label": string;
                "url-label": string;
                "run-benchmark-label": string;
                informationFuseFps: string;
                timeUnitMs: string;
                timeUnitS: string;
                timeUnitM: string;
                timeUnitH: string;
                timeUnitD: string;
                ago: string;
                "Hide UI": string;
                "Play / Pause": string;
                "Switch Pattern": string;
                "Switch Coloring": string;
                "Scaling Canvas Size": string;
                "Increase / Decrease Frame Delay": string;
                "Increase / Decrease Layer": string;
                "Speed Down / Up": string;
                FullScreen: string;
                "Show FPS": string;
                "Switch Clock": string;
                "noscript-message": string;
                "noscript-introduction-title": string;
                "noscript-introduction-description": string;
            };
            ja: {
                "lang-label": string;
                "lang-direction": string;
                Auto: string;
                description: string;
                "colorspace-label": string;
                "coloring-label": string;
                "pattern-label": string;
                lines: string;
                spots: string;
                both: string;
                "canvas-size-label": string;
                "layers-label": string;
                "spots-layers-label": string;
                "cycle-span-label": string;
                "fuse-fps-label": string;
                "frame-delay-label": string;
                "easing-label": string;
                "with-fullscreen-label": string;
                "show-fps-label": string;
                "clock-label": string;
                "brightness-label": string;
                hide: string;
                blend: string;
                white: string;
                black: string;
                system: string;
                alternate: string;
                rainbow: string;
                "language-label": string;
                "url-label": string;
                "run-benchmark-label": string;
                informationFuseFps: string;
                timeUnitMs: string;
                timeUnitS: string;
                timeUnitM: string;
                timeUnitH: string;
                timeUnitD: string;
                ago: string;
                "Hide UI": string;
                "Play / Pause": string;
                "Switch Pattern": string;
                "Switch Coloring": string;
                "Scaling Canvas Size": string;
                "Increase / Decrease Frame Delay": string;
                "Increase / Decrease Layer": string;
                "Speed Down / Up": string;
                FullScreen: string;
                "Show FPS": string;
                "Switch Clock": string;
                "noscript-message": string;
                "noscript-introduction-title": string;
                "noscript-introduction-description": string;
            };
        };
        type Label = (keyof (typeof master[keyof typeof master])) | "";
        type Language = keyof typeof master;
        const getLocale: () => "en" | "ja";
        const setLocale: (locale?: Language | "Auto") => void;
        const getDirection: (l?: Language) => string;
        const isRtl: (l?: Language) => boolean;
        const isLtr: (l?: Language) => boolean;
        const toRtl: (text: string, f?: boolean) => string;
        const map: (key: Label, l?: Language) => string;
        const getLocaleList: () => (Language | "Auto")[];
    }
}
declare module "script/library/ui" {
    export namespace UI {
        const showPickerOnLabel: (label: HTMLLabelElement) => void;
        class ToggleClassForWhileTimer {
            timer: ReturnType<typeof setTimeout> | undefined;
            constructor();
            start(element: HTMLElement, token: string, span: number): void;
            isOn: () => boolean;
        }
        const fullscreenEnabled: any;
        const getFullscreenElement: () => {} | null;
        const requestFullscreen: (dom?: Element) => void;
        const exitFullscreen: () => void;
        type Attributes = Record<string, string | number | boolean>;
        type Styles = Partial<CSSStyleDeclaration>;
        type Events = {
            [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void;
        };
        type ElementSource<T extends HtmlTag = any> = CreateElementArguments<T> | HTMLElementTagNameMap[T] | Text | string;
        interface ElementOptions {
            className?: string;
            text?: string;
            attributes?: Attributes;
            children?: ElementSource[];
            styles?: Styles;
            events?: Events;
        }
        interface CreateElementArguments<T extends HtmlTag> extends ElementOptions {
            tag: T;
        }
        type HtmlTag = keyof HTMLElementTagNameMap;
        const setOptions: <T extends HTMLElement>(element: T, options?: ElementOptions) => T;
        const createElement: <T extends HtmlTag>(element: ElementSource<T>) => HTMLElementTagNameMap[T] | Text;
        const removeAllChildren: <ParentT extends HTMLElement>(parent: ParentT) => ParentT;
        const appendChild: <ParentT extends HTMLElement, T extends HtmlTag>(parent: ParentT, element: ElementSource<T>) => ParentT;
        const replaceChild: <ParentT extends HTMLElement, T extends HtmlTag>(parent: ParentT, element: ElementSource<T>) => ParentT;
        const appendChildren: <ParentT extends HTMLElement, T extends HtmlTag>(parent: ParentT, elements: ElementSource<T>[]) => ParentT;
        const replaceChildren: <ParentT extends HTMLElement, T extends HtmlTag>(parent: ParentT, elements: ElementSource<T>[]) => ParentT;
        const cullOrBreed: <ParentT extends HTMLElement, T extends HtmlTag>(parent: ParentT, element: ElementSource<T>, size: number) => ParentT;
        const getElementsByClassName: <T extends HtmlTag>(tag: T, className: string, parent?: Element) => HTMLElementTagNameMap[T][];
        const querySelectorAllWithFallback: <T extends HtmlTag>(tag: T, selectorss: string[], parent?: Element) => HTMLElementTagNameMap[T][];
        const getElementById: <T extends HtmlTag>(tag: T, id: string) => HTMLElementTagNameMap[T];
        const querySelector: <T extends HtmlTag>(tag: T, selectors: string, parent?: Element) => HTMLElementTagNameMap[T];
        const setTextContent: (element: HTMLElement, text: string) => void;
        const setStyle: (element: HTMLElement, name: string, value: string | undefined) => void;
    }
}
declare module "script/library/control" {
    export namespace Control {
        interface ArgumentsBaseDom<T extends HTMLElement> {
            dom: T;
        }
        interface ArgumentsBaseId {
            id: string;
        }
        type ArgumentsBase<T extends HTMLElement> = ArgumentsBaseDom<T> | ArgumentsBaseId;
        const getDom: <T extends HTMLElement>(data: ArgumentsBase<T>) => T;
        const getDomId: <T extends HTMLElement>(data: ArgumentsBase<T>) => string | undefined;
        const eventLog: <T extends HTMLElement>(data: {
            control: {
                data: ArgumentsBase<T>;
            };
            event: Event | string;
            message: string;
            value?: any;
        }) => void;
        interface ButtonArgumentsBase<T extends HTMLElement> {
            click?: (event: Event | null, select: Button<T>) => unknown;
        }
        type ButtonArguments<T extends HTMLElement = HTMLButtonElement> = ArgumentsBase<T> & ButtonArgumentsBase<T>;
        class Button<T extends HTMLElement> {
            data: ButtonArguments<T>;
            dom: T;
            constructor(data: ButtonArguments<T>);
            setClick: (click: (event: Event | null, select: Button<T>) => unknown) => (event: Event | null, select: Button<T>) => unknown;
            fire: () => unknown;
        }
        interface SelectArgumentsBase<T> {
            enum: T[];
            default: T;
        }
        interface SelectOptions<T> {
            makeLabel?: (value: T) => string;
            change?: (event: Event | null, select: Select<T>) => unknown;
            preventOnChangeWhenNew?: boolean;
        }
        const preventOnChange: "preventOnChange";
        type SelectArguments<T> = ArgumentsBase<HTMLSelectElement> & SelectArgumentsBase<T>;
        class Select<T> {
            data: SelectArguments<T>;
            options?: SelectOptions<T> | undefined;
            dom: HTMLSelectElement;
            saveParameter?: (key: string, value: string) => unknown;
            constructor(data: SelectArguments<T>, options?: SelectOptions<T> | undefined);
            catchUpRestore: (params?: Record<string, string>) => void;
            getId: () => string | undefined;
            setChange: (change: (event: Event | null, select: Select<T>) => unknown) => {
                change: (event: Event | null, select: Select<T>) => unknown;
                makeLabel?: ((value: T) => string) | undefined;
                preventOnChangeWhenNew?: boolean;
            };
            reloadOptions: (value?: T) => void;
            private getNextIndex;
            private getNextIndexClamp;
            private getNextIndexCycle;
            switch: (valueOrDirection: T | boolean, preventOnChange?: "preventOnChange", getNextIndex?: (length: number, index: number, direction: boolean) => number) => void;
            cycle: (direction: boolean, preventOnChange?: "preventOnChange") => void;
            get: () => string;
            fire: () => unknown;
            loadParameter: (params: Record<string, string>, saveParameter: (key: string, value: string) => unknown) => this;
        }
        interface CheckboxArgumentsBase {
            default?: boolean;
        }
        interface CheckboxOptions {
            change?: (event: Event | null, checked: Checkbox) => unknown;
            preventOnChangeWhenNew?: boolean;
        }
        type CheckboxArguments = ArgumentsBase<HTMLInputElement> & CheckboxArgumentsBase;
        class Checkbox {
            data: CheckboxArguments;
            options?: CheckboxOptions | undefined;
            dom: HTMLInputElement;
            saveParameter?: (key: string, value: string) => unknown;
            constructor(data: CheckboxArguments, options?: CheckboxOptions | undefined);
            catchUpRestore: (params?: Record<string, string>) => void;
            getId: () => string | undefined;
            setChange: (change: (event: Event | null, checked: Checkbox) => unknown) => {
                change: (event: Event | null, checked: Checkbox) => unknown;
                preventOnChangeWhenNew?: boolean;
            };
            toggle: (checked?: boolean, preventOnChange?: "preventOnChange") => void;
            get: () => boolean;
            fire: () => unknown;
            loadParameter: (params: Record<string, string>, saveParameter: (key: string, value: string) => unknown) => this;
        }
    }
}
declare module "script/library/index" {
    import * as ImportedLocale from "script/library/locale";
    import * as ImportedUI from "script/library/ui";
    import * as ImportedControl from "script/library/control";
    export namespace Library {
        export import Locale = ImportedLocale.Locale;
        export import UI = ImportedUI.UI;
        export import Control = ImportedControl.Control;
    }
}
declare module "script/tools/timespan" {
    export namespace Timespan {
        const toDisplayString: (value: number, maximumFractionDigits?: number) => string;
    }
}
declare module "script/tools/hash" {
    export namespace Hash {
        const fnv1a_32: (key: string) => number;
    }
}
declare module "script/tools/random" {
    export namespace Random {
        type Function = (index?: number, prime?: number) => number;
        const makeInteger: (size: number, random?: Function, index?: number, prime?: number) => number;
        const select: <T>(list: T[], random?: Function, index?: number, prime?: number) => T;
        class IndexedRandom {
            private hash32;
            private seed;
            private prime;
            index: number;
            constructor(hash32?: (key: string) => number, seed?: number | string, prime?: number);
            get: (index?: number, prime?: number) => number;
            getFunction: () => Function;
            setIndex: (index: number) => number;
            resetIndex: () => number;
        }
    }
}
declare module "script/tools/index" {
    import * as ImportedTypeGuards from "script/tools/type-guards";
    import * as ImportedNumber from "script/tools/number";
    import * as ImportedTimespan from "script/tools/timespan";
    import * as ImportedMath from "script/tools/math";
    import * as ImportedRandom from "script/tools/random";
    import * as ImportedArray from "script/tools/array";
    import * as ImportedHash from "script/tools/hash";
    export namespace Tools {
        export import TypeGuards = ImportedTypeGuards.TypeGuards;
        export import Number = ImportedNumber.Number;
        export import Timespan = ImportedTimespan.Timespan;
        export import Math = ImportedMath.Math;
        export import Random = ImportedRandom.Random;
        export import Array = ImportedArray.Array;
        export import Hash = ImportedHash.Hash;
    }
}
declare module "script/features/fps" {
    export namespace Fps {
        export class OnlineStandardDeviation {
            count: number;
            mean: number;
            m2: number;
            reset: () => void;
            update: (value: number) => void;
            isValid: () => boolean;
            getVariance: () => number;
            getStandardDeviation: () => number;
        }
        export const standardDeviation: OnlineStandardDeviation;
        interface FpsHistoryEntry {
            fps: number;
            now: number;
            text: string;
        }
        export let currentMaxFps: FpsHistoryEntry;
        export let currentNowFps: FpsHistoryEntry;
        export let currentMinFps: FpsHistoryEntry;
        export let fuseFps: number;
        export let isValid: boolean;
        export let averageFps: number;
        export const reset: () => void;
        export const step: (now: number) => void;
        export const getText: () => string;
        export const isUnderFuseFps: () => boolean;
        export {};
    }
}
declare module "script/ui" {
    import { Library } from "script/library/index";
    export namespace UI {
        const manifest: HTMLLinkElement;
        const noscript: HTMLDivElement;
        const screenBody: HTMLDivElement;
        const canvas: HTMLDivElement;
        const playButton: Library.Control.Button<HTMLElement>;
        const colorspaceSelect: Library.Control.Select<string>;
        const coloringSelect: Library.Control.Select<string>;
        const patternSelect: Library.Control.Select<string>;
        const canvasSizeSelect: Library.Control.Select<number>;
        const layersSelect: Library.Control.Select<number>;
        const spotslayersSelect: Library.Control.Select<number>;
        const cycleSpanSelect: Library.Control.Select<number>;
        const fuseFpsSelect: Library.Control.Select<number>;
        const getFrameDelayLabel: (i: number) => string;
        const frameDelaySelect: Library.Control.Select<number>;
        const easingCheckbox: Library.Control.Checkbox;
        const withFullscreen: Library.Control.Checkbox;
        const showFps: Library.Control.Checkbox;
        const clockSelect: Library.Control.Select<string>;
        const brightnessSelect: Library.Control.Select<number>;
        const languageSelect: Library.Control.Select<string>;
        const urlAnchor: HTMLAnchorElement;
        const introductionPanel: HTMLDivElement;
        const fpsDisplay: HTMLDivElement;
        const clockDisplay: HTMLDivElement;
        const date: HTMLSpanElement;
        const time: HTMLSpanElement;
        const keyboardShortcut: HTMLDivElement;
        const updateLanguage: () => void;
        const initialize: () => void;
        const getDataLangKey: (element: HTMLSpanElement) => Library.Locale.Label;
        const updateLabel: (element: HTMLSpanElement) => void;
        const setLabel: (element: HTMLSpanElement, label: Library.Locale.Label) => void;
        const setAndUpdateLabel: (element: HTMLSpanElement, label: Library.Locale.Label) => void;
    }
}
declare module "script/features/clock" {
    export namespace Clock {
        const makeDate: (local: string | undefined) => string;
        const makeTime: (local: string | undefined) => string;
        const update: (local: string | undefined) => void;
        const setColor: (color: string | undefined) => void;
    }
}
declare module "script/features/index" {
    import * as ImportedFps from "script/features/fps";
    import * as ImportedClock from "script/features/clock";
    export namespace Features {
        export import Fps = ImportedFps.Fps;
        export import Clock = ImportedClock.Clock;
    }
}
declare module "script/url" {
    export namespace Url {
        const parseParameter: (url: string) => Record<string, string>;
        const make: (params: Record<string, string>) => string;
        const addParameter: (params: Record<string, string>, key: string, value: string) => Record<string, string>;
        const initialize: () => void;
        const params: Record<string, string>;
    }
}
declare module "script/events" {
    export namespace Events {
        const initialize: () => void;
    }
}
declare module "script/index" { }
