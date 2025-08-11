import resource from "@resource/images.json";
export namespace Svg
{
    // export const makeSvgBlobUrl = (id: string): string =>
    // {
    //     const svg = document.getElementById(id);
    //     if (svg)
    //     {
    //         const serializer = new XMLSerializer();
    //         const svgString = serializer.serializeToString(svg);
    //         const blob = new Blob([svgString], { type: "image/svg+xml" });
    //         return URL.createObjectURL(blob);
    //     }
    //     else
    //     {
    //         console.error(`🚫 SVG element with id "${id}" not found.`);
    //         return "SVG:error";
    //     }
    // };
    // export const makeSvgDataUrl = (id: string): string =>
    // {
    //     const svg = document.getElementById(id);
    //     if (svg)
    //     {
    //         const serializer = new XMLSerializer();
    //         const svgString = serializer.serializeToString(svg);
    //         return `data:image/svg+xml;base64,${btoa(svgString)}`;
    //     }
    //     else
    //     {
    //         console.error(`🚫 SVG element with id "${id}" not found.`);
    //         return "SVG:error";
    //     }
    // };
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
                return new DOMParser().parseFromString(dom.innerHTML, "image/svg+xml").documentElement as any;
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
