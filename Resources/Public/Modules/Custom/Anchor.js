import{a as x,b as _,c as m,d as w,f as v,g as b}from"../chunk-FLP5W5K6.js";function C(n){n.magic("anchor",t=>{if(!t._x_anchor)throw"Alpine: No x-anchor directive found on element using $anchor...";return t._x_anchor}),n.interceptClone((t,i)=>{t&&t._x_anchor&&!i._x_anchor&&(i._x_anchor=t._x_anchor)}),n.directive("anchor",n.skipDuringClone((t,{expression:i,modifiers:l},{cleanup:s,evaluate:u})=>{let{placement:d,offsetValue:e,unstyled:o,arrowOptions:r}=y(t,l);t._x_anchor=n.reactive({x:0,y:0});let a=[w(),m({padding:5}),_(e)];if(r&&a.push(v(r)),i=="mouse"){let p=g=>{let O=S(g);E({reference:O,el:t,placement:d,middleware:a,unstyled:o,arrowOptions:r})};document.addEventListener("mousemove",p),s(()=>{document.removeEventListener("mousemove",p)});return}let c=u(i);if(!c)throw"Alpine: no element provided to x-anchor...";let f=()=>{E({reference:c,el:t,placement:d,middleware:a,unstyled:o,arrowOptions:r})},h=x(c,t,()=>f());s(()=>h())},(t,{expression:i,modifiers:l,value:s},{cleanup:u,evaluate:d})=>{let{unstyled:e}=y(t,l);t._x_anchor&&(e||N(t,t._x_anchor.x,t._x_anchor.y))}))}function N(n,t,i){Object.assign(n.style,{left:t+"px",top:i+"px",position:"absolute"})}function y(n,t){let l=["top","top-start","top-end","right","right-start","right-end","bottom","bottom-start","bottom-end","left","left-start","left-end"].find(e=>t.includes(e)),s=0,u=null;if(t.includes("arrow")){let e=t.findIndex(f=>f==="arrow"),o=t[e+1]!==void 0?`.${t[e+1]}`:null,r=t[e+2]!==void 0?Number(t[e+2]):0,a=o?n.querySelector(o):null,c=a.offsetWidth;s=Math.sqrt(2*c**2)/2,u={element:a,padding:r,length:c}}if(t.includes("offset")){let e=t.findIndex(o=>o==="offset");s=t[e+1]!==void 0?Number(t[e+1]):s}let d=t.includes("no-style");return{placement:l,offsetValue:s,unstyled:d,arrowOptions:u}}function E({reference:n,el:t,placement:i,middleware:l,unstyled:s,arrowOptions:u,callback:d=e=>{}}){let e;b(n,t,{placement:i,middleware:l}).then(({x:o,y:r,middlewareData:a,placement:c})=>{if(s||N(t,o,r),a.arrow&&u){let{x:f,y:h}=a.arrow,p=c.split("-")[0],g={top:"bottom",right:"left",bottom:"top",left:"right"}[p];Object.assign(u.element.style,{left:f!=null?`${f}px`:"",top:h!=null?`${h}px`:"",right:"",bottom:"",[g]:`${-u.length/2}px`,transform:"rotate(45deg)",position:"absolute"})}JSON.stringify({x:o,y:r})!==e&&(t._x_anchor.x=o,t._x_anchor.y=r),e=JSON.stringify({x:o,y:r}),d({x:o,y:r,middlewareData:a,placement:c})})}function S({clientX:n,clientY:t}){return{getBoundingClientRect(){return{width:0,height:0,x:n,y:t,left:n,right:n,top:t,bottom:t}}}}window.addEventListener("alpine:init",()=>{window.Alpine.plugin(C)});
