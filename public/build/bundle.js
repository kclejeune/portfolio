var app=function(){"use strict";function e(){}function t(e,t){for(const n in t)e[n]=t[n];return e}function n(e){return e()}function o(){return Object.create(null)}function r(e){e.forEach(n)}function l(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function c(e,t,n,o){if(e){const r=i(e,t,n,o);return e[0](r)}}function i(e,n,o,r){return e[1]&&r?t(o.ctx.slice(),e[1](r(n))):o.ctx}function a(e,t,n,o,r,l,s){const c=function(e,t,n,o){if(e[2]&&o){const r=e[2](o(n));if(void 0===t.dirty)return r;if("object"==typeof r){const e=[],n=Math.max(t.dirty.length,r.length);for(let o=0;o<n;o+=1)e[o]=t.dirty[o]|r[o];return e}return t.dirty|r}return t.dirty}(t,o,r,l);if(c){const r=i(t,n,o,s);e.p(r,c)}}const u="undefined"!=typeof window;let d=u?()=>window.performance.now():()=>Date.now(),f=u?e=>requestAnimationFrame(e):e;const p=new Set;function g(e){p.forEach((t=>{t.c(e)||(p.delete(t),t.f())})),0!==p.size&&f(g)}function m(e,t){e.appendChild(t)}function $(e,t,n){e.insertBefore(t,n||null)}function h(e){e.parentNode.removeChild(e)}function b(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function y(e){return document.createElement(e)}function x(e){return document.createTextNode(e)}function v(){return x(" ")}function k(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function w(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}let C;function S(e){C=e}function D(){if(!C)throw new Error("Function called outside component initialization");return C}const A=[],L=[],T=[],E=[],I=Promise.resolve();let j=!1;function _(e){T.push(e)}let M=!1;const P=new Set;function O(){if(!M){M=!0;do{for(let e=0;e<A.length;e+=1){const t=A[e];S(t),J(t.$$)}for(S(null),A.length=0;L.length;)L.pop()();for(let e=0;e<T.length;e+=1){const t=T[e];P.has(t)||(P.add(t),t())}T.length=0}while(A.length);for(;E.length;)E.pop()();j=!1,M=!1,P.clear()}}function J(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(_)}}const H=new Set;let K;function N(){K={r:0,c:[],p:K}}function U(){K.r||r(K.c),K=K.p}function B(e,t){e&&e.i&&(H.delete(e),e.i(t))}function z(e,t,n,o){if(e&&e.o){if(H.has(e))return;H.add(e),K.c.push((()=>{H.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}}function R(e,t){const n=t.token={};function o(e,o,r,l){if(t.token!==n)return;t.resolved=l;let s=t.ctx;void 0!==r&&(s=s.slice(),s[r]=l);const c=e&&(t.current=e)(s);let i=!1;t.block&&(t.blocks?t.blocks.forEach(((e,n)=>{n!==o&&e&&(N(),z(e,1,1,(()=>{t.blocks[n]===e&&(t.blocks[n]=null)})),U())})):t.block.d(1),c.c(),B(c,1),c.m(t.mount(),t.anchor),i=!0),t.block=c,t.blocks&&(t.blocks[o]=c),i&&O()}if((r=e)&&"object"==typeof r&&"function"==typeof r.then){const n=D();if(e.then((e=>{S(n),o(t.then,1,t.value,e),S(null)}),(e=>{if(S(n),o(t.catch,2,t.error,e),S(null),!t.hasCatch)throw e})),t.current!==t.pending)return o(t.pending,0),!0}else{if(t.current!==t.then)return o(t.then,1,t.value,e),!0;t.resolved=e}var r}function W(e){e&&e.c()}function q(e,t,o,s){const{fragment:c,on_mount:i,on_destroy:a,after_update:u}=e.$$;c&&c.m(t,o),s||_((()=>{const t=i.map(n).filter(l);a?a.push(...t):r(t),e.$$.on_mount=[]})),u.forEach(_)}function F(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Y(e,t){-1===e.$$.dirty[0]&&(A.push(e),j||(j=!0,I.then(O)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function X(t,n,l,s,c,i,a=[-1]){const u=C;S(t);const d=t.$$={fragment:null,ctx:null,props:i,update:e,not_equal:c,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:o(),dirty:a,skip_bound:!1};let f=!1;if(d.ctx=l?l(t,n.props||{},((e,n,...o)=>{const r=o.length?o[0]:n;return d.ctx&&c(d.ctx[e],d.ctx[e]=r)&&(!d.skip_bound&&d.bound[e]&&d.bound[e](r),f&&Y(t,e)),n})):[],d.update(),f=!0,r(d.before_update),d.fragment=!!s&&s(d.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);d.fragment&&d.fragment.l(e),e.forEach(h)}else d.fragment&&d.fragment.c();n.intro&&B(t.$$.fragment),q(t,n.target,n.anchor,n.customElement),O()}S(u)}class G{$destroy(){F(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Q(e){let t,n,o,r,l,s;const i=e[4].default,u=c(i,e,e[3],null);return{c(){t=y("div"),n=y("h1"),o=x(e[1]),r=v(),u&&u.c(),k(n,"class","py-4 text-4xl text-center"),k(t,"id",e[0]),k(t,"class",l="w-screen min-h-screen "+e[2])},m(e,l){$(e,t,l),m(t,n),m(n,o),m(t,r),u&&u.m(t,null),s=!0},p(e,[n]){(!s||2&n)&&w(o,e[1]),u&&u.p&&8&n&&a(u,i,e,e[3],n,null,null),(!s||1&n)&&k(t,"id",e[0]),(!s||4&n&&l!==(l="w-screen min-h-screen "+e[2]))&&k(t,"class",l)},i(e){s||(B(u,e),s=!0)},o(e){z(u,e),s=!1},d(e){e&&h(t),u&&u.d(e)}}}function V(e,t,n){let{$$slots:o={},$$scope:r}=t,{id:l}=t,{title:s}=t,{backgroundClass:c}=t;return e.$$set=e=>{"id"in e&&n(0,l=e.id),"title"in e&&n(1,s=e.title),"backgroundClass"in e&&n(2,c=e.backgroundClass),"$$scope"in e&&n(3,r=e.$$scope)},[l,s,c,r,o]}class Z extends G{constructor(e){super(),X(this,e,V,Q,s,{id:0,title:1,backgroundClass:2})}}function ee(e,t,n){const o=e.slice();return o[1]=t[n],o}function te(t){let n,o,r,l,s=t[1]+"";return{c(){n=y("div"),o=y("div"),r=x(s),l=v(),k(o,"class","px-6 py-4 text-2xl font-medium text-center"),k(n,"class","overflow-hidden shadow-xl bg-gray-50 rounded-xl dark:bg-gray-800")},m(e,t){$(e,n,t),m(n,o),m(o,r),m(n,l)},p:e,d(e){e&&h(n)}}}function ne(e){let t,n=e[0],o=[];for(let t=0;t<n.length;t+=1)o[t]=te(ee(e,n,t));return{c(){t=y("div");for(let e=0;e<o.length;e+=1)o[e].c();k(t,"class","container grid grid-cols-1 gap-4 p-4 mx-auto sm:container md:grid-cols-3 sm:grid-cols-2")},m(e,n){$(e,t,n);for(let e=0;e<o.length;e+=1)o[e].m(t,null)},p(e,r){if(1&r){let l;for(n=e[0],l=0;l<n.length;l+=1){const s=ee(e,n,l);o[l]?o[l].p(s,r):(o[l]=te(s),o[l].c(),o[l].m(t,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=n.length}},d(e){e&&h(t),b(o,e)}}}function oe(e){let t,n;return t=new Z({props:{id:"technologies",title:"Technologies I Use",backgroundClass:"bg-gray-200 dark:bg-gray-600",$$slots:{default:[ne]},$$scope:{ctx:e}}}),{c(){W(t.$$.fragment)},m(e,o){q(t,e,o),n=!0},p(e,[n]){const o={};16&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){n||(B(t.$$.fragment,e),n=!0)},o(e){z(t.$$.fragment,e),n=!1},d(e){F(t,e)}}}function re(e){return[["Python","Scikit-Learn","Tensorflow","Keras","NixOS","Bash","Awk","TypeScript","Javascript","Angular","Vue","Svelte","HTML","CSS","Java","Kotlin","SQL","Scheme"]]}class le extends G{constructor(e){super(),X(this,e,re,oe,s,{})}}function se(e){let t,n;const o=e[2].default,r=c(o,e,e[1],null);return{c(){t=y("a"),r&&r.c(),k(t,"class","mb-2 font-light text-blue-800 underline text-md hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"),k(t,"href",e[0])},m(e,o){$(e,t,o),r&&r.m(t,null),n=!0},p(e,[l]){r&&r.p&&2&l&&a(r,o,e,e[1],l,null,null),(!n||1&l)&&k(t,"href",e[0])},i(e){n||(B(r,e),n=!0)},o(e){z(r,e),n=!1},d(e){e&&h(t),r&&r.d(e)}}}function ce(e,t,n){let{$$slots:o={},$$scope:r}=t,{url:l}=t;return e.$$set=e=>{"url"in e&&n(0,l=e.url),"$$scope"in e&&n(1,r=e.$$scope)},[l,r,o]}class ie extends G{constructor(e){super(),X(this,e,ce,se,s,{url:0})}}function ae(e,t,n){const o=e.slice();return o[6]=t[n],o}function ue(e){let t,n;return{c(){t=y("div"),n=x(e[0]),k(t,"class","mb-1 text-2xl font-medium")},m(e,o){$(e,t,o),m(t,n)},p(e,t){1&t&&w(n,e[0])},d(e){e&&h(t)}}}function de(e){let t,n,o;return n=new ie({props:{url:e[2],$$slots:{default:[pe]},$$scope:{ctx:e}}}),{c(){t=y("div"),W(n.$$.fragment),k(t,"class","mb-1")},m(e,r){$(e,t,r),q(n,t,null),o=!0},p(e,t){const o={};4&t&&(o.url=e[2]),36&t&&(o.$$scope={dirty:t,ctx:e}),n.$set(o)},i(e){o||(B(n.$$.fragment,e),o=!0)},o(e){z(n.$$.fragment,e),o=!1},d(e){e&&h(t),F(n)}}}function fe(t){let n,o;return{c(){n=y("div"),o=x(t[1]),k(n,"class","mb-1 font-light text-gray-600 text-md dark:text-gray-400")},m(e,t){$(e,n,t),m(n,o)},p(e,t){2&t&&w(o,e[1])},i:e,o:e,d(e){e&&h(n)}}}function pe(e){let t;return{c(){t=x(e[2])},m(e,n){$(e,t,n)},p(e,n){4&n&&w(t,e[2])},d(e){e&&h(t)}}}function ge(e){let t,n=e[3],o=[];for(let t=0;t<n.length;t+=1)o[t]=me(ae(e,n,t));return{c(){t=y("div");for(let e=0;e<o.length;e+=1)o[e].c();k(t,"class","px-6 pt-4 pb-2 align-bottom")},m(e,n){$(e,t,n);for(let e=0;e<o.length;e+=1)o[e].m(t,null)},p(e,r){if(8&r){let l;for(n=e[3],l=0;l<n.length;l+=1){const s=ae(e,n,l);o[l]?o[l].p(s,r):(o[l]=me(s),o[l].c(),o[l].m(t,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=n.length}},d(e){e&&h(t),b(o,e)}}}function me(e){let t,n,o,r=e[6]+"";return{c(){t=y("span"),n=x(r),o=v(),k(t,"class","inline-block px-4 py-1 mb-2 mr-2 text-sm font-semibold bg-blue-300 rounded-full dark:bg-blue-800")},m(e,r){$(e,t,r),m(t,n),m(t,o)},p(e,t){8&t&&r!==(r=e[6]+"")&&w(n,r)},d(e){e&&h(t)}}}function $e(e){let t,n,o,r,l,s,i,u,d,f,p=e[0]&&ue(e);const g=[fe,de],b=[];function x(e,t){return e[1]?0:e[2]?1:-1}~(r=x(e))&&(l=b[r]=g[r](e));const w=e[4].default,C=c(w,e,e[5],null);let S=e[3]&&ge(e);return{c(){t=y("div"),n=y("div"),p&&p.c(),o=v(),l&&l.c(),s=v(),i=y("div"),C&&C.c(),u=v(),d=y("div"),S&&S.c(),k(n,"class","px-6 py-4 break-words"),k(t,"class","flex flex-col justify-between overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-800 rounded-xl")},m(e,l){$(e,t,l),m(t,n),p&&p.m(n,null),m(n,o),~r&&b[r].m(n,null),m(n,s),m(n,i),C&&C.m(i,null),m(t,u),m(t,d),S&&S.m(d,null),f=!0},p(e,[t]){e[0]?p?p.p(e,t):(p=ue(e),p.c(),p.m(n,o)):p&&(p.d(1),p=null);let c=r;r=x(e),r===c?~r&&b[r].p(e,t):(l&&(N(),z(b[c],1,1,(()=>{b[c]=null})),U()),~r?(l=b[r],l?l.p(e,t):(l=b[r]=g[r](e),l.c()),B(l,1),l.m(n,s)):l=null),C&&C.p&&32&t&&a(C,w,e,e[5],t,null,null),e[3]?S?S.p(e,t):(S=ge(e),S.c(),S.m(d,null)):S&&(S.d(1),S=null)},i(e){f||(B(l),B(C,e),f=!0)},o(e){z(l),z(C,e),f=!1},d(e){e&&h(t),p&&p.d(),~r&&b[r].d(),C&&C.d(e),S&&S.d()}}}function he(e,t,n){let{$$slots:o={},$$scope:r}=t,{title:l}=t,{subtitle:s}=t,{url:c}=t,{tags:i}=t;return e.$$set=e=>{"title"in e&&n(0,l=e.title),"subtitle"in e&&n(1,s=e.subtitle),"url"in e&&n(2,c=e.url),"tags"in e&&n(3,i=e.tags),"$$scope"in e&&n(5,r=e.$$scope)},[l,s,c,i,o,r]}class be extends G{constructor(e){super(),X(this,e,he,$e,s,{title:0,subtitle:1,url:2,tags:3})}}function ye(e,t,n){const o=e.slice();return o[5]=t[n],o}function xe(e,t,n){const o=e.slice();return o[8]=t[n],o}function ve(t){let n,o,r=t[8]+"";return{c(){n=y("li"),o=x(r)},m(e,t){$(e,n,t),m(n,o)},p:e,d(e){e&&h(n)}}}function ke(t){let n,o,r,l=t[5].description&&function(t){let n,o,r=(t[5].description??"")+"";return{c(){n=y("div"),o=x(r),k(n,"class","mb-1")},m(e,t){$(e,n,t),m(n,o)},p:e,d(e){e&&h(n)}}}(t),s=t[5].tasks,c=[];for(let e=0;e<s.length;e+=1)c[e]=ve(xe(t,s,e));return{c(){l&&l.c(),n=v(),o=y("ul");for(let e=0;e<c.length;e+=1)c[e].c();r=v(),k(o,"class","m-2 list-disc")},m(e,t){l&&l.m(e,t),$(e,n,t),$(e,o,t);for(let e=0;e<c.length;e+=1)c[e].m(o,null);$(e,r,t)},p(e,t){if(e[5].description&&l.p(e,t),2&t){let n;for(s=e[5].tasks,n=0;n<s.length;n+=1){const r=xe(e,s,n);c[n]?c[n].p(r,t):(c[n]=ve(r),c[n].c(),c[n].m(o,null))}for(;n<c.length;n+=1)c[n].d(1);c.length=s.length}},d(e){l&&l.d(e),e&&h(n),e&&h(o),b(c,e),e&&h(r)}}}function we(e){let t,n;return t=new be({props:{title:e[5].employer,subtitle:`${e[5].title}, ${e[0](e[5].startDate,e[5].endDate)}`,tags:e[5].tags,$$slots:{default:[ke]},$$scope:{ctx:e}}}),{c(){W(t.$$.fragment)},m(e,o){q(t,e,o),n=!0},p(e,n){const o={};2048&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){n||(B(t.$$.fragment,e),n=!0)},o(e){z(t.$$.fragment,e),n=!1},d(e){F(t,e)}}}function Ce(e){let t,n,o=e[1],r=[];for(let t=0;t<o.length;t+=1)r[t]=we(ye(e,o,t));const l=e=>z(r[e],1,1,(()=>{r[e]=null}));return{c(){t=y("div");for(let e=0;e<r.length;e+=1)r[e].c();k(t,"class","container grid max-w-screen-xl gap-4 p-4 mx-auto md:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-4")},m(e,o){$(e,t,o);for(let e=0;e<r.length;e+=1)r[e].m(t,null);n=!0},p(e,n){if(3&n){let s;for(o=e[1],s=0;s<o.length;s+=1){const l=ye(e,o,s);r[s]?(r[s].p(l,n),B(r[s],1)):(r[s]=we(l),r[s].c(),B(r[s],1),r[s].m(t,null))}for(N(),s=o.length;s<r.length;s+=1)l(s);U()}},i(e){if(!n){for(let e=0;e<o.length;e+=1)B(r[e]);n=!0}},o(e){r=r.filter(Boolean);for(let e=0;e<r.length;e+=1)z(r[e]);n=!1},d(e){e&&h(t),b(r,e)}}}function Se(e){let t,n;return t=new Z({props:{id:"experience",title:"Work Experience",backgroundClass:"bg-gray-200 dark:bg-gray-600",$$slots:{default:[Ce]},$$scope:{ctx:e}}}),{c(){W(t.$$.fragment)},m(e,o){q(t,e,o),n=!0},p(e,[n]){const o={};2048&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){n||(B(t.$$.fragment,e),n=!0)},o(e){z(t.$$.fragment,e),n=!1},d(e){F(t,e)}}}function De(e){const t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=new Date;function o(e){return`${t[e.getMonth()]} ${e.getFullYear()}`}return[function(e,t){var n;return`${o(e)} - ${null!==(n=o(t))&&void 0!==n?n:"Present"}`},[{employer:"CWRU Department of Computer and Data Sciences",title:"Teaching Assistant",startDate:new Date(2020,8),endDate:new Date(n.getFullYear(),n.getMonth()),description:"Classes: CSDS 391: Introduction to Artificial Intelligence, CSDS 343: Theoretical Computer Science",tasks:["Designed and graded course assignments and exams","Taught supplementary lectures to reinforce course material","Hosted weekly office hours to answer questions and provide feedback on theoretical written work and programming assignments"],tags:["Machine Learning","Reinforcement Learning","Bayesian Networks","Theory of Computation"]},{employer:"Johns Hopkins University Applied Physics Laboratory",title:"Machine Learning & Software Engineering Intern",startDate:new Date(2020,3),endDate:new Date(2020,7),tasks:["Designed random forest, Bayesian network, and deep learning models for viral and bacterial threat classification using Scikit-Learn, Tensorflow, and Keras","Implemented a data processing pipeline using dna2vec to perform feature extraction and dimensionality reduction from sequenced DNA","Contributed to a large scale Angular application to provide an online learing approach to automated document tagging and classification"],tags:["Python","Machine Learning","Tensorflow","dna2vec"]},{employer:"Johns Hopkins University Applied Physics Laboratory",title:"Software Engineering Intern",startDate:new Date(2019,4),endDate:new Date(2020,7),tasks:["Worked in a Kanban development environment to quickly and effectively produce thoroughly documented, tested software for contract sponsors","Contributed to an Android application written in Java and Kotlin to implement an attachment cache mechanism, reducing form upload time by as much as 75%","Developed a web application with spring boot backend, Angular frontend, and Selenium unit tests, utilizing an internally designed UI library to deliver Elasticsearch social media analytics"],tags:["Java","Kotlin","Angular","Typescript","Selenium"]},{employer:"Agriplex Genomics",title:"Software Engineering Intern",startDate:new Date(2018,8),endDate:new Date(2019,4),tasks:["Developed a job scheduling application from scratch in Angular and designed an algorithm to optimize job scheduling to increase data throughput.","Designed a Postgres database model to store jobs and their associated data, and built a corresponding REST API to allow application interaction.","Created an Amazon AWS management server to create and destroy EC2 instances to efficiently allocate funds and expedite job processing."],tags:["Angular","Typescript","Postgres","AWS"]}]]}class Ae extends G{constructor(e){super(),X(this,e,De,Se,s,{})}}function Le(e){let t,n;const o=e[1].default,r=c(o,e,e[0],null);return{c(){t=y("div"),r&&r.c(),k(t,"class","container p-4 mx-auto text-lg font-light md:max-w-prose")},m(e,o){$(e,t,o),r&&r.m(t,null),n=!0},p(e,[t]){r&&r.p&&1&t&&a(r,o,e,e[0],t,null,null)},i(e){n||(B(r,e),n=!0)},o(e){z(r,e),n=!1},d(e){e&&h(t),r&&r.d(e)}}}function Te(e,t,n){let{$$slots:o={},$$scope:r}=t;return e.$$set=e=>{"$$scope"in e&&n(0,r=e.$$scope)},[r,o]}class Ee extends G{constructor(e){super(),X(this,e,Te,Le,s,{})}}function Ie(e){let t;return{c(){t=x("CWRU Department of Computer and Data Sciences")},m(e,n){$(e,t,n)},d(e){e&&h(t)}}}function je(e){let t;return{c(){t=x("Johns Hopkins University Applied Physics Laboratory\n            ")},m(e,n){$(e,t,n)},d(e){e&&h(t)}}}function _e(e){let t,n,o,r,l,s,c,i,a,u,d,f,p,g,b,k,w,C,S,D;return d=new ie({props:{url:"https://engineering.case.edu/computer-and-data-sciences/academics/computer-science/bachelor-science",$$slots:{default:[Ie]},$$scope:{ctx:e}}}),C=new ie({props:{url:"https://www.jhuapl.edu/",$$slots:{default:[je]},$$scope:{ctx:e}}}),{c(){t=y("p"),t.textContent="Hey, I'm Kennan!",n=v(),o=y("br"),r=v(),l=y("p"),l.textContent="I'm a recent Computer Science graduate and current M.S. Computer\n            Science candidate at Case Western Reserve University.​ I started\n            programming on calculators with TI-BASIC back in high school, and\n            I've been addicted ever since. Outside of my studies, I'm an avid\n            cyclist, musician, linux enthusiast, and speedcuber.",s=v(),c=y("br"),i=v(),a=y("p"),u=x("I currently do research in the "),W(d.$$.fragment),f=x("\n            under Dr. Soumya Ray. My work investigates the properties of knowledge\n            propogation through social networks in multi-agent learning systems,\n            and aims to develop dynamic optimization methods to achieve faster training\n            convergence for the network as a whole."),p=v(),g=y("br"),b=v(),k=y("p"),w=x("After graduation, I'm transitioning to full time work on Software\n            Engineering and Data Science at the\n            "),W(C.$$.fragment),S=x(", where I do work on machine learning research for DNA threat\n            classification and full stack software engineering with Angular and\n            Spring.")},m(e,h){$(e,t,h),$(e,n,h),$(e,o,h),$(e,r,h),$(e,l,h),$(e,s,h),$(e,c,h),$(e,i,h),$(e,a,h),m(a,u),q(d,a,null),m(a,f),$(e,p,h),$(e,g,h),$(e,b,h),$(e,k,h),m(k,w),q(C,k,null),m(k,S),D=!0},p(e,t){const n={};1&t&&(n.$$scope={dirty:t,ctx:e}),d.$set(n);const o={};1&t&&(o.$$scope={dirty:t,ctx:e}),C.$set(o)},i(e){D||(B(d.$$.fragment,e),B(C.$$.fragment,e),D=!0)},o(e){z(d.$$.fragment,e),z(C.$$.fragment,e),D=!1},d(e){e&&h(t),e&&h(n),e&&h(o),e&&h(r),e&&h(l),e&&h(s),e&&h(c),e&&h(i),e&&h(a),F(d),e&&h(p),e&&h(g),e&&h(b),e&&h(k),F(C)}}}function Me(e){let t,n;return t=new Ee({props:{$$slots:{default:[_e]},$$scope:{ctx:e}}}),{c(){W(t.$$.fragment)},m(e,o){q(t,e,o),n=!0},p(e,n){const o={};1&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){n||(B(t.$$.fragment,e),n=!0)},o(e){z(t.$$.fragment,e),n=!1},d(e){F(t,e)}}}function Pe(e){let t,n;return t=new Z({props:{id:"about",title:"The Essentials",backgroundClass:"bg-blue-200 dark:bg-blue-900",$$slots:{default:[Me]},$$scope:{ctx:e}}}),{c(){W(t.$$.fragment)},m(e,o){q(t,e,o),n=!0},p(e,[n]){const o={};1&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){n||(B(t.$$.fragment,e),n=!0)},o(e){z(t.$$.fragment,e),n=!1},d(e){F(t,e)}}}class Oe extends G{constructor(e){super(),X(this,e,null,Pe,s,{})}}var Je={$:e=>"string"==typeof e?document.querySelector(e):e,extend:(...e)=>Object.assign(...e),cumulativeOffset(e){let t=0,n=0;do{t+=e.offsetTop||0,n+=e.offsetLeft||0,e=e.offsetParent}while(e);return{top:t,left:n}},directScroll:e=>e&&e!==document&&e!==document.body,scrollTop(e,t){let n=void 0!==t;return this.directScroll(e)?n?e.scrollTop=t:e.scrollTop:n?document.documentElement.scrollTop=document.body.scrollTop=t:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},scrollLeft(e,t){let n=void 0!==t;return this.directScroll(e)?n?e.scrollLeft=t:e.scrollLeft:n?document.documentElement.scrollLeft=document.body.scrollLeft=t:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0}};const He={container:"body",duration:500,delay:0,offset:0,easing:function(e){return e<.5?4*e*e*e:.5*Math.pow(2*e-2,3)+1},onStart:e,onDone:e,onAborting:e,scrollX:!1,scrollY:!0},Ke=e=>{let{offset:t,duration:n,delay:o,easing:r,x:l=0,y:s=0,scrollX:c,scrollY:i,onStart:a,onDone:u,container:m,onAborting:$,element:h}=e;"function"==typeof t&&(t=t());var b=Je.cumulativeOffset(m),y=h?Je.cumulativeOffset(h):{top:s,left:l},x=Je.scrollLeft(m),v=Je.scrollTop(m),k=y.left-b.left+t,w=y.top-b.top+t,C=k-x,S=w-v;let D=!0,A=!1,L=d()+o,T=L+n;function E(e){e||(A=!0,a(h,{x:l,y:s}))}function I(e){!function(e,t,n){c&&Je.scrollLeft(e,n),i&&Je.scrollTop(e,t)}(m,v+S*e,x+C*e)}function j(){D=!1}return function(e){let t;0===p.size&&f(g),new Promise((n=>{p.add(t={c:e,f:n})}))}((e=>{if(!A&&e>=L&&E(!1),A&&e>=T&&(I(1),j(),u(h,{x:l,y:s})),!D)return $(h,{x:l,y:s}),!1;if(A){I(0+1*r((e-L)/n))}return!0})),E(o),I(0),j},Ne=(Ue=e=>Ke((e=>{let t=Je.extend({},He,e);return t.container=Je.$(t.container),t.element=Je.$(t.element),t})(e)),(e,t)=>{let n=t;const o=e=>{e.preventDefault(),Ue("string"==typeof n?{element:n}:n)};return e.addEventListener("click",o),e.addEventListener("touchstart",o),{update(e){n=e},destroy(){e.removeEventListener("click",o),e.removeEventListener("touchstart",o)}}});var Ue;function Be(t){let n,o,r,s,c,i;return{c(){n=y("a"),o=y("i"),k(o,"class",r=t[3]+" "+t[1]),k(n,"target","_blank"),k(n,"rel","noopener noreferrer"),k(n,"alt",t[2]),k(n,"aria-label",t[2]),k(n,"href",t[0])},m(r,a){var u;$(r,n,a),m(n,o),c||(u=s=Ne.call(null,n,t[4]),i=u&&l(u.destroy)?u.destroy:e,c=!0)},p(e,[t]){10&t&&r!==(r=e[3]+" "+e[1])&&k(o,"class",r),4&t&&k(n,"alt",e[2]),4&t&&k(n,"aria-label",e[2]),1&t&&k(n,"href",e[0]),s&&l(s.update)&&16&t&&s.update.call(null,e[4])},i:e,o:e,d(e){e&&h(n),c=!1,i()}}}function ze(e,t,n){let{link:o}=t,{iconClass:r}=t,{name:l}=t,{colorClass:s="text-blue-300 hover:text-blue-500"}=t,{scrollId:c=""}=t;return e.$$set=e=>{"link"in e&&n(0,o=e.link),"iconClass"in e&&n(1,r=e.iconClass),"name"in e&&n(2,l=e.name),"colorClass"in e&&n(3,s=e.colorClass),"scrollId"in e&&n(4,c=e.scrollId)},[o,r,l,s,c]}class Re extends G{constructor(e){super(),X(this,e,ze,Be,s,{link:0,iconClass:1,name:2,colorClass:3,scrollId:4})}}function We(e,t,n){const o=e.slice();return o[1]=t[n],o}function qe(e){let n,o,r,l;const s=[e[1],{colorClass:Ye+" hover:"+Xe}];let c={};for(let e=0;e<s.length;e+=1)c=t(c,s[e]);return o=new Re({props:c}),{c(){n=y("span"),W(o.$$.fragment),r=v(),k(n,"class","m-5")},m(e,t){$(e,n,t),q(o,n,null),m(n,r),l=!0},p(e,t){const n=1&t?function(e,t){const n={},o={},r={$$scope:1};let l=e.length;for(;l--;){const s=e[l],c=t[l];if(c){for(const e in s)e in c||(o[e]=1);for(const e in c)r[e]||(n[e]=c[e],r[e]=1);e[l]=c}else for(const e in s)r[e]=1}for(const e in o)e in n||(n[e]=void 0);return n}(s,[1&t&&(r=e[1],"object"==typeof r&&null!==r?r:{}),0&t&&{colorClass:Ye+" hover:"+Xe}]):{};var r;o.$set(n)},i(e){l||(B(o.$$.fragment,e),l=!0)},o(e){z(o.$$.fragment,e),l=!1},d(e){e&&h(n),F(o)}}}function Fe(e){let t,n,o,r,l,s,c,i,a,u,d,f,p=e[0],g=[];for(let t=0;t<p.length;t+=1)g[t]=qe(We(e,p,t));const w=e=>z(g[e],1,1,(()=>{g[e]=null}));return d=new Re({props:{link:"#about",scrollId:"#about",name:"scroll down",colorClass:Ye+" hover:"+Xe,iconClass:"fas fa-chevron-circle-down fa-2x"}}),{c(){t=y("div"),n=y("div"),o=v(),r=y("div"),l=y("h1"),s=x("Hi, I'm Kennan."),c=v(),i=y("span");for(let e=0;e<g.length;e+=1)g[e].c();a=v(),u=y("div"),W(d.$$.fragment),k(n,"class","w-0 h-0"),k(l,"class","text-5xl m-6 text-center "+Ye+" font-light"),k(u,"class","py-20"),k(t,"class","flex flex-col items-center justify-around min-w-full min-h-screen bg-center bg-no-repeat bg-cover lg:bg-fixed svelte-hvsf42"),k(t,"id","bg")},m(e,p){$(e,t,p),m(t,n),m(t,o),m(t,r),m(r,l),m(l,s),m(r,c),m(r,i);for(let e=0;e<g.length;e+=1)g[e].m(i,null);m(t,a),m(t,u),q(d,u,null),f=!0},p(e,[t]){if(1&t){let n;for(p=e[0],n=0;n<p.length;n+=1){const o=We(e,p,n);g[n]?(g[n].p(o,t),B(g[n],1)):(g[n]=qe(o),g[n].c(),B(g[n],1),g[n].m(i,null))}for(N(),n=p.length;n<g.length;n+=1)w(n);U()}},i(e){if(!f){for(let e=0;e<p.length;e+=1)B(g[e]);B(d.$$.fragment,e),f=!0}},o(e){g=g.filter(Boolean);for(let e=0;e<g.length;e+=1)z(g[e]);z(d.$$.fragment,e),f=!1},d(e){e&&h(t),b(g,e),F(d)}}}let Ye="text-blue-300",Xe="text-blue-500";function Ge(e){return[[{link:"https://github.com/kclejeune",iconClass:"fa-2x fab fa-github",name:"GitHub"},{link:"https://linkedin.com/in/kclejeune",iconClass:"fa-2x fab fa-linkedin",name:"LinkedIn"},{link:"https://keybase.io/kclejeune",iconClass:"fa-2x fab fa-keybase",name:"Keybase"},{link:"mailto:contact@kclj.io",iconClass:"fa-2x far fa-envelope",name:"Email"},{link:"https://kclejeune.keybase.pub/resume.pdf",iconClass:"fa-2x far fa-file-alt",name:"Resume"}]]}class Qe extends G{constructor(e){super(),X(this,e,Ge,Fe,s,{})}}function Ve(e){let t;return{c(){t=y("div"),t.innerHTML='<div class="h-8 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div> \n        <div class="h-8 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div> \n        <div class="h-8 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div> \n        <div class="h-8 col-span-2 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div> \n        <div class="h-8 bg-gray-200 rounded dark:bg-gray-600 animate-pulse"></div> \n        <div class="..."></div> \n        <div class="col-span-2 ..."></div>',k(t,"class","grid grid-cols-3 gap-4 mt-2")},m(e,n){$(e,t,n)},d(e){e&&h(t)}}}function Ze(e){let t,n;return t=new be({props:{title:"Loading...",$$slots:{default:[Ve]},$$scope:{ctx:e}}}),{c(){W(t.$$.fragment)},m(e,o){q(t,e,o),n=!0},p(e,[n]){const o={};1&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){n||(B(t.$$.fragment,e),n=!0)},o(e){z(t.$$.fragment,e),n=!1},d(e){F(t,e)}}}class et extends G{constructor(e){super(),X(this,e,null,Ze,s,{})}}function tt(e,t,n){const o=e.slice();return o[4]=t[n],o}function nt(t){return{c:e,m:e,p:e,i:e,o:e,d:e}}function ot(e){let t,n,o=e[3],r=[];for(let t=0;t<o.length;t+=1)r[t]=lt(tt(e,o,t));const l=e=>z(r[e],1,1,(()=>{r[e]=null}));return{c(){for(let e=0;e<r.length;e+=1)r[e].c();t=x("")},m(e,o){for(let t=0;t<r.length;t+=1)r[t].m(e,o);$(e,t,o),n=!0},p(e,n){if(1&n){let s;for(o=e[3],s=0;s<o.length;s+=1){const l=tt(e,o,s);r[s]?(r[s].p(l,n),B(r[s],1)):(r[s]=lt(l),r[s].c(),B(r[s],1),r[s].m(t.parentNode,t))}for(N(),s=o.length;s<r.length;s+=1)l(s);U()}},i(e){if(!n){for(let e=0;e<o.length;e+=1)B(r[e]);n=!0}},o(e){r=r.filter(Boolean);for(let e=0;e<r.length;e+=1)z(r[e]);n=!1},d(e){b(r,e),e&&h(t)}}}function rt(t){let n,o,r,l=t[4].description+"",s=t[4].stars>0&&function(t){let n,o,r,l=t[4].stars+"";return{c(){n=y("div"),o=x("Stars: "),r=x(l)},m(e,t){$(e,n,t),m(n,o),m(n,r)},p:e,d(e){e&&h(n)}}}(t);return{c(){s&&s.c(),n=v(),o=x(l),r=v()},m(e,t){s&&s.m(e,t),$(e,n,t),$(e,o,t),$(e,r,t)},p(e,t){e[4].stars>0&&s.p(e,t)},d(e){s&&s.d(e),e&&h(n),e&&h(o),e&&h(r)}}}function lt(e){let t,n;return t=new be({props:{title:ut(e[4].repo.replaceAll("-"," ")),url:e[4].link,tags:[e[4].language],$$slots:{default:[rt]},$$scope:{ctx:e}}}),{c(){W(t.$$.fragment)},m(e,o){q(t,e,o),n=!0},p(e,n){const o={};128&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){n||(B(t.$$.fragment,e),n=!0)},o(e){z(t.$$.fragment,e),n=!1},d(e){F(t,e)}}}function st(t){let n,o;return n=new et({}),{c(){W(n.$$.fragment)},m(e,t){q(n,e,t),o=!0},p:e,i(e){o||(B(n.$$.fragment,e),o=!0)},o(e){z(n.$$.fragment,e),o=!1},d(e){F(n,e)}}}function ct(e){let t,n,o={ctx:e,current:null,token:null,hasCatch:!1,pending:st,then:ot,catch:nt,value:3,blocks:[,,,]};return R(e[0],o),{c(){t=y("div"),o.block.c(),k(t,"class","container grid max-w-screen-xl gap-4 p-4 mx-auto md:grid-cols-1 xl:grid-cols-2")},m(e,r){$(e,t,r),o.block.m(t,o.anchor=null),o.mount=()=>t,o.anchor=null,n=!0},p(t,n){{const r=(e=t).slice();r[3]=o.resolved,o.block.p(r,n)}},i(e){n||(B(o.block),n=!0)},o(e){for(let e=0;e<3;e+=1){z(o.blocks[e])}n=!1},d(e){e&&h(t),o.block.d(),o.token=null,o=null}}}function it(e){let t,n;return t=new Z({props:{id:"projects",title:"Projects",backgroundClass:"bg-blue-200 dark:bg-blue-900",$$slots:{default:[ct]},$$scope:{ctx:e}}}),{c(){W(t.$$.fragment)},m(e,o){q(t,e,o),n=!0},p(e,[n]){const o={};128&n&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){n||(B(t.$$.fragment,e),n=!0)},o(e){z(t.$$.fragment,e),n=!1},d(e){F(t,e)}}}const at="kclejeune";function ut(e){return e.includes(at)?e:e.replace(/\w\S*/g,(e=>e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()))}function dt(e){var t=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,l){function s(e){try{i(o.next(e))}catch(e){l(e)}}function c(e){try{i(o.throw(e))}catch(e){l(e)}}function i(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}i((o=o.apply(e,t||[])).next())}))};return[function(){return t(this,void 0,void 0,(function*(){return fetch("https://gh-pinned-repos-5l2i19um3.vercel.app/?username=kclejeune").then((e=>e.json())).then((e=>e.sort(((e,t)=>t.stars-e.stars))))}))}()]}class ft extends G{constructor(e){super(),X(this,e,dt,it,s,{})}}function pt(t){let n,o,r,l,s,c,i,a,u,d,f;return o=new Qe({}),l=new Oe({}),c=new Ae({}),a=new ft({}),d=new le({}),{c(){n=y("main"),W(o.$$.fragment),r=v(),W(l.$$.fragment),s=v(),W(c.$$.fragment),i=v(),W(a.$$.fragment),u=v(),W(d.$$.fragment)},m(e,t){$(e,n,t),q(o,n,null),m(n,r),q(l,n,null),m(n,s),q(c,n,null),m(n,i),q(a,n,null),m(n,u),q(d,n,null),f=!0},p:e,i(e){f||(B(o.$$.fragment,e),B(l.$$.fragment,e),B(c.$$.fragment,e),B(a.$$.fragment,e),B(d.$$.fragment,e),f=!0)},o(e){z(o.$$.fragment,e),z(l.$$.fragment,e),z(c.$$.fragment,e),z(a.$$.fragment,e),z(d.$$.fragment,e),f=!1},d(e){e&&h(n),F(o),F(l),F(c),F(a),F(d)}}}return new class extends G{constructor(e){super(),X(this,e,null,pt,s,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
