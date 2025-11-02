import * as config from "@resource/config.json";
export namespace Timer
{
    const Player =
    {
        isPlaying: undefined as unknown as () => boolean,
        play: undefined as unknown as () => unknown,
        pause: undefined as unknown as () => unknown,
    };
    let wakeUpTimeSpan: number | null = null;
    let wakeUpFadeInSpan: number = 0;
    let wakeUpAt: number | null = null;
    let wokeUpAt: number | null = null;
    let wakeUpTimer: ReturnType<typeof setTimeout> | null = null;
    let sleepTimeSpan: number | null = null;
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
        wakeUpTimeSpan = timespan;
        if (null !== wakeUpTimer)
        {
            clearTimeout(wakeUpTimer);
            wakeUpTimer = null;
        }
        if (null !== wakeUpTimeSpan && 0 < wakeUpTimeSpan)
        {
            wakeUpAt = getNow() + wakeUpTimeSpan;
            wakeUpTimer = setTimeout
            (
                () =>
                {
                    wakeUpTimer = null;
                    wokeUpAt = getNow();
                    wakeUp("WithPlay");
                },
                wakeUpTimeSpan
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
        sleepTimeSpan = timespan;
        wakeUp();
        if (null !== sleepTimer)
        {
            clearTimeout(sleepTimer);
            sleepTimer = null;
        }
        if (null !== sleepTimeSpan && 0 < sleepTimeSpan)
        {
            sleepAt = getNow() + sleepTimeSpan;
            sleepTimer = setTimeout
            (
                () =>
                {
                    sleepAt = null;
                    sleepTimer = null;
                    sleep("WithPause");
                },
                sleepTimeSpan
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
    export const getProgressUntilWakeUp = (): number | null =>
    {
        const timeUntilWakeUp = getTimeUntilWakeUp();
        if (null !== timeUntilWakeUp && null !== wakeUpTimeSpan)
        {
            return (wakeUpTimeSpan -timeUntilWakeUp) /wakeUpTimeSpan;
        }
        return null;
    };
    export const getCountDownTimerLoopSpan = (timerSpan: number | null, remainingTime: number | null): number | null =>
    {
        if (null !== remainingTime && 0 < remainingTime && null !== timerSpan)
        {
            const stabilizeSpan = remainingTime %1000 || 1000;
            const spanFromminSteps = timerSpan /config.timers.minSteps;
            return Math.min(stabilizeSpan, spanFromminSteps);
        }
        return null;
    };
    export const getWakeUpCountDownTimerLoopSpan = (remainingTime: number | null): number | null =>
        getCountDownTimerLoopSpan(wakeUpTimeSpan, remainingTime);
    export const isWakeUpFading = (): boolean =>
        null !== getElapsedWokeUpTime();
    export const getElapsedWokeUpTime = (): number | null =>
    {
        if (null !== wokeUpAt)
        {
            const result = getNow() - wokeUpAt;
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
            const wakeUpTime = getElapsedWokeUpTime();
            if (null !== wakeUpTime)
            {
                return Math.min(wakeUpTime /wakeUpFadeInSpan, 1);
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
    export const getProgressUntilSleep = (): number | null =>
    {
        const timeUntilSleep = getTimeUntilSleep();
        if (null !== timeUntilSleep && null !== sleepTimeSpan)
        {
            return (sleepTimeSpan -timeUntilSleep) /sleepTimeSpan;
        }
        return null;
    };
    export const getSleepCountDownTimerLoopSpan = (remainingTime: number | null): number | null =>
        getCountDownTimerLoopSpan(sleepTimeSpan, remainingTime);
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
    export const getTimerFade = (): number =>
    {
        const wakeUpFadeProgress = getWakeUpFadeProgress();
        const sleepFadeProgress = getSleepFadeProgress();
        if (null !== wakeUpFadeProgress || null !== sleepFadeProgress)
        {
            return (wakeUpFadeProgress ?? 1) * (1 -(sleepFadeProgress ?? 0));
        }
        if (isInSleepedMode())
        {
            return 0;
        }
        return 1;
    }
    export const initialize = (data: { isPlaying: () => boolean, play: () => unknown, pause: () => unknown, }): void =>
    {
        Player.isPlaying = data.isPlaying;
        Player.play = data.play;
        Player.pause = data.pause;
    };
}
