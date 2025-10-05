import { Library } from "@library";
import { Tools } from "@tools";
import { Location } from "./location";
import config from "@resource/config.json";
export namespace Weather
{
    export const site = config.weather.site;
    export const format = config.weather.format;
    export const separator = "|";
    export const extractFixedText = (format: string): string[] =>
        format.replace(/%\S+/g, "").trim().match(/\S+/g) ?? [];
    export const isRegularResponse = (text: string): boolean =>
        extractFixedText(format).every(i => text.includes(i));
    export const getTemperatureUnit = (locale = navigator.language): "metric" | "imperial" =>
        config.weather.fahrenheitLocales.includes(locale) ? "imperial" : "metric";
    export const getTemperatureParam = (locale = navigator.language): string =>
        getTemperatureUnit(locale) === "imperial" ? "&u" : "";
    let locationCache: string | undefined = undefined;
    export const makeRequestUrl = (lang: Library.Locale.Language, location?: string, locale = navigator.language): string =>
        location && 0 < location.length ?
            `https://${lang}.${site}/${encodeURIComponent(location)}?format=${encodeURIComponent(format)}${getTemperatureParam(locale)}` :
            `https://${lang}.${site}/?format=${encodeURIComponent(format)}${getTemperatureParam(locale)}${separator}%l`;
    let lastRequestTimestamp: number = 0;
    // export const enforceMonocromeFont = (text: string): string =>
    //     text.replace(/[\u2600-\u26FF\u1F300-\u1F5FF]/g, m => `${m}\uFE0E`);
    export const fetch = async (lang: Library.Locale.Language, location?: string): Promise<string | undefined> =>
    {
        let result: Awaited<ReturnType<typeof fetch>> = undefined;
        try
        {
            console.log("🌤 Fetching weather data...", makeRequestUrl(lang, location));
            const response = await window.fetch(makeRequestUrl(lang, location));
            if (response.ok)
            {
                //result = enforceMonocromeFont(await response.text())
                result = (await response.text())
                    .replace(/\s+/g, " ")
                    .trim();
                if (isRegularResponse(result))
                {
                    console.log("🌤 Weather data fetched:", result);
                    if (result.includes(separator))
                    {
                        const parts = result.split(separator);
                        if (2 <= parts.length)
                        {
                            locationCache = parts[1].trim();
                            console.log("📍 Location extracted:", locationCache);
                        }
                        result = parts[0].trim();
                    }
                    setCache(result);
                }
                else
                {
                    console.warn("🚫 Irregular weather data:", result);
                }
            }
            else
            {
                console.warn("🚫 Failed to fetch weather data:", response.status, response.statusText);
            }
        }
        catch (error)
        {
            console.error("🚫 Error fetching weather data:", error);
        }
        return result;
    };
    export let cache: string = "N/A";
    export let lastTimestamp: number = 0;
    export const setCache = (data: string): void =>
    {
        cache = data;
        lastTimestamp = new Date().getTime();
    };
    export const isExpired = (): boolean =>
    {
        const now = Date.now();
        const expire = Tools.Timespan.parse(config.weather.expire) ?? (20 * 60 * 1000);
        return lastTimestamp +expire < now;
    };
    export const get = (lang: Library.Locale.Language, location = Location.get() ?? locationCache): string =>
    {
        if (isExpired())
        {
            const now = Date.now();
            const retryInterval = Tools.Timespan.parse(config.weather.retryInterval) ?? (3 * 60 * 1000);
            if (lastRequestTimestamp +retryInterval < now)
            {
                lastRequestTimestamp = Date.now();
                fetch(lang, location);
            }
        }
        return cache;
    }
}
