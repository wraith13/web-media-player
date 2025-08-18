export namespace Environment
{
    export const isMobile = (): boolean =>
    {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    export const isTouchDevice = (): boolean =>
    {
        return "ontouchstart" in window || 0 < navigator.maxTouchPoints;
    };
}
