import { Player } from "./player";
export namespace Timer
{
    let wakeUpFadeInSpan: number = 0;
    let wakeUpAt: number | null = null;
    let wakeUpTimer: ReturnType<typeof setTimeout> | null = null;
    let sleepFadeOutSpan: number = 0;
    let sleepAt: number | null = null;
    let sleepTimer: ReturnType<typeof setTimeout> | null = null;
    let isSleeped: boolean = false;
    export const setWakeUpFadeInSpan = (timespan: number): void =>
    {
        wakeUpFadeInSpan = timespan;
    };
    export const setSleepFadeOutSpan = (timespan: number): void =>
    {
        sleepFadeOutSpan = timespan;
    };
    export const setWakeUpTimer = (timespan: number | null): void =>
    {
        if (null !== wakeUpTimer)
        {
            clearTimeout(wakeUpTimer);
            wakeUpTimer = null;
        }
        if (null !== timespan)
        {
            wakeUpAt = getNow() + timespan;
            wakeUpTimer = setTimeout
            (
                () =>
                {
                    wakeUpTimer = null;
                    wakeUp("WithPlay");
                },
                timespan
            );
            sleep();
        }
        else
        {
            wakeUpAt = null;
            wakeUp();
        }
    };
    export const setSleepTimer = (timespan: number | null): void =>
    {
        wakeUp();
        if (null !== sleepTimer)
        {
            clearTimeout(sleepTimer);
            sleepTimer = null;
        }
        if (null !== timespan)
        {
            sleepAt = getNow() + timespan;
            sleepTimer = setTimeout
            (
                () =>
                {
                    sleepTimer = null;
                    sleep("WithPause");
                },
                timespan
            );
        }
        else
        {
            sleepAt = null;
        }
    };
    export const wakeUp = (withPlay?: "WithPlay"): void =>
    {
        isSleeped = false;
        if (withPlay === "WithPlay" && ! Player.isPlaying())
        {
            Player.play();
        }
    };
    export const sleep = (withPause?: "WithPause"): void =>
    {
        isSleeped = true;
        if (withPause === "WithPause" && Player.isPlaying())
        {
            Player.pause();
        }
    };
    export const getNow = (): number => Date.now();
    export const isInSleepedMode = (): boolean =>
        isSleeped;
    export const isWaitingForWakeUp = (): boolean =>
        null !== wakeUpAt && getNow() < wakeUpAt!;
    export const getTimeUntilWakeUp = (): number | null =>
        null !== wakeUpAt ? wakeUpAt! - getNow() : null;
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
    export const isSleepTimerActive = (): boolean =>
        null !== sleepAt;
    export const isSleepFading = (): boolean =>
    {
        const timeUntilSleep = getTimeUntilSleep();
        return null !== timeUntilSleep && timeUntilSleep <= sleepFadeOutSpan;
    };
    export const getTimeUntilSleep = (): number | null =>
        null !== sleepAt ? sleepAt! - getNow() : null;
    export const getSleepFadeProgress = (): number | null =>
    {
        if (isSleepFading())
        {
            const timeUntilSleep = getTimeUntilSleep();
            if (null !== timeUntilSleep)
            {
                return Math.min((sleepFadeOutSpan - timeUntilSleep) / sleepFadeOutSpan, 1);
            }
        }
        return null;
    };
}
