function w(n){n.directive("mask",(e,{value:t,expression:o},{effect:s,evaluateLater:c})=>{let l=()=>o,r="";queueMicrotask(()=>{if(["function","dynamic"].includes(t)){let u=c(o);s(()=>{l=a=>{let f;return n.dontAutoEvaluateFunctions(()=>{u(d=>{f=typeof d=="function"?d(a):d},{scope:{$input:a,$money:m.bind({el:e})}})}),f},i(e,!1)})}else i(e,!1);e._x_model&&e._x_model.set(e.value)}),e.addEventListener("input",()=>i(e)),e.addEventListener("blur",()=>i(e,!1));function i(u,a=!0){let f=u.value,d=l(f);if(!d||d==="false")return!1;if(r.length-u.value.length===1)return r=u.value;let g=()=>{r=u.value=p(f,d)};a?k(u,d,()=>{g()}):g()}function p(u,a){if(u==="")return"";let f=h(a,u);return v(a,f)}}).before("model")}function k(n,e,t){let o=n.selectionStart,s=n.value;t();let c=s.slice(0,o),l=v(e,h(e,c)).length;n.setSelectionRange(l,l)}function h(n,e){let t=e,o="",s={9:/[0-9]/,a:/[a-zA-Z]/,"*":/[a-zA-Z0-9]/},c="";for(let l=0;l<n.length;l++){if(["9","a","*"].includes(n[l])){c+=n[l];continue}for(let r=0;r<t.length;r++)if(t[r]===n[l]){t=t.slice(0,r)+t.slice(r+1);break}}for(let l=0;l<c.length;l++){let r=!1;for(let i=0;i<t.length;i++)if(s[c[l]].test(t[i])){o+=t[i],t=t.slice(0,i)+t.slice(i+1),r=!0;break}if(!r)break}return o}function v(n,e){let t=Array.from(e),o="";for(let s=0;s<n.length;s++){if(!["9","a","*"].includes(n[s])){o+=n[s];continue}if(t.length===0)break;o+=t.shift()}return o}function m(n,e=".",t,o=2){if(n==="-")return"-";if(/^\D+$/.test(n))return"9";t==null&&(t=e===","?".":",");let s=(i,p)=>{let u="",a=0;for(let f=i.length-1;f>=0;f--)i[f]!==p&&(a===3?(u=i[f]+p+u,a=0):u=i[f]+u,a++);return u},c=n.startsWith("-")?"-":"",l=n.replaceAll(new RegExp(`[^0-9\\${e}]`,"g"),""),r=Array.from({length:l.split(e)[0].length}).fill("9").join("");return r=`${c}${s(r,t)}`,o>0&&n.includes(e)&&(r+=`${e}`+"9".repeat(o)),queueMicrotask(()=>{this.el.value.endsWith(e)||this.el.value[this.el.selectionStart-1]===e&&this.el.setSelectionRange(this.el.selectionStart-1,this.el.selectionStart-1)}),r}var b=w;window.addEventListener("alpine:init",()=>{window.Alpine.plugin(b)});
