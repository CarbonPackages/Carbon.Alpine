import Fetch from "../../Source/Custom/Fetch";

window.addEventListener("alpine:init", () => {
    window.Alpine.plugin(Fetch);
});
