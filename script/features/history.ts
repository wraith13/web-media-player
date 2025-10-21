import { Media } from "./media";
import { Tools } from "@tools";
import { UI } from "../ui";
import * as Config from "@resource/config.json";
export namespace History
{
    let history: number[] = [];
    let baseIndex = 0;
    let currentIndex = -1;
    export const clear = (): void =>
    {
        navigator.mediaSession.setPositionState();
        history = [];
        baseIndex = 0;
        currentIndex = -1;
    };
    export const isCleared = (): boolean =>
        0 === history.length && -1 === currentIndex;
    export const regulate = (): void =>
    {
        const maxHistoryLength = Math.max(Config.history.maxLength, Media.mediaList.length);
        if (maxHistoryLength < history.length)
        {
            const oldLength = history.length;
            history = history.slice(-maxHistoryLength);
            const diff = oldLength - history.length;
            baseIndex += diff;
            currentIndex -= diff;
        }
    };
    export const getCurrentIndex = (): number =>
        baseIndex +currentIndex;
    export const getMedia = (): Media.Entry | undefined =>
    {
        const mediaIndex = history[currentIndex];
        const media = Media.mediaList[mediaIndex];
        if (media)
        {
            return media;
        }
        else
        {
            console.error("🦋 Broken media list", { currentIndex, mediaIndex, playlist: history, mediaList: Media.mediaList, });
            return undefined;
        }
    };
    export const play = (media?: Media.Entry): Media.Entry | undefined =>
    {
        if (0 <= Media.mediaList.length)
        {
            if (media)
            {
                clear();
                const index = Media.mediaList.indexOf(media);
                if (UI.shuffle.get())
                {
                    history.push(index);
                    currentIndex = 0;
                }
                else
                {
                    for(let i = 0; i <= index; ++i)
                    {
                        history.push(i);
                    }
                    currentIndex = index;
                }
                return media;
            }
            else
            if (0 <= currentIndex && currentIndex < history.length)
            {
                return getMedia();
            }
            else
            {
                return next();
            }
        }
        return undefined;
    };
    export const next = (): Media.Entry | undefined =>
    {
        if (isAtEnd())
        {
            clear();
            return undefined;
        }
        else
        {
            ++currentIndex;
            if (history.length <= currentIndex)
            {
                currentIndex = history.length;
                if (UI.shuffle.get())
                {
                    history.push(getShuffleNext());
                }
                else
                {
                    history.push(getStraightNext(currentIndex));
                }
                regulate();
            }
            return getMedia();
        }
    };
    export const isAtEnd = (): boolean =>
    {
        if (0 <= Media.mediaList.length)
        {
            let nextIndex = currentIndex +1;
            if
            (
                nextIndex < Media.mediaList.length ||
                0 < getStraightNext(nextIndex) ||
                UI.repeat.get()
            )
            {
                return false;
            }
        }
        return true;
    }
    export const back = (): Media.Entry | undefined =>
    {
        if (0 <= Media.mediaList.length)
        {
            if (0 < currentIndex)
            {
                --currentIndex;
                return getMedia();
            }
        }
        return undefined;
    };
    export const getStraightNext = (index: number): number =>
    {
        const backMediaIndex = history[index -1] ?? -1;
        const currentMediaIndex = backMediaIndex +1;
        return currentMediaIndex %Media.mediaList.length;
    };
    export const getShuffleNext = (): number =>
    {
        switch(Media.mediaList.length)
        {
        case 0:
            return -1;
        case 1:
            return 0;
        case 2:
            return history.length < 2 ?
                Tools.Random.makeInteger(Media.mediaList.length):
                (0 === history[Tools.Random.makeInteger(history.length)] ? 1 : 0);
        default:
            const playedList = history.slice(Math.floor(currentIndex /Media.mediaList.length) *Media.mediaList.length);
            const unplayedList = Media.mediaList.map((_, i) => i).filter(i => ! playedList.includes(i));
            const forbidens = Tools.Array.backSlice(history, Math.ceil(Media.mediaList.length *Config.history.shuffleForbiddenRate));
            const canonicals = unplayedList.filter(i => ! forbidens.includes(i));
            return canonicals[Tools.Random.makeInteger(canonicals.length)];
        }
    }
}
