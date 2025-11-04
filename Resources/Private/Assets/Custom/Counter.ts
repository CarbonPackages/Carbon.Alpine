import Counter from "../../Source/Custom/Counter";

window.addEventListener("alpine:init", () => {
    window.Alpine.plugin(Counter);
});
