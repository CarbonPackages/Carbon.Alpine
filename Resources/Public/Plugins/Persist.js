(()=>{function d(t){let e=()=>{let n,a=localStorage;return t.interceptor((r,i,o,p,w)=>{let s=n||`_x_${p}`,l=f(s,a)?c(s,a):r;return o(l),t.effect(()=>{let u=i();m(s,u,a),o(u)}),l},r=>{r.as=i=>(n=i,r),r.using=i=>(a=i,r)})};Object.defineProperty(t,"$persist",{get:()=>e()}),t.magic("persist",e)}function f(t,e){return e.getItem(t)!==null}function c(t,e){return JSON.parse(e.getItem(t,e))}function m(t,e,n){n.setItem(t,JSON.stringify(e))}var g=d;window.addEventListener("alpine:init",()=>{window.Alpine.plugin(g)});})();
