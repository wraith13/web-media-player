import { Tools } from "@tools";
import { Library } from "@library";
import { Fps } from "./fps";
import { Overlay } from "./overlay";
import { UI } from "../ui";
import { ElementPool } from "./elementpool";
import { Media } from "./media";
import { History } from "./history";
import { Track } from "./track";
import { Timer } from "./timer";
import * as Config from "@resource/config.json";
export namespace Player
{
    export let locale: string | undefined = undefined;
    export type TrackType = "current" | "fadeouting";
    export namespace CrossFade
    {
        export let startAt: number | null = null;
        export let elapsedTime: number | null = null;
        export const getDuration = (): number =>
            parseFloat(UI.SettingsPanel.crossFadeSelect.get());
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
        export const getProgress = (trackType: TrackType): number =>
        {
            if ("current" === trackType)
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
                    return 1;
                }
            }
            else
            {
                return 1 -getProgress("current");
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
            if (fullscreen ?? UI.SettingsPanel.withFullscreenCheckbox.get())
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
    export const play = async (media?: Media.Entry) =>
    {
        document.body.classList.toggle("show-ui", false);
        document.body.classList.toggle("list", false);
        document.body.classList.toggle("play", true);
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
        const currentMedia = History.play(media);
        if (currentMedia)
        {
            playMedia(currentMedia, "resume");
        }
        else
        if ( ! UI.ControlPanel.repeat.get())
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
        UI.overlay.style.removeProperty("opacity");
        //updateFullscreenState(false);
        navigator.mediaSession.playbackState = "paused";
        document.body.classList.toggle("list", true);
        document.body.classList.toggle("play", false);
        currentTrack?.pause();
        fadeoutingTrack?.pause();
        CrossFade.pause();
        const isResumable = 0 < Media.mediaList.length && null !== currentTrack;
        UI.screenBody.classList.toggle("paused", isResumable);
        if (isResumable)
        {
            UI.mediaList.scrollTop = UI.mediaList.scrollHeight;
            document.body.classList.toggle("show-paused-media", true);
        }
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
                currentTrack.setOpacity(1);
                currentTrack.setBlur(1);
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
        if (UI.SettingsPanel.showFpsCheckbox.get())
        {
            Library.UI.setTextContent(UI.fpsDisplay, Fps.getText());
        }
    }
    export const isNextTiming = (): boolean =>
    {
        if (null !== currentTrack)
        {
            if (currentTrack.getRemainingTime() <= 0)
            {
                return true;
            }
            if (0 < parseFloat(UI.SettingsPanel.crossFadeSelect.get()))
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
        if (null !== currentTrack)
        {
            if ( ! isSeeking())
            {
                if (currentTrack.selfValidate())
                {
                    UI.SettingsPanel.mediaLength.click();
                }
                if (CrossFade.isCrossFading())
                {
                    if ((CrossFade.getEndAt() ?? 0) <= Date.now())
                    {
                        CrossFade.clear();
                        removeFadeoutTrack();
                        if ( ! currentTrack.isPlaying())
                        {
                            await currentTrack.play();
                        }
                    }
                }
                else
                {
                    if (currentTrack.getRemainingTime() <= 0 || (isNextTiming() && ! History.isAtEnd()))
                    {
                        next();
                    }
                }
            }
        }
    };
    const updateTrackPropertiesBase = (trackType: TrackType) =>
    {
        const track = "current" === trackType ? currentTrack : fadeoutingTrack;
        if (null !== track)
        {
            track.setVolume(getVolume(trackType), getVolumeRate(trackType), getVolumeFade(trackType));
            track.setBrightness(getBrightness());
            track.setOpacity(getOpacity(trackType));
            track.setBlur(getBlur(trackType));
        }
    };
    const updateCurrentTrackProperties = () =>
        updateTrackPropertiesBase("current");
    const updateFadeoutingTrackProperties = () =>
        updateTrackPropertiesBase("fadeouting");
    export const updateTrackProperties = () =>
    {
        updateCurrentTrackProperties();
        updateFadeoutingTrackProperties();
    };
    export const getBrightness = (): number =>
        Timer.getTimerFade();
    export const getVolume = (trackType: TrackType): number =>
        (UI.volumeRange.get() /100) *CrossFade.getProgress(trackType);
    export const getVolumeRate = (trackType: TrackType): number =>
        CrossFade.getProgress(trackType);
    export const getVolumeFade = (trackType: TrackType): "fadeIn" | "fadeOut" | undefined =>
    {
        if (CrossFade.isCrossFading())
        {
            switch(trackType)
            {
            case "current":
                return "fadeIn";
            case "fadeouting":
                return "fadeOut";
            }
        }
        else
        {
            return undefined;
        }
    };
    export const getOpacity = (trackType: TrackType): number =>
        CrossFade.getProgress(trackType);
    export const getBlur = (trackType: TrackType): number =>
        UI.SettingsPanel.crossFadeWithBlurCheckbox.get() ?
            (1 -CrossFade.getProgress(trackType)):
            0;
    export const makeIndexText = (track: Track): string =>
        `${(Media.mediaList.indexOf(track.media) +1).toLocaleString(locale)} / ${Media.mediaList.length.toLocaleString(locale)}`;
    export const makeTitleText = (track: Track): string =>
        `${track.media.name}`;
    export const makeTimeText = (track: Track): string =>
        `${Tools.Timespan.toMediaTimeString(track.getElapsedTime(), locale)} / ${Tools.Timespan.toMediaTimeString(track.getDuration(), locale)}`;
    export const step = () =>
    {
        if (null !== fadeoutingTrack)
        {
            fadeoutingTrack.step("fadeouting");
        }
        if (null !== currentTrack)
        {
            Library.UI.setTextContent(UI.TransportPanel.mediaTime, makeTimeText(currentTrack));
            currentTrack.step("current");
            currentTrack.setPositionState();
        }
    };
    export const updateMediaSessionPositionState = () =>
    {
        try
        {
            const duration = Math.max(0, (currentTrack?.getDuration() ?? 0) /1000);
            const playbackRate = currentTrack?.playerElement instanceof HTMLMediaElement ? currentTrack.playerElement.playbackRate : 1.0;
            const position = Tools.Math.clip(0, (currentTrack?.getElapsedTime() ?? 0) /1000, duration);
            navigator.mediaSession.setPositionState({ duration, playbackRate, position, });
        }
        catch(error)
        {
            console.error("🚫 Player.loop: Failed to set position state.", error);
        }
    };
    export const loop = (now: number) =>
    {
        if (isPlaying())
        {
            try
            {
                Overlay.update(now);
                Fps.step(now);
                updateFps();
                crossFade();
                updateTrackProperties();
                step();
                updateMediaSessionPositionState();
            }
            finally
            {
                loopHandle = window.requestAnimationFrame(loop);
            }
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
            currentTrack.updateStretch("current");
            currentTrack.play();
            fadeoutingTrack?.updateStretch("fadeouting");
            fadeoutingTrack?.play();
        }
        else
        {
            removeFadeoutTrack();
            fadeoutingTrack = currentTrack;
            currentTrack = new Track(entry, History.getCurrentIndex());
            updateCurrentTrackProperties();
            Library.UI.setTextContent(UI.TransportPanel.mediaIndex, makeIndexText(currentTrack));
            Library.UI.setTextContent(UI.TransportPanel.mediaTitle, makeTitleText(currentTrack));
            if (0 < parseFloat(UI.SettingsPanel.crossFadeSelect.get()))
            {
                CrossFade.start();
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
                currentTrack.play();
            }
            if (currentTrack.visualElement)
            {
                UI.mediaScreen.insertBefore(currentTrack.visualElement, UI.AnalogClock.panel);
                currentTrack.updateStretch("current");
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
        document.documentElement.style.setProperty('--short-side', `${Math.min(innerWidth, innerHeight) *0.01}px`);
        currentTrack?.updateStretch("current");
        fadeoutingTrack?.updateStretch("fadeouting");
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
        Library.UI.setTextContent(UI.TransportPanel.mediaIndex, "");
        Library.UI.setTextContent(UI.TransportPanel.mediaTitle, "");
        Library.UI.setTextContent(UI.TransportPanel.mediaTime, "");
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
    export const initialize = (params: Record<string, string>): void =>
    {
        locale = params["locale"];
    };
}
