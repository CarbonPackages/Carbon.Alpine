import { arrow, autoUpdate, computePosition, flip, hide, offset, shift } from "../chunk-SVORO3BY.js";

// Resources/Private/Source/Custom/Tooltip.ts
var xTooltipAttribute = "x-tooltip";
var fetchAttribute = "data-tooltip-fetch";
var contentAttribute = "data-tooltip-html";
var attributes = [fetchAttribute, contentAttribute, "data-tooltip", "aria-label", "title"];
var stayModifier = "stay-on-click";
var focusModifier = "focus";
var offsetModifier = "offset";
var idModifier = "id";
var fixedModifier = "fixed";
var padding = 5;
var tooltipText;
var referenceEl;
var placement = "top";
var cleanup;
var timeout = 0;
function Tooltip_default(Alpine) {
    Alpine.directive("tooltip", (element, { expression, modifiers }, { evaluate }) => {
        const strategy = modifiers.includes(fixedModifier) ? "fixed" : "absolute";
        const id = modifiers.includes(idModifier)
            ? modifiers[modifiers.indexOf(idModifier) + 1]
            : strategy == "fixed"
              ? "tooltip-fixed"
              : "tooltip";
        const { floatingEl, arrowElement, tooltipContent } = getElements(id);
        if (!floatingEl) {
            console.warn(`Tooltip with the id '${id}' element not found`);
            return;
        }
        if (!tooltipContent) {
            console.warn(`Target element for content of the tooltip with the id '${id}-content' element not found`);
            return;
        }
        const offsetValue = modifiers.includes(offsetModifier)
            ? evaluate(modifiers[modifiers.indexOf(offsetModifier) + 1])
            : 6;
        const stayOnClick = modifiers.includes(stayModifier);
        const focusAction = modifiers.includes(focusModifier);
        let hasContent = true;
        const middleware = [offset(offsetValue), flip(), shift({ padding })];
        if (arrowElement) {
            middleware.push(arrow({ element: arrowElement }));
        }
        middleware.push(hide());
        function updateContent() {
            const attribute = attributes.find((attribute2) => referenceEl.hasAttribute(attribute2));
            if (!attribute) {
                console.warn("No tooltip content found");
                return;
            }
            tooltipText = referenceEl.getAttribute(attribute);
            if (!tooltipText || !tooltipContent) {
                hasContent = false;
                hideTooltip();
                return;
            }
            if (attribute === contentAttribute) {
                tooltipContent.innerHTML = tooltipText;
                return;
            }
            if (attribute !== fetchAttribute) {
                tooltipContent.textContent = tooltipText;
                return;
            }
            const { url, text } = evaluate(tooltipText);
            if (!url) {
                hasContent = false;
                hideTooltip();
                return;
            }
            tooltipContent.innerHTML = text || "";
            fetch(url)
                .then((response) => response.text())
                .then((html) => {
                    if (html) {
                        tooltipContent.innerHTML = html;
                        return;
                    }
                    hasContent = false;
                    hideTooltip();
                });
        }
        function updatePosition() {
            computePosition(referenceEl, floatingEl, {
                // @ts-ignore
                placement,
                middleware,
                strategy,
            }).then(({ x, y, placement: placement2, middlewareData }) => {
                Object.assign(floatingEl.style, {
                    transform: `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`,
                });
                if (middlewareData.hide.referenceHidden) {
                    hideTooltip();
                }
                if (!middlewareData.arrow || !arrowElement) {
                    return;
                }
                const { x: arrowX, y: arrowY } = middlewareData.arrow;
                const staticSide = {
                    top: "bottom",
                    right: "left",
                    bottom: "top",
                    left: "right",
                }[placement2.split("-")[0]];
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
        function showTooltip(element2, expression2) {
            if (!hasContent) {
                return;
            }
            referenceEl = element2;
            placement = expression2 || "top";
            floatingEl.style.opacity = "1";
            clearTimeout(timeout);
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
    Alpine.directive("tooltips", (element, { expression, modifiers }) => {
        const modifier = modifiers.length ? `.${modifiers.join(".")}` : "";
        Alpine.bind(element, {
            "x-init"() {
                this.$nextTick(() => {
                    const elements = [...element.querySelectorAll(`:where([${attributes.join("],[")}])`)];
                    elements.forEach((element2) => {
                        if (!tooltipIsSet(element2)) {
                            element2.setAttribute(xTooltipAttribute + modifier, expression);
                        }
                    });
                });
            },
        });
    });
}
var possibleXTooltipAttributes = [
    xTooltipAttribute,
    `${xTooltipAttribute}.${stayModifier}`,
    `${xTooltipAttribute}.${focusModifier}`,
    `${xTooltipAttribute}.${stayModifier}.${focusModifier}`,
    `${xTooltipAttribute}.${focusModifier}.${stayModifier}`,
];
function tooltipIsSet(element) {
    return possibleXTooltipAttributes.some((attribute) => !!element.hasAttribute(attribute));
}
function getElements(id = "tooltip") {
    const floatingEl = document.querySelector(`#${id}`);
    const arrowElement = document.querySelector(`#${id}-arrow`);
    const tooltipContent = document.querySelector(`#${id}-content`);
    if (floatingEl) {
        floatingEl.style.maxWidth = `calc(100vw - ${padding * 2}px)`;
    }
    return { floatingEl, arrowElement, tooltipContent };
}
function roundByDPR(value) {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(value * dpr) / dpr;
}
export { Tooltip_default as default };
