import type { Alpine as AlpineType } from "alpinejs";
import type { fetchMagicOptions } from "../Source/Custom/Fetch";
import type { AnchorAttributes } from "../Source/Custom/Anchor";

declare module "alpinejs" {
    interface AlpineFocus {
        (el: HTMLElement | string): void;
        within(el: HTMLElement): this;
        withoutScrolling(): this;
        noscroll(): this;
        withWrapAround(): this;
        wrap(): this;
        displayCheck(string: "none" | "full"): this;
        focusable(el: HTMLElement): boolean;
        previouslyFocused(): HTMLElement | undefined;
        lastFocused(): HTMLElement | undefined;
        focused(): HTMLElement | undefined;
        focusables(): HTMLElement[];
        all(): HTMLElement[];
        isFirst(el: HTMLElement): boolean;
        isLast(el: HTMLElement): boolean;
        getFirst(): HTMLElement | undefined;
        getLast(): HTMLElement | undefined;
        getNext(): HTMLElement | undefined;
        getPrevious(): HTMLElement | undefined;
        first(): void;
        last(): void;
        next(): void;
        previous(): void;
        prev(): void;
        focus(el: HTMLElement): void;
    }

    interface Magics<T> {
        $anchor: () => AnchorAttributes;
        $base64UrlDecode: (input: string) => string;
        $fetch: (url: string, options?: fetchMagicOptions) => Promise<Response>;
        $focus: AlpineFocus;
        $combobox: () => {
            value: string;
            isOpen: boolean;
            isDisabled: boolean;
            activeOption: string | null;
            activeIndex: number | null;
        };
        $comboboxOption: () => {
            isActive: boolean;
            isSelected: boolean;
            isDisabled: boolean;
        };
        $dialog: () => {
            isOpen: boolean;
            close: () => void;
        };
        $disclosure: () => {
            isOpen: boolean;
            close: () => void;
        };
        $listbox: () => {
            value: string;
            isOpen: boolean;
            isDisabled: boolean;
            activeOption: string | null;
            activeIndex: number | null;
        };
        $listboxOption: () => {
            isActive: boolean;
            isSelected: boolean;
            isDisabled: boolean;
        };
        $menuItem: () => {
            isActive: boolean;
            isDisabled: boolean;
        };
        $popover: () => {
            isOpen: boolean;
            open: () => void;
            close: () => void;
        };
        $radioOption: () => {
            isActive: boolean;
            isChecked: boolean;
            isDisabled: boolean;
        };
        $switch: () => {
            isChecked: boolean;
        };
        $tab: () => {
            isSelected: boolean;
            isDisabled: boolean;
        };
        $panel: () => {
            isSelected: boolean;
        };
    }
}

declare global {
    var Alpine: AlpineType;
}

export {};
