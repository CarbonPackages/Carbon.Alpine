(()=>{function f(e){e.directive("intersect",(t,{value:l,expression:i,modifiers:n},{evaluateLater:r,cleanup:c})=>{let a=r(i),s={rootMargin:g(n),threshold:p(n)},u=new IntersectionObserver(d=>{d.forEach(h=>{h.isIntersecting!==(l==="leave")&&(a(),n.includes("once")&&u.disconnect())})},s);u.observe(t),c(()=>{u.disconnect()})})}function p(e){if(e.includes("full"))return .99;if(e.includes("half"))return .5;if(!e.includes("threshold"))return 0;let t=e[e.indexOf("threshold")+1];return t==="100"?1:t==="0"?0:+`.${t}`}function v(e){let t=e.match(/^(-?[0-9]+)(px|%)?$/);return t?t[1]+(t[2]||"px"):void 0}function g(e){let t="margin",l="0px 0px 0px 0px",i=e.indexOf(t);if(i===-1)return l;let n=[];for(let r=1;r<5;r++)n.push(v(e[i+r]||""));return n=n.filter(r=>r!==void 0),n.length?n.join(" ").trim():l}var o=f;window.addEventListener("alpine:init",()=>{window.Alpine.plugin(o)});})();
