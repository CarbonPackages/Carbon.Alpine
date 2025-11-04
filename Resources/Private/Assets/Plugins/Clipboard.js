import clipboard from "@ryangjchandler/alpine-clipboard";

window.addEventListener("alpine:init", () => {
    window.Alpine.plugin(clipboard);
});
