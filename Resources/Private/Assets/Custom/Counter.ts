import Counter from "./Source/Counter";

window.addEventListener("alpine:init", () => {
    window.Alpine.plugin(Counter);
});
