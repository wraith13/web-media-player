import { Array as ToolsArray } from "@tools/array";
import { UI } from "./ui";
export namespace Control
{
    const makeSelectOption = (value: string, text: string) =>
    {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        return option;
    };
    export interface ArgumentsBaseDom<T extends HTMLElement>
    {
        dom: T;
    }
    export interface ArgumentsBaseId
    {
        id: string;
    }
    export type ArgumentsBase<T extends HTMLElement> = ArgumentsBaseDom<T> | ArgumentsBaseId;
    export const getDom = <T extends HTMLElement>(data: ArgumentsBase<T>): T =>
    {
        const result = "dom" in data ?
            data.dom:
            <T>document.getElementById(data.id);
        if (null == result || undefined === result)
        {
            console.error("🦋 FIXME: Contorl.getDom.NotExistsDom", data);
        }
        else
        if ( ! (result instanceof HTMLElement))
        {
            console.error("🦋 FIXME: Contorl.getDom.InvalidDom", data, result);
        }
        return result;
    }
    export const getDomId = <T extends HTMLElement>(data: ArgumentsBase<T>): string | undefined =>
        "id" in data ? data.id:
        "dom" in data ? data.dom.id:
            undefined;
    export const eventLog = <T extends HTMLElement>(data: { control: { data: ArgumentsBase<T> }, event: Event | string, message: string, value?: any }) =>
        console.log
        (
            data.message,
            ...
            [
                ...ToolsArray.joinable(getDomId(data.control.data)),
                data.event,
                data.control,
                ...ToolsArray.joinable(data.value),
            ]
        );
    export interface ButtonArgumentsBase<T extends HTMLElement>
    {
        click?: (event: Event | null, select: Button<T>) => unknown;
    }
    export type ButtonArguments<T extends HTMLElement = HTMLButtonElement> = ArgumentsBase<T> & ButtonArgumentsBase<T>;
    export class Button<T extends HTMLElement>
    {
        public dom: T;
        constructor(public data: ButtonArguments<T>)
        {
            this.dom = getDom(data);
            this.dom.addEventListener
            (
                "click",
                event =>
                {
                    eventLog({ control: this, event, message: "👆 Button.Click:" });
                    this.data.click?.(event, this);
                }
            );
        }
        getId = () => getDomId(this.data);
        setClick = (click: (event: Event | null, select: Button<T>) => unknown) =>
            this.data.click = click;
        fire = () => this.data.click?.(null, this);
    }
    export interface SelectArgumentsBase<T>
    {
        enum: T[];
        default: T;
    }
    export interface SelectOptions<T>
    {
        makeLabel?: (value: T) => string;
        change?: (event: Event | null, select: Select<T>) => unknown;
        preventOnChangeWhenNew?: boolean;
    }
    export const preventOnChange = "preventOnChange" as const;
    export type SelectArguments<T> = ArgumentsBase<HTMLSelectElement> & SelectArgumentsBase<T>;
    export class Select<T>
    {
        public dom: HTMLSelectElement;
        public saveParameter?: (key: string, value: string) => unknown;
        constructor(public data: SelectArguments<T>, public options?: SelectOptions<T>)
        {
            this.dom = getDom(data);
            if ( ! (this.dom instanceof HTMLSelectElement))
            {
                console.error("🦋 FIXME: Contorl.Select.InvalidDom", data, this.dom);
            }
            this.reloadOptions(this.data.default);
            this.dom.addEventListener
            (
                "change", event =>
                {
                    eventLog({ control: this, event, message: "👆 Select.Change:", value: this.get() });
                    this.options?.change?.(event, this);
                    this.saveParameter?.(this.getId() as string, this.get());
                }
            );
        }
        catchUpRestore = (params?: Record<string, string>) =>
        {
            if ((params?.[this.dom.id] ?? `${this.data.default}`) !== this.get())
            {
                eventLog({ control: this, event: "catchUpRestore", message: "👆 Select.Change:", value: this.get() });
                this.options?.change?.(null, this);
                this.saveParameter?.(this.getId() as string, this.get());
            }
        };
        getId = () => getDomId(this.data);
        setChange = (change: (event: Event | null, select: Select<T>) => unknown) =>
            this.options = { ...this.options, change };
        reloadOptions = (value?: T) =>
        {
            const oldValue = value ?? (this.get() as T);
            UI.replaceChildren
            (
                this.dom,
                this.data.enum.map(i => makeSelectOption(`${i}`, this.options?.makeLabel?.(i) ?? `${i}`))
            );
            this.switch(oldValue, preventOnChange);
        };
        private getNextIndex = (index: number, direction: boolean) =>
            index + (direction ? -1 : 1);
        private getNextIndexClamp = (length: number, index: number, direction: boolean) =>
        {
            const next = this.getNextIndex(index, direction);
            return 0 <= next && next < length ? next: index;
        };
        private getNextIndexCycle = (length: number, index: number, direction: boolean) =>
            (this.getNextIndex(index, direction) + length) % length;
        switch =
        (
            valueOrDirection: T | boolean,
            preventOnChange?: "preventOnChange",
            getNextIndex: (length: number, index: number, direction: boolean) => number = this.getNextIndexClamp
        ) =>
        {
            if ("boolean" === typeof valueOrDirection)
            {
                const options = Array.from(this.dom.getElementsByTagName("option"));
                const optionValues = options.map(i => i.value);
                const index = optionValues.indexOf(this.dom.value);
                const nextIndex = getNextIndex(optionValues.length, index, valueOrDirection);
                const nextValue = optionValues[nextIndex];
                if (undefined !== nextValue)
                {
                    this.dom.value = nextValue;
                }
            }
            else
            {
                this.dom.value = `${valueOrDirection}`;
            }
            if (undefined === preventOnChange)
            {
                this.fire();
            }
        };
        cycle = (direction: boolean, preventOnChange?: "preventOnChange") => this.switch
        (
            direction,
            preventOnChange,
            this.getNextIndexCycle
        );
        get = () => this.dom.value;
        fire = () => this.options?.change?.(null, this);
        loadParameter = (params: Record<string, string>, saveParameter: (key: string, value: string) => unknown) =>
        {
            const value = params[this.dom.id];
            if (undefined !== value)
            {
                this.switch(value as T);
            }
            this.saveParameter = saveParameter;
            return this;
        }
    }
    export interface CheckboxArgumentsBase
    {
        default?: boolean;
    }
    export interface CheckboxOptions
    {
        change?: (event: Event | null, checked: Checkbox) => unknown;
        preventOnChangeWhenNew?: boolean;
    }
    export type CheckboxArguments = ArgumentsBase<HTMLInputElement> & CheckboxArgumentsBase;
    export class Checkbox
    {
        public dom: HTMLInputElement;
        public saveParameter?: (key: string, value: string) => unknown;
        constructor(public data: CheckboxArguments, public options?: CheckboxOptions)
        {
            this.dom = getDom(data);
            if ( ! (this.dom instanceof HTMLInputElement) || "checkbox" !== this.dom.type.toLowerCase())
            {
                console.error("🦋 FIXME: Contorl.Checkbox.InvalidDom", data, this.dom);
            }
            if (undefined !== this.data.default)
            {
                this.toggle
                (
                    this.data.default,
                    [preventOnChange][false !== this.options?.preventOnChangeWhenNew ? 0: 1]
                );
            }
            this.dom.addEventListener
            (
                "change",
                event =>
                {
                    eventLog({ control: this, event, message: "👆 Checkbox.Change:", value: this.get() });
                    this.options?.change?.(event, this);
                    this.saveParameter?.(this.getId() as string, this.get() ? "true": "false");
                }
            );
        }
        catchUpRestore = (params?: Record<string, string>) =>
        {
            const urlParam = params?.[this.dom.id];
            if
            (
                (
                    undefined !== urlParam ?
                        "true" === urlParam:
                        (this.data.default ?? false)
                ) !== this.get()
            )
            {
                eventLog({ control: this, event: "catchUpRestore", message: "👆 Checkbox.Change:", value: this.get() });
                this.options?.change?.(null, this);
                this.saveParameter?.(this.getId() as string, this.get() ? "true": "false");
            }
        };
        getId = () => getDomId(this.data);
        setChange = (change: (event: Event | null, checked: Checkbox) => unknown) =>
            this.options = { ...this.options, change };
        toggle = (checked?: boolean, preventOnChange?: "preventOnChange") =>
        {
            this.dom.checked = checked ?? ! this.get();
            if (undefined === preventOnChange)
            {
                this.options?.change?.(null, this);
            }
        };
        get = () => this.dom.checked;
        fire = () => this.options?.change?.(null, this);
        loadParameter = (params: Record<string, string>, saveParameter: (key: string, value: string) => unknown) =>
        {
            const value = params[this.dom.id];
            if (undefined !== value)
            {
                this.toggle("true" === value);
            }
            this.saveParameter = saveParameter;
            return this;
        }
    }
    export interface RangeArgumentsBase
    {
        min?: number;
        max?: number;
        step?: number;
        default?: number;
    }
    export interface RangeOptions
    {
        change?: (event: Event | null, range: Range) => unknown;
        preventOnChangeWhenNew?: boolean;
    }
    export type RangeArguments = ArgumentsBase<HTMLInputElement> & RangeArgumentsBase;
    export class Range
    {
        public dom: HTMLInputElement;
        public saveParameter?: (key: string, value: string) => unknown;
        constructor(public data: RangeArguments, public options?: RangeOptions)
        {
            this.dom = getDom(data);
            if ( ! (this.dom instanceof HTMLInputElement) || "range" !== this.dom.type.toLowerCase())
            {
                console.error("🦋 FIXME: Contorl.Range.InvalidDom", data, this.dom);
            }
            this.dom.min = `${this.data.min ?? 0}`;
            this.dom.max = `${this.data.max ?? 100}`;
            this.dom.step = `${this.data.step ?? 1}`;
            if (undefined !== this.data.default)
            {
                this.set(this.data.default, [preventOnChange][false !== this.options?.preventOnChangeWhenNew ? 0: 1]);
            }
            this.dom.addEventListener
            (
                "change",
                event =>
                {
                    eventLog({ control: this, event, message: "👆 Range.Change:", value: this.get() });
                    this.options?.change?.(event, this);
                    this.saveParameter?.(this.getId() as string, `${this.get()}`);
                }
            );
            this.dom.addEventListener
            (
                "input",
                event =>
                {
                    eventLog({ control: this, event, message: "👆 Range.Input:", value: this.get() });
                    this.options?.change?.(event, this);
                    this.saveParameter?.(this.getId() as string, `${this.get()}`);
                }
            );
        }
        catchUpRestore = (params?: Record<string, string>) =>
        {
            const urlParam = params?.[this.dom.id];
            if (undefined !== urlParam && urlParam !== `${this.get()}`)
            {
                eventLog({ control: this, event: "catchUpRestore", message: "👆 Range.Change:", value: this.get() });
                this.options?.change?.(null, this);
                this.saveParameter?.(this.getId() as string, `${this.get()}`);
            }
        };
        getId = () => getDomId(this.data);
        setChange = (change: (event: Event | null, range: Range) => unknown) =>
            this.options = { ...this.options, change };
        set = (value: number, preventOnChange?: "preventOnChange") =>
        {
            this.dom.value = `${value}`;
            if (undefined === preventOnChange)
            {
                this.options?.change?.(null, this);
            }
        };
        get = () => parseFloat(this.dom.value);
        fire = () => this.options?.change?.(null, this);
        loadParameter = (params: Record<string, string>, saveParameter: (key: string, value: string) => unknown) =>
        {
            const value = params[this.dom.id];
            if (undefined !== value)
            {
                this.set(parseFloat(value));
            }
            this.saveParameter = saveParameter;
            return this;
        }
    }
}