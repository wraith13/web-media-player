import resource from "@resource/images.json";
export namespace Svg
{
    export type embeddedImage = "SVG:error" | "SVG:audio" | "SVG:close";
    export const isEmbeddedImage = (url: string): url is embeddedImage =>
        ["SVG:error", "SVG:audio"].includes(url as embeddedImage);
    export const getSvg = async (url: embeddedImage): Promise<SVGElement> =>
    {
        switch(url)
        {
        case "SVG:error":
            return await loadSvg("error-icon");
        case "SVG:audio":
            return await loadSvg("audio-icon");
        case "SVG:close":
            return await loadSvg("cross-icon");
        default:
            console.error(`🚫 Unsupported embedded image URL: ${url}`);
            return await loadSvg("error-icon");
        }
    };
    export type KeyType = keyof typeof resource;
    export const loadSvg = async (key: KeyType): Promise<SVGElement> =>
    {
        try
        {
            const dom = document.getElementById(key);
            if (dom)
            {
                return new DOMParser().parseFromString
                (
                    dom.innerHTML.replace("<svg ", "<svg role=\"presentation\" aria-hidden=\"true\" "),
                    "image/svg+xml"
                ).documentElement as any;
            }
            else
            {
                console.error(`🚫 SVG element with id "${key}" not found in the DOM.`);
                return null as any;
            }
        }
        catch(error)
        {
            console.error(`🚫 Error loading SVG with key "${key}":`, error);
            throw error;
        }
    };
}
