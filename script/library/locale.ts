import { Array as ToolsArray } from "@tools/array";
import * as localeMaster from "@locale-master";
export namespace Locale
{
    export const master = localeMaster.localeMaster;
    export type Label = (keyof (typeof master[keyof typeof master])) | "";
    export type Language = string & keyof typeof master; // "string &" is a workaround for foolish TypeScript
    const supportedLangs = Object.keys(master) as Language[];
    const getSegments = (text: string, separator: string, segments: number): string =>
        text.split(separator).slice(0, segments).join(separator);
    const getMatchLang = (lang: string): Language | undefined =>
        ToolsArray.lookupValue(supportedLangs, getSegments(lang, "-", 2) as Language) ??
        ToolsArray.lookupValue(supportedLangs, getSegments(lang, "-", 1) as Language);
    const getDefaultLang = (): Language =>
        getMatchLang(navigator.language.toLowerCase()) ??
        navigator.languages.map(i => getMatchLang(i.toLowerCase())).filter(i => i !== undefined)[0] ??
        "en";
    let lang: Language = getDefaultLang();
    export const getLocale = () => lang;
    export const setLocale = (locale?: Language | "Auto") =>
    {
        switch(locale)
        {
        case undefined:
        case "Auto":
            lang = getDefaultLang();
            break;
        default:
            lang = locale;
            break;
        }
    };
    export const getDirection = (l?: Language) =>
        master[l ?? lang]["lang-direction"];
    export const isRtl = (l?: Language) =>
        "rtl" === getDirection(l);
    export const isLtr = (l?: Language) =>
        "ltr" === getDirection(l);
    export const toRtl = (text: string, f?: boolean): string =>
        false === f ? text : `\u202B${text}\u202C`;
    export const map = (key: Label, l?: Language) =>
        "" === key ? "" : master[l ?? lang][key];
    export const getLocaleList = (): (Language | "Auto")[] =>
        ["Auto", ...supportedLangs] as (Language | "Auto")[];
}
