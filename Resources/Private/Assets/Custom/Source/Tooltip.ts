import { computePosition, autoUpdate, flip, offset, shift, arrow, hide } from "@floating-ui/dom";

// x-tooltip adds a tooltip to an element, width x-tooltip="placement" (top, left, right, bottom, etc) will set the placement
// x-tooltips will add a tooltip to all elements with a title or aria-label attribute. You can also set the placement here.
// The modifier stay-on-click will keep the tooltip open after clicking on the element (e.g. x-tooltip.stay-on-click)
// The modifier focus will show the tooltip on focus and hide it on blur (e.g. x-tooltip.focus)
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
const focusModifier = "focus";

const padding = 5;

const floatingEl: HTMLElement | null = document.querySelector("#tooltip");
const arrowElement: HTMLElement | null = document.querySelector("#tooltip-arrow");
const tooltipContent: HTMLElement | null = document.querySelector("#tooltip-content");

if (floatingEl) {
    floatingEl.style.maxWidth = `calc(100vw - ${padding * 2}px)`;
}

let tooltipText: string;
let referenceEl: Element;
let placement = "top";
let cleanup: () => void;
let timeout = 0;

const middleware = [offset(6), flip(), shift({ padding })];
if (arrowElement) {
    middleware.push(arrow({ element: arrowElement }));
}
middleware.push(hide());

function updatePosition() {
    // @ts-ignore
    computePosition(referenceEl, floatingEl, {
        // @ts-ignore
        placement,
        middleware,
    }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(floatingEl.style, {
            transform: `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`,
        });

        // @ts-ignore
        if (middlewareData.hide.referenceHidden) {
            hideTooltip();
        }

        if (!middlewareData.arrow) {
            return;
        }

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
            // @ts-ignore
            [staticSide]: "-4px",
        });
    });
}

function updateContent() {
    // @ts-ignore
    tooltipText = referenceEl.getAttribute("aria-label") || referenceEl.getAttribute("title");
    // @ts-ignore
    tooltipContent.textContent = tooltipText;
}

function showTooltip(element, expression) {
    referenceEl = element;
    placement = expression || "top";
    // @ts-ignore
    floatingEl.style.opacity = "1";

    clearTimeout(timeout);
    // No timeout given, so we show it without a transition
    if (!timeout) {
        // @ts-ignore
        floatingEl.style.transition = "none";
        timeout = window.setTimeout(() => {
            // @ts-ignore
            floatingEl.style.transition = null;
        }, 10);
    }

    updateContent();
    // @ts-ignore
    cleanup = autoUpdate(referenceEl, floatingEl, updatePosition);
}

function hideTooltip() {
    // @ts-ignore
    if (floatingEl.style.opacity == "0") {
        return;
    }
    // @ts-ignore
    floatingEl.style.opacity = "0";
    cleanup();
    timeout = window.setTimeout(() => {
        tooltipText = "";
        // @ts-ignore
        floatingEl.style.transition = "none";
        timeout = 0;
    }, 500);
}

function roundByDPR(value) {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(value * dpr) / dpr;
}

export default function (Alpine) {
    if (!floatingEl) {
        console.error("Tooltip with the id 'tooltip' element not found");
        return;
    }
    if (!tooltipContent) {
        console.error("Target element for content of the tooltip with the id 'tooltip-content' element not found");
        return;
    }
    // Directive: x-tooltip
    Alpine.directive("tooltip", (element, { expression, modifiers }) => {
        const stayOnClick = modifiers.includes(stayModifier);
        const focusAction = modifiers.includes(focusModifier);
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
                if (focusAction) {
                    showTooltip(element, expression);
                }
            },
            "@blur"() {
                if (focusAction) {
                    hideTooltip();
                }
            },
        });
    });

    // Directive: x-tooltips
    Alpine.directive("tooltips", (element, { expression, modifiers }) => {
        const modifier = modifiers.length ? `.${modifiers.join(".")}` : "";
        Alpine.bind(element, {
            "x-init"() {
                this.$nextTick(() => {
                    const elements = [...element.querySelectorAll(":where([aria-label],[title])")];
                    elements.forEach((element) => {
                        if (!tooltipIsSet(element)) {
                            element.setAttribute("x-tooltip" + modifier, expression);
                        }
                    });
                });
            },
        });
    });
}

const xTooltipAttribute = "x-tooltip";
const possibleXTooltipAttributes = [
    xTooltipAttribute,
    `${xTooltipAttribute}.${stayModifier}`,
    `${xTooltipAttribute}.${focusModifier}`,
    `${xTooltipAttribute}.${stayModifier}.${focusModifier}`,
    `${xTooltipAttribute}.${focusModifier}.${stayModifier}`,
];
function tooltipIsSet(element) {
    return possibleXTooltipAttributes.some((attribute) => !!element.hasAttribute(attribute));
}
