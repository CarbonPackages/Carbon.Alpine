(()=>{function n(e){e.directive("disclosure",(t,i)=>{i.value?i.value==="panel"?o(t,e):i.value==="button"&&s(t,e):a(t,e)}).before("bind"),e.magic("disclosure",t=>{let i=e.$data(t);return{get isOpen(){return i.__isOpen},close(){i.__close()}}})}function a(e,t){t.bind(e,{"x-modelable":"__isOpen","x-data"(){return{init(){queueMicrotask(()=>{let i=!!t.bound(this.$el,"default-open",!1);i&&(this.__isOpen=i)})},__isOpen:!1,__close(){this.__isOpen=!1},__toggle(){this.__isOpen=!this.__isOpen}}},"x-id"(){return["alpine-disclosure-panel"]}})}function s(e,t){t.bind(e,{"x-init"(){this.$el.tagName.toLowerCase()==="button"&&!this.$el.hasAttribute("type")&&(this.$el.type="button")},"@click"(){this.$data.__isOpen=!this.$data.__isOpen},":aria-expanded"(){return this.$data.__isOpen},":aria-controls"(){return this.$data.$id("alpine-disclosure-panel")},"@keydown.space.prevent.stop"(){this.$data.__toggle()},"@keydown.enter.prevent.stop"(){this.$data.__toggle()},"@keyup.space.prevent"(){}})}function o(e,t){t.bind(e,{"x-show"(){return this.$data.__isOpen},":id"(){return this.$data.$id("alpine-disclosure-panel")}})}window.addEventListener("alpine:init",()=>{window.Alpine.plugin(n)});})();
