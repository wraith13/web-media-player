import { Tools } from "@tools";
import { Library } from "@library";
import { Fps } from "./fps";
import { Clock } from "./clock";
import { UI } from "../ui";
import { ElementPool } from "./elementpool";
import { Media } from "./media";
import { History } from "./history";
import { Track } from "./track";
import * as Config from "@resource/config.json";
export namespace Player
{
    export namespace CrossFade
    {
        export let startAt: number | null = null;
        export let elapsedTime: number | null = null;
        export const getDuration = (): number =>
            parseFloat(UI.crossFadeSelect.get());
        export const clear = (): void =>
        {
            startAt = null;
            elapsedTime = null;
        };
        export const isCrossFading = (): boolean =>
            null !== startAt || null !== elapsedTime;
        export const start = (): void =>
        {
            startAt = Date.now();
            elapsedTime = null;
        };
        export const pause = (): void =>
        {
            if (null !== startAt)
            {
                elapsedTime = Date.now() - startAt;
            }
        }
        export const resume = (): void =>
        {
            if (null !== elapsedTime)
            {
                startAt = Date.now() - elapsedTime;
                elapsedTime = null;
            }
        }
        export const getEndAt = (): number | null =>
        {
            if (null !== startAt)
            {
                return startAt + getDuration();
            }
            else
            if (null !== elapsedTime)
            {
                return Date.now() + getDuration() - elapsedTime;
            }
            else
            {
                return null;
            }
        }
        export const getProgress = (): number =>
        {
            if (null !== elapsedTime)
            {
                return Math.min(elapsedTime / getDuration(), 1);
            }
            else
            if (null !== startAt)
            {
                return Math.min((Date.now() - startAt) / getDuration(), 1);
            }
            else
            {
                return 0;
            }
        };
        export const isHotCrossFadeTarget = (target: Track): boolean =>
            (getDuration() *3) < target.getDuration();
    }
    const noMediaTimer = new Library.UI.ToggleClassForWhileTimer();
    let loopHandle: number | null = null;
    export const updateFullscreenState = (fullscreen?: boolean) =>
    {
        if (Library.UI.fullscreenEnabled)
        {
            if (fullscreen ?? UI.withFullscreenCheckbox.get())
            {
                Library.UI.requestFullscreen(document.body);
                setTimeout(() => document.body.focus(), 100);
            }
            else
            {
                Library.UI.exitFullscreen();
            }
        }
    };
    let currentTrack: Track | null = null;
    let fadeoutingTrack: Track | null = null;
    export const isPlaying = (): boolean =>
        document.body.classList.contains("play");
    export const isSeeking = (): boolean =>
        document.body.classList.contains("is-seeking");
    export const startAnimationFrameLoop = (): void =>
    {
        if (null !== loopHandle)
        {
            window.cancelAnimationFrame(loopHandle);
        }
        loopHandle = window.requestAnimationFrame(loop);
    };
    export const play = async () =>
    {
        if (UI.isScrolledToMediaListBottom())
        {
            UI.mediaList.scrollTop = UI.mediaList.scrollHeight -((UI.mediaList.clientHeight *1.5) +UI.addMediaButtonHeight);
            document.body.classList.toggle("show-paused-media", false);
        }
        await ElementPool.makeSure
        ({
            image: Media.mediaList.find(m => "image" === m.category) ?? null,
            audio: Media.mediaList.find(m => "audio" === m.category) ?? null,
            video: Media.mediaList.find(m => "video" === m.category) ?? null,
        });
        updateFullscreenState();
        startAnimationFrameLoop();
        navigator.mediaSession.metadata = new MediaMetadata
        ({
            title: Config.applicationTitle,
            artist: "Unknown Artist",
            album: "Temporary Media List",
            artwork:
            [
                {
                    src: "./image/appicon.png",
                    type: "image/png",
                },
            ],
        });
        navigator.mediaSession.playbackState = "playing";
        document.body.classList.toggle("list", false);
        document.body.classList.toggle("play", true);
        if (Media.mediaList.length <= 0)
        {
            noMediaTimer.start(document.body, "no-media", 5000);
        }
        if (History.isCleared())
        {
            CrossFade.clear();
            removeFadeoutTrack();
            removeTrack(currentTrack);
            currentTrack = null;
        }
        CrossFade.resume();
        const media = History.play();
        if (media)
        {
            playMedia(media, "resume");
        }
        else
        if ( ! UI.repeatButton.dom.classList.contains("on"))
        {
            pause();
        }
    };
    export const resume = () =>
    {
        if (isPlaying())
        {
            startAnimationFrameLoop();
        }
    };
    export const pause = () =>
    {
        if (null !== loopHandle)
        {
            window.cancelAnimationFrame(loopHandle);
        }
        UI.clockDisplay.style.removeProperty("opacity");
        updateFullscreenState(false);
        navigator.mediaSession.playbackState = "paused";
        document.body.classList.toggle("list", true);
        document.body.classList.toggle("play", false);
        currentTrack?.pause();
        fadeoutingTrack?.pause();
        CrossFade.pause();
        UI.screenBody.classList.toggle("paused", 0 < Media.mediaList.length && null !== currentTrack);
    };
    export const previous = () =>
    {
        const media = History.back();
        if (media)
        {
            playMedia(media);
        }
        else
        {
            pause();
        }
    };
    export const next = () =>
    {
        const media = History.next();
        if (media)
        {
            playMedia(media);
        }
        else
        {
            pause();
            clear();
        }
    };
    export const clearCrossFade = () =>
    {
        if (null !== currentTrack)
        {
            if (CrossFade.isCrossFading())
            {
                const currentVolume = UI.volumeRange.get() /100;
                CrossFade.clear();
                removeFadeoutTrack();
                currentTrack.setVolume(currentVolume);
                currentTrack.crossFadeStep(1);
            }
        }
    };
    export const fastForward = () =>
    {
        if (null !== currentTrack)
        {
            clearCrossFade();
            currentTrack.fastForward();
            step();
        }
    };
    export const rewind = () =>
    {
        if (null !== currentTrack)
        {
            clearCrossFade();
            currentTrack.rewind();
            step();
        }
    };
    export const seek = (rate: number) =>
    {
        if (null !== currentTrack)
        {
            clearCrossFade();
            currentTrack.rateSeek(rate);
            step();
        }
    }
    export const temporaryPause = () =>
    {
        if (null !== currentTrack)
        {
            clearCrossFade();
            currentTrack?.pause();
        }
    };
    export const temporaryResume = () =>
    {
        if (null !== currentTrack)
        {
            clearCrossFade();
            currentTrack.play();
        }
    }
    export const updateFps = () =>
    {
        if (UI.showFpsCheckbox.get())
        {
            Library.UI.setTextContent(UI.fpsDisplay, Fps.getText());
        }
    }
    let lastTimeVolume: number = 1.0;
    export const isNextTiming = (): boolean =>
    {
        if (null !== currentTrack)
        {
            if (currentTrack.getRemainingTime() <= 0)
            {
                return true;
            }
            if (0 < parseFloat(UI.crossFadeSelect.get()))
            {
                if (CrossFade.isHotCrossFadeTarget(currentTrack))
                {
                    if (currentTrack.getRemainingTime() <= CrossFade.getDuration())
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    export const crossFade = async () =>
    {
        if (null !== currentTrack && ! isSeeking())
        {
            if (currentTrack.selfValidate())
            {
                UI.mediaLength.click();
            }
            const currentVolume = UI.volumeRange.get() /100;
            if (CrossFade.isCrossFading())
            {
                if ((CrossFade.getEndAt() ?? 0) <= Date.now())
                {
                    CrossFade.clear();
                    removeFadeoutTrack();
                    currentTrack.setVolume(currentVolume);
                    currentTrack.crossFadeStep(1);
                    currentTrack.updateStretch();
                    if ( ! currentTrack.isPlaying())
                    {
                        await currentTrack.play();
                    }
                }
                else
                {
                    const progress = CrossFade.getProgress();
                    if (null !== fadeoutingTrack)
                    {
                        const fadeoutProgress = 1 - progress;
                        fadeoutingTrack.setVolume(currentVolume, fadeoutProgress, "fadeOut");
                        //fadeoutingTrack.crossFadeStep(fadeoutProgress);
                    }
                    currentTrack.setVolume(currentVolume, progress, "fadeIn");
                    currentTrack.crossFadeStep(progress);
                }
            }
            else
            {
                if (lastTimeVolume !== currentVolume)
                {
                    if (null !== currentTrack)
                    {
                        currentTrack.setVolume(currentVolume);
                    }
                }
                if (currentTrack.getRemainingTime() <= 0 || (isNextTiming() && ! History.isAtEnd()))
                {
                    next();
                }
            }
            lastTimeVolume = currentVolume;
        }
    };
    export const makeIndexText = (track: Track): string =>
        `${Media.mediaList.indexOf(track.media) +1} / ${Media.mediaList.length}`;
    export const makeTitleText = (track: Track): string =>
        `${track.media.name}`;
    export const makeTimeText = (track: Track): string =>
        `${Tools.Timespan.toMediaTimeString(track.getElapsedTime())} / ${Tools.Timespan.toMediaTimeString(track.getDuration())}`;
    export const step = () =>
    {
        if (null !== fadeoutingTrack)
        {
            fadeoutingTrack.step();
        }
        if (null !== currentTrack)
        {
            Library.UI.setTextContent(UI.mediaTime, makeTimeText(currentTrack));
            currentTrack.step();
            currentTrack.setPositionState();
        }
    };
    export const loop = (now: number) =>
    {
        if (isPlaying())
        {
            Clock.update(now);
            Fps.step(now);
            updateFps();
            crossFade();
            step();
            navigator.mediaSession.setPositionState
            ({
                duration: (currentTrack?.getDuration() ?? 0) /1000,
                playbackRate: currentTrack?.playerElement instanceof HTMLMediaElement ? currentTrack.playerElement.playbackRate : 1.0,
                position: (currentTrack?.getElapsedTime() ?? 0) /1000,
            });
            loopHandle = window.requestAnimationFrame(loop);
        }
        else
        {
            loopHandle = null;
        }
    };
    export const playMedia = (entry: Media.Entry, resume?: "resume") =>
    {
        navigator.mediaSession.metadata = new MediaMetadata
        ({
            title: entry.name,
            artist: "Unknown Artist",
            album: "Temporary Media List",
            artwork: [{ src: entry.thumbnail, }],
        });
        if (resume && currentTrack && entry === currentTrack.media)
        {
            currentTrack.updateStretch();
            currentTrack.play();
            fadeoutingTrack?.updateStretch();
            fadeoutingTrack?.play();
        }
        else
        {
            removeFadeoutTrack();
            fadeoutingTrack = currentTrack;
            currentTrack = new Track(entry, History.getCurrentIndex());
            currentTrack.updateStretch();
            Library.UI.setTextContent(UI.mediaIndex, makeIndexText(currentTrack));
            Library.UI.setTextContent(UI.mediaTitle, makeTitleText(currentTrack));
            const currentVolume = UI.volumeRange.get() /100;
            if (0 < parseFloat(UI.crossFadeSelect.get()) && fadeoutingTrack)
            {
                CrossFade.start();
                fadeoutingTrack?.setVolume(currentVolume, 1, "fadeOut");
                currentTrack.setVolume(currentVolume, 0, "fadeIn");
                currentTrack.crossFadeStep(0);
                if (CrossFade.isHotCrossFadeTarget(currentTrack))
                {
                    currentTrack.play();
                }
            }
            else
            {
                if (fadeoutingTrack)
                {
                    removeFadeoutTrack();
                }
                currentTrack.setVolume(currentVolume);
                currentTrack.crossFadeStep(1);
                currentTrack.play();
            }
            if (currentTrack.visualElement)
            {
                UI.mediaScreen.insertBefore(currentTrack.visualElement, UI.clockDisplay);
            }
        }
    };
    export const removeTrack = (track: Track | null) =>
    {
        if (track)
        {
            track.pause();
            if (track.visualElement)
            {
                UI.mediaScreen.removeChild(track.visualElement);
            }
            track.release();
        }
    }
    export const removeFadeoutTrack = () =>
    {
        removeTrack(fadeoutingTrack);
        fadeoutingTrack = null;
    }
    export const updateStretch = () =>
    {
        const { innerWidth, innerHeight } = window;
        document.documentElement.style.setProperty('--diagonal', `${Math.hypot(innerWidth, innerHeight) *0.01}px`);
        currentTrack?.updateStretch();
        fadeoutingTrack?.updateStretch();
    }
    export const updateLoopShortMedia = () =>
    {
        if (null !== currentTrack)
        {
            currentTrack.updateLoopShortMedia(isPlaying());
        }
    }
    export const clear = () =>
    {
        UI.screenBody.classList.toggle("paused", false);
        Library.UI.setTextContent(UI.mediaIndex, "");
        Library.UI.setTextContent(UI.mediaTitle, "");
        Library.UI.setTextContent(UI.mediaTime, "");
        History.clear();
        CrossFade.clear();
        removeFadeoutTrack();
        if (null !== currentTrack)
        {
            const clearedTrack = fadeoutingTrack = currentTrack;
            currentTrack = null;
            if (fadeoutingTrack.visualElement)
            {
                Library.UI.setStyle(fadeoutingTrack.visualElement, "opacity", undefined);
                fadeoutingTrack.visualElement.classList.add("fade-out");
            }
            setTimeout
            (
                () =>
                {
                    if (clearedTrack === fadeoutingTrack)
                    {
                        removeFadeoutTrack();
                    }
                },
                3000
            );
        }
    }
}
