(()=>{function n(i){i.directive("dialog",(e,t)=>{t.value==="overlay"?s(e,i):t.value==="panel"?o(e,i):t.value==="title"?d(e,i):t.value==="description"?r(e,i):t.value==="focus"?l(e,i):a(e,i)}),i.magic("dialog",e=>{let t=i.$data(e);return{get open(){return t.__isOpen},get isOpen(){return t.__isOpen},close(){t.__close()}}})}function a(i,e){e.bind(i,{"x-effect"(){this.$dispatch("alpine-dialog",this.__isOpenState)},"x-data"(){return{init(){e.bound(i,"open")!==void 0&&e.effect(()=>{this.__isOpenState=e.bound(i,"open")}),e.bound(i,"initial-focus")!==void 0&&this.$watch("__isOpenState",()=>{this.__isOpenState&&setTimeout(()=>{e.bound(i,"initial-focus").focus()},0)})},__isOpenState:!1,__close(){e.bound(i,"open")?this.$dispatch("close"):this.__isOpenState=!1},get __isOpen(){return e.bound(i,"static",this.__isOpenState)}}},"x-modelable":"__isOpenState","x-id"(){return["alpine-dialog-title","alpine-dialog-description"]},"x-show"(){return this.__isOpen},"x-trap.inert.noscroll"(){return this.__isOpen},"@keydown.escape"(){this.__close()},":aria-labelledby"(){return this.$id("alpine-dialog-title")},":aria-describedby"(){return this.$id("alpine-dialog-description")},role:"dialog","aria-modal":"true"})}function s(i,e){e.bind(i,{"x-init"(){this.$data.__isOpen===void 0&&console.warn('"x-dialog:overlay" is missing a parent element with "x-dialog".')},"x-show"(){return this.__isOpen},"@click.prevent.stop"(){this.$data.__close()}})}function o(i,e){e.bind(i,{"@click.outside"(){this.$data.__close()},"x-show"(){return this.$data.__isOpen}})}function d(i,e){e.bind(i,{"x-init"(){this.$data.__isOpen===void 0&&console.warn('"x-dialog:title" is missing a parent element with "x-dialog".')},":id"(){return this.$id("alpine-dialog-title")}})}function r(i,e){e.bind(i,{":id"(){return this.$id("alpine-dialog-description")}})}function l(i,e){e.bind(i,{"x-effect"(){this.__isOpenState&&setTimeout(()=>{i.focus()},500)}})}window.addEventListener("alpine:init",()=>{window.Alpine.plugin(n)});})();
