function m(t){let a=()=>{let r,s;try{s=localStorage}catch(i){console.error(i),console.warn("Alpine: $persist is using temporary storage since localStorage is unavailable.");let e=new Map;s={getItem:e.get.bind(e),setItem:e.set.bind(e)}}return t.interceptor((i,e,l,n,v)=>{let o=r||`_x_${n}`,u=g(o,s)?p(o,s):i;return l(u),t.effect(()=>{let c=e();d(o,c,s),l(c)}),u},i=>{i.as=e=>(r=e,i),i.using=e=>(s=e,i)})};Object.defineProperty(t,"$persist",{get:()=>a()}),t.magic("persist",a),t.persist=(r,{get:s,set:i},e=localStorage)=>{let l=g(r,e)?p(r,e):s();i(l),t.effect(()=>{let n=s();d(r,n,e),i(n)})}}function g(t,a){return a.getItem(t)!==null}function p(t,a){let r=a.getItem(t,a);if(r!==void 0)return JSON.parse(r)}function d(t,a,r){r.setItem(t,JSON.stringify(a))}var f=m;window.addEventListener("alpine:init",()=>{window.Alpine.plugin(f)});
