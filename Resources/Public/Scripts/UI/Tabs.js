(()=>{function s(a){a.directive("tabs",(e,t)=>{t.value?t.value==="list"?o(e,a):t.value==="tab"?u(e,a):t.value==="panels"?b(e,a):t.value==="panel"&&r(e,a):h(e,a)}).before("bind"),a.magic("tab",e=>{let t=a.$data(e);return{get isSelected(){return t.__selectedIndex===t.__tabs.indexOf(t.__tabEl)},get isDisabled(){return t.__isDisabled}}}),a.magic("panel",e=>{let t=a.$data(e);return{get isSelected(){return t.__selectedIndex===t.__panels.indexOf(t.__panelEl)}}})}function h(a,e){e.bind(a,{"x-modelable":"__selectedIndex","x-data"(){return{init(){queueMicrotask(()=>{let t=this.__selectedIndex||Number(e.bound(this.$el,"default-index",0)),i=this.__activeTabs(),n=(d,_,l)=>Math.min(Math.max(d,_),l);this.__selectedIndex=n(t,0,i.length-1),e.effect(()=>{this.__manualActivation=e.bound(this.$el,"manual",!1)})})},__tabs:[],__panels:[],__selectedIndex:null,__tabGroupEl:void 0,__manualActivation:!1,__addTab(t){this.__tabs.push(t)},__addPanel(t){this.__panels.push(t)},__selectTab(t){this.__selectedIndex=this.__tabs.indexOf(t)},__activeTabs(){return this.__tabs.filter(t=>!t.__disabled)}}}})}function o(a,e){e.bind(a,{"x-init"(){this.$data.__tabGroupEl=this.$el}})}function u(a,e){e.bind(a,{"x-init"(){this.$el.tagName.toLowerCase()==="button"&&!this.$el.hasAttribute("type")&&(this.$el.type="button")},"x-data"(){return{init(){this.__tabEl=this.$el,this.$data.__addTab(this.$el),this.__tabEl.__disabled=e.bound(this.$el,"disabled",!1),this.__isDisabled=this.__tabEl.__disabled},__tabEl:void 0,__isDisabled:!1}},"@click"(){this.$el.__disabled||(this.$data.__selectTab(this.$el),this.$el.focus())},"@keydown.enter.prevent.stop"(){this.__selectTab(this.$el)},"@keydown.space.prevent.stop"(){this.__selectTab(this.$el)},"@keydown.home.prevent.stop"(){this.$focus.within(this.$data.__activeTabs()).first()},"@keydown.page-up.prevent.stop"(){this.$focus.within(this.$data.__activeTabs()).first()},"@keydown.end.prevent.stop"(){this.$focus.within(this.$data.__activeTabs()).last()},"@keydown.page-down.prevent.stop"(){this.$focus.within(this.$data.__activeTabs()).last()},"@keydown.down.prevent.stop"(){this.$focus.within(this.$data.__activeTabs()).withWrapAround().next()},"@keydown.right.prevent.stop"(){this.$focus.within(this.$data.__activeTabs()).withWrapAround().next()},"@keydown.up.prevent.stop"(){this.$focus.within(this.$data.__activeTabs()).withWrapAround().prev()},"@keydown.left.prevent.stop"(){this.$focus.within(this.$data.__activeTabs()).withWrapAround().prev()},":tabindex"(){return this.$tab.isSelected?0:-1},"@mousedown"(t){t.preventDefault()},"@focus"(){if(this.$data.__manualActivation)this.$el.focus();else{if(this.$el.__disabled)return;this.$data.__selectTab(this.$el),this.$el.focus()}}})}function b(a,e){e.bind(a,{})}function r(a,e){e.bind(a,{":tabindex"(){return this.$panel.isSelected?0:-1},"x-data"(){return{init(){this.__panelEl=this.$el,this.$data.__addPanel(this.$el)},__panelEl:void 0}},"x-show"(){return this.$panel.isSelected}})}window.addEventListener("alpine:init",()=>{window.Alpine.plugin(s)});})();
