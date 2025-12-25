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
    export const makeRequestUrl = (location?: string, locale = navigator.language): string =>
        location && 0 < location.length ?
            `https://${site}/${encodeURIComponent(location)}?format=${encodeURIComponent(format)}${getTemperatureParam(locale)}` :
            `https://${site}/?format=${encodeURIComponent(format)}${getTemperatureParam(locale)}${separator}%l`;
    let lastRequestTimestamp: number = 0;
    let isLastRequestWithGeolocation: boolean = false;
    export const fetch = async (location?: string): Promise<string | undefined> =>
    {
        let result: Awaited<ReturnType<typeof fetch>> = undefined;
        try
        {
            console.log("🌤 Fetching weather data...", makeRequestUrl(location));
            const response = await window.fetch(makeRequestUrl(location));
            if (response.ok)
            {
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
    export let cache: string = config.weather.na;
    export let lastTimestamp: number = 0;
    export const setCache = (data: string | undefined): void =>
    {
        cache = data ?? config.weather.na;
        lastTimestamp = new Date().getTime();
    };
    export const isWeatherFetchAllowed = (): boolean =>
    {
        const now = Date.now();
        const retryInterval = Tools.Timespan.parse(config.weather.retryInterval) ?? (3 * 60 * 1000);
        return lastRequestTimestamp +retryInterval < now;
    };
    export const isUpdateRequired = (): boolean =>
    {
        const now = Date.now();
        const updateInterval = Tools.Timespan.parse(config.weather.updateInterval) ?? (30 * 60 * 1000);
        return lastTimestamp +updateInterval < now;
    };
    export const isExpired = (): boolean =>
    {
        const now = Date.now();
        const expire = Tools.Timespan.parse(config.weather.expire) ?? (60 * 60 * 1000);
        return lastTimestamp +expire < now;
    };
    export const get = (): string =>
    {
        const location = Location.get();
        const isWithGeolocation = undefined !== location;
        if (isUpdateRequired() || isWithGeolocation !== isLastRequestWithGeolocation)
        {
            if (isWeatherFetchAllowed())
            {
                lastRequestTimestamp = Date.now();
                isLastRequestWithGeolocation = isWithGeolocation;
                fetch(location ?? locationCache);
            }
        }
        if (isExpired())
        {
            return config.weather.na;
        }
        else
        {
            return cache;
        }
    }
}
