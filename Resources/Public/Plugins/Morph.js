(()=>{function H(t){let u=document.createElement("template");return u.innerHTML=t,u.content.firstElementChild}function J(t){return t.nodeType===3||t.nodeType===8}var r={replace(t,u,d){let x=t.indexOf(u);if(x===-1)throw"Cant find element in children";return u.replaceWith(d),t[x]=d,t},before(t,u,d){let x=t.indexOf(u);if(x===-1)throw"Cant find element in children";return u.before(d),t.splice(x,0,d),t},append(t,u,d){let x=t[t.length-1];return d(u),t.push(u),t},remove(t,u){if(t.indexOf(u)===-1)throw"Cant find element in children";return u.remove(),t.filter(x=>x!==u)},first(t){return this.teleportTo(t[0])},next(t,u){let d=t.indexOf(u);if(d!==-1)return this.teleportTo(this.teleportBack(t[d+1]))},teleportTo(t){return t&&(t._x_teleport?t._x_teleport:t)},teleportBack(t){return t&&(t._x_teleportBack?t._x_teleportBack:t)}},Q=()=>{},U=()=>{};function B(t,u,d){let x,y,D,L,V,E,S,O,A,T;function q(e={}){let n=p=>p.getAttribute("key"),l=()=>{};V=e.updating||l,E=e.updated||l,S=e.removing||l,O=e.removed||l,A=e.adding||l,T=e.added||l,D=e.key||n,L=e.lookahead||!1}function F(e,n){if(z(e,n))return G(e,n);let l=!1;if(!g(V,e,n,()=>l=!0)){if(window.Alpine&&X(e,n,()=>l=!0),J(n)){P(e,n),E(e,n);return}l||R(e,n),E(e,n),M(Array.from(e.childNodes),Array.from(n.childNodes),p=>{e.appendChild(p)})}}function z(e,n){return e.nodeType!=n.nodeType||e.nodeName!=n.nodeName||v(e)!=v(n)}function G(e,n){if(g(S,e))return;let l=n.cloneNode(!0);g(A,l)||(r.replace([e],e,l),O(e),T(l))}function P(e,n){let l=n.nodeValue;e.nodeValue!==l&&(e.nodeValue=l)}function R(e,n){if(e._x_isShown&&!n._x_isShown||!e._x_isShown&&n._x_isShown)return;let l=Array.from(e.attributes),p=Array.from(n.attributes);for(let f=l.length-1;f>=0;f--){let a=l[f].name;n.hasAttribute(a)||e.removeAttribute(a)}for(let f=p.length-1;f>=0;f--){let a=p[f].name,i=p[f].value;e.getAttribute(a)!==i&&e.setAttribute(a,i)}}function M(e,n,l){let p={},f={},a=r.first(n),i=r.first(e);for(;a;){let c=v(a),_=v(i);if(!i)if(c&&f[c]){let o=f[c];e=r.append(e,o,l),i=o}else{if(!g(A,a)){let o=a.cloneNode(!0);e=r.append(e,o,l),T(o)}a=r.next(n,a);continue}let N=o=>o.nodeType===8&&o.textContent===" __BLOCK__ ",b=o=>o.nodeType===8&&o.textContent===" __ENDBLOCK__ ";if(N(a)&&N(i)){let o=[],k,w=0;for(;i;){let s=r.next(e,i);if(N(s))w++;else if(b(s)&&w>0)w--;else if(b(s)&&w===0){i=r.next(e,s),k=s;break}o.push(s),i=s}let m=[];for(w=0;a;){let s=r.next(n,a);if(N(s))w++;else if(b(s)&&w>0)w--;else if(b(s)&&w===0){a=r.next(n,s);break}m.push(s),a=s}M(o,m,s=>k.before(s));continue}if(i.nodeType===1&&L){let o=r.next(n,a),k=!1;for(;!k&&o;)i.isEqualNode(o)&&(k=!0,[e,i]=K(e,a,i),_=v(i)),o=r.next(n,o)}if(c!==_){if(!c&&_){f[_]=i,[e,i]=K(e,a,i),e=r.remove(e,f[_]),i=r.next(e,i),a=r.next(n,a);continue}if(c&&!_&&p[c]&&(e=r.replace(e,i,p[c]),i=p[c]),c&&_){let o=p[c];if(o)f[_]=i,e=r.replace(e,i,o),i=o;else{f[_]=i,[e,i]=K(e,a,i),e=r.remove(e,f[_]),i=r.next(e,i),a=r.next(n,a);continue}}}let W=i&&r.next(e,i);F(i,a),a=a&&r.next(n,a),i=W}let h=[];for(;i;)g(S,i)||h.push(i),i=r.next(e,i);for(;h.length;){let c=h.shift();c.remove(),O(c)}}function v(e){return e&&e.nodeType===1&&D(e)}function Z(e){let n={};return e.forEach(l=>{let p=v(l);p&&(n[p]=l)}),n}function K(e,n,l){if(!g(A,n)){let p=n.cloneNode(!0);return e=r.before(e,l,p),T(p),[e,p]}return[e,n]}return q(d),x=t,y=typeof u=="string"?H(u):u,window.Alpine&&window.Alpine.closestDataStack&&!t._x_dataStack&&(y._x_dataStack=window.Alpine.closestDataStack(t),y._x_dataStack&&window.Alpine.clone(t,y)),F(t,y),x=void 0,y=void 0,t}B.step=()=>Q();B.log=t=>{U=t};function g(t,...u){let d=!1;return t(...u,()=>d=!0),d}function X(t,u,d){t.nodeType===1&&t._x_dataStack&&window.Alpine.clone(t,u)}function Y(t){t.morph=B}var I=Y;window.addEventListener("alpine:init",()=>{window.Alpine.plugin(I)});})();