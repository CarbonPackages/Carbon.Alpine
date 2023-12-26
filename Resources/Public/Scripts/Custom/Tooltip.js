(()=>{var W=Math.min,B=Math.max,tt=Math.round,et=Math.floor,F=t=>({x:t,y:t}),Jt={left:"right",right:"left",bottom:"top",top:"bottom"},Qt={start:"end",end:"start"};function lt(t,e,n){return B(t,W(e,n))}function Y(t,e){return typeof t=="function"?t(e):t}function V(t){return t.split("-")[0]}function X(t){return t.split("-")[1]}function mt(t){return t==="x"?"y":"x"}function ft(t){return t==="y"?"height":"width"}function nt(t){return["top","bottom"].includes(V(t))?"y":"x"}function at(t){return mt(nt(t))}function At(t,e,n){n===void 0&&(n=!1);let o=X(t),i=at(t),r=ft(i),s=i==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(s=Z(s)),[s,Z(s)]}function Ot(t){let e=Z(t);return[ct(t),e,ct(e)]}function ct(t){return t.replace(/start|end/g,e=>Qt[e])}function Zt(t,e,n){let o=["left","right"],i=["right","left"],r=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return n?e?i:o:e?o:i;case"left":case"right":return e?r:s;default:return[]}}function Rt(t,e,n,o){let i=X(t),r=Zt(V(t),n==="start",o);return i&&(r=r.map(s=>s+"-"+i),e&&(r=r.concat(r.map(ct)))),r}function Z(t){return t.replace(/left|right|bottom|top/g,e=>Jt[e])}function te(t){return{top:0,right:0,bottom:0,left:0,...t}}function gt(t){return typeof t!="number"?te(t):{top:t,right:t,bottom:t,left:t}}function z(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function Ct(t,e,n){let{reference:o,floating:i}=t,r=nt(e),s=at(e),c=ft(s),l=V(e),f=r==="y",m=o.x+o.width/2-i.width/2,d=o.y+o.height/2-i.height/2,p=o[c]/2-i[c]/2,a;switch(l){case"top":a={x:m,y:o.y-i.height};break;case"bottom":a={x:m,y:o.y+o.height};break;case"right":a={x:o.x+o.width,y:d};break;case"left":a={x:o.x-i.width,y:d};break;default:a={x:o.x,y:o.y}}switch(X(e)){case"start":a[s]-=p*(n&&f?-1:1);break;case"end":a[s]+=p*(n&&f?-1:1);break}return a}var Tt=async(t,e,n)=>{let{placement:o="bottom",strategy:i="absolute",middleware:r=[],platform:s}=n,c=r.filter(Boolean),l=await(s.isRTL==null?void 0:s.isRTL(e)),f=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:m,y:d}=Ct(f,o,l),p=o,a={},u=0;for(let h=0;h<c.length;h++){let{name:x,fn:g}=c[h],{x:w,y,data:b,reset:v}=await g({x:m,y:d,initialPlacement:o,placement:p,strategy:i,middlewareData:a,rects:f,platform:s,elements:{reference:t,floating:e}});if(m=w??m,d=y??d,a={...a,[x]:{...a[x],...b}},v&&u<=50){u++,typeof v=="object"&&(v.placement&&(p=v.placement),v.rects&&(f=v.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):v.rects),{x:m,y:d}=Ct(f,p,l)),h=-1;continue}}return{x:m,y:d,placement:p,strategy:i,middlewareData:a}};async function pt(t,e){var n;e===void 0&&(e={});let{x:o,y:i,platform:r,rects:s,elements:c,strategy:l}=t,{boundary:f="clippingAncestors",rootBoundary:m="viewport",elementContext:d="floating",altBoundary:p=!1,padding:a=0}=Y(e,t),u=gt(a),x=c[p?d==="floating"?"reference":"floating":d],g=z(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(x)))==null||n?x:x.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(c.floating)),boundary:f,rootBoundary:m,strategy:l})),w=d==="floating"?{...s.floating,x:o,y:i}:s.reference,y=await(r.getOffsetParent==null?void 0:r.getOffsetParent(c.floating)),b=await(r.isElement==null?void 0:r.isElement(y))?await(r.getScale==null?void 0:r.getScale(y))||{x:1,y:1}:{x:1,y:1},v=z(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({rect:w,offsetParent:y,strategy:l}):w);return{top:(g.top-v.top+u.top)/b.y,bottom:(v.bottom-g.bottom+u.bottom)/b.y,left:(g.left-v.left+u.left)/b.x,right:(v.right-g.right+u.right)/b.x}}var ht=t=>({name:"arrow",options:t,async fn(e){let{x:n,y:o,placement:i,rects:r,platform:s,elements:c,middlewareData:l}=e,{element:f,padding:m=0}=Y(t,e)||{};if(f==null)return{};let d=gt(m),p={x:n,y:o},a=at(i),u=ft(a),h=await s.getDimensions(f),x=a==="y",g=x?"top":"left",w=x?"bottom":"right",y=x?"clientHeight":"clientWidth",b=r.reference[u]+r.reference[a]-p[a]-r.floating[u],v=p[a]-r.reference[a],T=await(s.getOffsetParent==null?void 0:s.getOffsetParent(f)),S=T?T[y]:0;(!S||!await(s.isElement==null?void 0:s.isElement(T)))&&(S=c.floating[y]||r.floating[u]);let $=b/2-v/2,K=S/2-h[u]/2-1,G=W(d[g],K),J=W(d[w],K),C=G,Q=S-h[u]-J,O=S/2-h[u]/2+$,P=lt(C,O,Q),L=!l.arrow&&X(i)!=null&&O!=P&&r.reference[u]/2-(O<C?G:J)-h[u]/2<0,k=L?O<C?O-C:O-Q:0;return{[a]:p[a]+k,data:{[a]:P,centerOffset:O-P-k,...L&&{alignmentOffset:k}},reset:L}}});var xt=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;let{placement:i,middlewareData:r,rects:s,initialPlacement:c,platform:l,elements:f}=e,{mainAxis:m=!0,crossAxis:d=!0,fallbackPlacements:p,fallbackStrategy:a="bestFit",fallbackAxisSideDirection:u="none",flipAlignment:h=!0,...x}=Y(t,e);if((n=r.arrow)!=null&&n.alignmentOffset)return{};let g=V(i),w=V(c)===c,y=await(l.isRTL==null?void 0:l.isRTL(f.floating)),b=p||(w||!h?[Z(c)]:Ot(c));!p&&u!=="none"&&b.push(...Rt(c,h,u,y));let v=[c,...b],T=await pt(e,x),S=[],$=((o=r.flip)==null?void 0:o.overflows)||[];if(m&&S.push(T[g]),d){let C=At(i,s,y);S.push(T[C[0]],T[C[1]])}if($=[...$,{placement:i,overflows:S}],!S.every(C=>C<=0)){var K,G;let C=(((K=r.flip)==null?void 0:K.index)||0)+1,Q=v[C];if(Q)return{data:{index:C,overflows:$},reset:{placement:Q}};let O=(G=$.filter(P=>P.overflows[0]<=0).sort((P,L)=>P.overflows[1]-L.overflows[1])[0])==null?void 0:G.placement;if(!O)switch(a){case"bestFit":{var J;let P=(J=$.map(L=>[L.placement,L.overflows.filter(k=>k>0).reduce((k,Gt)=>k+Gt,0)]).sort((L,k)=>L[1]-k[1])[0])==null?void 0:J[0];P&&(O=P);break}case"initialPlacement":O=c;break}if(i!==O)return{reset:{placement:O}}}return{}}}};async function ee(t,e){let{placement:n,platform:o,elements:i}=t,r=await(o.isRTL==null?void 0:o.isRTL(i.floating)),s=V(n),c=X(n),l=nt(n)==="y",f=["left","top"].includes(s)?-1:1,m=r&&l?-1:1,d=Y(e,t),{mainAxis:p,crossAxis:a,alignmentAxis:u}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return c&&typeof u=="number"&&(a=c==="end"?u*-1:u),l?{x:a*m,y:p*f}:{x:p*f,y:a*m}}var wt=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;let{x:i,y:r,placement:s,middlewareData:c}=e,l=await ee(e,t);return s===((n=c.offset)==null?void 0:n.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:i+l.x,y:r+l.y,data:{...l,placement:s}}}}},yt=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:n,y:o,placement:i}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:c={fn:x=>{let{x:g,y:w}=x;return{x:g,y:w}}},...l}=Y(t,e),f={x:n,y:o},m=await pt(e,l),d=nt(V(i)),p=mt(d),a=f[p],u=f[d];if(r){let x=p==="y"?"top":"left",g=p==="y"?"bottom":"right",w=a+m[x],y=a-m[g];a=lt(w,a,y)}if(s){let x=d==="y"?"top":"left",g=d==="y"?"bottom":"right",w=u+m[x],y=u-m[g];u=lt(w,u,y)}let h=c.fn({...e,[p]:a,[d]:u});return{...h,data:{x:h.x-n,y:h.y-o}}}}};function H(t){return St(t)?(t.nodeName||"").toLowerCase():"#document"}function A(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function D(t){var e;return(e=(St(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function St(t){return t instanceof Node||t instanceof A(t).Node}function M(t){return t instanceof Element||t instanceof A(t).Element}function E(t){return t instanceof HTMLElement||t instanceof A(t).HTMLElement}function Et(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof A(t).ShadowRoot}function q(t){let{overflow:e,overflowX:n,overflowY:o,display:i}=R(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(i)}function Pt(t){return["table","td","th"].includes(H(t))}function ut(t){let e=dt(),n=R(t);return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(o=>(n.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(n.contain||"").includes(o))}function Lt(t){let e=j(t);for(;E(e)&&!ot(e);){if(ut(e))return e;e=j(e)}return null}function dt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function ot(t){return["html","body","#document"].includes(H(t))}function R(t){return A(t).getComputedStyle(t)}function it(t){return M(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function j(t){if(H(t)==="html")return t;let e=t.assignedSlot||t.parentNode||Et(t)&&t.host||D(t);return Et(e)?e.host:e}function Dt(t){let e=j(t);return ot(e)?t.ownerDocument?t.ownerDocument.body:t.body:E(e)&&q(e)?e:Dt(e)}function _(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);let i=Dt(t),r=i===((o=t.ownerDocument)==null?void 0:o.body),s=A(i);return r?e.concat(s,s.visualViewport||[],q(i)?i:[],s.frameElement&&n?_(s.frameElement):[]):e.concat(i,_(i,[],n))}function Bt(t){let e=R(t),n=parseFloat(e.width)||0,o=parseFloat(e.height)||0,i=E(t),r=i?t.offsetWidth:n,s=i?t.offsetHeight:o,c=tt(n)!==r||tt(o)!==s;return c&&(n=r,o=s),{width:n,height:o,$:c}}function vt(t){return M(t)?t:t.contextElement}function U(t){let e=vt(t);if(!E(e))return F(1);let n=e.getBoundingClientRect(),{width:o,height:i,$:r}=Bt(e),s=(r?tt(n.width):n.width)/o,c=(r?tt(n.height):n.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!c||!Number.isFinite(c))&&(c=1),{x:s,y:c}}var ne=F(0);function Ft(t){let e=A(t);return!dt()||!e.visualViewport?ne:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function oe(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==A(t)?!1:e}function I(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);let i=t.getBoundingClientRect(),r=vt(t),s=F(1);e&&(o?M(o)&&(s=U(o)):s=U(t));let c=oe(r,n,o)?Ft(r):F(0),l=(i.left+c.x)/s.x,f=(i.top+c.y)/s.y,m=i.width/s.x,d=i.height/s.y;if(r){let p=A(r),a=o&&M(o)?A(o):o,u=p.frameElement;for(;u&&o&&a!==p;){let h=U(u),x=u.getBoundingClientRect(),g=R(u),w=x.left+(u.clientLeft+parseFloat(g.paddingLeft))*h.x,y=x.top+(u.clientTop+parseFloat(g.paddingTop))*h.y;l*=h.x,f*=h.y,m*=h.x,d*=h.y,l+=w,f+=y,u=A(u).frameElement}}return z({width:m,height:d,x:l,y:f})}function ie(t){let{rect:e,offsetParent:n,strategy:o}=t,i=E(n),r=D(n);if(n===r)return e;let s={scrollLeft:0,scrollTop:0},c=F(1),l=F(0);if((i||!i&&o!=="fixed")&&((H(n)!=="body"||q(r))&&(s=it(n)),E(n))){let f=I(n);c=U(n),l.x=f.x+n.clientLeft,l.y=f.y+n.clientTop}return{width:e.width*c.x,height:e.height*c.y,x:e.x*c.x-s.scrollLeft*c.x+l.x,y:e.y*c.y-s.scrollTop*c.y+l.y}}function se(t){return Array.from(t.getClientRects())}function Ht(t){return I(D(t)).left+it(t).scrollLeft}function re(t){let e=D(t),n=it(t),o=t.ownerDocument.body,i=B(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),r=B(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight),s=-n.scrollLeft+Ht(t),c=-n.scrollTop;return R(o).direction==="rtl"&&(s+=B(e.clientWidth,o.clientWidth)-i),{width:i,height:r,x:s,y:c}}function ce(t,e){let n=A(t),o=D(t),i=n.visualViewport,r=o.clientWidth,s=o.clientHeight,c=0,l=0;if(i){r=i.width,s=i.height;let f=dt();(!f||f&&e==="fixed")&&(c=i.offsetLeft,l=i.offsetTop)}return{width:r,height:s,x:c,y:l}}function le(t,e){let n=I(t,!0,e==="fixed"),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=E(t)?U(t):F(1),s=t.clientWidth*r.x,c=t.clientHeight*r.y,l=i*r.x,f=o*r.y;return{width:s,height:c,x:l,y:f}}function Mt(t,e,n){let o;if(e==="viewport")o=ce(t,n);else if(e==="document")o=re(D(t));else if(M(e))o=le(e,n);else{let i=Ft(t);o={...e,x:e.x-i.x,y:e.y-i.y}}return z(o)}function Nt(t,e){let n=j(t);return n===e||!M(n)||ot(n)?!1:R(n).position==="fixed"||Nt(n,e)}function fe(t,e){let n=e.get(t);if(n)return n;let o=_(t,[],!1).filter(c=>M(c)&&H(c)!=="body"),i=null,r=R(t).position==="fixed",s=r?j(t):t;for(;M(s)&&!ot(s);){let c=R(s),l=ut(s);!l&&c.position==="fixed"&&(i=null),(r?!l&&!i:!l&&c.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||q(s)&&!l&&Nt(t,s))?o=o.filter(m=>m!==s):i=c,s=j(s)}return e.set(t,o),o}function ae(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t,s=[...n==="clippingAncestors"?fe(e,this._c):[].concat(n),o],c=s[0],l=s.reduce((f,m)=>{let d=Mt(e,m,i);return f.top=B(d.top,f.top),f.right=W(d.right,f.right),f.bottom=W(d.bottom,f.bottom),f.left=B(d.left,f.left),f},Mt(e,c,i));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function ue(t){return Bt(t)}function de(t,e,n){let o=E(e),i=D(e),r=n==="fixed",s=I(t,!0,r,e),c={scrollLeft:0,scrollTop:0},l=F(0);if(o||!o&&!r)if((H(e)!=="body"||q(i))&&(c=it(e)),o){let f=I(e,!0,r,e);l.x=f.x+e.clientLeft,l.y=f.y+e.clientTop}else i&&(l.x=Ht(i));return{x:s.left+c.scrollLeft-l.x,y:s.top+c.scrollTop-l.y,width:s.width,height:s.height}}function kt(t,e){return!E(t)||R(t).position==="fixed"?null:e?e(t):t.offsetParent}function Wt(t,e){let n=A(t);if(!E(t))return n;let o=kt(t,e);for(;o&&Pt(o)&&R(o).position==="static";)o=kt(o,e);return o&&(H(o)==="html"||H(o)==="body"&&R(o).position==="static"&&!ut(o))?n:o||Lt(t)||n}var me=async function(t){let{reference:e,floating:n,strategy:o}=t,i=this.getOffsetParent||Wt,r=this.getDimensions;return{reference:de(e,await i(n),o),floating:{x:0,y:0,...await r(n)}}};function ge(t){return R(t).direction==="rtl"}var pe={convertOffsetParentRelativeRectToViewportRelativeRect:ie,getDocumentElement:D,getClippingRect:ae,getOffsetParent:Wt,getElementRects:me,getClientRects:se,getDimensions:ue,getScale:U,isElement:M,isRTL:ge};function he(t,e){let n=null,o,i=D(t);function r(){clearTimeout(o),n&&n.disconnect(),n=null}function s(c,l){c===void 0&&(c=!1),l===void 0&&(l=1),r();let{left:f,top:m,width:d,height:p}=t.getBoundingClientRect();if(c||e(),!d||!p)return;let a=et(m),u=et(i.clientWidth-(f+d)),h=et(i.clientHeight-(m+p)),x=et(f),w={rootMargin:-a+"px "+-u+"px "+-h+"px "+-x+"px",threshold:B(0,W(1,l))||1},y=!0;function b(v){let T=v[0].intersectionRatio;if(T!==l){if(!y)return s();T?s(!1,T):o=setTimeout(()=>{s(!1,1e-7)},100)}y=!1}try{n=new IntersectionObserver(b,{...w,root:i.ownerDocument})}catch{n=new IntersectionObserver(b,w)}n.observe(t)}return s(!0),r}function Vt(t,e,n,o){o===void 0&&(o={});let{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:l=!1}=o,f=vt(t),m=i||r?[...f?_(f):[],..._(e)]:[];m.forEach(g=>{i&&g.addEventListener("scroll",n,{passive:!0}),r&&g.addEventListener("resize",n)});let d=f&&c?he(f,n):null,p=-1,a=null;s&&(a=new ResizeObserver(g=>{let[w]=g;w&&w.target===f&&a&&(a.unobserve(e),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{a&&a.observe(e)})),n()}),f&&!l&&a.observe(f),a.observe(e));let u,h=l?I(t):null;l&&x();function x(){let g=I(t);h&&(g.x!==h.x||g.y!==h.y||g.width!==h.width||g.height!==h.height)&&n(),h=g,u=requestAnimationFrame(x)}return n(),()=>{m.forEach(g=>{i&&g.removeEventListener("scroll",n),r&&g.removeEventListener("resize",n)}),d&&d(),a&&a.disconnect(),a=null,l&&cancelAnimationFrame(u)}}var $t=(t,e,n)=>{let o=new Map,i={platform:pe,...n},r={...i.platform,_c:o};return Tt(t,e,{...i,platform:r})};var Xt=5,N=document.querySelector("#tooltip"),zt=document.querySelector("#tooltip-arrow"),xe=document.querySelector("#tooltip-content");N.style.maxWidth=`calc(100vw - ${Xt*2}px)`;var bt,rt,_t="top",qt,st=0;function we(){$t(rt,N,{placement:_t,middleware:[wt(6),xt(),yt({padding:Xt}),ht({element:zt})]}).then(({x:t,y:e,placement:n,middlewareData:o})=>{Object.assign(N.style,{transform:`translate(${Yt(t)}px,${Yt(e)}px)`});let{x:i,y:r}=o.arrow,s={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];Object.assign(zt.style,{left:i!=null?`${i}px`:"",top:r!=null?`${r}px`:"",right:"",bottom:"",[s]:"-4px"})})}function Ut(){bt=rt.getAttribute("aria-label")||rt.getAttribute("title"),xe.textContent=bt}function jt(t,e){rt=t,_t=e||"top",N.style.opacity="1",clearTimeout(st),st||(N.style.transition="none",st=window.setTimeout(()=>{N.style.transition=null},10)),Ut(),qt=Vt(rt,N,we)}function It(){N.style.opacity="0",qt(),st=window.setTimeout(()=>{bt="",N.style.transition="none",st=0},500)}function Yt(t){let e=window.devicePixelRatio||1;return Math.round(t*e)/e}function Kt(t){t.directive("tooltip",(e,{expression:n})=>{t.bind(e,{"@mouseenter"(){jt(e,n)},"@mouseleave"(){It()},"@click"(){this.$nextTick(()=>{Ut()})},"@focus"(){jt(e,n)},"@blur"(){It()}})}),t.directive("tooltips",(e,{expression:n})=>{t.bind(e,{"x-init"(){this.$nextTick(()=>{[...e.querySelectorAll(":where([aria-label],[title])")].forEach(i=>{i.hasAttribute("x-tooltip")||i.setAttribute("x-tooltip",n)})})}})})}window.addEventListener("alpine:init",()=>{window.Alpine.plugin(Kt)});})();
