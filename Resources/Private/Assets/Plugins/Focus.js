import focus from "./Source/Focus.js";

window.addEventListener("alpine:init", () => {
    window.Alpine.plugin(focus);
});
