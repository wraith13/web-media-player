import { UI } from "../ui";
import { Tools } from "@tools";
import config from "@resource/config.json";
export namespace Location
{
    let coords: string | undefined
    let lastRequestTimestamp: number = 0;
    let lastDataTimestamp: number = 0;
    export const requestToGetGeolocation = (): void =>
    {
        if (window.isSecureContext && "geolocation" in navigator)
        {
            navigator.geolocation.getCurrentPosition
            (
                position =>
                {
                    lastDataTimestamp = Date.now();
                    console.log("📍 Geolocation obtained:", position.coords);
                    coords = `${position.coords.latitude.toFixed(4)},${position.coords.longitude.toFixed(4)}`;
                },
                error =>
                {
                    console.warn("🚫 Failed to obtain geolocation:", error);
                },
                {
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 60 * 60 * 1000,
                }
            );
        }
        else
        {
            console.warn("🚫 Geolocation not supported. Falling back to IP address.");
        }
    };
    export const isExpired = (): boolean =>
    {
        const now = Date.now();
        const geoLocationRetryInterval = Tools.Timespan.parse(config.weather.geoLocationInterval) ?? (30 * 60 * 1000);
        return lastDataTimestamp +geoLocationRetryInterval < now;
    };
    export const get = (): string | undefined =>
    {
        if ("geolocation" === UI.weatherLocationSelect.get())
        {
            if (isExpired())
            {
                const now = Date.now();
                const geoLocationRetryInterval = Tools.Timespan.parse(config.weather.geoLocationRetryInterval) ?? (5 * 60 * 1000);
                if (lastRequestTimestamp +geoLocationRetryInterval < now)
                {
                    lastRequestTimestamp = Date.now();
                    requestToGetGeolocation();
                }
            }
            return coords;
        }
        return undefined;
    }
}
