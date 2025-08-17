import { Media } from "./media";
import { Tools } from "@tools";
import { UI } from "../ui";
export namespace History
{
    let history: number[] = [];
    let currentIndex = -1;
    export const clear = (): void =>
    {
        history = [];
        currentIndex = -1;
    };
    export const regulate = (): void =>
    {
        if (1000 < history.length)
        {
            const oldLength = history.length;
            history = history.slice(-1000);
            currentIndex -= oldLength - history.length;
        }
    };
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
    export const play = (): Media.Entry | undefined =>
    {
        if (0 <= Media.mediaList.length)
        {
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
        if (0 <= Media.mediaList.length)
        {
            ++currentIndex;
            if (currentIndex < history.length)
            {
                return getMedia();
            }
            else
            {
                currentIndex = history.length;
                if (UI.shuffleButton.dom.classList.contains("on"))
                {
                    history.push(getShuffleNext());
                }
                else
                {
                    const backMediaIndex = history[currentIndex -1] ?? -1;
                    let currentMediaIndex = backMediaIndex +1;
                    if (currentMediaIndex < Media.mediaList.length || UI.repeatButton.dom.classList.contains("on"))
                    {
                        history.push(currentMediaIndex %Media.mediaList.length);
                        regulate();
                    }
                    else
                    {
                        clear();
                        return undefined;
                    }
                }
                return getMedia();
            }
        }
        return undefined;
    };
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
    export const getShuffleNext = (): number =>
    {
        const playedList = history.slice(Math.floor(currentIndex /Media.mediaList.length) *Media.mediaList.length);
        const unplayedList = Media.mediaList.map((_, i) => i).filter(i => ! playedList.includes(i));
        const forbidens = history.slice(-Math.floor(Media.mediaList.length /3));
        const canonicals = unplayedList.filter(i => ! forbidens.includes(i));
        return canonicals[Tools.Random.makeInteger(canonicals.length)];
    }
}
