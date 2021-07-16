var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function r(){return Object.create(null)}function o(t){t.forEach(n)}function l(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e,n,r){if(t){const o=i(t,e,n,r);return t[0](o)}}function i(t,n,r,o){return t[1]&&o?e(r.ctx.slice(),t[1](o(n))):r.ctx}function a(t,e,n,r,o,l,s){const c=function(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}(e,r,o,l);if(c){const o=i(e,n,r,s);t.p(o,c)}}const u="undefined"!=typeof window;let d=u?()=>window.performance.now():()=>Date.now(),f=u?t=>requestAnimationFrame(t):t;const m=new Set;function p(t){m.forEach((e=>{e.c(t)||(m.delete(e),e.f())})),0!==m.size&&f(p)}let g,$=!1;function h(t,e,n,r){for(;t<e;){const o=t+(e-t>>1);n(o)<=r?t=o+1:e=o}return t}function b(t,e){$?(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;const e=t.childNodes,n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let o=0;for(let t=0;t<e.length;t++){const l=h(1,o+1,(t=>e[n[t]].claim_order),e[t].claim_order)-1;r[t]=n[l]+1;const s=l+1;n[s]=t,o=Math.max(s,o)}const l=[],s=[];let c=e.length-1;for(let t=n[o]+1;0!=t;t=r[t-1]){for(l.push(e[t-1]);c>=t;c--)s.push(e[c]);c--}for(;c>=0;c--)s.push(e[c]);l.reverse(),s.sort(((t,e)=>t.claim_order-e.claim_order));for(let e=0,n=0;e<s.length;e++){for(;n<l.length&&s[e].claim_order>=l[n].claim_order;)n++;const r=n<l.length?l[n]:null;t.insertBefore(s[e],r)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild),e!==t.actual_end_child?t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling):e.parentNode!==t&&t.appendChild(e)}function y(t,e,n){$&&!n?b(t,e):(e.parentNode!==t||n&&e.nextSibling!==n)&&t.insertBefore(e,n||null)}function x(t){t.parentNode.removeChild(t)}function v(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function w(t){return document.createElement(t)}function k(t){return document.createTextNode(t)}function C(){return k(" ")}function S(){return k("")}function _(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function A(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function D(t){g=t}function T(){if(!g)throw new Error("Function called outside component initialization");return g}const I=[],L=[],E=[],j=[],O=Promise.resolve();let P=!1;function N(t){E.push(t)}let M=!1;const z=new Set;function B(){if(!M){M=!0;do{for(let t=0;t<I.length;t+=1){const e=I[t];D(e),J(e.$$)}for(D(null),I.length=0;L.length;)L.pop()();for(let t=0;t<E.length;t+=1){const e=E[t];z.has(e)||(z.add(e),e())}E.length=0}while(I.length);for(;j.length;)j.pop()();P=!1,M=!1,z.clear()}}function J(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}const H=new Set;let K;function R(){K={r:0,c:[],p:K}}function U(){K.r||o(K.c),K=K.p}function q(t,e){t&&t.i&&(H.delete(t),t.i(e))}function W(t,e,n,r){if(t&&t.o){if(H.has(t))return;H.add(t),K.c.push((()=>{H.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function F(t,e){const n=e.token={};function r(t,r,o,l){if(e.token!==n)return;e.resolved=l;let s=e.ctx;void 0!==o&&(s=s.slice(),s[o]=l);const c=t&&(e.current=t)(s);let i=!1;e.block&&(e.blocks?e.blocks.forEach(((t,n)=>{n!==r&&t&&(R(),W(t,1,1,(()=>{e.blocks[n]===t&&(e.blocks[n]=null)})),U())})):e.block.d(1),c.c(),q(c,1),c.m(e.mount(),e.anchor),i=!0),e.block=c,e.blocks&&(e.blocks[r]=c),i&&B()}if((o=t)&&"object"==typeof o&&"function"==typeof o.then){const n=T();if(t.then((t=>{D(n),r(e.then,1,e.value,t),D(null)}),(t=>{if(D(n),r(e.catch,2,e.error,t),D(null),!e.hasCatch)throw t})),e.current!==e.pending)return r(e.pending,0),!0}else{if(e.current!==e.then)return r(e.then,1,e.value,t),!0;e.resolved=t}var o}function Y(t){t&&t.c()}function X(t,e,r,s){const{fragment:c,on_mount:i,on_destroy:a,after_update:u}=t.$$;c&&c.m(e,r),s||N((()=>{const e=i.map(n).filter(l);a?a.push(...e):o(e),t.$$.on_mount=[]})),u.forEach(N)}function G(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Q(t,e){-1===t.$$.dirty[0]&&(I.push(t),P||(P=!0,O.then(B)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function V(e,n,l,s,c,i,a=[-1]){const u=g;D(e);const d=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:c,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:n.context||[]),callbacks:r(),dirty:a,skip_bound:!1};let f=!1;if(d.ctx=l?l(e,n.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return d.ctx&&c(d.ctx[t],d.ctx[t]=o)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](o),f&&Q(e,t)),n})):[],d.update(),f=!0,o(d.before_update),d.fragment=!!s&&s(d.ctx),n.target){if(n.hydrate){$=!0;const t=function(t){return Array.from(t.childNodes)}(n.target);d.fragment&&d.fragment.l(t),t.forEach(x)}else d.fragment&&d.fragment.c();n.intro&&q(e.$$.fragment),X(e,n.target,n.anchor,n.customElement),$=!1,B()}D(u)}class Z{$destroy(){G(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function tt(t){let e,n;const r=t[2].default,o=c(r,t,t[1],null);return{c(){e=w("a"),o&&o.c(),_(e,"class","mb-2 font-light underline text-primary-800 text-md sm:hover:text-primary-600 dark:text-primary-300 sm:dark:hover:text-primary-400"),_(e,"href",t[0])},m(t,r){y(t,e,r),o&&o.m(e,null),n=!0},p(t,[l]){o&&o.p&&(!n||2&l)&&a(o,r,t,t[1],n?l:-1,null,null),(!n||1&l)&&_(e,"href",t[0])},i(t){n||(q(o,t),n=!0)},o(t){W(o,t),n=!1},d(t){t&&x(e),o&&o.d(t)}}}function et(t,e,n){let{$$slots:r={},$$scope:o}=e,{url:l}=e;return t.$$set=t=>{"url"in t&&n(0,l=t.url),"$$scope"in t&&n(1,o=t.$$scope)},[l,o,r]}class nt extends Z{constructor(t){super(),V(this,t,et,tt,s,{url:0})}}function rt(t,e,n){const r=t.slice();return r[6]=e[n],r}function ot(t){let e,n;return{c(){e=w("div"),n=k(t[0]),_(e,"class","mb-1 text-2xl font-medium")},m(t,r){y(t,e,r),b(e,n)},p(t,e){1&e&&A(n,t[0])},d(t){t&&x(e)}}}function lt(t){let e,n,r;return n=new nt({props:{url:t[2],$$slots:{default:[ct]},$$scope:{ctx:t}}}),{c(){e=w("div"),Y(n.$$.fragment),_(e,"class","mb-1")},m(t,o){y(t,e,o),X(n,e,null),r=!0},p(t,e){const r={};4&e&&(r.url=t[2]),36&e&&(r.$$scope={dirty:e,ctx:t}),n.$set(r)},i(t){r||(q(n.$$.fragment,t),r=!0)},o(t){W(n.$$.fragment,t),r=!1},d(t){t&&x(e),G(n)}}}function st(e){let n,r;return{c(){n=w("div"),r=k(e[1]),_(n,"class","mb-1 font-light text-neutral-600 text-md dark:text-neutral-400")},m(t,e){y(t,n,e),b(n,r)},p(t,e){2&e&&A(r,t[1])},i:t,o:t,d(t){t&&x(n)}}}function ct(t){let e;return{c(){e=k(t[2])},m(t,n){y(t,e,n)},p(t,n){4&n&&A(e,t[2])},d(t){t&&x(e)}}}function it(t){let e,n=t[3],r=[];for(let e=0;e<n.length;e+=1)r[e]=at(rt(t,n,e));return{c(){e=w("div");for(let t=0;t<r.length;t+=1)r[t].c();_(e,"class","px-6 pt-4 pb-2 align-bottom")},m(t,n){y(t,e,n);for(let t=0;t<r.length;t+=1)r[t].m(e,null)},p(t,o){if(8&o){let l;for(n=t[3],l=0;l<n.length;l+=1){const s=rt(t,n,l);r[l]?r[l].p(s,o):(r[l]=at(s),r[l].c(),r[l].m(e,null))}for(;l<r.length;l+=1)r[l].d(1);r.length=n.length}},d(t){t&&x(e),v(r,t)}}}function at(t){let e,n,r,o=t[6]+"";return{c(){e=w("span"),n=k(o),r=C(),_(e,"class","inline-block px-4 py-1 mb-2 mr-2 text-sm font-semibold rounded-full bg-primary-300 dark:bg-primary-700")},m(t,o){y(t,e,o),b(e,n),b(e,r)},p(t,e){8&e&&o!==(o=t[6]+"")&&A(n,o)},d(t){t&&x(e)}}}function ut(t){let e,n,r,o,l,s,i,u,d,f,m=t[0]&&ot(t);const p=[st,lt],g=[];function $(t,e){return t[1]?0:t[2]?1:-1}~(o=$(t))&&(l=g[o]=p[o](t));const h=t[4].default,v=c(h,t,t[5],null);let k=t[3]&&it(t);return{c(){e=w("div"),n=w("div"),m&&m.c(),r=C(),l&&l.c(),s=C(),i=w("div"),v&&v.c(),u=C(),d=w("div"),k&&k.c(),_(n,"class","px-6 py-4 break-words"),_(e,"class","flex flex-col justify-between overflow-hidden shadow-xl bg-neutral-50 dark:bg-neutral-800 rounded-xl")},m(t,l){y(t,e,l),b(e,n),m&&m.m(n,null),b(n,r),~o&&g[o].m(n,null),b(n,s),b(n,i),v&&v.m(i,null),b(e,u),b(e,d),k&&k.m(d,null),f=!0},p(t,[e]){t[0]?m?m.p(t,e):(m=ot(t),m.c(),m.m(n,r)):m&&(m.d(1),m=null);let c=o;o=$(t),o===c?~o&&g[o].p(t,e):(l&&(R(),W(g[c],1,1,(()=>{g[c]=null})),U()),~o?(l=g[o],l?l.p(t,e):(l=g[o]=p[o](t),l.c()),q(l,1),l.m(n,s)):l=null),v&&v.p&&(!f||32&e)&&a(v,h,t,t[5],f?e:-1,null,null),t[3]?k?k.p(t,e):(k=it(t),k.c(),k.m(d,null)):k&&(k.d(1),k=null)},i(t){f||(q(l),q(v,t),f=!0)},o(t){W(l),W(v,t),f=!1},d(t){t&&x(e),m&&m.d(),~o&&g[o].d(),v&&v.d(t),k&&k.d()}}}function dt(t,e,n){let{$$slots:r={},$$scope:o}=e,{title:l}=e,{subtitle:s}=e,{url:c}=e,{tags:i}=e;return t.$$set=t=>{"title"in t&&n(0,l=t.title),"subtitle"in t&&n(1,s=t.subtitle),"url"in t&&n(2,c=t.url),"tags"in t&&n(3,i=t.tags),"$$scope"in t&&n(5,o=t.$$scope)},[l,s,c,i,r,o]}class ft extends Z{constructor(t){super(),V(this,t,dt,ut,s,{title:0,subtitle:1,url:2,tags:3})}}function mt(t,e,n){const r=t.slice();return r[1]=e[n],r}function pt(e){let n,r,o,l=e[1]+"";return{c(){n=w("div"),r=k(l),o=C(),_(n,"class","text-2xl font-medium text-center")},m(t,e){y(t,n,e),b(n,r),y(t,o,e)},p:t,d(t){t&&x(n),t&&x(o)}}}function gt(t){let e,n;return e=new ft({props:{$$slots:{default:[pt]},$$scope:{ctx:t}}}),{c(){Y(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},p(t,n){const r={};16&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}function $t(t){let e,n,r=t[0],o=[];for(let e=0;e<r.length;e+=1)o[e]=gt(mt(t,r,e));const l=t=>W(o[t],1,1,(()=>{o[t]=null}));return{c(){e=w("div");for(let t=0;t<o.length;t+=1)o[t].c();_(e,"class","container grid grid-cols-1 gap-4 mx-auto md:grid-cols-3 sm:grid-cols-2")},m(t,r){y(t,e,r);for(let t=0;t<o.length;t+=1)o[t].m(e,null);n=!0},p(t,[n]){if(1&n){let s;for(r=t[0],s=0;s<r.length;s+=1){const l=mt(t,r,s);o[s]?(o[s].p(l,n),q(o[s],1)):(o[s]=gt(l),o[s].c(),q(o[s],1),o[s].m(e,null))}for(R(),s=r.length;s<o.length;s+=1)l(s);U()}},i(t){if(!n){for(let t=0;t<r.length;t+=1)q(o[t]);n=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)W(o[t]);n=!1},d(t){t&&x(e),v(o,t)}}}function ht(t){return[["Python","Scikit-Learn","Tensorflow","Keras","NixOS","Bash","Awk","TypeScript","Javascript","Angular","Vue","Svelte","HTML","CSS","Java","Kotlin","SQL","Scheme"]]}class bt extends Z{constructor(t){super(),V(this,t,ht,$t,s,{})}}function yt(t,e,n){const r=t.slice();return r[5]=e[n],r}function xt(t,e,n){const r=t.slice();return r[8]=e[n],r}function vt(e){let n,r,o=e[8]+"";return{c(){n=w("li"),r=k(o)},m(t,e){y(t,n,e),b(n,r)},p:t,d(t){t&&x(n)}}}function wt(e){let n,r,o,l=e[5].description&&function(e){let n,r,o=(e[5].description??"")+"";return{c(){n=w("div"),r=k(o),_(n,"class","mb-1")},m(t,e){y(t,n,e),b(n,r)},p:t,d(t){t&&x(n)}}}(e),s=e[5].tasks,c=[];for(let t=0;t<s.length;t+=1)c[t]=vt(xt(e,s,t));return{c(){l&&l.c(),n=C(),r=w("ul");for(let t=0;t<c.length;t+=1)c[t].c();o=C(),_(r,"class","m-2 list-disc")},m(t,e){l&&l.m(t,e),y(t,n,e),y(t,r,e);for(let t=0;t<c.length;t+=1)c[t].m(r,null);y(t,o,e)},p(t,e){if(t[5].description&&l.p(t,e),2&e){let n;for(s=t[5].tasks,n=0;n<s.length;n+=1){const o=xt(t,s,n);c[n]?c[n].p(o,e):(c[n]=vt(o),c[n].c(),c[n].m(r,null))}for(;n<c.length;n+=1)c[n].d(1);c.length=s.length}},d(t){l&&l.d(t),t&&x(n),t&&x(r),v(c,t),t&&x(o)}}}function kt(t){let e,n;return e=new ft({props:{title:t[5].employer,subtitle:`${t[5].title}, ${t[0](t[5].startDate,t[5].endDate)}`,tags:t[5].tags,$$slots:{default:[wt]},$$scope:{ctx:t}}}),{c(){Y(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},p(t,n){const r={};2048&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}function Ct(t){let e,n,r=t[1],o=[];for(let e=0;e<r.length;e+=1)o[e]=kt(yt(t,r,e));const l=t=>W(o[t],1,1,(()=>{o[t]=null}));return{c(){e=w("div");for(let t=0;t<o.length;t+=1)o[t].c();_(e,"class","container grid max-w-screen-xl gap-4 mx-auto md:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-4")},m(t,r){y(t,e,r);for(let t=0;t<o.length;t+=1)o[t].m(e,null);n=!0},p(t,[n]){if(3&n){let s;for(r=t[1],s=0;s<r.length;s+=1){const l=yt(t,r,s);o[s]?(o[s].p(l,n),q(o[s],1)):(o[s]=kt(l),o[s].c(),q(o[s],1),o[s].m(e,null))}for(R(),s=r.length;s<o.length;s+=1)l(s);U()}},i(t){if(!n){for(let t=0;t<r.length;t+=1)q(o[t]);n=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)W(o[t]);n=!1},d(t){t&&x(e),v(o,t)}}}function St(t){const e=["January","February","March","April","May","June","July","August","September","October","November","December"],n=new Date;function r(t){return`${e[t.getMonth()]} ${t.getFullYear()}`}return[function(t,e){var n;return`${r(t)} - ${null!==(n=r(e))&&void 0!==n?n:"Present"}`},[{employer:"CWRU Department of Computer and Data Sciences",title:"Teaching Assistant",startDate:new Date(2020,8),endDate:new Date(n.getFullYear(),n.getMonth()),description:"Classes: CSDS 391: Introduction to Artificial Intelligence, CSDS 343: Theoretical Computer Science",tasks:["Designed and graded course assignments and exams","Taught supplementary lectures to reinforce course material","Hosted weekly office hours to answer questions and provide feedback on theoretical written work and programming assignments"],tags:["Machine Learning","Reinforcement Learning","Bayesian Networks","Theory of Computation"]},{employer:"Johns Hopkins University Applied Physics Laboratory",title:"Machine Learning & Software Engineering Intern",startDate:new Date(2020,3),endDate:new Date(2020,7),tasks:["Designed random forest, Bayesian network, and deep learning models for viral and bacterial threat classification using Scikit-Learn, Tensorflow, and Keras","Implemented a data processing pipeline using dna2vec to perform feature extraction and dimensionality reduction from sequenced DNA","Contributed to a large scale Angular application to provide an online learing approach to automated document tagging and classification"],tags:["Python","Machine Learning","Tensorflow","dna2vec"]},{employer:"Johns Hopkins University Applied Physics Laboratory",title:"Software Engineering Intern",startDate:new Date(2019,4),endDate:new Date(2020,7),tasks:["Worked in a Kanban development environment to quickly and effectively produce thoroughly documented, tested software for contract sponsors","Contributed to an Android application written in Java and Kotlin to implement an attachment cache mechanism, reducing form upload time by as much as 75%","Developed a web application with spring boot backend, Angular frontend, and Selenium unit tests, utilizing an internally designed UI library to deliver Elasticsearch social media analytics"],tags:["Java","Kotlin","Angular","Typescript","Selenium"]},{employer:"Agriplex Genomics",title:"Software Engineering Intern",startDate:new Date(2018,8),endDate:new Date(2019,4),tasks:["Developed a job scheduling application from scratch in Angular and designed an algorithm to optimize job scheduling to increase data throughput.","Designed a Postgres database model to store jobs and their associated data, and built a corresponding REST API to allow application interaction.","Created an Amazon AWS management server to create and destroy EC2 instances to efficiently allocate funds and expedite job processing."],tags:["Angular","Typescript","Postgres","AWS"]}]]}class _t extends Z{constructor(t){super(),V(this,t,St,Ct,s,{})}}function At(t){let e,n,r,o,l,s,i;const u=t[4].default,d=c(u,t,t[3],null);return{c(){e=w("div"),n=w("div"),r=k(t[1]),o=C(),l=w("div"),d&&d.c(),_(n,"class","pt-4 pb-2 text-4xl text-center"),_(l,"class","p-4"),_(e,"id",t[0]),_(e,"class",s="min-w-full min-h-screen "+t[2])},m(t,s){y(t,e,s),b(e,n),b(n,r),b(e,o),b(e,l),d&&d.m(l,null),i=!0},p(t,[n]){(!i||2&n)&&A(r,t[1]),d&&d.p&&(!i||8&n)&&a(d,u,t,t[3],i?n:-1,null,null),(!i||1&n)&&_(e,"id",t[0]),(!i||4&n&&s!==(s="min-w-full min-h-screen "+t[2]))&&_(e,"class",s)},i(t){i||(q(d,t),i=!0)},o(t){W(d,t),i=!1},d(t){t&&x(e),d&&d.d(t)}}}function Dt(t,e,n){let{$$slots:r={},$$scope:o}=e,{id:l}=e,{title:s}=e,{backgroundClass:c}=e;return t.$$set=t=>{"id"in t&&n(0,l=t.id),"title"in t&&n(1,s=t.title),"backgroundClass"in t&&n(2,c=t.backgroundClass),"$$scope"in t&&n(3,o=t.$$scope)},[l,s,c,o,r]}class Tt extends Z{constructor(t){super(),V(this,t,Dt,At,s,{id:0,title:1,backgroundClass:2})}}function It(t){let e,n;const r=t[1].default,o=c(r,t,t[0],null);return{c(){e=w("div"),o&&o.c(),_(e,"class","container mx-auto text-lg font-light leading-relaxed md:max-w-prose")},m(t,r){y(t,e,r),o&&o.m(e,null),n=!0},p(t,[e]){o&&o.p&&(!n||1&e)&&a(o,r,t,t[0],n?e:-1,null,null)},i(t){n||(q(o,t),n=!0)},o(t){W(o,t),n=!1},d(t){t&&x(e),o&&o.d(t)}}}function Lt(t,e,n){let{$$slots:r={},$$scope:o}=e;return t.$$set=t=>{"$$scope"in t&&n(0,o=t.$$scope)},[o,r]}class Et extends Z{constructor(t){super(),V(this,t,Lt,It,s,{})}}function jt(t){let e;return{c(){e=k("CWRU Department of Computer and Data Sciences")},m(t,n){y(t,e,n)},d(t){t&&x(e)}}}function Ot(t){let e;return{c(){e=k("Johns Hopkins University Applied Physics Laboratory\n        ")},m(t,n){y(t,e,n)},d(t){t&&x(e)}}}function Pt(t){let e,n,r,o,l,s,c,i,a,u,d,f,m,p,g,$,h,v,S,_;return d=new nt({props:{url:"https://engineering.case.edu/computer-and-data-sciences/academics/computer-science/bachelor-science",$$slots:{default:[jt]},$$scope:{ctx:t}}}),v=new nt({props:{url:"https://www.jhuapl.edu/",$$slots:{default:[Ot]},$$scope:{ctx:t}}}),{c(){e=w("p"),e.textContent="Hey, I'm Kennan!",n=C(),r=w("br"),o=C(),l=w("p"),l.textContent="I recently graduated with honors in Computer Science from Case Western\n        Reserve University, where I'm continuing my studies as a graduate\n        student.​ I started programming on calculators with TI-BASIC back in\n        high school, and I've been addicted ever since. Outside of my studies,\n        I'm an avid cyclist, musician, linux enthusiast, and speedcuber.",s=C(),c=w("br"),i=C(),a=w("p"),u=k("I work on graduate research in the "),Y(d.$$.fragment),f=k("\n        under Dr. Soumya Ray. My work investigates knowledge propogation through\n        networks in multi-agent learning systems, and aims to develop dynamic optimization\n        methods to improve overall network performance."),m=C(),p=w("br"),g=C(),$=w("p"),h=k("After graduation, I'm transitioning to full time work on Software\n        Engineering and Data Science at the\n        "),Y(v.$$.fragment),S=k(", where I do work on machine learning research for DNA threat\n        classification and full stack software engineering with Angular and\n        Spring.")},m(t,x){y(t,e,x),y(t,n,x),y(t,r,x),y(t,o,x),y(t,l,x),y(t,s,x),y(t,c,x),y(t,i,x),y(t,a,x),b(a,u),X(d,a,null),b(a,f),y(t,m,x),y(t,p,x),y(t,g,x),y(t,$,x),b($,h),X(v,$,null),b($,S),_=!0},p(t,e){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),d.$set(n);const r={};1&e&&(r.$$scope={dirty:e,ctx:t}),v.$set(r)},i(t){_||(q(d.$$.fragment,t),q(v.$$.fragment,t),_=!0)},o(t){W(d.$$.fragment,t),W(v.$$.fragment,t),_=!1},d(t){t&&x(e),t&&x(n),t&&x(r),t&&x(o),t&&x(l),t&&x(s),t&&x(c),t&&x(i),t&&x(a),G(d),t&&x(m),t&&x(p),t&&x(g),t&&x($),G(v)}}}function Nt(t){let e,n;return e=new Et({props:{$$slots:{default:[Pt]},$$scope:{ctx:t}}}),{c(){Y(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},p(t,[n]){const r={};1&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}class Mt extends Z{constructor(t){super(),V(this,t,null,Nt,s,{})}}var zt={$:t=>"string"==typeof t?document.querySelector(t):t,extend:(...t)=>Object.assign(...t),cumulativeOffset(t){let e=0,n=0;do{e+=t.offsetTop||0,n+=t.offsetLeft||0,t=t.offsetParent}while(t);return{top:e,left:n}},directScroll:t=>t&&t!==document&&t!==document.body,scrollTop(t,e){let n=void 0!==e;return this.directScroll(t)?n?t.scrollTop=e:t.scrollTop:n?document.documentElement.scrollTop=document.body.scrollTop=e:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},scrollLeft(t,e){let n=void 0!==e;return this.directScroll(t)?n?t.scrollLeft=e:t.scrollLeft:n?document.documentElement.scrollLeft=document.body.scrollLeft=e:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0}};const Bt={container:"body",duration:500,delay:0,offset:0,easing:function(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1},onStart:t,onDone:t,onAborting:t,scrollX:!1,scrollY:!0},Jt=t=>{let{offset:e,duration:n,delay:r,easing:o,x:l=0,y:s=0,scrollX:c,scrollY:i,onStart:a,onDone:u,container:g,onAborting:$,element:h}=t;"function"==typeof e&&(e=e());var b=zt.cumulativeOffset(g),y=h?zt.cumulativeOffset(h):{top:s,left:l},x=zt.scrollLeft(g),v=zt.scrollTop(g),w=y.left-b.left+e,k=y.top-b.top+e,C=w-x,S=k-v;let _=!0,A=!1,D=d()+r,T=D+n;function I(t){t||(A=!0,a(h,{x:l,y:s}))}function L(t){!function(t,e,n){c&&zt.scrollLeft(t,n),i&&zt.scrollTop(t,e)}(g,v+S*t,x+C*t)}function E(){_=!1}return function(t){let e;0===m.size&&f(p),new Promise((n=>{m.add(e={c:t,f:n})}))}((t=>{if(!A&&t>=D&&I(!1),A&&t>=T&&(L(1),E(),u(h,{x:l,y:s})),!_)return $(h,{x:l,y:s}),!1;if(A){L(0+1*o((t-D)/n))}return!0})),I(r),L(0),E},Ht=(Kt=t=>Jt((t=>{let e=zt.extend({},Bt,t);return e.container=zt.$(e.container),e.element=zt.$(e.element),e})(t)),(t,e)=>{let n=e;const r=t=>{t.preventDefault(),Kt("string"==typeof n?{element:n}:n)};return t.addEventListener("click",r),t.addEventListener("touchstart",r),{update(t){n=t},destroy(){t.removeEventListener("click",r),t.removeEventListener("touchstart",r)}}});var Kt;function Rt(t){let e,n,r;return{c(){e=w("a"),n=w("i"),_(n,"class",r=t[4]+" "+t[1]+" "+t[2]),_(e,"target","_blank"),_(e,"rel","noopener noreferrer"),_(e,"alt",t[3]),_(e,"aria-label",t[3]),_(e,"href",t[0])},m(t,r){y(t,e,r),b(e,n)},p(t,o){22&o&&r!==(r=t[4]+" "+t[1]+" "+t[2])&&_(n,"class",r),8&o&&_(e,"alt",t[3]),8&o&&_(e,"aria-label",t[3]),1&o&&_(e,"href",t[0])},d(t){t&&x(e)}}}function Ut(e){let n,r,o,s,c,i;return{c(){n=w("a"),r=w("i"),_(r,"class",o=e[4]+" "+e[1]+" "+e[2]),_(n,"target","_blank"),_(n,"rel","noopener noreferrer"),_(n,"alt",e[3]),_(n,"aria-label",e[3]),_(n,"href",e[5])},m(o,a){var u;y(o,n,a),b(n,r),c||(u=s=Ht.call(null,n,e[5]),i=u&&l(u.destroy)?u.destroy:t,c=!0)},p(t,e){22&e&&o!==(o=t[4]+" "+t[1]+" "+t[2])&&_(r,"class",o),8&e&&_(n,"alt",t[3]),8&e&&_(n,"aria-label",t[3]),32&e&&_(n,"href",t[5]),s&&l(s.update)&&32&e&&s.update.call(null,t[5])},d(t){t&&x(n),c=!1,i()}}}function qt(e){let n;function r(t,e){return t[5]?Ut:Rt}let o=r(e),l=o(e);return{c(){l.c(),n=S()},m(t,e){l.m(t,e),y(t,n,e)},p(t,[e]){o===(o=r(t))&&l?l.p(t,e):(l.d(1),l=o(t),l&&(l.c(),l.m(n.parentNode,n)))},i:t,o:t,d(t){l.d(t),t&&x(n)}}}function Wt(t,e,n){let{link:r}=e,{iconClass:o}=e,{customClass:l=""}=e,{name:s}=e,{colorClass:c="text-primary-300 sm:hover:text-primary-500"}=e,{scrollId:i}=e;return t.$$set=t=>{"link"in t&&n(0,r=t.link),"iconClass"in t&&n(1,o=t.iconClass),"customClass"in t&&n(2,l=t.customClass),"name"in t&&n(3,s=t.name),"colorClass"in t&&n(4,c=t.colorClass),"scrollId"in t&&n(5,i=t.scrollId)},[r,o,l,s,c,i]}class Ft extends Z{constructor(t){super(),V(this,t,Wt,qt,s,{link:0,iconClass:1,customClass:2,name:3,colorClass:4,scrollId:5})}}function Yt(t,e,n){const r=t.slice();return r[2]=e[n],r}function Xt(t){let n,r;const o=[t[2],{colorClass:t[0]},{customClass:"mx-5"}];let l={};for(let t=0;t<o.length;t+=1)l=e(l,o[t]);return n=new Ft({props:l}),{c(){Y(n.$$.fragment)},m(t,e){X(n,t,e),r=!0},p(t,e){const r=3&e?function(t,e){const n={},r={},o={$$scope:1};let l=t.length;for(;l--;){const s=t[l],c=e[l];if(c){for(const t in s)t in c||(r[t]=1);for(const t in c)o[t]||(n[t]=c[t],o[t]=1);t[l]=c}else for(const t in s)o[t]=1}for(const t in r)t in n||(n[t]=void 0);return n}(o,[2&e&&(l=t[2],"object"==typeof l&&null!==l?l:{}),1&e&&{colorClass:t[0]},o[2]]):{};var l;n.$set(r)},i(t){r||(q(n.$$.fragment,t),r=!0)},o(t){W(n.$$.fragment,t),r=!1},d(t){G(n,t)}}}function Gt(t){let e,n,r,o,l,s,c,i,a,u,d=t[1],f=[];for(let e=0;e<d.length;e+=1)f[e]=Xt(Yt(t,d,e));const m=t=>W(f[t],1,1,(()=>{f[t]=null}));return a=new Ft({props:{link:"#about",scrollId:"#about",name:"scroll down",colorClass:t[0],iconClass:"fas fa-chevron-circle-down fa-2x"}}),{c(){e=w("div"),n=w("div"),r=C(),o=w("div"),l=w("h1"),s=k("Hi, I'm Kennan."),c=C();for(let t=0;t<f.length;t+=1)f[t].c();i=C(),Y(a.$$.fragment),_(n,"class","w-0 h-0 bg-none"),_(l,"class","text-5xl m-6 "+Qt+" font-light"),_(o,"class","text-center"),_(e,"class","flex flex-col items-center justify-around min-w-full min-h-screen bg-center bg-no-repeat bg-cover lg:bg-fixed svelte-1vr71v8"),_(e,"id","bg")},m(t,d){y(t,e,d),b(e,n),b(e,r),b(e,o),b(o,l),b(l,s),b(o,c);for(let t=0;t<f.length;t+=1)f[t].m(o,null);b(e,i),X(a,e,null),u=!0},p(t,[e]){if(3&e){let n;for(d=t[1],n=0;n<d.length;n+=1){const r=Yt(t,d,n);f[n]?(f[n].p(r,e),q(f[n],1)):(f[n]=Xt(r),f[n].c(),q(f[n],1),f[n].m(o,null))}for(R(),n=d.length;n<f.length;n+=1)m(n);U()}},i(t){if(!u){for(let t=0;t<d.length;t+=1)q(f[t]);q(a.$$.fragment,t),u=!0}},o(t){f=f.filter(Boolean);for(let t=0;t<f.length;t+=1)W(f[t]);W(a.$$.fragment,t),u=!1},d(t){t&&x(e),v(f,t),G(a)}}}let Qt="text-primary-300";function Vt(t){return[`${Qt} sm:hover:text-primary-500`,[{link:"https://github.com/kclejeune",iconClass:"fa-2x fab fa-github",name:"GitHub"},{link:"https://linkedin.com/in/kclejeune",iconClass:"fa-2x fab fa-linkedin",name:"LinkedIn"},{link:"https://keybase.io/kclejeune",iconClass:"fa-2x fab fa-keybase",name:"Keybase"},{link:"mailto:contact@kclj.io",iconClass:"fa-2x far fa-envelope",name:"Email"},{link:"https://kclejeune.keybase.pub/resume.pdf",iconClass:"fa-2x far fa-file-alt",name:"Resume"}]]}class Zt extends Z{constructor(t){super(),V(this,t,Vt,Gt,s,{})}}function te(t){if(!t)return t;if(Array.isArray(t))return t.map(te);if("object"!=typeof t)return t;{let e=Object.getOwnPropertyNames(t);if(1===e.length)return te(t[e[0]]);if(e.length>1){const n={};for(let r of e)n[r]=te(t[r]);return n}}}function ee(t){let e;return{c(){e=w("div"),e.innerHTML='<div class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse"></div> \n        <div class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse"></div> \n        <div class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse"></div> \n        <div class="h-8 col-span-2 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse"></div> \n        <div class="h-8 rounded bg-neutral-200 dark:bg-neutral-600 animate-pulse"></div> \n        <div class="..."></div> \n        <div class="col-span-2 ..."></div>',_(e,"class","grid grid-cols-3 gap-4 mt-2")},m(t,n){y(t,e,n)},d(t){t&&x(e)}}}function ne(t){let e,n;return e=new ft({props:{title:"Loading...",$$slots:{default:[ee]},$$scope:{ctx:t}}}),{c(){Y(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},p(t,[n]){const r={};1&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}class re extends Z{constructor(t){super(),V(this,t,null,ne,s,{})}}function oe(t,e,n){const r=t.slice();return r[8]=e[n],r}function le(t){let e,n,r;return n=new ft({props:{title:"Error",$$slots:{default:[se]},$$scope:{ctx:t}}}),{c(){e=w("div"),Y(n.$$.fragment),_(e,"class","container grid max-w-screen-xl grid-cols-1 gap-4 mx-auto")},m(t,o){y(t,e,o),X(n,e,null),r=!0},p(t,e){const r={};4096&e&&(r.$$scope={dirty:e,ctx:t}),n.$set(r)},i(t){r||(q(n.$$.fragment,t),r=!0)},o(t){W(n.$$.fragment,t),r=!1},d(t){t&&x(e),G(n)}}}function se(e){let n,r=e[11]+"";return{c(){n=k(r)},m(t,e){y(t,n,e)},p:t,d(t){t&&x(n)}}}function ce(t){let e,n,r=t[7],o=[];for(let e=0;e<r.length;e+=1)o[e]=ae(oe(t,r,e));const l=t=>W(o[t],1,1,(()=>{o[t]=null}));return{c(){e=w("div");for(let t=0;t<o.length;t+=1)o[t].c();_(e,"class","container grid max-w-screen-xl gap-4 mx-auto md:grid-cols-1 lg:grid-cols-2")},m(t,r){y(t,e,r);for(let t=0;t<o.length;t+=1)o[t].m(e,null);n=!0},p(t,n){if(3&n){let s;for(r=t[7],s=0;s<r.length;s+=1){const l=oe(t,r,s);o[s]?(o[s].p(l,n),q(o[s],1)):(o[s]=ae(l),o[s].c(),q(o[s],1),o[s].m(e,null))}for(R(),s=r.length;s<o.length;s+=1)l(s);U()}},i(t){if(!n){for(let t=0;t<r.length;t+=1)q(o[t]);n=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)W(o[t]);n=!1},d(t){t&&x(e),v(o,t)}}}function ie(e){let n,r,o,l,s,c,i=function(t){const e=[];t.stargazerCount>0&&e.push(`Stars: ${t.stargazerCount}`);t.forkCount>0&&e.push(`Forks: ${t.forkCount}`);return e.join(", ")}(e[8])+"",a=e[8].description+"";return{c(){n=w("span"),r=k(i),o=C(),l=w("div"),s=k(a),c=C()},m(t,e){y(t,n,e),b(n,r),y(t,o,e),y(t,l,e),b(l,s),y(t,c,e)},p:t,d(t){t&&x(n),t&&x(o),t&&x(l),t&&x(c)}}}function ae(t){let e,n;return e=new ft({props:{title:t[1](t[8].name.replaceAll("-"," ")),url:t[8].url,tags:fe(t[8]),$$slots:{default:[ie]},$$scope:{ctx:t}}}),{c(){Y(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},p(t,n){const r={};4096&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}function ue(e){let n,r,o;return r=new re({}),{c(){n=w("div"),Y(r.$$.fragment),_(n,"class","container grid max-w-screen-xl grid-cols-1 gap-4 mx-auto")},m(t,e){y(t,n,e),X(r,n,null),o=!0},p:t,i(t){o||(q(r.$$.fragment,t),o=!0)},o(t){W(r.$$.fragment,t),o=!1},d(t){t&&x(n),G(r)}}}function de(t){let e,n,r={ctx:t,current:null,token:null,hasCatch:!0,pending:ue,then:ce,catch:le,value:7,error:11,blocks:[,,,]};return F(t[0],r),{c(){e=S(),r.block.c()},m(t,o){y(t,e,o),r.block.m(t,r.anchor=o),r.mount=()=>e.parentNode,r.anchor=e,n=!0},p(e,[n]){!function(t,e,n){const r=e.slice(),{resolved:o}=t;t.current===t.then&&(r[t.value]=o),t.current===t.catch&&(r[t.error]=o),t.block.p(r,n)}(r,t=e,n)},i(t){n||(q(r.block),n=!0)},o(t){for(let t=0;t<3;t+=1){W(r.blocks[t])}n=!1},d(t){t&&x(e),r.block.d(t),r.token=null,r=null}}}function fe(t){return Array.from(new Set(t.repositoryTopics.concat(t.languages).filter((t=>t)).map((t=>t.toLowerCase().trim())))).sort()}function me(t,e,n){var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(o,l){function s(t){try{i(r.next(t))}catch(t){l(t)}}function c(t){try{i(r.throw(t))}catch(t){l(t)}}function i(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,c)}i((r=r.apply(t,e||[])).next())}))};const o="kclejeune",l=function(t="kclejeune",e=15,n=15,r=15){return`\n{\n  repositoryOwner(login: "${t}") {\n    ... on ProfileOwner {\n      login\n      itemShowcase {\n        ... on ProfileItemShowcase {\n          items(first: ${e}) {\n            totalCount\n            nodes {\n              ... on Repository {\n                name\n                stargazerCount\n                forkCount\n                url\n                description\n                repositoryTopics(first: ${n}) {\n                  nodes {\n                    ... on RepositoryTopic {\n                      topic {\n                        name\n                      }\n                    }\n                  }\n                }\n                languages(first: ${r}) {\n                  nodes {\n                    ... on Language {\n                      name\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n`}(o);return[function(){return r(this,void 0,void 0,(function*(){const t=(t,e)=>{let n=e.stargazerCount-t.stargazerCount,r=e.forkCount-t.forkCount,o=e.repositoryTopics.length-t.repositoryTopics.length+e.languages.length-t.languages.length,l=t.name.localeCompare(e.name);return 0!==n?n:0!==r?r:0!==o?o:0!==l?l:void 0};return fetch("https://rh50nu19ni.execute-api.us-east-2.amazonaws.com/beta/graphql",{method:"POST",body:JSON.stringify({query:l})}).then((t=>t.json())).then((t=>te(t))).then((t=>{var e,n;return null!==(n=null!==(e=t.itemShowcase.edges)&&void 0!==e?e:t.itemShowcase.nodes)&&void 0!==n?n:[]})).then((e=>e.sort(t)))}))}(),function(t){return t.includes(o)?t:t.replace(/\w\S*/g,(t=>t.charAt(0).toUpperCase()+t.substr(1)))},o]}class pe extends Z{constructor(t){super(),V(this,t,me,de,s,{username:2})}get username(){return this.$$.ctx[2]}}function ge(t){let e,n;return e=new Mt({}),{c(){Y(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}function $e(t){let e,n;return e=new _t({}),{c(){Y(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}function he(t){let e,n;return e=new pe({}),{c(){Y(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}function be(t){let e,n;return e=new bt({}),{c(){Y(e.$$.fragment)},m(t,r){X(e,t,r),n=!0},i(t){n||(q(e.$$.fragment,t),n=!0)},o(t){W(e.$$.fragment,t),n=!1},d(t){G(e,t)}}}function ye(t){let e,n,r,o,l,s,c,i,a,u,d;return n=new Zt({}),o=new Tt({props:{id:"about",title:"The Essentials",backgroundClass:xe,$$slots:{default:[ge]},$$scope:{ctx:t}}}),s=new Tt({props:{id:"experience",title:"Work Experience",backgroundClass:ve,$$slots:{default:[$e]},$$scope:{ctx:t}}}),i=new Tt({props:{id:"projects",title:"Projects",backgroundClass:xe,$$slots:{default:[he]},$$scope:{ctx:t}}}),u=new Tt({props:{id:"technologies",title:"Technologies I Use",backgroundClass:ve,$$slots:{default:[be]},$$scope:{ctx:t}}}),{c(){e=w("main"),Y(n.$$.fragment),r=C(),Y(o.$$.fragment),l=C(),Y(s.$$.fragment),c=C(),Y(i.$$.fragment),a=C(),Y(u.$$.fragment)},m(t,f){y(t,e,f),X(n,e,null),b(e,r),X(o,e,null),b(e,l),X(s,e,null),b(e,c),X(i,e,null),b(e,a),X(u,e,null),d=!0},p(t,[e]){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),o.$set(n);const r={};1&e&&(r.$$scope={dirty:e,ctx:t}),s.$set(r);const l={};1&e&&(l.$$scope={dirty:e,ctx:t}),i.$set(l);const c={};1&e&&(c.$$scope={dirty:e,ctx:t}),u.$set(c)},i(t){d||(q(n.$$.fragment,t),q(o.$$.fragment,t),q(s.$$.fragment,t),q(i.$$.fragment,t),q(u.$$.fragment,t),d=!0)},o(t){W(n.$$.fragment,t),W(o.$$.fragment,t),W(s.$$.fragment,t),W(i.$$.fragment,t),W(u.$$.fragment,t),d=!1},d(t){t&&x(e),G(n),G(o),G(s),G(i),G(u)}}}let xe="bg-primary-200 dark:bg-primary-900",ve="bg-neutral-200 dark:bg-neutral-900";return new class extends Z{constructor(t){super(),V(this,t,null,ye,s,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
