import config from "@resource/config.json";
export namespace Url
{
    export const parseParameter = (url: string): Record<string, string> =>
    {
        const result: Record<string, string> = {};
        const urlObj = new URL(url);
        const params = urlObj.searchParams;
        params.forEach
        (
            (value, key) => result[key] = value
        );
        return result;
    };
    export const make = (params: Record<string, string>) =>
    {
        const url = new URL(config.canonicalUrl || window.location.href);
        for (const [ key, value ] of Object.entries(params))
        {
            url.searchParams.set(key, value);
        }
        return url.toString();
    };
    // export const update = (params: Record<string, string>): void =>
    //     window.history.replaceState({}, "", make(params));
    export const addParameter = (params: Record<string, string>, key: string, value: string): Record<string, string> =>
    {
        params[key] = value;
        return params;
    };
    // export const applyParam = (key: string, value: string): void =>
    //     update(addParameter(parseParameter(window.location.href), key, value));
    export const initialize = () =>
    {
        // Initialization of params is necessary, but it is actually initialized at the time of declaration. In reality, nothing is done here.
    };
    export const params = parseParameter(window.location.href);
}
