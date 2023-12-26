import tippy, { createSingleton } from "tippy.js";

const delay: number | [number, number] = [500, 0];

export default function (Alpine) {
    // Directive: x-tooltip
    Alpine.directive("tooltip", (element, { expression }) => {
        createTippy(element, expression || "top");
    });

    // Directive: x-tooltips
    Alpine.directive("tooltips", (element, { expression }) => {
        const placement = expression || "top";
        Alpine.bind(element, {
            "x-init"() {
                this.$nextTick(() => {
                    const elements = [...element.querySelectorAll(":where([aria-label],[title])")];
                    const instances = elements.map((element) => createTippy(element, placement));
                    // @ts-ignore
                    createSingleton(instances, {
                        delay: 500,
                        moveTransition: "transform 0.2s ease-out",
                    });
                });
            },
        });
    });
}

function content(element: Element) {
    return element.getAttribute("aria-label") || element.getAttribute("title");
}

const dynamicContentPlugin = {
    name: "dynamicContent",
    fn: (instance) => ({
        onShow() {
            console.log(instance, instance.reference);
            instance.setContent(content(instance.reference));
        },
    }),
};

function createTippy(element: Element, placement) {
    return tippy(element, {
        content: content(element),
        placement,
        delay,
        plugins: [dynamicContentPlugin],
    });
}
