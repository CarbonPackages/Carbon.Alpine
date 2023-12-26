function r(a){a.directive("radio",(t,i)=>{i.value?i.value==="option"?u(t,a):i.value==="label"?h(t,a):i.value==="description"&&p(t,a):l(t,a)}).before("bind"),a.magic("radioOption",t=>{let i=a.$data(t);return{get isActive(){return i.__option===i.__active},get isChecked(){return i.__option===i.__value},get isDisabled(){let e=i.__disabled;return i.__rootDisabled?!0:e}}})}function l(a,t){t.bind(a,{"x-modelable":"__value","x-data"(){return{init(){queueMicrotask(()=>{this.__rootDisabled=t.bound(a,"disabled",!1),this.__value=t.bound(this.$el,"default-value",!1),this.__inputName=t.bound(this.$el,"name",!1),this.__inputId="alpine-radio-"+Date.now()}),this.$nextTick(()=>{let i=document.createTreeWalker(this.$el,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>e.getAttribute("role")==="radio"?NodeFilter.FILTER_REJECT:e.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},!1);for(;i.nextNode();)i.currentNode.setAttribute("role","none")})},__value:void 0,__active:void 0,__rootEl:this.$el,__optionValues:[],__disabledOptions:new Set,__optionElsByValue:new Map,__hasLabel:!1,__hasDescription:!1,__rootDisabled:!1,__inputName:void 0,__inputId:void 0,__change(i){this.__rootDisabled||(this.__value=i)},__addOption(i,e,s){let n=t.raw(this.__optionValues),_=n.map(o=>this.__optionElsByValue.get(o)),d=!1;for(let o=0;o<_.length;o++)if(_[o].compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING){n.splice(o,0,i),this.__optionElsByValue.set(i,e),d=!0;break}d||(n.push(i),this.__optionElsByValue.set(i,e)),s&&this.__disabledOptions.add(i)},__isFirstOption(i){return this.__optionValues.indexOf(i)===0},__setActive(i){this.__active=i},__focusOptionNext(){let i=this.__active,e=this.__optionValues.filter(n=>!this.__disabledOptions.has(n)),s=e[this.__optionValues.indexOf(i)+1];s=s||e[0],this.__optionElsByValue.get(s).focus(),this.__change(s)},__focusOptionPrev(){let i=this.__active,e=this.__optionValues.filter(n=>!this.__disabledOptions.has(n)),s=e[e.indexOf(i)-1];s=s||e.slice(-1)[0],this.__optionElsByValue.get(s).focus(),this.__change(s)}}},"x-effect"(){let i=this.__value;if(!this.__inputName)return;let e=this.$el.nextElementSibling;if(e&&String(e.id)===String(this.__inputId)&&e.remove(),i){let s=document.createElement("input");s.type="hidden",s.value=i,s.name=this.__inputName,s.id=this.__inputId,this.$el.after(s)}},role:"radiogroup","x-id"(){return["alpine-radio-label","alpine-radio-description"]},":aria-labelledby"(){return this.__hasLabel&&this.$id("alpine-radio-label")},":aria-describedby"(){return this.__hasDescription&&this.$id("alpine-radio-description")},"@keydown.up.prevent.stop"(){this.__focusOptionPrev()},"@keydown.left.prevent.stop"(){this.__focusOptionPrev()},"@keydown.down.prevent.stop"(){this.__focusOptionNext()},"@keydown.right.prevent.stop"(){this.__focusOptionNext()}})}function u(a,t){t.bind(a,{"x-data"(){return{init(){queueMicrotask(()=>{this.__disabled=t.bound(a,"disabled",!1),this.__option=t.bound(a,"value"),this.$data.__addOption(this.__option,this.$el,this.__disabled)})},__option:void 0,__disabled:!1,__hasLabel:!1,__hasDescription:!1}},"x-id"(){return["alpine-radio-label","alpine-radio-description"]},role:"radio",":aria-checked"(){return this.$radioOption.isChecked},":aria-disabled"(){return this.$radioOption.isDisabled},":aria-labelledby"(){return this.__hasLabel&&this.$id("alpine-radio-label")},":aria-describedby"(){return this.__hasDescription&&this.$id("alpine-radio-description")},":tabindex"(){return this.$radioOption.isDisabled?-1:this.$radioOption.isChecked||!this.$data.__value&&this.$data.__isFirstOption(this.$data.__option)?0:-1},"@click"(){this.$radioOption.isDisabled||(this.$data.__change(this.$data.__option),this.$el.focus())},"@focus"(){this.$radioOption.isDisabled||this.$data.__setActive(this.$data.__option)},"@blur"(){this.$data.__active===this.$data.__option&&this.$data.__setActive(void 0)},"@keydown.space.stop.prevent"(){this.$data.__change(this.$data.__option)}})}function h(a,t){t.bind(a,{"x-init"(){this.$data.__hasLabel=!0},":id"(){return this.$id("alpine-radio-label")}})}function p(a,t){t.bind(a,{"x-init"(){this.$data.__hasDescription=!0},":id"(){return this.$id("alpine-radio-description")}})}window.addEventListener("alpine:init",()=>{window.Alpine.plugin(r)});
