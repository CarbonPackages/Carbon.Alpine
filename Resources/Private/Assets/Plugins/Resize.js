import resize from "@alpinejs/resize";

window.addEventListener("alpine:init", () => {
    window.Alpine.plugin(resize);
});
