function o(e){let n=e.length,t=n%4;return e=e.replace(/-/g,"+").replace(/_/g,"/").padEnd(n+(t===0?0:4-t),"="),window.atob(e)}export{o as a};
