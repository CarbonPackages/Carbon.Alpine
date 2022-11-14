import tippy, { createSingleton } from "tippy.js";

const delay = [500, 0];
const content = (element: Element) => element.getAttribute("aria-label") || element.getAttribute("title");

window.addEventListener("alpine:init", () => {
    const Alpine = window.Alpine;
    // Directive: x-tooltip
    Alpine.directive("tooltip", (element, { expression }) => {
        // @ts-ignore
        tippy(element, {
            placement: expression || "top",
            // content: content(element),
            delay,
        });
    });

    // Directive: x-tooltips
    Alpine.directive("tooltips", (element, { expression }) => {
        const placement = expression || "top";
        // @ts-ignore
        const instances = [...element.querySelectorAll("[aria-label]")].map((element) =>
            // @ts-ignore
            tippy(element, { placement, content: content(element), delay })
        );
        createSingleton(instances, {
            delay: 500,
            moveTransition: "transform 0.2s ease-out",
        });
    });
});
