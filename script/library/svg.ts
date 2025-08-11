export namespace Svg
{
    export const makeSvgBlobUrl = (id: string): string =>
    {
        const svg = document.getElementById(id);
        if (svg)
        {
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svg);
            const blob = new Blob([svgString], { type: "image/svg+xml" });
            return URL.createObjectURL(blob);
        }
        else
        {
            console.error(`🚫 SVG element with id "${id}" not found.`);
            return "SVG:error";
        }
    };
    export const makeSvgDataUrl = (id: string): string =>
    {
        const svg = document.getElementById(id);
        if (svg)
        {
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svg);
            return `data:image/svg+xml;base64,${btoa(svgString)}`;
        }
        else
        {
            console.error(`🚫 SVG element with id "${id}" not found.`);
            return "SVG:error";
        }
    };
    export const error = makeSvgBlobUrl("svg-error");
    export const audio = makeSvgBlobUrl("svg-audio");
    export type embeddedImage = "SVG:error" | "SVG:audio";
    export const makeSureImageUrl = (url: embeddedImage | string): string =>
    {
        switch(url)
        {
        case "SVG:error":
            return error;
        case "SVG:audio":
            return audio;
        default:
            return url;
        }
    };
}
