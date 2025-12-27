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
import * as config from "@resource/config.json";
export namespace Player
{
    export let locale: string | undefined = undefined;
    export type TrackType = "current" | "fadingout";
    export namespace CrossFade
    {
        export let startAt: number | null = null;
        export let elapsedTime: number | null = null;
        export const getDuration = (): number =>
            Tools.Timespan.parse(UI.SettingsPanel.crossFadeSelect.get()) ?? 0;
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
    let fadingOutTrack: Track | null = null;
    export const isPlaying = (): boolean =>
        UI.isPlaying();
    export const isSeeking = (): boolean =>
        UI.isSeeking();
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
        UI.onPlaybackStarted();
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
        if (Media.mediaList.length <= 0)
        {
            UI.MessagePanel.noMediaPanelVisibilityApplier.show();
            noMediaTimer.start
            (
                document.body,
                "no-media",
                config.messages.noMediaMessageDuration,
                () => UI.MessagePanel.noMediaPanelVisibilityApplier.hide()
            );
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
        UI.onPlaybackPaused();
        navigator.mediaSession.playbackState = "paused";
        currentTrack?.pause();
        fadingOutTrack?.pause();
        CrossFade.pause();
        const isResumable = 0 < Media.mediaList.length && null !== currentTrack;
        UI.screenBody.classList.toggle("paused", isResumable);
        if (isResumable)
        {
            UI.mediaList.scrollTop = UI.mediaList.scrollHeight;
            document.body.classList.toggle("show-paused-media", true);
        }
        else
        {
            UI.TransportPanel.visibilityApplier.hide();
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
                currentTrack.setPattern(1, fadingOutTrack);
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
            if ("off" !== UI.SettingsPanel.crossFadeSelect.get())
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
    const getTrack = (trackType: TrackType): Track | null =>
        "current" === trackType ? currentTrack : fadingOutTrack;
    const updateTrackPropertiesBase = (trackType: TrackType) =>
    {
        const track = getTrack(trackType);
        if (null !== track)
        {
            track.setVolume(getVolume(trackType), getVolumeRate(trackType), getVolumeFade(trackType));
            track.setOpacity(getOpacity(trackType));
            track.setBlur(getBlur(trackType));
            if ("current" === trackType)
            {
                track.setPattern(getPattern(trackType), fadingOutTrack);
            }
            else
            {
                if ("wipe" !== getTransitionType() || !(currentTrack?.isReverseWipe))
                {
                    track.setPattern(1, null);
                }
            }
        }
    };
    const updateCurrentTrackProperties = () =>
        updateTrackPropertiesBase("current");
    const updateFadingOutTrackProperties = () =>
        updateTrackPropertiesBase("fadingout");
    export const updateTrackProperties = () =>
    {
        updateCurrentTrackProperties();
        updateFadingOutTrackProperties();
    };
    export const getBrightness = (): number =>
        Timer.getTimerFade();
    export const getVolume = (trackType: TrackType): number =>
        (UI.volumeRange.get() /100) *CrossFade.getProgress(trackType) *Timer.getTimerFade();
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
            case "fadingout":
                return "fadeOut";
            }
        }
        else
        {
            return undefined;
        }
    };
    export const getTransitionType = (): "none" | "alpha" | "blur" | "wipe" =>
    {
        const transitionType = UI.SettingsPanel.crossFadeTransitionSelect.get() as "alpha" | "blur" | "wipe" | "random";
        switch(transitionType)
        {
        case "random":
            {
                if (null !== currentTrack)
                {
                    return currentTrack.makeSureRandomTransition();
                }
                return "none";
            }
        default:
            return transitionType;
        }
    };
    export const getOpacity = (trackType: TrackType): number =>
        [ "alpha", "blur" ].includes(getTransitionType()) ?
            CrossFade.getProgress(trackType):
            1;
    export const getBlur = (trackType: TrackType): number =>
        [ "blur" ].includes(getTransitionType()) ?
            (1 -CrossFade.getProgress(trackType)):
            0;
    export const getPattern = (trackType: TrackType): number =>
        "current" === trackType && [ "wipe" ].includes(getTransitionType()) ?
            CrossFade.getProgress(trackType):
            1;
    export const makeIndexText = (track: Track): string =>
        `${(Media.mediaList.indexOf(track.media) +1).toLocaleString(locale)} / ${Media.mediaList.length.toLocaleString(locale)}`;
    export const makeTitleText = (track: Track): string =>
        `${track.media.name}`;
    export const makeTimeText = (track: Track): string =>
        `${Tools.Timespan.toMediaTimeString(track.getElapsedTime(), locale)} / ${Tools.Timespan.toMediaTimeString(track.getDuration(), locale)}`;
    export const updateDarkCurtainOpacity = () =>
    {
        const brightness = UI.SettingsPanel.brightnessRange.get() *Timer.getTimerFade();
        Library.UI.setStyle(UI.darkCurtain, "opacity", `${(100 -brightness).toFixed(2)}%`);
        const whiteDepthBottom = config.ui.whiteDepthBottom;
        const whiteDepth = whiteDepthBottom +((1 -whiteDepthBottom) *(brightness /100));
        Library.UI.setStyle(document.documentElement, "--white-depth", whiteDepth.toFixed(3));
    };
    export const step = () =>
    {
        if (null !== fadingOutTrack)
        {
            fadingOutTrack.step("fadingout");
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
                updateDarkCurtainOpacity();
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
            fadingOutTrack?.updateStretch("fadingout");
            fadingOutTrack?.play();
        }
        else
        {
            removeFadeoutTrack();
            fadingOutTrack = currentTrack;
            currentTrack = new Track(entry, History.getCurrentIndex());
            Library.UI.setTextContent(UI.TransportPanel.mediaIndex, makeIndexText(currentTrack));
            Library.UI.setTextContent(UI.TransportPanel.mediaTitle, makeTitleText(currentTrack));
            if ("off" !== UI.SettingsPanel.crossFadeSelect.get())
            {
                CrossFade.start();
                if (CrossFade.isHotCrossFadeTarget(currentTrack))
                {
                    currentTrack.play();
                }
            }
            else
            {
                if (fadingOutTrack)
                {
                    removeFadeoutTrack();
                }
                currentTrack.play();
            }
            updateCurrentTrackProperties();
            if (currentTrack.visualElement)
            {
                UI.mediaScreen.appendChild(currentTrack.visualElement);
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
        removeTrack(fadingOutTrack);
        fadingOutTrack = null;
    }
    export const updateStretch = () =>
    {
        currentTrack?.updateStretch("current");
        fadingOutTrack?.updateStretch("fadingout");
        Overlay.updateStretch();
    }
    export const updateVolume = () =>
    {
        if (null !== currentTrack)
        {
            currentTrack.setVolume(getVolume("current"), getVolumeRate("current"), getVolumeFade("current"));
        }
        if (null !== fadingOutTrack)
        {
            fadingOutTrack.setVolume(getVolume("fadingout"), getVolumeRate("fadingout"), getVolumeFade("fadingout"));
        }
    };
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
            const clearedTrack = fadingOutTrack = currentTrack;
            currentTrack = null;
            if (fadingOutTrack.visualElement)
            {
                Library.UI.setStyle(fadingOutTrack.visualElement, "opacity", undefined);
                fadingOutTrack.visualElement.classList.add("fade-out");
            }
            setTimeout
            (
                () =>
                {
                    if (clearedTrack === fadingOutTrack)
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
        Track.locale = locale = params["locale"];
    };
}
