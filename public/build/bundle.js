var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function l(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e,n,o){if(t){const r=i(t,e,n,o);return t[0](r)}}function i(t,n,o,r){return t[1]&&r?e(o.ctx.slice(),t[1](r(n))):o.ctx}function a(t,e,n,o,r,l,s){const c=function(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}(e,o,r,l);if(c){const r=i(e,n,o,s);t.p(r,c)}}const u="undefined"!=typeof window;let d=u?()=>window.performance.now():()=>Date.now(),f=u?t=>requestAnimationFrame(t):t;const p=new Set;function g(t){p.forEach((e=>{e.c(t)||(p.delete(e),e.f())})),0!==p.size&&f(g)}function m(t,e){t.appendChild(e)}function $(t,e,n){t.insertBefore(e,n||null)}function h(t){t.parentNode.removeChild(t)}function b(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function y(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function v(){return x(" ")}function k(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function w(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let C;function S(t){C=t}function D(){if(!C)throw new Error("Function called outside component initialization");return C}const A=[],L=[],T=[],E=[],I=Promise.resolve();let j=!1;function _(t){T.push(t)}let M=!1;const P=new Set;function O(){if(!M){M=!0;do{for(let t=0;t<A.length;t+=1){const e=A[t];S(e),J(e.$$)}for(S(null),A.length=0;L.length;)L.pop()();for(let t=0;t<T.length;t+=1){const e=T[t];P.has(e)||(P.add(e),e())}T.length=0}while(A.length);for(;E.length;)E.pop()();j=!1,M=!1,P.clear()}}function J(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(_)}}const H=new Set;let K;function N(){K={r:0,c:[],p:K}}function U(){K.r||r(K.c),K=K.p}function B(t,e){t&&t.i&&(H.delete(t),t.i(e))}function z(t,e,n,o){if(t&&t.o){if(H.has(t))return;H.add(t),K.c.push((()=>{H.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function R(t,e){const n=e.token={};function o(t,o,r,l){if(e.token!==n)return;e.resolved=l;let s=e.ctx;void 0!==r&&(s=s.slice(),s[r]=l);const c=t&&(e.current=t)(s);let i=!1;e.block&&(e.blocks?e.blocks.forEach(((t,n)=>{n!==o&&t&&(N(),z(t,1,1,(()=>{e.blocks[n]===t&&(e.blocks[n]=null)})),U())})):e.block.d(1),c.c(),B(c,1),c.m(e.mount(),e.anchor),i=!0),e.block=c,e.blocks&&(e.blocks[o]=c),i&&O()}if((r=t)&&"object"==typeof r&&"function"==typeof r.then){const n=D();if(t.then((t=>{S(n),o(e.then,1,e.value,t),S(null)}),(t=>{if(S(n),o(e.catch,2,e.error,t),S(null),!e.hasCatch)throw t})),e.current!==e.pending)return o(e.pending,0),!0}else{if(e.current!==e.then)return o(e.then,1,e.value,t),!0;e.resolved=t}var r}function W(t){t&&t.c()}function q(t,e,o,s){const{fragment:c,on_mount:i,on_destroy:a,after_update:u}=t.$$;c&&c.m(e,o),s||_((()=>{const e=i.map(n).filter(l);a?a.push(...e):r(e),t.$$.on_mount=[]})),u.forEach(_)}function F(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Y(t,e){-1===t.$$.dirty[0]&&(A.push(t),j||(j=!0,I.then(O)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function X(e,n,l,s,c,i,a=[-1]){const u=C;S(e);const d=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:c,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:o(),dirty:a,skip_bound:!1};let f=!1;if(d.ctx=l?l(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return d.ctx&&c(d.ctx[t],d.ctx[t]=r)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](r),f&&Y(e,t)),n})):[],d.update(),f=!0,r(d.before_update),d.fragment=!!s&&s(d.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);d.fragment&&d.fragment.l(t),t.forEach(h)}else d.fragment&&d.fragment.c();n.intro&&B(e.$$.fragment),q(e,n.target,n.anchor,n.customElement),O()}S(u)}class G{$destroy(){F(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function Q(t){let e,n,o,r,l,s;const i=t[4].default,u=c(i,t,t[3],null);return{c(){e=y("div"),n=y("h1"),o=x(t[1]),r=v(),u&&u.c(),k(n,"class","py-4 text-4xl text-center"),k(e,"id",t[0]),k(e,"class",l="w-screen min-h-screen "+t[2])},m(t,l){$(t,e,l),m(e,n),m(n,o),m(e,r),u&&u.m(e,null),s=!0},p(t,[n]){(!s||2&n)&&w(o,t[1]),u&&u.p&&8&n&&a(u,i,t,t[3],n,null,null),(!s||1&n)&&k(e,"id",t[0]),(!s||4&n&&l!==(l="w-screen min-h-screen "+t[2]))&&k(e,"class",l)},i(t){s||(B(u,t),s=!0)},o(t){z(u,t),s=!1},d(t){t&&h(e),u&&u.d(t)}}}function V(t,e,n){let{$$slots:o={},$$scope:r}=e,{id:l}=e,{title:s}=e,{backgroundClass:c}=e;return t.$$set=t=>{"id"in t&&n(0,l=t.id),"title"in t&&n(1,s=t.title),"backgroundClass"in t&&n(2,c=t.backgroundClass),"$$scope"in t&&n(3,r=t.$$scope)},[l,s,c,r,o]}class Z extends G{constructor(t){super(),X(this,t,V,Q,s,{id:0,title:1,backgroundClass:2})}}function tt(t,e,n){const o=t.slice();return o[1]=e[n],o}function et(e){let n,o,r,l,s=e[1]+"";return{c(){n=y("div"),o=y("div"),r=x(s),l=v(),k(o,"class","px-6 py-4 text-2xl font-medium text-center"),k(n,"class","overflow-hidden shadow-xl bg-gray-50 rounded-xl dark:bg-gray-800")},m(t,e){$(t,n,e),m(n,o),m(o,r),m(n,l)},p:t,d(t){t&&h(n)}}}function nt(t){let e,n=t[0],o=[];for(let e=0;e<n.length;e+=1)o[e]=et(tt(t,n,e));return{c(){e=y("div");for(let t=0;t<o.length;t+=1)o[t].c();k(e,"class","container grid grid-cols-1 gap-4 p-4 mx-auto sm:container md:grid-cols-3 sm:grid-cols-2")},m(t,n){$(t,e,n);for(let t=0;t<o.length;t+=1)o[t].m(e,null)},p(t,r){if(1&r){let l;for(n=t[0],l=0;l<n.length;l+=1){const s=tt(t,n,l);o[l]?o[l].p(s,r):(o[l]=et(s),o[l].c(),o[l].m(e,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=n.length}},d(t){t&&h(e),b(o,t)}}}function ot(t){let e,n;return e=new Z({props:{id:"technologies",title:"Technologies I Use",backgroundClass:"bg-gray-200 dark:bg-gray-600",$$slots:{default:[nt]},$$scope:{ctx:t}}}),{c(){W(e.$$.fragment)},m(t,o){q(e,t,o),n=!0},p(t,[n]){const o={};16&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){z(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function rt(t){return[["Python","Scikit-Learn","Tensorflow","Keras","NixOS","Bash","Awk","TypeScript","Javascript","Angular","Vue","Svelte","HTML","CSS","Java","Kotlin","SQL","Scheme"]]}class lt extends G{constructor(t){super(),X(this,t,rt,ot,s,{})}}function st(t){let e,n;const o=t[2].default,r=c(o,t,t[1],null);return{c(){e=y("a"),r&&r.c(),k(e,"class","mb-2 font-light text-blue-800 underline text-md hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"),k(e,"href",t[0])},m(t,o){$(t,e,o),r&&r.m(e,null),n=!0},p(t,[l]){r&&r.p&&2&l&&a(r,o,t,t[1],l,null,null),(!n||1&l)&&k(e,"href",t[0])},i(t){n||(B(r,t),n=!0)},o(t){z(r,t),n=!1},d(t){t&&h(e),r&&r.d(t)}}}function ct(t,e,n){let{$$slots:o={},$$scope:r}=e,{url:l}=e;return t.$$set=t=>{"url"in t&&n(0,l=t.url),"$$scope"in t&&n(1,r=t.$$scope)},[l,r,o]}class it extends G{constructor(t){super(),X(this,t,ct,st,s,{url:0})}}function at(t,e,n){const o=t.slice();return o[6]=e[n],o}function ut(t){let e,n;return{c(){e=y("div"),n=x(t[0]),k(e,"class","mb-1 text-2xl font-medium")},m(t,o){$(t,e,o),m(e,n)},p(t,e){1&e&&w(n,t[0])},d(t){t&&h(e)}}}function dt(t){let e,n,o;return n=new it({props:{url:t[2],$$slots:{default:[pt]},$$scope:{ctx:t}}}),{c(){e=y("div"),W(n.$$.fragment),k(e,"class","mb-1")},m(t,r){$(t,e,r),q(n,e,null),o=!0},p(t,e){const o={};4&e&&(o.url=t[2]),36&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){o||(B(n.$$.fragment,t),o=!0)},o(t){z(n.$$.fragment,t),o=!1},d(t){t&&h(e),F(n)}}}function ft(e){let n,o;return{c(){n=y("div"),o=x(e[1]),k(n,"class","mb-1 font-light text-gray-600 text-md dark:text-gray-400")},m(t,e){$(t,n,e),m(n,o)},p(t,e){2&e&&w(o,t[1])},i:t,o:t,d(t){t&&h(n)}}}function pt(t){let e;return{c(){e=x(t[2])},m(t,n){$(t,e,n)},p(t,n){4&n&&w(e,t[2])},d(t){t&&h(e)}}}function gt(t){let e,n=t[3],o=[];for(let e=0;e<n.length;e+=1)o[e]=mt(at(t,n,e));return{c(){e=y("div");for(let t=0;t<o.length;t+=1)o[t].c();k(e,"class","px-6 pt-4 pb-2 align-bottom")},m(t,n){$(t,e,n);for(let t=0;t<o.length;t+=1)o[t].m(e,null)},p(t,r){if(8&r){let l;for(n=t[3],l=0;l<n.length;l+=1){const s=at(t,n,l);o[l]?o[l].p(s,r):(o[l]=mt(s),o[l].c(),o[l].m(e,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=n.length}},d(t){t&&h(e),b(o,t)}}}function mt(t){let e,n,o,r=t[6]+"";return{c(){e=y("span"),n=x(r),o=v(),k(e,"class","inline-block px-4 py-1 mb-2 mr-2 text-sm font-semibold bg-blue-300 rounded-full dark:bg-blue-800")},m(t,r){$(t,e,r),m(e,n),m(e,o)},p(t,e){8&e&&r!==(r=t[6]+"")&&w(n,r)},d(t){t&&h(e)}}}function $t(t){let e,n,o,r,l,s,i,u,d,f,p=t[0]&&ut(t);const g=[ft,dt],b=[];function x(t,e){return t[1]?0:t[2]?1:-1}~(r=x(t))&&(l=b[r]=g[r](t));const w=t[4].default,C=c(w,t,t[5],null);let S=t[3]&&gt(t);return{c(){e=y("div"),n=y("div"),p&&p.c(),o=v(),l&&l.c(),s=v(),i=y("div"),C&&C.c(),u=v(),d=y("div"),S&&S.c(),k(n,"class","px-6 py-4"),k(e,"class","flex flex-col justify-between overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-800 rounded-xl")},m(t,l){$(t,e,l),m(e,n),p&&p.m(n,null),m(n,o),~r&&b[r].m(n,null),m(n,s),m(n,i),C&&C.m(i,null),m(e,u),m(e,d),S&&S.m(d,null),f=!0},p(t,[e]){t[0]?p?p.p(t,e):(p=ut(t),p.c(),p.m(n,o)):p&&(p.d(1),p=null);let c=r;r=x(t),r===c?~r&&b[r].p(t,e):(l&&(N(),z(b[c],1,1,(()=>{b[c]=null})),U()),~r?(l=b[r],l?l.p(t,e):(l=b[r]=g[r](t),l.c()),B(l,1),l.m(n,s)):l=null),C&&C.p&&32&e&&a(C,w,t,t[5],e,null,null),t[3]?S?S.p(t,e):(S=gt(t),S.c(),S.m(d,null)):S&&(S.d(1),S=null)},i(t){f||(B(l),B(C,t),f=!0)},o(t){z(l),z(C,t),f=!1},d(t){t&&h(e),p&&p.d(),~r&&b[r].d(),C&&C.d(t),S&&S.d()}}}function ht(t,e,n){let{$$slots:o={},$$scope:r}=e,{title:l}=e,{subtitle:s}=e,{url:c}=e,{tags:i}=e;return t.$$set=t=>{"title"in t&&n(0,l=t.title),"subtitle"in t&&n(1,s=t.subtitle),"url"in t&&n(2,c=t.url),"tags"in t&&n(3,i=t.tags),"$$scope"in t&&n(5,r=t.$$scope)},[l,s,c,i,o,r]}class bt extends G{constructor(t){super(),X(this,t,ht,$t,s,{title:0,subtitle:1,url:2,tags:3})}}function yt(t,e,n){const o=t.slice();return o[5]=e[n],o}function xt(t,e,n){const o=t.slice();return o[8]=e[n],o}function vt(e){let n,o,r=e[8]+"";return{c(){n=y("li"),o=x(r)},m(t,e){$(t,n,e),m(n,o)},p:t,d(t){t&&h(n)}}}function kt(e){let n,o,r,l=e[5].description&&function(e){let n,o,r=(e[5].description??"")+"";return{c(){n=y("div"),o=x(r),k(n,"class","mb-1")},m(t,e){$(t,n,e),m(n,o)},p:t,d(t){t&&h(n)}}}(e),s=e[5].tasks,c=[];for(let t=0;t<s.length;t+=1)c[t]=vt(xt(e,s,t));return{c(){l&&l.c(),n=v(),o=y("ul");for(let t=0;t<c.length;t+=1)c[t].c();r=v(),k(o,"class","m-2 list-disc")},m(t,e){l&&l.m(t,e),$(t,n,e),$(t,o,e);for(let t=0;t<c.length;t+=1)c[t].m(o,null);$(t,r,e)},p(t,e){if(t[5].description&&l.p(t,e),2&e){let n;for(s=t[5].tasks,n=0;n<s.length;n+=1){const r=xt(t,s,n);c[n]?c[n].p(r,e):(c[n]=vt(r),c[n].c(),c[n].m(o,null))}for(;n<c.length;n+=1)c[n].d(1);c.length=s.length}},d(t){l&&l.d(t),t&&h(n),t&&h(o),b(c,t),t&&h(r)}}}function wt(t){let e,n;return e=new bt({props:{title:t[5].employer,subtitle:`${t[5].title}, ${t[0](t[5].startDate,t[5].endDate)}`,tags:t[5].tags,$$slots:{default:[kt]},$$scope:{ctx:t}}}),{c(){W(e.$$.fragment)},m(t,o){q(e,t,o),n=!0},p(t,n){const o={};2048&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){z(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function Ct(t){let e,n,o=t[1],r=[];for(let e=0;e<o.length;e+=1)r[e]=wt(yt(t,o,e));const l=t=>z(r[t],1,1,(()=>{r[t]=null}));return{c(){e=y("div");for(let t=0;t<r.length;t+=1)r[t].c();k(e,"class","container grid max-w-screen-xl gap-4 p-4 mx-auto md:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-4")},m(t,o){$(t,e,o);for(let t=0;t<r.length;t+=1)r[t].m(e,null);n=!0},p(t,n){if(3&n){let s;for(o=t[1],s=0;s<o.length;s+=1){const l=yt(t,o,s);r[s]?(r[s].p(l,n),B(r[s],1)):(r[s]=wt(l),r[s].c(),B(r[s],1),r[s].m(e,null))}for(N(),s=o.length;s<r.length;s+=1)l(s);U()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)B(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)z(r[t]);n=!1},d(t){t&&h(e),b(r,t)}}}function St(t){let e,n;return e=new Z({props:{id:"experience",title:"Work Experience",backgroundClass:"bg-gray-200 dark:bg-gray-600",$$slots:{default:[Ct]},$$scope:{ctx:t}}}),{c(){W(e.$$.fragment)},m(t,o){q(e,t,o),n=!0},p(t,[n]){const o={};2048&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){z(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function Dt(t){const e=["January","February","March","April","May","June","July","August","September","October","November","December"],n=new Date;function o(t){return`${e[t.getMonth()]} ${t.getFullYear()}`}return[function(t,e){var n;return`${o(t)} - ${null!==(n=o(e))&&void 0!==n?n:"Present"}`},[{employer:"CWRU Department of Computer and Data Sciences",title:"Teaching Assistant",startDate:new Date(2020,8),endDate:new Date(n.getFullYear(),n.getMonth()),description:"Classes: CSDS 391: Introduction to Artificial Intelligence, CSDS 343: Theoretical Computer Science",tasks:["Designed and graded course assignments and exams","Taught supplementary lectures to reinforce course material","Hosted weekly office hours to answer questions and provide feedback on theoretical written work and programming assignments"],tags:["Machine Learning","Reinforcement Learning","Bayesian Networks","Theory of Computation"]},{employer:"Johns Hopkins University Applied Physics Laboratory",title:"Machine Learning & Software Engineering Intern",startDate:new Date(2020,3),endDate:new Date(2020,7),tasks:["Designed random forest, Bayesian network, and deep learning models for viral and bacterial threat classification using Scikit-Learn, Tensorflow, and Keras","Implemented a data processing pipeline using dna2vec to perform feature extraction and dimensionality reduction from sequenced DNA","Contributed to a large scale Angular application to provide an online learing approach to automated document tagging and classification"],tags:["Python","Machine Learning","Tensorflow","dna2vec"]},{employer:"Johns Hopkins University Applied Physics Laboratory",title:"Software Engineering Intern",startDate:new Date(2019,4),endDate:new Date(2020,7),tasks:["Worked in a Kanban development environment to quickly and effectively produce thoroughly documented, tested software for contract sponsors","Contributed to an Android application written in Java and Kotlin to implement an attachment cache mechanism, reducing form upload time by as much as 75%","Developed a web application with spring boot backend, Angular frontend, and Selenium unit tests, utilizing an internally designed UI library to deliver Elasticsearch social media analytics"],tags:["Java","Kotlin","Angular","Typescript","Selenium"]},{employer:"Agriplex Genomics",title:"Software Engineering Intern",startDate:new Date(2018,8),endDate:new Date(2019,4),tasks:["Developed a job scheduling application from scratch in Angular and designed an algorithm to optimize job scheduling to increase data throughput.","Designed a Postgres database model to store jobs and their associated data, and built a corresponding REST API to allow application interaction.","Created an Amazon AWS management server to create and destroy EC2 instances to efficiently allocate funds and expedite job processing."],tags:["Angular","Typescript","Postgres","AWS"]}]]}class At extends G{constructor(t){super(),X(this,t,Dt,St,s,{})}}function Lt(t){let e,n;const o=t[1].default,r=c(o,t,t[0],null);return{c(){e=y("div"),r&&r.c(),k(e,"class","container p-4 mx-auto text-lg font-light md:max-w-prose")},m(t,o){$(t,e,o),r&&r.m(e,null),n=!0},p(t,[e]){r&&r.p&&1&e&&a(r,o,t,t[0],e,null,null)},i(t){n||(B(r,t),n=!0)},o(t){z(r,t),n=!1},d(t){t&&h(e),r&&r.d(t)}}}function Tt(t,e,n){let{$$slots:o={},$$scope:r}=e;return t.$$set=t=>{"$$scope"in t&&n(0,r=t.$$scope)},[r,o]}class Et extends G{constructor(t){super(),X(this,t,Tt,Lt,s,{})}}function It(t){let e;return{c(){e=x("CWRU Department of Computer and Data Sciences")},m(t,n){$(t,e,n)},d(t){t&&h(e)}}}function jt(t){let e;return{c(){e=x("Johns Hopkins University Applied Physics Laboratory\n            ")},m(t,n){$(t,e,n)},d(t){t&&h(e)}}}function _t(t){let e,n,o,r,l,s,c,i,a,u,d,f,p,g,b,k,w,C,S,D;return d=new it({props:{url:"https://engineering.case.edu/computer-and-data-sciences/academics/computer-science/bachelor-science",$$slots:{default:[It]},$$scope:{ctx:t}}}),C=new it({props:{url:"https://www.jhuapl.edu/",$$slots:{default:[jt]},$$scope:{ctx:t}}}),{c(){e=y("p"),e.textContent="Hey, I'm Kennan!",n=v(),o=y("br"),r=v(),l=y("p"),l.textContent="I'm a recent Computer Science graduate and current M.S. Computer\n            Science candidate at Case Western Reserve University.​ I started\n            programming on calculators with TI-BASIC back in high school, and\n            I've been addicted ever since. Outside of my studies, I'm an avid\n            cyclist, musician, linux enthusiast, and speedcuber.",s=v(),c=y("br"),i=v(),a=y("p"),u=x("I currently do research in the "),W(d.$$.fragment),f=x("\n            under Dr. Soumya Ray. My work investigates the properties of knowledge\n            propogation through social networks in multi-agent learning systems,\n            and aims to develop dynamic optimization methods to achieve faster training\n            convergence for the network as a whole."),p=v(),g=y("br"),b=v(),k=y("p"),w=x("After graduation, I'm transitioning to full time work on Software\n            Engineering and Data Science at the\n            "),W(C.$$.fragment),S=x(", where I do work on machine learning research for DNA threat\n            classification and full stack software engineering with Angular and\n            Spring.")},m(t,h){$(t,e,h),$(t,n,h),$(t,o,h),$(t,r,h),$(t,l,h),$(t,s,h),$(t,c,h),$(t,i,h),$(t,a,h),m(a,u),q(d,a,null),m(a,f),$(t,p,h),$(t,g,h),$(t,b,h),$(t,k,h),m(k,w),q(C,k,null),m(k,S),D=!0},p(t,e){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),d.$set(n);const o={};1&e&&(o.$$scope={dirty:e,ctx:t}),C.$set(o)},i(t){D||(B(d.$$.fragment,t),B(C.$$.fragment,t),D=!0)},o(t){z(d.$$.fragment,t),z(C.$$.fragment,t),D=!1},d(t){t&&h(e),t&&h(n),t&&h(o),t&&h(r),t&&h(l),t&&h(s),t&&h(c),t&&h(i),t&&h(a),F(d),t&&h(p),t&&h(g),t&&h(b),t&&h(k),F(C)}}}function Mt(t){let e,n;return e=new Et({props:{$$slots:{default:[_t]},$$scope:{ctx:t}}}),{c(){W(e.$$.fragment)},m(t,o){q(e,t,o),n=!0},p(t,n){const o={};1&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){z(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function Pt(t){let e,n;return e=new Z({props:{id:"about",title:"The Essentials",backgroundClass:"bg-blue-200 dark:bg-blue-900",$$slots:{default:[Mt]},$$scope:{ctx:t}}}),{c(){W(e.$$.fragment)},m(t,o){q(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){z(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}class Ot extends G{constructor(t){super(),X(this,t,null,Pt,s,{})}}var Jt={$:t=>"string"==typeof t?document.querySelector(t):t,extend:(...t)=>Object.assign(...t),cumulativeOffset(t){let e=0,n=0;do{e+=t.offsetTop||0,n+=t.offsetLeft||0,t=t.offsetParent}while(t);return{top:e,left:n}},directScroll:t=>t&&t!==document&&t!==document.body,scrollTop(t,e){let n=void 0!==e;return this.directScroll(t)?n?t.scrollTop=e:t.scrollTop:n?document.documentElement.scrollTop=document.body.scrollTop=e:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},scrollLeft(t,e){let n=void 0!==e;return this.directScroll(t)?n?t.scrollLeft=e:t.scrollLeft:n?document.documentElement.scrollLeft=document.body.scrollLeft=e:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0}};const Ht={container:"body",duration:500,delay:0,offset:0,easing:function(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1},onStart:t,onDone:t,onAborting:t,scrollX:!1,scrollY:!0},Kt=t=>{let{offset:e,duration:n,delay:o,easing:r,x:l=0,y:s=0,scrollX:c,scrollY:i,onStart:a,onDone:u,container:m,onAborting:$,element:h}=t;"function"==typeof e&&(e=e());var b=Jt.cumulativeOffset(m),y=h?Jt.cumulativeOffset(h):{top:s,left:l},x=Jt.scrollLeft(m),v=Jt.scrollTop(m),k=y.left-b.left+e,w=y.top-b.top+e,C=k-x,S=w-v;let D=!0,A=!1,L=d()+o,T=L+n;function E(t){t||(A=!0,a(h,{x:l,y:s}))}function I(t){!function(t,e,n){c&&Jt.scrollLeft(t,n),i&&Jt.scrollTop(t,e)}(m,v+S*t,x+C*t)}function j(){D=!1}return function(t){let e;0===p.size&&f(g),new Promise((n=>{p.add(e={c:t,f:n})}))}((t=>{if(!A&&t>=L&&E(!1),A&&t>=T&&(I(1),j(),u(h,{x:l,y:s})),!D)return $(h,{x:l,y:s}),!1;if(A){I(0+1*r((t-L)/n))}return!0})),E(o),I(0),j},Nt=(Ut=t=>Kt((t=>{let e=Jt.extend({},Ht,t);return e.container=Jt.$(e.container),e.element=Jt.$(e.element),e})(t)),(t,e)=>{let n=e;const o=t=>{t.preventDefault(),Ut("string"==typeof n?{element:n}:n)};return t.addEventListener("click",o),t.addEventListener("touchstart",o),{update(t){n=t},destroy(){t.removeEventListener("click",o),t.removeEventListener("touchstart",o)}}});var Ut;function Bt(e){let n,o,r,s,c,i;return{c(){n=y("a"),o=y("i"),k(o,"class",r=e[3]+" "+e[1]),k(n,"target","_blank"),k(n,"rel","noopener noreferrer"),k(n,"alt",e[2]),k(n,"aria-label",e[2]),k(n,"href",e[0])},m(r,a){var u;$(r,n,a),m(n,o),c||(u=s=Nt.call(null,n,e[4]),i=u&&l(u.destroy)?u.destroy:t,c=!0)},p(t,[e]){10&e&&r!==(r=t[3]+" "+t[1])&&k(o,"class",r),4&e&&k(n,"alt",t[2]),4&e&&k(n,"aria-label",t[2]),1&e&&k(n,"href",t[0]),s&&l(s.update)&&16&e&&s.update.call(null,t[4])},i:t,o:t,d(t){t&&h(n),c=!1,i()}}}function zt(t,e,n){let{link:o}=e,{iconClass:r}=e,{name:l}=e,{colorClass:s="text-blue-300 hover:text-blue-500"}=e,{scrollId:c=""}=e;return t.$$set=t=>{"link"in t&&n(0,o=t.link),"iconClass"in t&&n(1,r=t.iconClass),"name"in t&&n(2,l=t.name),"colorClass"in t&&n(3,s=t.colorClass),"scrollId"in t&&n(4,c=t.scrollId)},[o,r,l,s,c]}class Rt extends G{constructor(t){super(),X(this,t,zt,Bt,s,{link:0,iconClass:1,name:2,colorClass:3,scrollId:4})}}function Wt(t,e,n){const o=t.slice();return o[1]=e[n],o}function qt(t){let n,o,r,l;const s=[t[1],{colorClass:Yt+" hover:"+Xt}];let c={};for(let t=0;t<s.length;t+=1)c=e(c,s[t]);return o=new Rt({props:c}),{c(){n=y("span"),W(o.$$.fragment),r=v(),k(n,"class","m-5")},m(t,e){$(t,n,e),q(o,n,null),m(n,r),l=!0},p(t,e){const n=1&e?function(t,e){const n={},o={},r={$$scope:1};let l=t.length;for(;l--;){const s=t[l],c=e[l];if(c){for(const t in s)t in c||(o[t]=1);for(const t in c)r[t]||(n[t]=c[t],r[t]=1);t[l]=c}else for(const t in s)r[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(s,[1&e&&(r=t[1],"object"==typeof r&&null!==r?r:{}),0&e&&{colorClass:Yt+" hover:"+Xt}]):{};var r;o.$set(n)},i(t){l||(B(o.$$.fragment,t),l=!0)},o(t){z(o.$$.fragment,t),l=!1},d(t){t&&h(n),F(o)}}}function Ft(t){let e,n,o,r,l,s,c,i,a,u,d,f,p=t[0],g=[];for(let e=0;e<p.length;e+=1)g[e]=qt(Wt(t,p,e));const w=t=>z(g[t],1,1,(()=>{g[t]=null}));return d=new Rt({props:{link:"#about",scrollId:"#about",name:"scroll down",colorClass:Yt+" hover:"+Xt,iconClass:"fas fa-chevron-circle-down fa-2x"}}),{c(){e=y("div"),n=y("div"),o=v(),r=y("div"),l=y("h1"),s=x("Hi, I'm Kennan."),c=v(),i=y("span");for(let t=0;t<g.length;t+=1)g[t].c();a=v(),u=y("div"),W(d.$$.fragment),k(n,"class","w-0 h-0"),k(l,"class","text-5xl m-6 text-center "+Yt+" font-light"),k(u,"class","py-20"),k(e,"class","flex flex-col items-center justify-around min-w-full min-h-screen bg-center bg-no-repeat bg-cover lg:bg-fixed svelte-hvsf42"),k(e,"id","bg")},m(t,p){$(t,e,p),m(e,n),m(e,o),m(e,r),m(r,l),m(l,s),m(r,c),m(r,i);for(let t=0;t<g.length;t+=1)g[t].m(i,null);m(e,a),m(e,u),q(d,u,null),f=!0},p(t,[e]){if(1&e){let n;for(p=t[0],n=0;n<p.length;n+=1){const o=Wt(t,p,n);g[n]?(g[n].p(o,e),B(g[n],1)):(g[n]=qt(o),g[n].c(),B(g[n],1),g[n].m(i,null))}for(N(),n=p.length;n<g.length;n+=1)w(n);U()}},i(t){if(!f){for(let t=0;t<p.length;t+=1)B(g[t]);B(d.$$.fragment,t),f=!0}},o(t){g=g.filter(Boolean);for(let t=0;t<g.length;t+=1)z(g[t]);z(d.$$.fragment,t),f=!1},d(t){t&&h(e),b(g,t),F(d)}}}let Yt="text-blue-300",Xt="text-blue-500";function Gt(t){return[[{link:"https://github.com/kclejeune",iconClass:"fa-2x fab fa-github",name:"GitHub"},{link:"https://linkedin.com/in/kclejeune",iconClass:"fa-2x fab fa-linkedin",name:"LinkedIn"},{link:"https://keybase.io/kclejeune",iconClass:"fa-2x fab fa-keybase",name:"Keybase"},{link:"mailto:contact@kclj.io",iconClass:"fa-2x far fa-envelope",name:"Email"},{link:"https://kclejeune.keybase.pub/resume.pdf",iconClass:"fa-2x far fa-file-alt",name:"Resume"}]]}class Qt extends G{constructor(t){super(),X(this,t,Gt,Ft,s,{})}}function Vt(t){let e;return{c(){e=y("div"),e.innerHTML='<div class="h-8 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div> \n        <div class="h-8 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div> \n        <div class="h-8 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div> \n        <div class="h-8 col-span-2 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div> \n        <div class="h-8 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div> \n        <div class="..."></div> \n        <div class="col-span-2 ..."></div>',k(e,"class","grid grid-cols-3 gap-4 mt-2")},m(t,n){$(t,e,n)},d(t){t&&h(e)}}}function Zt(t){let e,n;return e=new bt({props:{title:"Loading...",$$slots:{default:[Vt]},$$scope:{ctx:t}}}),{c(){W(e.$$.fragment)},m(t,o){q(e,t,o),n=!0},p(t,[n]){const o={};1&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){z(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}class te extends G{constructor(t){super(),X(this,t,null,Zt,s,{})}}function ee(t,e,n){const o=t.slice();return o[4]=e[n],o}function ne(e){return{c:t,m:t,p:t,i:t,o:t,d:t}}function oe(t){let e,n,o=t[3],r=[];for(let e=0;e<o.length;e+=1)r[e]=le(ee(t,o,e));const l=t=>z(r[t],1,1,(()=>{r[t]=null}));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=x("")},m(t,o){for(let e=0;e<r.length;e+=1)r[e].m(t,o);$(t,e,o),n=!0},p(t,n){if(1&n){let s;for(o=t[3],s=0;s<o.length;s+=1){const l=ee(t,o,s);r[s]?(r[s].p(l,n),B(r[s],1)):(r[s]=le(l),r[s].c(),B(r[s],1),r[s].m(e.parentNode,e))}for(N(),s=o.length;s<r.length;s+=1)l(s);U()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)B(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)z(r[t]);n=!1},d(t){b(r,t),t&&h(e)}}}function re(e){let n,o,r,l=e[4].description+"",s=e[4].stars>0&&function(e){let n,o,r,l=e[4].stars+"";return{c(){n=y("div"),o=x("Stars: "),r=x(l)},m(t,e){$(t,n,e),m(n,o),m(n,r)},p:t,d(t){t&&h(n)}}}(e);return{c(){s&&s.c(),n=v(),o=x(l),r=v()},m(t,e){s&&s.m(t,e),$(t,n,e),$(t,o,e),$(t,r,e)},p(t,e){t[4].stars>0&&s.p(t,e)},d(t){s&&s.d(t),t&&h(n),t&&h(o),t&&h(r)}}}function le(t){let e,n;return e=new bt({props:{title:ue(t[4].repo.replaceAll("-"," ")),url:t[4].link,tags:[t[4].language],$$slots:{default:[re]},$$scope:{ctx:t}}}),{c(){W(e.$$.fragment)},m(t,o){q(e,t,o),n=!0},p(t,n){const o={};128&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){z(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function se(e){let n,o;return n=new te({}),{c(){W(n.$$.fragment)},m(t,e){q(n,t,e),o=!0},p:t,i(t){o||(B(n.$$.fragment,t),o=!0)},o(t){z(n.$$.fragment,t),o=!1},d(t){F(n,t)}}}function ce(t){let e,n,o={ctx:t,current:null,token:null,hasCatch:!1,pending:se,then:oe,catch:ne,value:3,blocks:[,,,]};return R(t[0],o),{c(){e=y("div"),o.block.c(),k(e,"class","container grid max-w-screen-xl gap-4 p-4 mx-auto md:grid-cols-1 xl:grid-cols-2")},m(t,r){$(t,e,r),o.block.m(e,o.anchor=null),o.mount=()=>e,o.anchor=null,n=!0},p(e,n){{const r=(t=e).slice();r[3]=o.resolved,o.block.p(r,n)}},i(t){n||(B(o.block),n=!0)},o(t){for(let t=0;t<3;t+=1){z(o.blocks[t])}n=!1},d(t){t&&h(e),o.block.d(),o.token=null,o=null}}}function ie(t){let e,n;return e=new Z({props:{id:"projects",title:"Projects",backgroundClass:"bg-blue-200 dark:bg-blue-900",$$slots:{default:[ce]},$$scope:{ctx:t}}}),{c(){W(e.$$.fragment)},m(t,o){q(e,t,o),n=!0},p(t,[n]){const o={};128&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){z(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}const ae="kclejeune";function ue(t){return t.includes(ae)?t:t.replace(/\w\S*/g,(t=>t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()))}function de(t){var e=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(r,l){function s(t){try{i(o.next(t))}catch(t){l(t)}}function c(t){try{i(o.throw(t))}catch(t){l(t)}}function i(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,c)}i((o=o.apply(t,e||[])).next())}))};return[function(){return e(this,void 0,void 0,(function*(){return fetch("https://gh-pinned-repos-5l2i19um3.vercel.app/?username=kclejeune").then((t=>t.json())).then((t=>t.sort(((t,e)=>e.stars-t.stars))))}))}()]}class fe extends G{constructor(t){super(),X(this,t,de,ie,s,{})}}function pe(e){let n,o,r,l,s,c,i,a,u,d,f;return o=new Qt({}),l=new Ot({}),c=new At({}),a=new fe({}),d=new lt({}),{c(){n=y("main"),W(o.$$.fragment),r=v(),W(l.$$.fragment),s=v(),W(c.$$.fragment),i=v(),W(a.$$.fragment),u=v(),W(d.$$.fragment)},m(t,e){$(t,n,e),q(o,n,null),m(n,r),q(l,n,null),m(n,s),q(c,n,null),m(n,i),q(a,n,null),m(n,u),q(d,n,null),f=!0},p:t,i(t){f||(B(o.$$.fragment,t),B(l.$$.fragment,t),B(c.$$.fragment,t),B(a.$$.fragment,t),B(d.$$.fragment,t),f=!0)},o(t){z(o.$$.fragment,t),z(l.$$.fragment,t),z(c.$$.fragment,t),z(a.$$.fragment,t),z(d.$$.fragment,t),f=!1},d(t){t&&h(n),F(o),F(l),F(c),F(a),F(d)}}}return new class extends G{constructor(t){super(),X(this,t,null,pe,s,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
