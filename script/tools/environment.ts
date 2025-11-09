export namespace Environment
{
    export const isApple = (): boolean =>
    {
        return /Macintosh|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
    export const isSafari = (): boolean =>
    {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }
    export const isMobile = (): boolean =>
    {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    export const isTouchDevice = (): boolean =>
    {
        return "ontouchstart" in window || 0 < navigator.maxTouchPoints;
    };
    export const isAppleTouchDevice = (): boolean =>
        isApple() && isTouchDevice();
    export const canAutoplay = (): boolean =>
        ! isMobile() && ! isAppleTouchDevice();
}
