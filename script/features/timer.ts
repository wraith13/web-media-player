export namespace Timer
{
    let wakeUpFadeInSpan: number = 0;
    let wakeUpAt: number | null = null;
    let sleepFadeOutSpan: number = 0;
    let sleepAt: number | null = null;
    export const setWakeUpFadeInSpan = (timespan: number): void =>
    {
        wakeUpFadeInSpan = timespan;
    };
    export const setSleepFadeOutSpan = (timespan: number): void =>
    {
        sleepFadeOutSpan = timespan;
    };
    export const getNow = (): number => Date.now();
    export const isWaitingForWakeUp = (): boolean =>
        null !== wakeUpAt && getNow() < wakeUpAt!;
    export const isWakeUpFading = (): boolean =>
        null !== getElapsedWakeUpTime();
    export const getElapsedWakeUpTime = (): number | null =>
    {
        if (null !== wakeUpAt)
        {
            const result = getNow() - wakeUpAt;
            if (0 <= result && result <= wakeUpFadeInSpan)
            {
                return result;
            }
        }
        return null;
    }
    export const getWakeUpFadeProgress = (): number | null =>
    {
        if (isWakeUpFading())
        {
            const wakeUpTime = getElapsedWakeUpTime();
            if (null !== wakeUpTime)
            {
                return Math.min(wakeUpTime / wakeUpFadeInSpan, 1);
            }
        }
        return null;
    };
    export const isSleepTimerActive = (): boolean => { };
    export const isSleepFading = (): boolean => { };
    export const getTimeUntilSleep = (): number | null => { };
    export const getSleepFadeProgress = (): number | null => { };
}
