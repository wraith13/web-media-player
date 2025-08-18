import { Fps } from "./fps";
import { Clock } from "./clock";
import { Library } from "@library";
import { UI } from "../ui";
import { Media } from "./media";
import { History } from "./history";
import { Track } from "./track";
import * as config from "@resource/config.json";
export namespace Player
{
    export namespace Transition
    {
        export let startAt: number | null = null;
        export let elapsedTime: number | null = null;
        export const duration: number = config.transition.duration;
        export const clear = (): void =>
        {
            startAt = null;
            elapsedTime = null;
        };
        export const isTransitioning = (): boolean =>
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
                return startAt + duration;
            }
            else
            if (null !== elapsedTime)
            {
                return Date.now() + duration - elapsedTime;
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
                return Math.min(elapsedTime / duration, 1);
            }
            else
            if (null !== startAt)
            {
                return Math.min((Date.now() - startAt) / duration, 1);
            }
            else
            {
                return 0;
            }
        };
        export const isActiveTransitionTarget = (target: Track): boolean =>
            (config.transition.duration *3) < target.getDuration();
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
    export const play = () =>
    {
        updateFullscreenState();
        if (null !== loopHandle)
        {
            window.cancelAnimationFrame(loopHandle);
        }
        loopHandle = window.requestAnimationFrame(loop);
        navigator.mediaSession.metadata = new MediaMetadata
        ({
            title: config.applicationTitle,
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
        Library.UI.setStyle(UI.mediaScreen, "opacity", `${UI.brightnessRange.get() / 100}`);
        if (Media.mediaList.length <= 0)
        {
            noMediaTimer.start(document.body, "no-media", 5000);
        }
        if (History.isCleared())
        {
            Transition.clear();
            removeFadeoutTrack();
            removeTrack(currentTrack);
            currentTrack = null;
        }
        Transition.resume();
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
        Transition.pause();
        Library.UI.setStyle(UI.mediaScreen, "opacity", "0.2");
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
            History.clear();
            pause();
        }
    };
    export const updateFps = () =>
    {
        if (UI.showFpsCheckbox.get())
        {
            Library.UI.setTextContent(UI.fpsDisplay, Fps.getText());
        }
    }
    let lastTimeVolume: number = 1.0;
    export const transition = () =>
    {
        if (null !== currentTrack)
        {
            const currentVolume = UI.volumeRange.get() /100;
            if (Transition.isTransitioning())
            {
                if ((Transition.getEndAt() ?? 0) <= Date.now())
                {
                    Transition.clear();
                    removeFadeoutTrack();
                    currentTrack.setVolume(currentVolume);
                    currentTrack.transitionStep(1);
                    if ( ! currentTrack.isPlaying())
                    {
                        currentTrack.play();
                    }
                }
                else
                {
                    const progress = Transition.getProgress();
                    if (null !== fadeoutingTrack)
                    {
                        fadeoutingTrack.setVolume(currentVolume * (1 - progress));
                        fadeoutingTrack.transitionStep(1 - progress);
                    }
                    currentTrack.setVolume(currentVolume *progress);
                    currentTrack.transitionStep(progress);
                }
                lastTimeVolume = currentVolume;
            }
            else
            {
                if (lastTimeVolume !== currentVolume)
                {
                    lastTimeVolume = currentVolume;
                    if (null !== currentTrack)
                    {
                        currentTrack.setVolume(currentVolume);
                    }
                }
                if (UI.transitionCheckbox.get())
                {
                    if (Transition.isActiveTransitionTarget(currentTrack))
                    {
                        if (currentTrack.getRemainingTime() <= config.transition.duration)
                        {
                            Transition.start();
                            next();
                        }
                    }
                    else
                    {
                        if (currentTrack.getRemainingTime() <= 0)
                        {
                            Transition.start();
                            next();
                        }
                    }
                }
                else
                {
                    if (currentTrack.getRemainingTime() <= 0)
                    {
                        next();
                    }
                }
            }
        }
    };
    export const loop = (now: number) =>
    {
        if (document.body.classList.contains("play"))
        {
            Clock.update(now);
            Fps.step(now);
            updateFps();
            transition();
            navigator.mediaSession.setPositionState
            ({
                duration: (currentTrack?.getDuration() ?? 0) /1000,
                playbackRate: currentTrack?.playerDom instanceof HTMLMediaElement ? currentTrack.playerDom.playbackRate : 1.0,
                position: (currentTrack?.getElapsedTime() ?? 0) /1000,
            })
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
            currentTrack = new Track(entry);
            currentTrack.updateStretch();
            if (currentTrack.visualDom)
            {
                UI.mediaScreen.insertBefore(currentTrack.visualDom, UI.clockDisplay);
            }
            if (UI.transitionCheckbox.get() && fadeoutingTrack)
            {
                Transition.start();
                currentTrack.setVolume(0);
                currentTrack.transitionStep(0);
                if (Transition.isActiveTransitionTarget(currentTrack))
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
                const currentVolume = UI.volumeRange.get() /100;
                currentTrack.setVolume(currentVolume);
                currentTrack.transitionStep(1);
                currentTrack.play();
            }
        }
    };
    export const removeTrack = (track: Track | null) =>
    {
        if (track)
        {
            track.pause();
            if (track.visualDom)
            {
                UI.mediaScreen.removeChild(track.visualDom);
            }
        }
    }
    export const removeFadeoutTrack = () =>
    {
        removeTrack(fadeoutingTrack);
        fadeoutingTrack = null;
    }
    export const updateStretch = () =>
    {
        currentTrack?.updateStretch();
        fadeoutingTrack?.updateStretch();
    }
}
