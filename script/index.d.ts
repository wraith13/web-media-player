declare module "script/tools/type-guards" {
    export namespace TypeGuards {
        const hasValue: <T>(value: T | null | undefined) => value is T;
        const has: <KeyType extends string | string[]>(keyOrKeys: KeyType) => <ObjectType>(object: ObjectType | undefined) => object is ObjectType & (KeyType extends string ? { [PropertyName in KeyType]: Exclude<PropertyName extends keyof ObjectType ? ObjectType[PropertyName] : any, undefined>; } : KeyType extends string[] ? { [Prop in KeyType[number]]: Exclude<Prop extends keyof ObjectType ? ObjectType[Prop] : any, undefined>; } : never);
    }
}
declare module "script/tools/number" {
    export namespace NumberTools {
        const getIntegralDigits: (value: number) => number;
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
        const backSlice: <T>(list: T[], start: number) => T[];
    }
}
declare module "locale/generated/master" {
    export const localeMaster: {
        en: {
            "lang-label": string;
            "lang-direction": string;
            Auto: string;
            description: string;
            "media-count-label": string;
            "media-length-label": string;
            "cross-fade-label": string;
            "cross-fade-0": string;
            "colorspace-label": string;
            "coloring-label": string;
            "pattern-label": string;
            lines: string;
            spots: string;
            both: string;
            "image-span-label": string;
            "loop-short-media-label": string;
            "visualizer-label": string;
            "visualizer-simple": string;
            "visualizer-raw-frequency-data": string;
            "with-fullscreen-label": string;
            "show-fps-label": string;
            "clock-label": string;
            hide: string;
            blend: string;
            white: string;
            black: string;
            system: string;
            alternate: string;
            rainbow: string;
            "brightness-label": string;
            "clock-position-label": string;
            center: string;
            "top-right": string;
            "bottom-right": string;
            "bottom-left": string;
            "top-left": string;
            "stretch-label": string;
            "padding-label": string;
            "language-label": string;
            "url-label": string;
            timeUnitMs: string;
            timeUnitS: string;
            timeUnitM: string;
            timeUnitH: string;
            timeUnitD: string;
            ago: string;
            "Hide UI": string;
            "Play / Pause": string;
            FullScreen: string;
            "Show FPS": string;
            "Switch Clock": string;
            "no-media-message": string;
            "not-supported-media-message": string;
            "noscript-message": string;
            "noscript-introduction-title": string;
            "noscript-introduction-description": string;
        };
        ja: {
            "lang-label": string;
            "lang-direction": string;
            Auto: string;
            description: string;
            "media-count-label": string;
            "media-length-label": string;
            "cross-fade-label": string;
            "cross-fade-0": string;
            "colorspace-label": string;
            "coloring-label": string;
            "pattern-label": string;
            lines: string;
            spots: string;
            both: string;
            "image-span-label": string;
            "loop-short-media-label": string;
            "visualizer-label": string;
            "visualizer-simple": string;
            "visualizer-raw-frequency-data": string;
            "with-fullscreen-label": string;
            "show-fps-label": string;
            "clock-label": string;
            hide: string;
            blend: string;
            white: string;
            black: string;
            system: string;
            alternate: string;
            rainbow: string;
            "clock-position-label": string;
            center: string;
            "top-right": string;
            "bottom-right": string;
            "bottom-left": string;
            "top-left": string;
            "brightness-label": string;
            "stretch-label": string;
            "padding-label": string;
            "language-label": string;
            "url-label": string;
            timeUnitMs: string;
            timeUnitS: string;
            timeUnitM: string;
            timeUnitH: string;
            timeUnitD: string;
            ago: string;
            "Hide UI": string;
            "Play / Pause": string;
            FullScreen: string;
            "Show FPS": string;
            "Switch Clock": string;
            "no-media-message": string;
            "not-supported-media-message": string;
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
                "media-count-label": string;
                "media-length-label": string;
                "cross-fade-label": string;
                "cross-fade-0": string;
                "colorspace-label": string;
                "coloring-label": string;
                "pattern-label": string;
                lines: string;
                spots: string;
                both: string;
                "image-span-label": string;
                "loop-short-media-label": string;
                "visualizer-label": string;
                "visualizer-simple": string;
                "visualizer-raw-frequency-data": string;
                "with-fullscreen-label": string;
                "show-fps-label": string;
                "clock-label": string;
                hide: string;
                blend: string;
                white: string;
                black: string;
                system: string;
                alternate: string;
                rainbow: string;
                "brightness-label": string;
                "clock-position-label": string;
                center: string;
                "top-right": string;
                "bottom-right": string;
                "bottom-left": string;
                "top-left": string;
                "stretch-label": string;
                "padding-label": string;
                "language-label": string;
                "url-label": string;
                timeUnitMs: string;
                timeUnitS: string;
                timeUnitM: string;
                timeUnitH: string;
                timeUnitD: string;
                ago: string;
                "Hide UI": string;
                "Play / Pause": string;
                FullScreen: string;
                "Show FPS": string;
                "Switch Clock": string;
                "no-media-message": string;
                "not-supported-media-message": string;
                "noscript-message": string;
                "noscript-introduction-title": string;
                "noscript-introduction-description": string;
            };
            ja: {
                "lang-label": string;
                "lang-direction": string;
                Auto: string;
                description: string;
                "media-count-label": string;
                "media-length-label": string;
                "cross-fade-label": string;
                "cross-fade-0": string;
                "colorspace-label": string;
                "coloring-label": string;
                "pattern-label": string;
                lines: string;
                spots: string;
                both: string;
                "image-span-label": string;
                "loop-short-media-label": string;
                "visualizer-label": string;
                "visualizer-simple": string;
                "visualizer-raw-frequency-data": string;
                "with-fullscreen-label": string;
                "show-fps-label": string;
                "clock-label": string;
                hide: string;
                blend: string;
                white: string;
                black: string;
                system: string;
                alternate: string;
                rainbow: string;
                "clock-position-label": string;
                center: string;
                "top-right": string;
                "bottom-right": string;
                "bottom-left": string;
                "top-left": string;
                "brightness-label": string;
                "stretch-label": string;
                "padding-label": string;
                "language-label": string;
                "url-label": string;
                timeUnitMs: string;
                timeUnitS: string;
                timeUnitM: string;
                timeUnitH: string;
                timeUnitD: string;
                ago: string;
                "Hide UI": string;
                "Play / Pause": string;
                FullScreen: string;
                "Show FPS": string;
                "Switch Clock": string;
                "no-media-message": string;
                "not-supported-media-message": string;
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
            isInTimer: () => boolean;
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
        type ElementSource<T extends HtmlTag = any> = CreateElementArguments<T> | HTMLElementTagNameMap[T];
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
        const createText: (text: string | Text) => Text;
        const createElement: <T extends HtmlTag>(element: ElementSource<T>) => HTMLElementTagNameMap[T];
        const createNode: <T extends HtmlTag>(element: ElementSource<T> | Text | string) => HTMLElementTagNameMap[T] | Text;
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
            getId: () => string | undefined;
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
        interface RangeArgumentsBase {
            min?: number;
            max?: number;
            step?: number;
            default?: number;
        }
        interface RangeOptions {
            change?: (event: Event | null, range: Range) => unknown;
            preventOnChangeWhenNew?: boolean;
        }
        type RangeArguments = ArgumentsBase<HTMLInputElement> & RangeArgumentsBase;
        class Range {
            data: RangeArguments;
            options?: RangeOptions | undefined;
            dom: HTMLInputElement;
            saveParameter?: (key: string, value: string) => unknown;
            constructor(data: RangeArguments, options?: RangeOptions | undefined);
            catchUpRestore: (params?: Record<string, string>) => void;
            getId: () => string | undefined;
            setChange: (change: (event: Event | null, range: Range) => unknown) => {
                change: (event: Event | null, range: Range) => unknown;
                preventOnChangeWhenNew?: boolean;
            };
            set: (value: number, preventOnChange?: "preventOnChange") => void;
            get: () => number;
            fire: () => unknown;
            loadParameter: (params: Record<string, string>, saveParameter: (key: string, value: string) => unknown) => this;
        }
    }
}
declare module "script/library/svg" {
    import resource from "resource/images";
    export namespace Svg {
        type embeddedImage = "SVG:error" | "SVG:audio" | "SVG:close";
        const isEmbeddedImage: (url: string) => url is embeddedImage;
        const getSvg: (url: embeddedImage) => Promise<SVGElement>;
        type KeyType = keyof typeof resource;
        const loadSvg: (key: KeyType) => Promise<SVGElement>;
    }
}
declare module "script/library/index" {
    import * as ImportedLocale from "script/library/locale";
    import * as ImportedUI from "script/library/ui";
    import * as ImportedControl from "script/library/control";
    import * as ImportedSvg from "script/library/svg";
    export namespace Library {
        export import Locale = ImportedLocale.Locale;
        export import UI = ImportedUI.UI;
        export import Control = ImportedControl.Control;
        export import Svg = ImportedSvg.Svg;
    }
}
declare module "script/tools/timespan" {
    export namespace Timespan {
        const toDisplayString: (value: number, maximumFractionDigits?: number) => string;
        const toMediaTimeString: (value: number) => string;
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
declare module "script/tools/byte" {
    export namespace Byte {
        const toDisplayString: (value: number, maximumDigits?: number) => string;
    }
}
declare module "script/tools/timer" {
    export namespace Timer {
        const sleep: (timeout: number) => Promise<void>;
        class ExtendableTimer {
            onStart: () => unknown;
            onEnd: () => unknown;
            span: number;
            timer: ReturnType<typeof setTimeout> | undefined;
            constructor(onStart: () => unknown, onEnd: () => unknown, span: number);
            kick(): void;
            isInTimer: () => boolean;
        }
    }
}
declare module "script/tools/environment" {
    export namespace Environment {
        const isApple: () => boolean;
        const isSafari: () => boolean;
        const isMobile: () => boolean;
        const isTouchDevice: () => boolean;
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
    import * as ImportedByte from "script/tools/byte";
    import * as ImportedTimer from "script/tools/timer";
    import * as ImportedEnvironment from "script/tools/environment";
    export namespace Tools {
        export import TypeGuards = ImportedTypeGuards.TypeGuards;
        export import Number = ImportedNumber.NumberTools;
        export import Timespan = ImportedTimespan.Timespan;
        export import Math = ImportedMath.Math;
        export import Random = ImportedRandom.Random;
        export import Array = ImportedArray.Array;
        export import Hash = ImportedHash.Hash;
        export import Byte = ImportedByte.Byte;
        export import Timer = ImportedTimer.Timer;
        export import Environment = ImportedEnvironment.Environment;
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
        const mediaScreen: HTMLDivElement;
        const elementPool: HTMLDivElement;
        const playButton: Library.Control.Button<HTMLElement>;
        const mediaIndex: HTMLSpanElement;
        const mediaTitle: HTMLSpanElement;
        const mediaTime: HTMLSpanElement;
        const seekRange: HTMLInputElement;
        const nextButton: Library.Control.Button<HTMLElement>;
        const backBUtton: Library.Control.Button<HTMLElement>;
        const fastForwardButton: Library.Control.Button<HTMLElement>;
        const rewindButton: Library.Control.Button<HTMLElement>;
        const shuffleButton: Library.Control.Button<HTMLElement>;
        const repeatButton: Library.Control.Button<HTMLElement>;
        const volumeButton: Library.Control.Button<HTMLElement>;
        const volumeRange: Library.Control.Range;
        const settingButton: Library.Control.Button<HTMLElement>;
        const mediaList: HTMLDivElement;
        const isScrolledToMediaListBottom: () => boolean;
        const progressCircle: HTMLDivElement;
        const addMediaButton: Library.Control.Button<HTMLElement>;
        const addMediaButtonHeight = 84;
        const inputFile: HTMLInputElement;
        const mediaCount: HTMLSpanElement;
        const mediaLength: HTMLSpanElement;
        const withFullscreenCheckbox: Library.Control.Checkbox;
        const brightnessRange: Library.Control.Range;
        const stretchRange: Library.Control.Range;
        const paddingCheckbox: Library.Control.Checkbox;
        const crossFadeSelect: Library.Control.Select<number>;
        const imageSpanSelect: Library.Control.Select<number>;
        const loopShortMediaCheckbox: Library.Control.Checkbox;
        const visualizerSelect: Library.Control.Select<string>;
        const clockSelect: Library.Control.Select<string>;
        const clockPositionSelect: Library.Control.Select<string>;
        const showFpsCheckbox: Library.Control.Checkbox;
        const languageSelect: Library.Control.Select<string>;
        const urlAnchor: HTMLAnchorElement;
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
        let title: string | undefined;
        let subtitle: string | undefined;
        const makeDate: (local: string | undefined) => string;
        const makeTime: (local: string | undefined) => string;
        const updateText: (local: string | undefined) => void;
        const setColor: (color: string | undefined) => void;
        let cloclLocale: string | undefined;
        const update: (now: number) => void;
        const initialize: (params: Record<string, string>) => void;
    }
}
declare module "script/features/media" {
    import { Library } from "script/library/index";
    export namespace Media {
        interface Entry {
            url: string;
            type: string;
            category: Category;
            name: string;
            thumbnail: string;
            size: number;
            duration: number | null;
            area: {
                width: number;
                height: number;
            } | null;
        }
        const mediaList: Entry[];
        type Category = "image" | "audio" | "video";
        const getMediaCategory: (file: File) => Category | null;
        const isMediaFile: (file: File) => boolean;
        const getUrl: (file: File) => string;
        const getName: (file: File) => string;
        const imageToEntry: (category: Category, file: File) => Promise<Entry | null>;
        const audioToEntry: (category: Category, file: File) => Promise<Entry | null>;
        const videoToEntry: (category: Category, file: File) => Promise<Entry | null>;
        const fileToEntry: (file: File) => Promise<Entry | null>;
        const isPixelatedImage: (entry: Entry) => boolean;
        const isThumbnailPixelatedImage: (entry: Entry) => boolean;
        const makeThumbnailElement: (entry: Entry) => Promise<Library.UI.ElementSource<"img"> | SVGElement>;
    }
}
declare module "script/features/visualizer" {
    import { Media } from "script/features/media";
    export namespace Visualizer {
        type VisualizerDom = HTMLDivElement;
        const VisualizerDom: {
            new (): HTMLDivElement;
            prototype: HTMLDivElement;
        };
        const isSimpleMode: () => boolean;
        const make: (media: Media.Entry, index: number) => VisualizerDom;
        const makeSureIcon: (visualDom: VisualizerDom) => Promise<SVGElement>;
        const makeSureProgressCircle: (visualDom: VisualizerDom) => HTMLDivElement;
        const makeSureTextSpan: (visualDom: VisualizerDom) => HTMLSpanElement;
        const step: (_media: Media.Entry, playerDom: HTMLMediaElement, visualDom: VisualizerDom, frequencyDataArray: Uint8Array<ArrayBuffer> | null) => void;
        const isValidFrequencyDataArray: (frequencyDataArray: Uint8Array<ArrayBuffer> | null) => frequencyDataArray is Uint8Array<ArrayBuffer>;
        const getVolume: (frequencyDataArray: Uint8Array<ArrayBuffer> | null) => number;
        const getRawVolume: (frequencyDataArray: Uint8Array<ArrayBuffer>) => number;
    }
}
declare module "script/features/analyser" {
    export namespace Analyser {
        const audioContext: AudioContext;
        const fftSize: number;
        const isSupported: () => boolean;
        const resume: () => Promise<void>;
        class Entry {
            mediaElement: HTMLMediaElement;
            analyserNode: AnalyserNode | null;
            gainNode: GainNode;
            mediaElementAudioSourceNode: MediaElementAudioSourceNode;
            frequencyDataArray: Uint8Array<ArrayBuffer> | null;
            constructor(mediaElement: HTMLMediaElement, gainOnly?: "gainOnly");
            destroy(): void;
            getByteFrequencyData(): Uint8Array<ArrayBuffer> | null;
        }
    }
}
declare module "script/features/elementpool" {
    import { Media } from "script/features/media";
    import { Analyser } from "script/features/analyser";
    export namespace ElementPool {
        const makeSure: (data: {
            image: Media.Entry | null;
            audio: Media.Entry | null;
            video: Media.Entry | null;
        }) => Promise<void>;
        const makeSureAnalyser: (element: HTMLAudioElement | HTMLVideoElement, gainOnly?: "gainOnly") => Promise<Analyser.Entry | null>;
        const get: (media: Media.Entry) => HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null;
        const release: (element: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null) => void;
    }
}
declare module "script/features/history" {
    import { Media } from "script/features/media";
    export namespace History {
        const clear: () => void;
        const isCleared: () => boolean;
        const regulate: () => void;
        const getCurrentIndex: () => number;
        const getMedia: () => Media.Entry | undefined;
        const play: () => Media.Entry | undefined;
        const next: () => Media.Entry | undefined;
        const isAtEnd: () => boolean;
        const back: () => Media.Entry | undefined;
        const getShuffleNext: () => number;
    }
}
declare module "script/features/track" {
    import { Media } from "script/features/media";
    import { Analyser } from "script/features/analyser";
    import { Visualizer } from "script/features/visualizer";
    export class Track {
        playerElement: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null;
        paddingElement: HTMLImageElement | HTMLVideoElement | null;
        visualElement: HTMLDivElement | Visualizer.VisualizerDom | null;
        media: Media.Entry;
        startTime: number | null;
        elapsedTime: number | null;
        fadeRate: number;
        currentTimeForValidation: number;
        analyser: Analyser.Entry | null;
        constructor(media: Media.Entry, index: number);
        setAnalyser(analyser: Analyser.Entry | null): void;
        selfValidate(): boolean;
        makePlayerElement(): HTMLImageElement | HTMLAudioElement | HTMLVideoElement | null;
        isPlaying(): boolean;
        play(): Promise<void>;
        pause(): void;
        seek(seekPosition: number): void;
        getSeek(): number;
        diffSeek(seekDiff: number): void;
        rateSeek(rate: number): void;
        fastForward(): void;
        rewind(): void;
        setPositionState(): void;
        step(): void;
        isLoop(): boolean;
        getImageDuration(): number;
        getDuration(): number;
        getSingleDuration(): number;
        getEndTime(): number;
        getElapsedTime(): number;
        getRemainingTime(): number;
        appleyStretch(dom: HTMLImageElement | HTMLVideoElement, StretchRate: number): boolean;
        updateStretch(): void;
        updateLoopShortMedia(isPlaying: boolean): void;
        isMuteCondition(volume: number, rate?: number): boolean;
        setVolume(volume: number, rate?: number): void;
        crossFadeStep(rate: number): void;
        release(): void;
    }
}
declare module "script/features/player" {
    import { Media } from "script/features/media";
    import { Track } from "script/features/track";
    export namespace Player {
        namespace CrossFade {
            let startAt: number | null;
            let elapsedTime: number | null;
            const getDuration: () => number;
            const clear: () => void;
            const isCrossFading: () => boolean;
            const start: () => void;
            const pause: () => void;
            const resume: () => void;
            const getEndAt: () => number | null;
            const getProgress: () => number;
            const isHotCrossFadeTarget: (target: Track) => boolean;
        }
        const updateFullscreenState: (fullscreen?: boolean) => void;
        const isPlaying: () => boolean;
        const isSeeking: () => boolean;
        const startAnimationFrameLoop: () => void;
        const play: () => Promise<void>;
        const resume: () => void;
        const pause: () => void;
        const previous: () => void;
        const next: () => void;
        const clearCrossFade: () => void;
        const fastForward: () => void;
        const rewind: () => void;
        const seek: (rate: number) => void;
        const temporaryPause: () => void;
        const temporaryResume: () => void;
        const updateFps: () => void;
        const isNextTiming: () => boolean;
        const crossFade: () => Promise<void>;
        const makeIndexText: (track: Track) => string;
        const makeTitleText: (track: Track) => string;
        const makeTimeText: (track: Track) => string;
        const step: () => void;
        const loop: (now: number) => void;
        const playMedia: (entry: Media.Entry, resume?: "resume") => void;
        const removeTrack: (track: Track | null) => void;
        const removeFadeoutTrack: () => void;
        const updateStretch: () => void;
        const updateLoopShortMedia: () => void;
        const clear: () => void;
    }
}
declare module "script/features/index" {
    import * as ImportedFps from "script/features/fps";
    import * as ImportedClock from "script/features/clock";
    import * as ImportedVisualizer from "script/features/visualizer";
    import * as ImportedPlayer from "script/features/player";
    export namespace Features {
        export import Fps = ImportedFps.Fps;
        export import Clock = ImportedClock.Clock;
        export import Visualizer = ImportedVisualizer.Visualizer;
        export import Player = ImportedPlayer.Player;
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
declare module "script/progress" {
    export namespace Progress {
        const incrementTask: (progress?: number) => void;
        const completeTask: (progress?: number) => void;
        const updateProgress: () => void;
    }
}
declare module "script/medialist" {
    import { Library } from "script/library/index";
    import { Media } from "script/features/media";
    export namespace MediaList {
        const addMedia: (file: File) => Promise<void>;
        const addMediaSerial: (file: File) => void;
        const removeButton: (entry: Media.Entry) => Promise<Library.UI.ElementSource<"button">>;
        const makeMediaEntryDom: (entry: Media.Entry) => Promise<HTMLDivElement>;
        const updateMediaListDisplay: () => Promise<void>;
        const updateInformationDisplay: () => void;
        const initialize: () => void;
        const clearPlayState: () => void;
    }
}
declare module "script/events" {
    import { Library } from "script/library/index";
    export namespace Events {
        const updateBrightness: () => void;
        const mousemove: () => void;
        const loadToggleButtonParameter: <T extends HTMLElement>(button: Library.Control.Button<T>, params: Record<string, string>) => void;
        const initialize: () => void;
    }
}
declare module "script/screenshot" {
    export namespace Screenshot {
        const initialize: (params: Record<string, string>) => void;
        const setDisplayNone: (querySelectors: string[]) => void;
        const fixCanvasSize: (width: string, height: string) => void;
        const toCenterControlPanel: (rate: number) => void;
    }
}
declare module "script/index" { }
