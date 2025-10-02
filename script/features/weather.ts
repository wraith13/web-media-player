import { Library } from "@library";
import { Tools } from "@tools";
import config from "@resource/config.json";
export namespace Weather
{
    export const site = config.weather.site;
    export const format = config.weather.format;
    export const extractFixedText = (format: string): string[] =>
        format.replace(/%\S+/g, "").trim().match(/\S+/g) ?? [];
    export const isRegularResponse = (text: string): boolean =>
        extractFixedText(format).every(i => text.includes(i));
    export const makeRequestUrl = (lang: Library.Locale.Language, location?: string): string =>
        location && 0 < location.length ?
            `https://${lang}.${site}/${encodeURIComponent(location)}?format=${encodeURIComponent(format)}` :
            `https://${lang}.${site}/?format=${encodeURIComponent(format)}`;
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
    export let lastTimestampFingerprint: string = "";
    export const setCache = (data: string): void =>
    {
        cache = data;
        lastTimestampFingerprint = getTimeFingerprint(new Date());
    };
    export const getTimeFingerprint = (date: Date | null): string =>
    {
        if (date)
        {
            const minute = date.getMinutes();
            if (minute < 55)
            {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hour = date.getHours();
                return `${year}-${month}-${day} ${hour}`;
            }
            else
            {
                return getTimeFingerprint(new Date(date.getTime() + 10 * 60 * 1000));
            }
        }
        return "";
    }
    export const isExpired = (): boolean =>
        lastTimestampFingerprint !== getTimeFingerprint(new Date());
    export const get = (lang: Library.Locale.Language, location?: string): string =>
    {
        if (isExpired())
        {
            const now = Date.now();
            const retryInterval = Tools.Timespan.parse(config.weather.retryInterval) ?? (5 * 60 * 1000);
            if (lastRequestTimestamp +retryInterval < now)
            {
                lastRequestTimestamp = Date.now();
                fetch(lang, location);
            }
        }
        return cache;
    }
}
