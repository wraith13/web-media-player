import shortcuts from "@resource/shortcuts.json";
export namespace Shortcuts
{
    export type Entry = (typeof shortcuts)[number]["shortcuts"][number];
    export type CommandKey = Entry["command"];
    export type CommandMap = { [key in Shortcuts.CommandKey]-?: () => void };
    const keyDisplayNames =
    {
        "ArrowUp": "↑",
        "ArrowDown": "↓",
        "ArrowLeft": "←",
        "ArrowRight": "→",
        " ": "Space",
        "Control": "Ctrl",
    };
    const getDisplayKeyName = (key: string) => keyDisplayNames[key as keyof typeof keyDisplayNames] ?? key;
    export const getDisplayList = () =>
        shortcuts.map
        (
            i =>
            ({
                keyss: i.shortcuts.map(j => j.keys.map(key => getDisplayKeyName(key))),
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
    export const handleKeyEvent = (type: "onKeyDown" | "onKeyUp", event: KeyboardEvent, commandMap: CommandMap) =>
    {
        const normalizedKey = normalizeKey(event.key, event.code);
        const shortcutKeys = getShortcutKeys(type, normalizedKey);
        if ( ! isInputElementFocused())
        {
            const commandKeys = shortcuts.reduce((a, b) => a.concat(b.shortcuts), [] as Entry[]).filter
            (
                shortcut =>
                    shortcut.keys.length === shortcutKeys.length &&
                    shortcut.keys.every(key => shortcutKeys.includes(key)) &&
                    type === shortcut.type
            )
            .map(i => i.command);
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
    export const setCommandMap = (commandMap: CommandMap) =>
    {
        window.addEventListener("keydown", (event) => Shortcuts.handleKeyEvent("onKeyDown", event, commandMap));
        window.addEventListener("keyup", (event) => Shortcuts.handleKeyEvent("onKeyUp", event, commandMap));
    };
}
