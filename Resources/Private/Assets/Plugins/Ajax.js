import ajax from "@imacrayon/alpine-ajax";

window.addEventListener("alpine:init", () => {
    window.Alpine.plugin(ajax);
});
