import { Comparer } from "@tools/comparer";
import { Environment } from "@tools/environment";
import { UI } from "./ui";
import shortcuts from "@resource/shortcuts.json";
import config from "@resource/config.json";
export namespace Shortcuts
{
    export type StyleKey = keyof typeof shortcuts;
    export type Style = (typeof shortcuts)[StyleKey];
    export type Item = Style["items"][number];
    export type Entry = Item["shortcuts"][number];
    export type CommandKey = Entry["command"];
    export interface CommandEntry
    {
        control?: HTMLElement,
        fire: () => void
    }
    export type CommandMap = { [key in Shortcuts.CommandKey]-?: CommandEntry };
    let style: StyleKey = "youtube";
    let currentCommandMap: CommandMap | null = null;
    let pressedKeyDiv: HTMLDivElement | null = null;
    let localeDirection: "ltr" | "rtl" = "ltr";
    export const setLocaleDirection = (direction: "ltr" | "rtl") =>
    {
        localeDirection = direction;
    };
    const swapLeftRight = (key: string, reversed: boolean = true): string =>
        reversed ?
            (
                (
                    {
                        "ArrowLeft": "ArrowRight",
                        "ArrowRight": "ArrowLeft",
                    } as { [key: string]: string })[key] ?? key
            ): key;
    const displayedKeys: { [key: string]: { pressedAt: number, removeTimer?: ReturnType<typeof setTimeout>, } } = {};
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
    const keyAriaNames =
    {
        " ": "Space",
    };
    const getKeys = (entry: Entry) =>
        //Environment.isApple() && "appleKeys" in entry ? entry.appleKeys : entry.keys;
        entry.keys;
    const getDisplayKeyName = (key: string) =>
        Environment.isApple() ?
            appleKeyDisplayNames[key as keyof typeof appleKeyDisplayNames] ?? keyDisplayNames[key as keyof typeof keyDisplayNames] ?? key:
            keyDisplayNames[key as keyof typeof keyDisplayNames] ?? key;
    const getAriaKeyName = (key: string) =>
        keyAriaNames[key as keyof typeof keyAriaNames] ?? key;
    export const getDisplayList = (filter: (i: Item) => boolean = () => true) =>
        shortcuts[style].items
            .filter(filter)
            .map
            (
                i =>
                ({
                    keyss: i.shortcuts.map(j => getKeys(j).map(key => getDisplayKeyName(swapLeftRight(key, "rtl" === localeDirection)))),
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
        const adjustedDirectionKey = swapLeftRight(normalizedKey, "rtl" === localeDirection);
        switch(type)
        {
        case "onKeyDown":
            pressedKeys = pressedKeys.filter(i => i !== adjustedDirectionKey);
            pressedKeys.push(adjustedDirectionKey);
            displayedKeys[normalizedKey] = { pressedAt: Date.now() };
            updatePressedKeyDiv();
            return pressedKeys;
        case "onKeyUp":
            const result = [...pressedKeys];
            pressedKeys = pressedKeys.filter(i => i !== adjustedDirectionKey);
            if (displayedKeys[normalizedKey])
            {
                if (displayedKeys[normalizedKey].removeTimer)
                {
                    clearTimeout(displayedKeys[normalizedKey].removeTimer!);
                }
                displayedKeys[normalizedKey].removeTimer = setTimeout
                (
                    () =>
                    {
                        delete displayedKeys[normalizedKey];
                        updatePressedKeyDiv();
                    },
                    config.shortcuts.displayedKeysTimeout
                );
            }
            return result;
        }
    };
    const updatePressedKeyDiv = () =>
    {
        if (null !== pressedKeyDiv)
        {
            UI.replaceChildren
            (
                pressedKeyDiv,
                Object.entries(displayedKeys)
                    .sort((a, b) => Comparer.basic(a[1].pressedAt, b[1].pressedAt))
                    .map
                    (
                        kvp =>
                        ({
                            tag: "kbd",
                            text: getDisplayKeyName(kvp[0]),
                        })
                    )
            );
        }
    };
    export const clearPressedKeys = () =>
    {
        if (0 < pressedKeys.length)
        {
            console.log("🧼 Shortcuts: Clearing pressed keys.", pressedKeys);
            pressedKeys = [];
            Object.keys(displayedKeys).forEach
            (
                key =>
                {
                    if (displayedKeys[key].removeTimer)
                    {
                        clearTimeout(displayedKeys[key].removeTimer!);
                    }
                }
            );
            for (const key in displayedKeys)
            {
                delete displayedKeys[key];
            }
            updatePressedKeyDiv();
        }
    };
    export const pruneStaleKeys = () =>
    {
        const now = Date.now();
        for(const key in displayedKeys)
        {
            if (config.shortcuts.pressedKeysTimeout < now -displayedKeys[key].pressedAt)
            {
                console.log("🧼 Shortcuts: Pruning stale key.", key);
                delete displayedKeys[key];
            }
        }
        updatePressedKeyDiv();
    };
    export const handleKeyEvent = (type: "onKeyDown" | "onKeyUp", event: KeyboardEvent) =>
    {
        pruneStaleKeys();
        const normalizedKey = normalizeKey(event.key, event.code);
        const shortcutKeys = getShortcutKeys(type, normalizedKey);
        const commandMap = currentCommandMap;
        if (null !== commandMap)
        {
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
                            command.fire();
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
                    commandMap["unknownKeyDown"]?.fire();
                }
            }
        }
    }
    export const initialize = () =>
    {
        window.addEventListener("keydown", (event) => handleKeyEvent("onKeyDown", event));
        window.addEventListener("keyup", (event) => handleKeyEvent("onKeyUp", event));
        window.addEventListener("blur", () => clearPressedKeys());
        window.addEventListener("visibilitychange", () => clearPressedKeys());
        document.addEventListener("mousedown", () => clearPressedKeys());
        document.addEventListener("touchstart", () => clearPressedKeys());
    };
    export const setCommandMap = (commandMap: CommandMap | null) =>
    {
        clearAriaKeyshortcuts();
        currentCommandMap = commandMap;
        updateAriaKeyshortcuts();
    };
    export const setStyle = (newStyle: keyof typeof shortcuts) =>
    {
        if (style !== newStyle && shortcuts[newStyle])
        {
            style = newStyle;
        }
        clearAriaKeyshortcuts();
        updateAriaKeyshortcuts();
    };
    export const clearAriaKeyshortcuts = () =>
    {
        if (null !== currentCommandMap)
        {
            Object.keys(currentCommandMap ?? {}).forEach
            (
                commandKey =>
                {
                    const commandEntry = currentCommandMap?.[commandKey as CommandKey];
                    if (commandEntry?.control)
                    {
                        commandEntry.control.removeAttribute("aria-keyshortcuts");
                    }
                }
            );
        }
    };
    export const updateAriaKeyshortcuts = () =>
    {
        if (currentCommandMap && style)
        {
            Object.keys(currentCommandMap ?? {}).forEach
            (
                commandKey =>
                {
                    const commandEntry = currentCommandMap?.[commandKey as CommandKey];
                    if (commandEntry?.control)
                    {
                        const ariaKeyshortcuts = (shortcuts[style].items as Item[]).reduce((a, b) => a.concat(b.shortcuts), [] as Entry[]).filter
                        (
                            (shortcut: Entry) =>
                                shortcut.command === commandKey
                        )
                        .map
                        (
                            (i: Entry) =>
                                getKeys(i)
                                    .map(key => getAriaKeyName(swapLeftRight(key, "rtl" === localeDirection)))
                                    .join("+")
                        )
                        .join(", ");
                        if (0 < ariaKeyshortcuts.length)
                        {
                            commandEntry.control.setAttribute("aria-keyshortcuts", ariaKeyshortcuts);
                        }
                        else
                        {
                            commandEntry.control.removeAttribute("aria-keyshortcuts");
                        }
                    }
                }
            );
        }
    };
    export const setPressedKeyDiv = (div: HTMLDivElement | null) =>
    {
        pressedKeyDiv = div;
    }
}
