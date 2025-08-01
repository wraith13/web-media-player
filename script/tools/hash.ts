export namespace Hash
{
    export const fnv1a_32 = (key: string): number =>
    {
        let hash = 2166136261;
        for(const char of key)
        {
            hash ^= char.charCodeAt(0);
            hash = (hash * 16777619) >>> 0;
        }
        return hash;
    }
}
