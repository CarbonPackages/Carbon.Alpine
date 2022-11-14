import Fetch from "./Source/Fetch";

window.addEventListener("alpine:init", () => {
    window.Alpine.plugin(Fetch);
});
