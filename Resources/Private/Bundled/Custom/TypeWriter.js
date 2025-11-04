// Resources/Private/Source/Custom/TypeWriter.ts
var size = "0.05em";
var styles = {
    cursor: `position:relative`,
    cursorSpan: `position:absolute;top:${size};bottom:${size};border-left:${size} solid currentColor`,
    placeholder: `display:inline-block;position:relative;height:1em`,
};
var Typewriter = class {
    element;
    texts;
    current;
    currentText;
    waitTime;
    showCursor;
    cursor;
    segment;
    segmentPointer;
    useCssClasses;
    constructor(element, texts, waitTime, showCursor, useCssClasses = false) {
        this.element = element;
        this.texts = texts || [];
        this.current = 1;
        this.currentText = "";
        this.waitTime = waitTime || 2e3;
        this.showCursor = showCursor || false;
        this.cursor = true;
        this.segment = [];
        this.segmentPointer = 0;
        this.useCssClasses = useCssClasses;
    }
    async start() {
        this.currentText = this.texts[0] || "";
        this.segment = this.segmentString(this.currentText);
        this.segmentPointer = this.segment.length;
        this.element.innerHTML = this.prepareText(true);
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            this.increment();
            while (true) {
                await this.swap();
            }
        }
    }
    prepareText(cursor) {
        return `${this.currentText}${cursor ? this.getCursor() : ""}${this.getPlaceholder()}`;
    }
    getCursor() {
        if (!this.showCursor) {
            return "";
        }
        if (this.useCssClasses) {
            return `<span class="typewriter-cursor"><span></span></span>`;
        }
        return `<span style="${styles.cursor}"><span style="${styles.cursorSpan}"></span></span>`;
    }
    getPlaceholder() {
        if (this.useCssClasses) {
            return `<span class="typewriter-placeholder"></span>`;
        }
        return `<span style="${styles.placeholder}"></span>`;
    }
    async swap() {
        await this.wait(this.waitTime);
        await this.clear();
        await this.type(this.nextText());
    }
    increment() {
        this.current++;
        if (this.current > this.texts.length) {
            this.current = 1;
        }
    }
    nextText() {
        const text = this.texts[this.current - 1];
        this.increment();
        return text;
    }
    segmentString(value) {
        const segments =
            typeof Intl != "undefined" && Intl.Segmenter
                ? [...new Intl.Segmenter().segment(value)]
                : value.split("").map((segment) => ({ segment }));
        return segments.reduce((acc, { segment }, index) => [...acc, acc[index] + segment], [""]);
    }
    backspace() {
        this.currentText = this.segment[this.segmentPointer];
        this.element.innerHTML = this.prepareText(true);
        return this.wait(100);
    }
    async clear() {
        while (this.segmentPointer > 0) {
            this.segmentPointer--;
            await this.backspace();
        }
    }
    async type(text) {
        this.segment = this.segmentString(text);
        this.segmentPointer = 0;
        while (this.segmentPointer < this.segment.length) {
            await this.append();
            this.segmentPointer++;
        }
    }
    append() {
        this.currentText = this.segment[this.segmentPointer];
        this.element.innerHTML = this.prepareText(true);
        return this.wait(100);
    }
    async wait(milliseconds) {
        this.cursor = true;
        const interval = setInterval(() => {
            this.cursor = !this.cursor;
            if (this.cursor) {
                this.element.innerHTML = this.prepareText(true);
            } else {
                this.element.innerHTML = this.prepareText(false);
            }
        }, 530);
        return new Promise((resolve) => {
            setTimeout(() => {
                clearInterval(interval);
                resolve(void 0);
            }, milliseconds);
        });
    }
};
function TypeWriter_default(Alpine) {
    if (Alpine && typeof Alpine === "object" && Alpine.magic && Alpine.directive) {
        return createPlugin(Alpine, { useCssClasses: false });
    } else {
        const config = Alpine || { useCssClasses: false };
        return function (AlpineInstance) {
            return createPlugin(AlpineInstance, config);
        };
    }
}
function createPlugin(Alpine, config) {
    Alpine.directive("typewriter", (el, { expression, modifiers }, { evaluate }) => {
        const texts = evaluate(expression);
        const timeModifiers = modifiers.filter((modifier) => modifier.match(/^\d+m?s$/));
        const latestTimeModifier = timeModifiers.pop();
        let milliseconds = null;
        if (latestTimeModifier) {
            if (latestTimeModifier.endsWith("ms")) {
                const match = latestTimeModifier.match(/^(\d+)/);
                milliseconds = match ? parseInt(match[1]) : null;
            } else {
                const match = latestTimeModifier.match(/^(\d+)s/);
                milliseconds = match ? parseInt(match[1]) * 1e3 : null;
            }
        }
        const showCursor = modifiers.includes("cursor");
        new Typewriter(el, texts, milliseconds, showCursor, config.useCssClasses).start().then();
    });
}
export { TypeWriter_default as default };
