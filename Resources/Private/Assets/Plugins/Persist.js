import persist from "@alpinejs/persist";

window.addEventListener("alpine:init", () => {
    window.Alpine.plugin(persist);
});
