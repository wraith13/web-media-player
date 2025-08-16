import { Fps } from "./fps";
import { Clock } from "./clock";
import { Library } from "@library";
import { UI } from "../ui";
import { Media } from "./media";
import * as config from "@resource/config.json";
export namespace Player
{
    export class TransitionSession
    {

    }
    export class PlaySession
    {
        playerDom: HTMLImageElement | HTMLAudioElement | HTMLVideoElement;
        visualDom: HTMLImageElement | HTMLDivElement | HTMLVideoElement;
        media: Media.Entry;
        startTime: number;
        endTime: number;
        elapsedTime: number = 0;
        constructor(playerDom: HTMLImageElement | HTMLAudioElement | HTMLVideoElement, media: Media.Entry, startTime: number, endTime: number)
        {
            this.playerDom = playerDom;
            if (playerDom instanceof HTMLImageElement || playerDom instanceof HTMLVideoElement)
            {
                this.visualDom = playerDom;
            }
            else
            {
                this.visualDom = Library.UI.createElement({ tag:"div", className: "visual" });
            }
            this.media = media;
            this.startTime = startTime;
            this.endTime = endTime;
        }
        pause(): void
        {
            this.elapsedTime = Date.now() - this.startTime;
        };
        resume(): void
        {
            this.startTime = Date.now() - this.elapsedTime;
            //this.endTime = this.startTime + (this.media.duration * 1000);
        };
        setMinVisibleRate(minVisibleRate: number): void
        {
            if (this.media.area)
            {
                const widthScale = this.media.area.width /document.body.clientWidth;
                const heightScale = this.media.area.height /document.body.clientHeight;
                const minScale = Math.min(widthScale, heightScale);
                const maxScale = Math.max(widthScale, heightScale);
                const maxStreach = minScale /maxScale;
                const ratio = Math.min(maxStreach, minVisibleRate);
                const scale = minScale /ratio;
                const scaledWidth = this.media.area.width *scale;
                const scaledHeight = this.media.area.height *scale;
                this.visualDom.style.width = `${scaledWidth}px`;
                this.visualDom.style.height = `${scaledHeight}px`;
            }
        }
        setVolume(volume: number): void
        {
            if (this.playerDom instanceof HTMLVideoElement || this.playerDom instanceof HTMLAudioElement)
            {
                this.playerDom.volume = volume;
            }
        }
        transitionStep(rate: number): void
        {
            this.visualDom.style.opacity = `${rate}`;
        }
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
        if (document.body.classList.contains("list") && Media.mediaList.length <= 0)
        {
            noMediaTimer.start(document.body, "no-media", 5000);
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
    };
    export const previous = () =>
    {
    };
    export const next = () =>
    {
    };
    export const updateFps = () =>
    {
        if (UI.showFpsCheckbox.get())
        {
            Library.UI.setTextContent(UI.fpsDisplay, Fps.getText());
        }
    }
    export const loop = (now: number) =>
    {
        if (document.body.classList.contains("play"))
        {
            Clock.update(now);
            Fps.step(now);
            updateFps();
            loopHandle = window.requestAnimationFrame(loop);
        }
        else
        {
            loopHandle = null;
        }
    };
    export const playMedia = (entry: Media.Entry) =>
    {
        navigator.mediaSession.metadata = new MediaMetadata
        ({
            title: entry.name,
            artist: "Unknown Artist",
            album: "Temporary Media List",
            artwork: [{ src: entry.thumbnail, }],
        });
        switch(entry.type)
        {
        case "image":
            break;
        case "audio":
            break;
        case "video":
            break;
        default:
            console.error("🦋 Unknown media type:", entry.type, entry);
            return;
        }
    };
}