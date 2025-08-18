import { Tools } from "@tools";
import { Library } from "@library";
import { Media } from "@features/media";
import { History } from "@features/history";
import { UI } from "./ui";
export namespace MediaList
{
    export const addMedia = async (file: File): Promise<void> =>
    {
        console.log("📂 Adding media:", file);
        const entry = await Media.fileToEntry(file);
        if (null !== entry)
        {
            console.log("✅ Valid media file:", file);
            Media.mediaList.push(entry);
            updateInformationDisplay();
            UI.mediaList.insertBefore(await makeMediaEntryDom(entry), UI.addMediaButton.dom.parentElement);
            clearPlayState();
            console.log("📂 Media added:", Media.mediaList[Media.mediaList.length - 1]);
        }
        else
        {
            console.warn("🚫 Invalid media file:", file);
        }
    };
    let addMediaQueue: Promise<void> = Promise.resolve();
    export const addMediaSerial = (file: File): void =>
    {
        addMediaQueue = addMediaQueue.then
        (
            () => addMedia(file).catch(e => console.error(e))
        );
    };
    export const removeButton = async (entry: Media.Entry): Promise<Library.UI.ElementSource<"button">> =>
    ({
        tag: "button",
        className: "remove-button",
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
            attributes: { draggable: "true", "data-index": ix },
            children:
            [
                await Media.makeThumbnailElement(entry),
                { tag: "span", className: "name", text: entry.name, },
                { tag: "span", className: "type", text: entry.category, },
                { tag: "span", className: "size", text: Tools.Byte.toDisplayString(entry.size, 3), },
                { tag: "span", className: "duration", text: null !== entry.duration ? Tools.Timespan.toMediaTimeString(entry.duration): "", },
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
            UI.mediaList.insertBefore(await makeMediaEntryDom(entry), UI.addMediaButton.dom.parentElement);
        }
    };
    export const updateInformationDisplay = (): void =>
    {
        Library.UI.setTextContent(UI.mediaCount, Media.mediaList.length.toString());
        const imageSpan = parseInt(UI.imageSpanSelect.get());
        const totalDuration = Media.mediaList.reduce((sum, entry) => sum + (entry.duration ?? imageSpan), 0);
        Library.UI.setTextContent(UI.mediaLength, Tools.Timespan.toMediaTimeString(totalDuration));
    }
    export const initialize = (): void =>
    {
        updateInformationDisplay();
    };
    export const clearPlayState = (): void =>
    {
        History.clear();
    };
}