(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[7],{114:function(e,t,r){"use strict";r.r(t);var c=r(5),n=r(3),a=r(0),s=r(77),i=r(85),o=r(79),u=r(2);t.default=function(e){var t=e.Component,r=e.dataType,l=Object(n.o)().id,p=Object(a.useState)(null),b=Object(c.a)(p,2),j=b[0],f=b[1],d=Object(s.a)(),h=d.getComic,m=d.getCharacter,v=d.clearError,O=d.process,x=d.setProcess;Object(a.useEffect)((function(){g()}),[l]);var g=function(){switch(v(),r){case"comic":h(l).then(k).then((function(){return x("confirmed")}));break;case"character":m(l).then(k).then((function(){return x("confirmed")}))}},k=function(e){f(e)};return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(i.a,{}),Object(o.a)(O,t,j)]})}},76:function(e,t,r){"use strict";var c=r.p+"static/media/error.42292aa1.gif",n=r(2);t.a=function(){return Object(n.jsx)("img",{style:{display:"block",width:"250px",height:"250px",objectFit:"contain",margin:"0 auto"},src:c,alt:"Error"})}},77:function(e,t,r){"use strict";var c=r(4),n=r(7),a=r(5),s=r(0);t.a=function(){var e=function(){var e=Object(s.useState)("waiting"),t=Object(a.a)(e,2),r=t[0],i=t[1],o=Object(s.useCallback)(function(){var e=Object(n.a)(Object(c.a)().mark((function e(t){var r,n,a,s,o,u=arguments;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=u.length>1&&void 0!==u[1]?u[1]:"GET",n=u.length>2&&void 0!==u[2]?u[2]:null,a=u.length>3&&void 0!==u[3]?u[3]:{"Content-Type":"application/json"},i("loading"),e.prev=4,e.next=7,fetch(t,{method:r,body:n,headers:a});case 7:if((s=e.sent).ok){e.next=10;break}throw new Error("Could not fetch ".concat(t,", status: ").concat(s.status));case 10:return e.next=12,s.json();case 12:return o=e.sent,e.abrupt("return",o);case 16:throw e.prev=16,e.t0=e.catch(4),i("error"),e.t0;case 20:case"end":return e.stop()}}),e,null,[[4,16]])})));return function(t){return e.apply(this,arguments)}}(),[]);return{request:o,clearError:Object(s.useCallback)((function(){i("loading")}),[]),process:r,setProcess:i}}(),t=e.request,r=e.clearError,i=e.process,o=e.setProcess,u="https://gateway.marvel.com:443/v1/public/",l="apikey=a6eacca719853626695a719b3c3ca442",p=function(){var e=Object(n.a)(Object(c.a)().mark((function e(r){var n;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t("".concat(u,"characters/").concat(r,"?").concat(l));case 2:return n=e.sent,e.abrupt("return",d(n.data.results[0]));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(n.a)(Object(c.a)().mark((function e(r){var n;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t("".concat(u,"characters?name=").concat(r,"&").concat(l));case 2:return n=e.sent,e.abrupt("return",n.data.results.map(d));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j=function(){var e=Object(n.a)(Object(c.a)().mark((function e(r){var n;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t("".concat(u,"comics/").concat(r,"?").concat(l));case 2:return n=e.sent,e.abrupt("return",h(n.data.results[0]));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=function(){var e=Object(n.a)(Object(c.a)().mark((function e(r,n){var a,s,i=arguments;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=i.length>2&&void 0!==i[2]?i[2]:210,e.next=3,t("".concat(u).concat(n,"?limit=").concat(r,"&offset=").concat(a,"&").concat(l));case 3:if(s=e.sent,"comics"!==n){e.next=8;break}return e.abrupt("return",s.data.results.map(h));case 8:return e.abrupt("return",s.data.results.map(d));case 9:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),d=function(e){return{name:e.name,id:e.id,description:e.description,thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,homepage:e.urls[0].url,wiki:e.urls[1].url,comics:e.comics.items}},h=function(e){return{title:e.title,id:e.id,price:e.prices[0].price,thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,desc:e.description,pageCount:e.pageCount,language:e.textObjects.language}};return{clearError:r,getCharacter:p,getComic:j,getAllList:f,getCharacterByName:b,process:i,setProcess:o}}},79:function(e,t,r){"use strict";var c=r(28),n=r(76),a=(r(80),r(2)),s=function(){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("p",{className:"char__select",children:"Please select a character to see information"}),Object(a.jsxs)("div",{className:"skeleton",children:[Object(a.jsxs)("div",{className:"pulse skeleton__header",children:[Object(a.jsx)("div",{className:"pulse skeleton__circle"}),Object(a.jsx)("div",{className:"pulse skeleton__mini"})]}),Object(a.jsx)("div",{className:"pulse skeleton__block"}),Object(a.jsx)("div",{className:"pulse skeleton__block"}),Object(a.jsx)("div",{className:"pulse skeleton__block"})]})]})};t.a=function(e,t,r){switch(e){case"waiting":return Object(a.jsx)(s,{});case"loading":return Object(a.jsx)(c.a,{});case"confirmed":return Object(a.jsx)(t,{data:r});case"error":return Object(a.jsx)(n.a,{});default:throw new Error("Unexpected process state")}}},80:function(e,t,r){},84:function(e,t,r){},85:function(e,t,r){"use strict";r(84);var c=r.p+"static/media/Avengers.4065c8f9.png",n=r.p+"static/media/Avengers_logo.9eaf2193.png",a=r(2);t.a=function(){return Object(a.jsxs)("div",{className:"app__banner",children:[Object(a.jsx)("img",{src:c,alt:"Avengers"}),Object(a.jsxs)("div",{className:"app__banner-text",children:["New comics every week!",Object(a.jsx)("br",{}),"Stay tuned!"]}),Object(a.jsx)("img",{src:n,alt:"Avengers logo"})]})}}}]);
//# sourceMappingURL=7.965a38e6.chunk.js.map