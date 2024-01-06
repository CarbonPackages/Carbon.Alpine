(()=>{var Ct=["top","right","bottom","left"];var N=Math.min,B=Math.max,Z=Math.round,tt=Math.floor,F=t=>({x:t,y:t}),ee={left:"right",right:"left",bottom:"top",top:"bottom"},ne={start:"end",end:"start"};function ft(t,e,n){return B(t,N(e,n))}function V(t,e){return typeof t=="function"?t(e):t}function W(t){return t.split("-")[0]}function X(t){return t.split("-")[1]}function ht(t){return t==="x"?"y":"x"}function at(t){return t==="y"?"height":"width"}function et(t){return["top","bottom"].includes(W(t))?"y":"x"}function ut(t){return ht(et(t))}function Tt(t,e,n){n===void 0&&(n=!1);let o=X(t),s=ut(t),r=at(s),i=s==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(i=Q(i)),[i,Q(i)]}function Et(t){let e=Q(t);return[lt(t),e,lt(e)]}function lt(t){return t.replace(/start|end/g,e=>ne[e])}function oe(t,e,n){let o=["left","right"],s=["right","left"],r=["top","bottom"],i=["bottom","top"];switch(t){case"top":case"bottom":return n?e?s:o:e?o:s;case"left":case"right":return e?r:i;default:return[]}}function St(t,e,n,o){let s=X(t),r=oe(W(t),n==="start",o);return s&&(r=r.map(i=>i+"-"+s),e&&(r=r.concat(r.map(lt)))),r}function Q(t){return t.replace(/left|right|bottom|top/g,e=>ee[e])}function ie(t){return{top:0,right:0,bottom:0,left:0,...t}}function xt(t){return typeof t!="number"?ie(t):{top:t,right:t,bottom:t,left:t}}function z(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function Pt(t,e,n){let{reference:o,floating:s}=t,r=et(e),i=ut(e),c=at(i),l=W(e),f=r==="y",g=o.x+o.width/2-s.width/2,d=o.y+o.height/2-s.height/2,p=o[c]/2-s[c]/2,a;switch(l){case"top":a={x:g,y:o.y-s.height};break;case"bottom":a={x:g,y:o.y+o.height};break;case"right":a={x:o.x+o.width,y:d};break;case"left":a={x:o.x-s.width,y:d};break;default:a={x:o.x,y:o.y}}switch(X(e)){case"start":a[i]-=p*(n&&f?-1:1);break;case"end":a[i]+=p*(n&&f?-1:1);break}return a}var Dt=async(t,e,n)=>{let{placement:o="bottom",strategy:s="absolute",middleware:r=[],platform:i}=n,c=r.filter(Boolean),l=await(i.isRTL==null?void 0:i.isRTL(e)),f=await i.getElementRects({reference:t,floating:e,strategy:s}),{x:g,y:d}=Pt(f,o,l),p=o,a={},u=0;for(let h=0;h<c.length;h++){let{name:x,fn:m}=c[h],{x:w,y,data:b,reset:v}=await m({x:g,y:d,initialPlacement:o,placement:p,strategy:s,middlewareData:a,rects:f,platform:i,elements:{reference:t,floating:e}});if(g=w??g,d=y??d,a={...a,[x]:{...a[x],...b}},v&&u<=50){u++,typeof v=="object"&&(v.placement&&(p=v.placement),v.rects&&(f=v.rects===!0?await i.getElementRects({reference:t,floating:e,strategy:s}):v.rects),{x:g,y:d}=Pt(f,p,l)),h=-1;continue}}return{x:g,y:d,placement:p,strategy:s,middlewareData:a}};async function nt(t,e){var n;e===void 0&&(e={});let{x:o,y:s,platform:r,rects:i,elements:c,strategy:l}=t,{boundary:f="clippingAncestors",rootBoundary:g="viewport",elementContext:d="floating",altBoundary:p=!1,padding:a=0}=V(e,t),u=xt(a),x=c[p?d==="floating"?"reference":"floating":d],m=z(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(x)))==null||n?x:x.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(c.floating)),boundary:f,rootBoundary:g,strategy:l})),w=d==="floating"?{...i.floating,x:o,y:s}:i.reference,y=await(r.getOffsetParent==null?void 0:r.getOffsetParent(c.floating)),b=await(r.isElement==null?void 0:r.isElement(y))?await(r.getScale==null?void 0:r.getScale(y))||{x:1,y:1}:{x:1,y:1},v=z(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({rect:w,offsetParent:y,strategy:l}):w);return{top:(m.top-v.top+u.top)/b.y,bottom:(v.bottom-m.bottom+u.bottom)/b.y,left:(m.left-v.left+u.left)/b.x,right:(v.right-m.right+u.right)/b.x}}var wt=t=>({name:"arrow",options:t,async fn(e){let{x:n,y:o,placement:s,rects:r,platform:i,elements:c,middlewareData:l}=e,{element:f,padding:g=0}=V(t,e)||{};if(f==null)return{};let d=xt(g),p={x:n,y:o},a=ut(s),u=at(a),h=await i.getDimensions(f),x=a==="y",m=x?"top":"left",w=x?"bottom":"right",y=x?"clientHeight":"clientWidth",b=r.reference[u]+r.reference[a]-p[a]-r.floating[u],v=p[a]-r.reference[a],A=await(i.getOffsetParent==null?void 0:i.getOffsetParent(f)),R=A?A[y]:0;(!R||!await(i.isElement==null?void 0:i.isElement(A)))&&(R=c.floating[y]||r.floating[u]);let k=b/2-v/2,U=R/2-h[u]/2-1,K=N(d[m],U),G=N(d[w],U),E=K,J=R-h[u]-G,C=R/2-h[u]/2+k,P=ft(E,C,J),L=!l.arrow&&X(s)!=null&&C!=P&&r.reference[u]/2-(C<E?K:G)-h[u]/2<0,$=L?C<E?C-E:C-J:0;return{[a]:p[a]+$,data:{[a]:P,centerOffset:C-P-$,...L&&{alignmentOffset:$}},reset:L}}});var yt=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;let{placement:s,middlewareData:r,rects:i,initialPlacement:c,platform:l,elements:f}=e,{mainAxis:g=!0,crossAxis:d=!0,fallbackPlacements:p,fallbackStrategy:a="bestFit",fallbackAxisSideDirection:u="none",flipAlignment:h=!0,...x}=V(t,e);if((n=r.arrow)!=null&&n.alignmentOffset)return{};let m=W(s),w=W(c)===c,y=await(l.isRTL==null?void 0:l.isRTL(f.floating)),b=p||(w||!h?[Q(c)]:Et(c));!p&&u!=="none"&&b.push(...St(c,h,u,y));let v=[c,...b],A=await nt(e,x),R=[],k=((o=r.flip)==null?void 0:o.overflows)||[];if(g&&R.push(A[m]),d){let E=Tt(s,i,y);R.push(A[E[0]],A[E[1]])}if(k=[...k,{placement:s,overflows:R}],!R.every(E=>E<=0)){var U,K;let E=(((U=r.flip)==null?void 0:U.index)||0)+1,J=v[E];if(J)return{data:{index:E,overflows:k},reset:{placement:J}};let C=(K=k.filter(P=>P.overflows[0]<=0).sort((P,L)=>P.overflows[1]-L.overflows[1])[0])==null?void 0:K.placement;if(!C)switch(a){case"bestFit":{var G;let P=(G=k.map(L=>[L.placement,L.overflows.filter($=>$>0).reduce(($,te)=>$+te,0)]).sort((L,$)=>L[1]-$[1])[0])==null?void 0:G[0];P&&(C=P);break}case"initialPlacement":C=c;break}if(s!==C)return{reset:{placement:C}}}return{}}}};function Lt(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function Mt(t){return Ct.some(e=>t[e]>=0)}var vt=function(t){return t===void 0&&(t={}),{name:"hide",options:t,async fn(e){let{rects:n}=e,{strategy:o="referenceHidden",...s}=V(t,e);switch(o){case"referenceHidden":{let r=await nt(e,{...s,elementContext:"reference"}),i=Lt(r,n.reference);return{data:{referenceHiddenOffsets:i,referenceHidden:Mt(i)}}}case"escaped":{let r=await nt(e,{...s,altBoundary:!0}),i=Lt(r,n.floating);return{data:{escapedOffsets:i,escaped:Mt(i)}}}default:return{}}}}};async function se(t,e){let{placement:n,platform:o,elements:s}=t,r=await(o.isRTL==null?void 0:o.isRTL(s.floating)),i=W(n),c=X(n),l=et(n)==="y",f=["left","top"].includes(i)?-1:1,g=r&&l?-1:1,d=V(e,t),{mainAxis:p,crossAxis:a,alignmentAxis:u}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return c&&typeof u=="number"&&(a=c==="end"?u*-1:u),l?{x:a*g,y:p*f}:{x:p*f,y:a*g}}var bt=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;let{x:s,y:r,placement:i,middlewareData:c}=e,l=await se(e,t);return i===((n=c.offset)==null?void 0:n.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:s+l.x,y:r+l.y,data:{...l,placement:i}}}}},At=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:n,y:o,placement:s}=e,{mainAxis:r=!0,crossAxis:i=!1,limiter:c={fn:x=>{let{x:m,y:w}=x;return{x:m,y:w}}},...l}=V(t,e),f={x:n,y:o},g=await nt(e,l),d=et(W(s)),p=ht(d),a=f[p],u=f[d];if(r){let x=p==="y"?"top":"left",m=p==="y"?"bottom":"right",w=a+g[x],y=a-g[m];a=ft(w,a,y)}if(i){let x=d==="y"?"top":"left",m=d==="y"?"bottom":"right",w=u+g[x],y=u-g[m];u=ft(w,u,y)}let h=c.fn({...e,[p]:a,[d]:u});return{...h,data:{x:h.x-n,y:h.y-o}}}}};function H(t){return $t(t)?(t.nodeName||"").toLowerCase():"#document"}function O(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function M(t){var e;return(e=($t(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function $t(t){return t instanceof Node||t instanceof O(t).Node}function D(t){return t instanceof Element||t instanceof O(t).Element}function S(t){return t instanceof HTMLElement||t instanceof O(t).HTMLElement}function kt(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof O(t).ShadowRoot}function _(t){let{overflow:e,overflowX:n,overflowY:o,display:s}=T(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(s)}function Bt(t){return["table","td","th"].includes(H(t))}function dt(t){let e=mt(),n=T(t);return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(o=>(n.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(n.contain||"").includes(o))}function Ft(t){let e=j(t);for(;S(e)&&!ot(e);){if(dt(e))return e;e=j(e)}return null}function mt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function ot(t){return["html","body","#document"].includes(H(t))}function T(t){return O(t).getComputedStyle(t)}function it(t){return D(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function j(t){if(H(t)==="html")return t;let e=t.assignedSlot||t.parentNode||kt(t)&&t.host||M(t);return kt(e)?e.host:e}function Ht(t){let e=j(t);return ot(e)?t.ownerDocument?t.ownerDocument.body:t.body:S(e)&&_(e)?e:Ht(e)}function Y(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);let s=Ht(t),r=s===((o=t.ownerDocument)==null?void 0:o.body),i=O(s);return r?e.concat(i,i.visualViewport||[],_(s)?s:[],i.frameElement&&n?Y(i.frameElement):[]):e.concat(s,Y(s,[],n))}function Vt(t){let e=T(t),n=parseFloat(e.width)||0,o=parseFloat(e.height)||0,s=S(t),r=s?t.offsetWidth:n,i=s?t.offsetHeight:o,c=Z(n)!==r||Z(o)!==i;return c&&(n=r,o=i),{width:n,height:o,$:c}}function Ot(t){return D(t)?t:t.contextElement}function q(t){let e=Ot(t);if(!S(e))return F(1);let n=e.getBoundingClientRect(),{width:o,height:s,$:r}=Vt(e),i=(r?Z(n.width):n.width)/o,c=(r?Z(n.height):n.height)/s;return(!i||!Number.isFinite(i))&&(i=1),(!c||!Number.isFinite(c))&&(c=1),{x:i,y:c}}var re=F(0);function zt(t){let e=O(t);return!mt()||!e.visualViewport?re:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function ce(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==O(t)?!1:e}function I(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);let s=t.getBoundingClientRect(),r=Ot(t),i=F(1);e&&(o?D(o)&&(i=q(o)):i=q(t));let c=ce(r,n,o)?zt(r):F(0),l=(s.left+c.x)/i.x,f=(s.top+c.y)/i.y,g=s.width/i.x,d=s.height/i.y;if(r){let p=O(r),a=o&&D(o)?O(o):o,u=p.frameElement;for(;u&&o&&a!==p;){let h=q(u),x=u.getBoundingClientRect(),m=T(u),w=x.left+(u.clientLeft+parseFloat(m.paddingLeft))*h.x,y=x.top+(u.clientTop+parseFloat(m.paddingTop))*h.y;l*=h.x,f*=h.y,g*=h.x,d*=h.y,l+=w,f+=y,u=O(u).frameElement}}return z({width:g,height:d,x:l,y:f})}function le(t){let{rect:e,offsetParent:n,strategy:o}=t,s=S(n),r=M(n);if(n===r)return e;let i={scrollLeft:0,scrollTop:0},c=F(1),l=F(0);if((s||!s&&o!=="fixed")&&((H(n)!=="body"||_(r))&&(i=it(n)),S(n))){let f=I(n);c=q(n),l.x=f.x+n.clientLeft,l.y=f.y+n.clientTop}return{width:e.width*c.x,height:e.height*c.y,x:e.x*c.x-i.scrollLeft*c.x+l.x,y:e.y*c.y-i.scrollTop*c.y+l.y}}function fe(t){return Array.from(t.getClientRects())}function jt(t){return I(M(t)).left+it(t).scrollLeft}function ae(t){let e=M(t),n=it(t),o=t.ownerDocument.body,s=B(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),r=B(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight),i=-n.scrollLeft+jt(t),c=-n.scrollTop;return T(o).direction==="rtl"&&(i+=B(e.clientWidth,o.clientWidth)-s),{width:s,height:r,x:i,y:c}}function ue(t,e){let n=O(t),o=M(t),s=n.visualViewport,r=o.clientWidth,i=o.clientHeight,c=0,l=0;if(s){r=s.width,i=s.height;let f=mt();(!f||f&&e==="fixed")&&(c=s.offsetLeft,l=s.offsetTop)}return{width:r,height:i,x:c,y:l}}function de(t,e){let n=I(t,!0,e==="fixed"),o=n.top+t.clientTop,s=n.left+t.clientLeft,r=S(t)?q(t):F(1),i=t.clientWidth*r.x,c=t.clientHeight*r.y,l=s*r.x,f=o*r.y;return{width:i,height:c,x:l,y:f}}function Nt(t,e,n){let o;if(e==="viewport")o=ue(t,n);else if(e==="document")o=ae(M(t));else if(D(e))o=de(e,n);else{let s=zt(t);o={...e,x:e.x-s.x,y:e.y-s.y}}return z(o)}function It(t,e){let n=j(t);return n===e||!D(n)||ot(n)?!1:T(n).position==="fixed"||It(n,e)}function me(t,e){let n=e.get(t);if(n)return n;let o=Y(t,[],!1).filter(c=>D(c)&&H(c)!=="body"),s=null,r=T(t).position==="fixed",i=r?j(t):t;for(;D(i)&&!ot(i);){let c=T(i),l=dt(i);!l&&c.position==="fixed"&&(s=null),(r?!l&&!s:!l&&c.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||_(i)&&!l&&It(t,i))?o=o.filter(g=>g!==i):s=c,i=j(i)}return e.set(t,o),o}function ge(t){let{element:e,boundary:n,rootBoundary:o,strategy:s}=t,i=[...n==="clippingAncestors"?me(e,this._c):[].concat(n),o],c=i[0],l=i.reduce((f,g)=>{let d=Nt(e,g,s);return f.top=B(d.top,f.top),f.right=N(d.right,f.right),f.bottom=N(d.bottom,f.bottom),f.left=B(d.left,f.left),f},Nt(e,c,s));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function pe(t){return Vt(t)}function he(t,e,n){let o=S(e),s=M(e),r=n==="fixed",i=I(t,!0,r,e),c={scrollLeft:0,scrollTop:0},l=F(0);if(o||!o&&!r)if((H(e)!=="body"||_(s))&&(c=it(e)),o){let f=I(e,!0,r,e);l.x=f.x+e.clientLeft,l.y=f.y+e.clientTop}else s&&(l.x=jt(s));return{x:i.left+c.scrollLeft-l.x,y:i.top+c.scrollTop-l.y,width:i.width,height:i.height}}function Wt(t,e){return!S(t)||T(t).position==="fixed"?null:e?e(t):t.offsetParent}function Xt(t,e){let n=O(t);if(!S(t))return n;let o=Wt(t,e);for(;o&&Bt(o)&&T(o).position==="static";)o=Wt(o,e);return o&&(H(o)==="html"||H(o)==="body"&&T(o).position==="static"&&!dt(o))?n:o||Ft(t)||n}var xe=async function(t){let{reference:e,floating:n,strategy:o}=t,s=this.getOffsetParent||Xt,r=this.getDimensions;return{reference:he(e,await s(n),o),floating:{x:0,y:0,...await r(n)}}};function we(t){return T(t).direction==="rtl"}var ye={convertOffsetParentRelativeRectToViewportRelativeRect:le,getDocumentElement:M,getClippingRect:ge,getOffsetParent:Xt,getElementRects:xe,getClientRects:fe,getDimensions:pe,getScale:q,isElement:D,isRTL:we};function ve(t,e){let n=null,o,s=M(t);function r(){clearTimeout(o),n&&n.disconnect(),n=null}function i(c,l){c===void 0&&(c=!1),l===void 0&&(l=1),r();let{left:f,top:g,width:d,height:p}=t.getBoundingClientRect();if(c||e(),!d||!p)return;let a=tt(g),u=tt(s.clientWidth-(f+d)),h=tt(s.clientHeight-(g+p)),x=tt(f),w={rootMargin:-a+"px "+-u+"px "+-h+"px "+-x+"px",threshold:B(0,N(1,l))||1},y=!0;function b(v){let A=v[0].intersectionRatio;if(A!==l){if(!y)return i();A?i(!1,A):o=setTimeout(()=>{i(!1,1e-7)},100)}y=!1}try{n=new IntersectionObserver(b,{...w,root:s.ownerDocument})}catch{n=new IntersectionObserver(b,w)}n.observe(t)}return i(!0),r}function Yt(t,e,n,o){o===void 0&&(o={});let{ancestorScroll:s=!0,ancestorResize:r=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:l=!1}=o,f=Ot(t),g=s||r?[...f?Y(f):[],...Y(e)]:[];g.forEach(m=>{s&&m.addEventListener("scroll",n,{passive:!0}),r&&m.addEventListener("resize",n)});let d=f&&c?ve(f,n):null,p=-1,a=null;i&&(a=new ResizeObserver(m=>{let[w]=m;w&&w.target===f&&a&&(a.unobserve(e),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{a&&a.observe(e)})),n()}),f&&!l&&a.observe(f),a.observe(e));let u,h=l?I(t):null;l&&x();function x(){let m=I(t);h&&(m.x!==h.x||m.y!==h.y||m.width!==h.width||m.height!==h.height)&&n(),h=m,u=requestAnimationFrame(x)}return n(),()=>{g.forEach(m=>{s&&m.removeEventListener("scroll",n),r&&m.removeEventListener("resize",n)}),d&&d(),a&&a.disconnect(),a=null,l&&cancelAnimationFrame(u)}}var _t=(t,e,n)=>{let o=new Map,s={platform:ye,...n},r={...s.platform,_c:o};return Dt(t,e,{...s,platform:r})};var gt="stay-on-click",pt="focus",qt="offset",Ut="id",be="fixed",Qt=5,Rt,st,Kt="top",Gt,rt=0;function Zt(t){t.directive("tooltip",(e,{expression:n,modifiers:o},{evaluate:s})=>{let r=o.includes(be)?"fixed":"absolute",i=o.includes(Ut)?o[o.indexOf(Ut)+1]:r=="fixed"?"tooltip-fixed":"tooltip",{floatingEl:c,arrowElement:l,tooltipContent:f}=Re(i);if(!c){console.warn(`Tooltip with the id '${i}' element not found`);return}if(!f){console.warn(`Target element for content of the tooltip with the id '${i}-content' element not found`);return}let g=o.includes(qt)?s(o[o.indexOf(qt)+1]):6,d=o.includes(gt),p=o.includes(pt),a=[bt(g),yt(),At({padding:Qt})];l&&a.push(wt({element:l})),a.push(vt());function u(){Rt=st.getAttribute("aria-label")||st.getAttribute("title"),f.textContent=Rt}function h(){_t(st,c,{placement:Kt,middleware:a,strategy:r}).then(({x:w,y,placement:b,middlewareData:v})=>{if(Object.assign(c.style,{transform:`translate(${Jt(w)}px,${Jt(y)}px)`}),v.hide.referenceHidden&&m(),!v.arrow||!l)return;let{x:A,y:R}=v.arrow,k={top:"bottom",right:"left",bottom:"top",left:"right"}[b.split("-")[0]];Object.assign(l.style,{left:A!=null?`${A}px`:"",top:R!=null?`${R}px`:"",right:"",bottom:"",[k]:"-4px"})})}function x(w,y){st=w,Kt=y||"top",c.style.opacity="1",clearTimeout(rt),rt||(c.style.transition="none",rt=window.setTimeout(()=>{c.style.transition=null},10)),u(),Gt=Yt(st,c,h)}function m(){c.style.opacity!="0"&&(c.style.opacity="0",Gt(),rt=window.setTimeout(()=>{Rt="",c.style.transition="none",rt=0},500))}t.bind(e,{"@mouseenter"(){x(e,n)},"@mouseleave"(){m()},"@click"(){if(!d){m();return}this.$nextTick(()=>{u()})},"@focus"(){p&&x(e,n)},"@blur"(){p&&m()}})}),t.directive("tooltips",(e,{expression:n,modifiers:o})=>{let s=o.length?`.${o.join(".")}`:"";t.bind(e,{"x-init"(){this.$nextTick(()=>{[...e.querySelectorAll(":where([aria-label],[title])")].forEach(i=>{Oe(i)||i.setAttribute("x-tooltip"+s,n)})})}})})}var ct="x-tooltip",Ae=[ct,`${ct}.${gt}`,`${ct}.${pt}`,`${ct}.${gt}.${pt}`,`${ct}.${pt}.${gt}`];function Oe(t){return Ae.some(e=>!!t.hasAttribute(e))}function Re(t="tooltip"){let e=document.querySelector(`#${t}`),n=document.querySelector(`#${t}-arrow`),o=document.querySelector(`#${t}-content`);return e&&(e.style.maxWidth=`calc(100vw - ${Qt*2}px)`),{floatingEl:e,arrowElement:n,tooltipContent:o}}function Jt(t){let e=window.devicePixelRatio||1;return Math.round(t*e)/e}window.addEventListener("alpine:init",()=>{window.Alpine.plugin(Zt)});})();
