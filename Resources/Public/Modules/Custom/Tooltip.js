import{a as u,b as p,c as d,d as m,e as f,f as w}from"../chunk-QOHB5LS2.js";var T=5,o=document.querySelector("#tooltip"),x=document.querySelector("#tooltip-arrow"),q=document.querySelector("#tooltip-content");o.style.maxWidth=`calc(100vw - ${T*2}px)`;var s,r,g="top",E,l=0;function L(){w(r,o,{placement:g,middleware:[d(6),p(),m({padding:T}),u({element:x})]}).then(({x:e,y:t,placement:i,middlewareData:a})=>{Object.assign(o.style,{transform:`translate(${h(e)}px,${h(t)}px)`});let{x:n,y:c}=a.arrow,S={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];Object.assign(x.style,{left:n!=null?`${n}px`:"",top:c!=null?`${c}px`:"",right:"",bottom:"",[S]:"-4px"})})}function v(){s=r.getAttribute("aria-label")||r.getAttribute("title"),q.textContent=s}function y(e,t){r=e,g=t||"top",o.style.opacity="1",clearTimeout(l),l||(o.style.transition="none",l=window.setTimeout(()=>{o.style.transition=null},10)),v(),E=f(r,o,L)}function b(){o.style.opacity="0",E(),l=window.setTimeout(()=>{s="",o.style.transition="none",l=0},500)}function h(e){let t=window.devicePixelRatio||1;return Math.round(e*t)/t}function $(e){e.directive("tooltip",(t,{expression:i})=>{e.bind(t,{"@mouseenter"(){y(t,i)},"@mouseleave"(){b()},"@click"(){this.$nextTick(()=>{v()})},"@focus"(){y(t,i)},"@blur"(){b()}})}),e.directive("tooltips",(t,{expression:i})=>{e.bind(t,{"x-init"(){this.$nextTick(()=>{[...t.querySelectorAll(":where([aria-label],[title])")].forEach(n=>{n.hasAttribute("x-tooltip")||n.setAttribute("x-tooltip",i)})})}})})}window.addEventListener("alpine:init",()=>{window.Alpine.plugin($)});
