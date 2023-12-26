import { computePosition, autoUpdate, flip, offset, shift, arrow } from "@floating-ui/dom";

// x-tooltip adds a tooltip to an element, width x-tooltip="placement" (top, left, right, bottom, etc) will set the placement
// x-tooltips will add a tooltip to all elements with a title or aria-label attribute. You can also set the placement here.
// x-tooltip.stay-on-click and x-tooltips.stay-on-click will keep the tooltip open after clicking on the element
// If inside a x-tooltips element an element has already x-tooltip it will not be overwritten

// Element tooltip be absolute positioned (with left:0 and top: 0) and have opacity 0
/*
The trigger element could look like this
<a href="#" x-tooltip aria-label="Tooltip Content">Link</a>
<a href="#" x-tooltip.stay-on-click aria-label="Tooltip Content">Link</a>

Or, to activate a bunch of tooltips at once
<div x-tooltips>
    <a href="#" aria-label="Tooltip Content">Link</a>
    <a href="#" aria-label="Tooltip Content 2">Link 2</a>
</div>

The tooltip element should look like this
<div id="tooltip">
    <span id="tooltip-content"></span>
    <div id="tooltip-arrow"></div>
</div>

*/

const stayModifier = "stay-on-click";

const padding = 5;

const floatingEl: HTMLElement = document.querySelector("#tooltip");
const arrowElement: HTMLElement = document.querySelector("#tooltip-arrow");
const tooltipContent: HTMLElement = document.querySelector("#tooltip-content");
floatingEl.style.maxWidth = `calc(100vw - ${padding * 2}px)`;

let tooltipText: string;
let referenceEl: Element;
let placement = "top";
let cleanup: () => void;
let timeout = 0;

function updatePosition() {
    computePosition(referenceEl, floatingEl, {
        // @ts-ignore
        placement,
        middleware: [offset(6), flip(), shift({ padding }), arrow({ element: arrowElement })],
    }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(floatingEl.style, {
            transform: `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`,
        });

        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
        }[placement.split("-")[0]];

        Object.assign(arrowElement.style, {
            left: arrowX != null ? `${arrowX}px` : "",
            top: arrowY != null ? `${arrowY}px` : "",
            right: "",
            bottom: "",
            [staticSide]: "-4px",
        });
    });
}

function updateContent() {
    tooltipText = referenceEl.getAttribute("aria-label") || referenceEl.getAttribute("title");
    tooltipContent.textContent = tooltipText;
}

function showTooltip(element, expression) {
    referenceEl = element;
    placement = expression || "top";
    floatingEl.style.opacity = "1";

    clearTimeout(timeout);
    // No timeout given, so we show it without a transition
    if (!timeout) {
        floatingEl.style.transition = "none";
        timeout = window.setTimeout(() => {
            floatingEl.style.transition = null;
        }, 10);
    }

    updateContent();
    cleanup = autoUpdate(referenceEl, floatingEl, updatePosition);
}

function hideTooltip() {
    if (floatingEl.style.opacity == "0") {
        return;
    }
    floatingEl.style.opacity = "0";
    cleanup();
    timeout = window.setTimeout(() => {
        tooltipText = "";
        floatingEl.style.transition = "none";
        timeout = 0;
    }, 500);
}

function roundByDPR(value) {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(value * dpr) / dpr;
}

export default function (Alpine) {
    // Directive: x-tooltip
    Alpine.directive("tooltip", (element, { expression, modifiers }) => {
        const stayOnClick = modifiers.includes(stayModifier);
        Alpine.bind(element, {
            "@mouseenter"() {
                showTooltip(element, expression);
            },
            "@mouseleave"() {
                hideTooltip();
            },
            "@click"() {
                if (!stayOnClick) {
                    hideTooltip();
                    return;
                }
                this.$nextTick(() => {
                    updateContent();
                });
            },
            "@focus"() {
                showTooltip(element, expression);
            },
            "@blur"() {
                hideTooltip();
            },
        });
    });

    // Directive: x-tooltips
    Alpine.directive("tooltips", (element, { expression, modifiers }) => {
        const modifier = modifiers.includes(stayModifier) ? `.${stayModifier}` : "";
        Alpine.bind(element, {
            "x-init"() {
                this.$nextTick(() => {
                    const elements = [...element.querySelectorAll(":where([aria-label],[title])")];
                    elements.forEach((element) => {
                        if (!element.hasAttribute("x-tooltip") && !element.hasAttribute("x-tooltip.stay-on-click")) {
                            element.setAttribute("x-tooltip" + modifier, expression);
                        }
                    });
                });
            },
        });
    });
}
