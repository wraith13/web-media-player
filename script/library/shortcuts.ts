import { Environment } from "@tools/environment";
import shortcuts from "@resource/shortcuts.json";
export namespace Shortcuts
{
    export type StyleKey = keyof typeof shortcuts;
    export type Style = (typeof shortcuts)[StyleKey];
    export type Item = Style["items"][number];
    export type Entry = Item["shortcuts"][number];
    export type CommandKey = Entry["command"];
    export type CommandMap = { [key in Shortcuts.CommandKey]-?: () => void };
    let style: StyleKey = "youtube";
    let currentCommandMap: CommandMap | null = null;
    const keyDisplayNames =
    {
        "ArrowUp": "↑",
        "ArrowDown": "↓",
        "ArrowLeft": "←",
        "ArrowRight": "→",
        " ": "Space",
        "Control": "Ctrl",
    };
    const appleKeyDisplayNames =
    {
        "Alt": "⌥(option)",
        "Control": "⌃(control)",
        "Meta": "⌘(command)",
        "Shift": "⇧(shift)",
    };
    const getKeys = (entry: Entry) =>
        Environment.isApple() && "appleKeys" in entry ? entry.appleKeys : entry.keys;
    const getDisplayKeyName = (key: string) =>
        Environment.isApple() ?
            appleKeyDisplayNames[key as keyof typeof appleKeyDisplayNames] ?? keyDisplayNames[key as keyof typeof keyDisplayNames] ?? key:
            keyDisplayNames[key as keyof typeof keyDisplayNames] ?? key;
    export const getDisplayList = () =>
        shortcuts[style].items.map
        (
            i =>
            ({
                keyss: i.shortcuts.map(j => getKeys(j).map(key => getDisplayKeyName(key))),
                description: i.description,
            })
        );
    const isInputElementFocused = () =>
        ["input", "textarea", "button"].includes(document.activeElement?.tagName?.toLowerCase() ?? "");
    const normalizeKey = (key: string, code: string) =>
        code === "Space" ? " ":
        key.length === 1 ? key.toUpperCase():
        key;
    let pressedKeys: string[] = [];
    const getShortcutKeys = (type: "onKeyDown" | "onKeyUp", normalizedKey: string) =>
    {
        switch(type)
        {
        case "onKeyDown":
            pressedKeys.push(normalizedKey);
            return pressedKeys;
        case "onKeyUp":
            const result = [...pressedKeys];
            pressedKeys = pressedKeys.filter(i => i !== normalizedKey);
            return result;
        }
    }
    export const handleKeyEvent = (type: "onKeyDown" | "onKeyUp", event: KeyboardEvent) =>
    {
        const commandMap = currentCommandMap;
        if (null !== commandMap)
        {
            const normalizedKey = normalizeKey(event.key, event.code);
            const shortcutKeys = getShortcutKeys(type, normalizedKey);
            if ( ! isInputElementFocused())
            {
                const commandKeys = (shortcuts[style].items as Item[]).reduce((a, b) => a.concat(b.shortcuts), [] as Entry[]).filter
                (
                    (shortcut: Entry) =>
                        getKeys(shortcut).length === shortcutKeys.length &&
                        getKeys(shortcut).every(key => shortcutKeys.includes(key)) &&
                        type === shortcut.type
                )
                .map((i: Entry) => i.command);
                if (0 < commandKeys.length)
                {
                    event.preventDefault();
                    event.stopPropagation();
                }
                commandKeys.forEach
                (
                    i =>
                    {
                        console.log("👆 KeyboardShortcut:", i, type, pressedKeys);
                        const command = commandMap[i];
                        if (command)
                        {
                            command();
                        }
                        else
                        {
                            console.error("🦋 FIXME: Shortcuts.handleKeyEvent.NotFoundCommand", i);
                        }
                    }
                );
                if ("onKeyDown" === type && commandKeys.length <= 0 && ! ["Shift", "Control"].includes(normalizedKey))
                {
                    console.log("💡 UnknownKeyDown:", pressedKeys);
                    commandMap["unknownKeyDown"]?.();
                }
            }
        }
    }
    export const initialize = () =>
    {
        window.addEventListener("keydown", (event) => Shortcuts.handleKeyEvent("onKeyDown", event));
        window.addEventListener("keyup", (event) => Shortcuts.handleKeyEvent("onKeyUp", event));
    };
    export const setCommandMap = (commandMap: CommandMap | null) =>
    {
        currentCommandMap = commandMap;
    };
    export const setStyle = (newStyle: keyof typeof shortcuts) =>
    {
        if (style !== newStyle && shortcuts[newStyle])
        {
            style = newStyle;
        }
    };
}
