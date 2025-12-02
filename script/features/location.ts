import { UI } from "../ui";
export namespace Location
{
    let coords: string | undefined
    export const requestToGetGeolocation = (): void =>
    {
        if (window.isSecureContext && "geolocation" in navigator)
        {
            navigator.geolocation.getCurrentPosition
            (
                position =>
                {
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
    export const get = (): string | undefined =>
    {
        if ("geolocation" === UI.SettingsPanel.weatherLocationSelect.get())
        {
            return coords;
        }
        return undefined;
    }
}
