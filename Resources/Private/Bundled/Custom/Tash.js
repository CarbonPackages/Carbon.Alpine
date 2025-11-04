// Resources/Private/Source/Custom/Tash.ts
function Tash_default(Alpine) {
    Alpine.directive("tash", (el, { modifiers, expression }, { evaluate, effect }) => {
        const expressionFinder = (expression2) => new RegExp(`{${expression2}}`, "g");
        const expressionArray = expression.split(",").map((expressionItem) => expressionItem.trim());
        const htmlReference = document.createElement("template");
        htmlReference.innerHTML = el.innerHTML;
        let componentHtml = `${htmlReference.innerHTML}`;
        effect(() => {
            expressionArray.forEach((expression2) => {
                const evaluatedValue = evaluate(expression2);
                const finderRegex = expressionFinder(expression2);
                componentHtml = componentHtml.replace(finderRegex, String(evaluatedValue));
            });
            el.innerHTML = componentHtml;
            componentHtml = htmlReference.innerHTML;
        });
    });
}
export { Tash_default as default };
