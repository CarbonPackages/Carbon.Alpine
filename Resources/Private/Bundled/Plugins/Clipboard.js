// node_modules/.pnpm/@ryangjchandler+alpine-clipboard@2.3.0/node_modules/@ryangjchandler/alpine-clipboard/src/index.js
var onCopy = () => {};
var copy = (target, mimeType = void 0) => {
    if (typeof target === "function") {
        target = target();
    }
    if (typeof target === "object") {
        target = JSON.stringify(target);
    }
    if (mimeType !== void 0) {
        return window.navigator.clipboard
            .write([
                new ClipboardItem({
                    [mimeType]: new Blob([target], {
                        type: mimeType,
                    }),
                }),
            ])
            .then(onCopy);
    }
    return window.navigator.clipboard.writeText(target).then(onCopy);
};
function Clipboard(Alpine) {
    Alpine.magic("clipboard", () => {
        return copy;
    });
    Alpine.directive("clipboard", (el, { modifiers, expression }, { evaluateLater, cleanup }) => {
        const getCopyContent = modifiers.includes("raw") ? (c) => c(expression) : evaluateLater(expression);
        const clickHandler = () => getCopyContent(copy);
        el.addEventListener("click", clickHandler);
        cleanup(() => {
            el.removeEventListener("click", clickHandler);
        });
    });
}
Clipboard.configure = (config) => {
    if (config.hasOwnProperty("onCopy") && typeof config.onCopy === "function") {
        onCopy = config.onCopy;
    }
    return Clipboard;
};
var src_default = Clipboard;

// Resources/Private/Source/Plugins/Clipboard.js
var Clipboard_default = src_default;
export { Clipboard_default as default };
