import { Library } from "../library";
import { UI } from "../ui";
export namespace Weather
{
    export const site = "wttr.in";
    export const format = "%l:+%c+%t";
    export const makeRequestUrl = (lang: Library.Locale.Language, location?: string): string =>
        location && 0 < location.length ?
            `https://${lang}.${site}/${encodeURIComponent(location)}?format=${format}` :
            `https://${lang}.${site}/?format=${format}`;
    let lastRequestTimestamp: number = 0;
    export const enforceMonocromeFont = (text: string): string =>
        text.replace(/[\u2600-\u26FF]/g, m => `${m}\uFE0E`);
    export const fetch = async (lang: Library.Locale.Language, location?: string): Promise<string | undefined> =>
    {
        let result: Awaited<ReturnType<typeof fetch>> = undefined;
        try
        {
            console.log("🌤 Fetching weather data...", makeRequestUrl(lang, location));
            const response = await window.fetch(makeRequestUrl(lang, location));
            if (response.ok)
            {
                result = enforceMonocromeFont(await response.text())
                    .replace(/\s+/g, " ")
                    .trim();
                console.log("🌤 Weather data fetched:", result);
                setCache(result);
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
            if (lastRequestTimestamp + 5 * 60 * 1000 < now)
            {
                lastRequestTimestamp = Date.now();
                fetch(lang, location);
            }
        }
        return cache;
    }
    export const update = () =>
    {
        if (UI.withWeatherCheckbox.get())
        {
            const weather = get(Library.Locale.getLocale());
            Library.UI.setTextContent(UI.weather, weather);
        }
        else
        {
            Library.UI.setTextContent(UI.weather, "");
        }
    };
}
