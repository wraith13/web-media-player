export namespace Environment
{
    export const isWindows = (): boolean =>
        /Windows/i.test(navigator.userAgent);
    export const isApple = (): boolean =>
        /Macintosh|iPhone|iPad|iPod/i.test(navigator.userAgent);
    export const isSafari = (): boolean =>
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    export const isMobile = (): boolean =>
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    export const isTouchDevice = (): boolean =>
        "ontouchstart" in window || 0 < navigator.maxTouchPoints;
    export const isAppleTouchDevice = (): boolean =>
        isApple() && isTouchDevice();
    export const canAutoplay = (): boolean =>
        ! isMobile() && ! isAppleTouchDevice();
}
