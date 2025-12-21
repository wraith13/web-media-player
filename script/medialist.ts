import { Tools } from "@tools";
import { Library } from "@library";
import { Features } from "@features";
import { Media } from "@features/media";
import { UI } from "./ui";
import { Progress } from "./progress";
import config from "@resource/config.json";
export namespace MediaList
{
    export let locale: string | undefined = undefined;
    const notSupportedMediaTimer = new Library.UI.ToggleClassForWhileTimer();
    export const addMedia = async (file: File): Promise<void> =>
    {
        console.log("📂 Adding media:", file);
        const entry = await Media.fileToEntry(file);
        if (null !== entry)
        {
            console.log("✅ Valid media file:", file);
            Media.mediaList.push(entry);
            updateInformationDisplay();
            updateNoMediaLabel();
            UI.mediaList.insertBefore(await makeMediaEntryDom(entry), UI.addMediaButton.parentElement);
            if (Features.Player.isPlaying())
            {
                Features.Player.pause();
            }
            clearPlayState();
            console.log("📂 Media added:", Media.mediaList[Media.mediaList.length - 1]);
        }
        else
        {
            console.warn("🚫 Invalid media file:", file);
            UI.MessagePanel.notSupportedMediaPanelVisibilityApplier.show();
            notSupportedMediaTimer.start
            (
                document.body,
                "not-supported-media",
                config.player.notSupportedMediaMessageSpan,
                () => UI.MessagePanel.notSupportedMediaPanelVisibilityApplier.hide()
            );
        }
    };
    let addMediaQueue: Promise<void> = Promise.resolve();
    export const addMediaSerial = (file: File): void =>
    {
        Progress.incrementTask();
        addMediaQueue = addMediaQueue.then
        (
            () => addMedia(file).catch(e => console.error(e)).finally(() => Progress.completeTask())
        );
    };
    export const removeButton = async (entry: Media.Entry): Promise<Library.UI.ElementSource<"button">> =>
    ({
        tag: "button",
        className: "remove-button",
        attributes:
        {
            tabindex: "0",
            "data-aria-lang-key": "remove-media",
            "aria-label": Library.Locale.map("remove-media"),
        },
        children:
        [
            await Library.Svg.getSvg("SVG:close"),
        ],
        events:
        {
            "click": async (event: MouseEvent) =>
            {
                event.stopPropagation();
                (event.target as HTMLButtonElement)?.blur();
                const index = Media.mediaList.indexOf(entry);
                if (0 <= index && index < Media.mediaList.length)
                {
                    console.log("🗑️ Removing media:", Media.mediaList[index]);
                    URL.revokeObjectURL(Media.mediaList[index].url);
                    Media.mediaList.splice(index, 1);
                    clearPlayState();
                    updateInformationDisplay();
                    updateNoMediaLabel();
                    await updateMediaListDisplay();
                }
            }
        },
    });
    export const makeMediaEntryDom = async (entry: Media.Entry): Promise<HTMLDivElement> =>
    {
        const ix = Media.mediaList.indexOf(entry);
        const item = Library.UI.createElement
        ({
            tag: "div",
            className: "item",
            attributes:
            {
                draggable: "true",
                "data-index": (ix +1).toLocaleString(locale),
                tabindex: "0",
                role: "listitem",
                "aria-label": entry.name,
            },
            children:
            [
                await Media.makeThumbnailElement(entry),
                { tag: "span", className: "name", text: entry.name, attribues: { "aria-hidden": "true", }, },
                { tag: "span", className: "type", text: entry.category, },
                { tag: "span", className: "size", text: Tools.Byte.toDisplayString(entry.size, 3, locale), },
                { tag: "span", className: "duration", text: null !== entry.duration ? Tools.Timespan.toMediaTimeString(entry.duration, locale): "", },
                await removeButton(entry),
            ]
        }) as HTMLDivElement;
        item.addEventListener
        (
            "dragstart",
            (event: DragEvent) =>
            {
                UI.mediaList.classList.add("dragging");
                item.classList.add("dragging");
                event.dataTransfer?.setData("text/plain", String(ix));
            }
        );
        item.addEventListener
        (
            "dragend",
            async () =>
            {
                UI.mediaList.classList.remove("dragging");
                item.classList.remove("dragging");
                await updateMediaListDisplay();
            }
        );
        item.addEventListener
        (
            "dragover",
            (event: DragEvent) =>
            {
                event.preventDefault();
                item.classList.add("drag-over");
            }
        );
        item.addEventListener
        (
            "dragleave",
            () =>
            {
                item.classList.remove("drag-over");
            }
        );
        item.addEventListener
        (
            "drop",
            async (event: DragEvent) =>
            {
                event.preventDefault();
                item.classList.remove("drag-over");
                const fromIndex = Number(event.dataTransfer?.getData("text/plain"));
                const toIndex = ix;
                if (fromIndex !== null && fromIndex !== toIndex)
                {
                    const moved = Media.mediaList.splice(fromIndex, 1)[0];
                    Media.mediaList.splice(toIndex, 0, moved);
                    clearPlayState();
                }
                await updateMediaListDisplay();
            }
        );
        item.addEventListener
        (
            "dblclick",
            () =>
            {
                Features.Player.play(entry);
            }
        );
        return item;
    };
    export const updateMediaListDisplay = async (): Promise<void> =>
    {
        Array.from(UI.mediaList.children).forEach
        (
            child =>
            {
                if (child instanceof HTMLDivElement && ! child.classList.contains("add"))
                {
                    child.remove();
                };
            }
        );
        for (const entry of Media.mediaList)
        {
            UI.mediaList.insertBefore(await makeMediaEntryDom(entry), UI.addMediaButton.parentElement);
        }
    };
    export const updateInformationDisplay = (): void =>
    {
        Library.UI.setTextContent(UI.SettingsPanel.mediaCount, Media.mediaList.length.toLocaleString(locale));
        const imageSpan = Tools.Timespan.parse(UI.SettingsPanel.imageSpanSelect.get()) ?? 0;
        const totalDuration = Media.mediaList.reduce((sum, entry) => sum + (entry.duration ?? imageSpan), 0);
        Library.UI.setTextContent(UI.SettingsPanel.mediaLength, Tools.Timespan.toMediaTimeString(totalDuration, locale));
    };
    export const updateNoMediaLabel = () =>
    {
        const hasNoMedia = UI.wakeUpToggle.get() && Media.mediaList.length <= 0;
        UI.noMediaLabel.classList.toggle("hide", ! hasNoMedia);
        UI.noMediaLabelVisibilityApplier.show(hasNoMedia);
    };
    export const initialize = (params: Record<string, string>): void =>
    {
        locale = params["locale"];
        updateInformationDisplay();
    };
    export const clearPlayState = (): void =>
    {
        Features.Player.clear();
        UI.mediaList.classList.toggle("paused", false);
    };
}