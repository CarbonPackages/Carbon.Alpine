import { computePosition, autoUpdate, flip, offset, shift, arrow } from "@floating-ui/dom";

// Element tooltip be absolute positioned (with left:0 and top: 0) and have opacity 0

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
    Alpine.directive("tooltip", (element, { expression }) => {
        Alpine.bind(element, {
            "@mouseenter"() {
                showTooltip(element, expression);
            },
            "@mouseleave"() {
                hideTooltip();
            },
            "@click"() {
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
    Alpine.directive("tooltips", (element, { expression }) => {
        Alpine.bind(element, {
            "x-init"() {
                this.$nextTick(() => {
                    const elements = [...element.querySelectorAll(":where([aria-label],[title])")];
                    elements.forEach((element) => {
                        if (!element.hasAttribute("x-tooltip")) {
                            element.setAttribute("x-tooltip", expression);
                        }
                    });
                });
            },
        });
    });
}
