import { Alpine as AlpineType } from "alpinejs";

export default function (Alpine: AlpineType) {
    Alpine.directive("tash", (el, { modifiers, expression }, { evaluate, effect }) => {
        const expressionFinder = (expression: string) => new RegExp(`{${expression}}`, "g");
        const expressionArray = expression.split(",").map((expressionItem) => expressionItem.trim());
        const htmlReference = document.createElement("template");

        htmlReference.innerHTML = el.innerHTML;

        let componentHtml = `${htmlReference.innerHTML}`;

        effect(() => {
            expressionArray.forEach((expression) => {
                const evaluatedValue = evaluate(expression);
                const finderRegex = expressionFinder(expression);

                componentHtml = componentHtml.replace(finderRegex, String(evaluatedValue));
            });

            el.innerHTML = componentHtml;

            componentHtml = htmlReference.innerHTML;
        });
    });
}
