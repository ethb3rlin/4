(self.webpackChunkethberlin=self.webpackChunkethberlin||[]).push([[295],{2993:function(e){var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function a(e,i){if(e===i)return!0;if(e&&i&&"object"==typeof e&&"object"==typeof i){if(e.constructor!==i.constructor)return!1;var c,l,s,u;if(Array.isArray(e)){if((c=e.length)!=i.length)return!1;for(l=c;0!=l--;)if(!a(e[l],i[l]))return!1;return!0}if(n&&e instanceof Map&&i instanceof Map){if(e.size!==i.size)return!1;for(u=e.entries();!(l=u.next()).done;)if(!i.has(l.value[0]))return!1;for(u=e.entries();!(l=u.next()).done;)if(!a(l.value[1],i.get(l.value[0])))return!1;return!0}if(r&&e instanceof Set&&i instanceof Set){if(e.size!==i.size)return!1;for(u=e.entries();!(l=u.next()).done;)if(!i.has(l.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(i)){if((c=e.length)!=i.length)return!1;for(l=c;0!=l--;)if(e[l]!==i[l])return!1;return!0}if(e.constructor===RegExp)return e.source===i.source&&e.flags===i.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===i.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===i.toString();if((c=(s=Object.keys(e)).length)!==Object.keys(i).length)return!1;for(l=c;0!=l--;)if(!Object.prototype.hasOwnProperty.call(i,s[l]))return!1;if(t&&e instanceof Element)return!1;for(l=c;0!=l--;)if(("_owner"!==s[l]&&"__v"!==s[l]&&"__o"!==s[l]||!e.$$typeof)&&!a(e[s[l]],i[s[l]]))return!1;return!0}return e!=e&&i!=i}e.exports=function(e,t){try{return a(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},4839:function(e,t,n){"use strict";var r,o=n(7294),a=(r=o)&&"object"==typeof r&&"default"in r?r.default:r;function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var l,s=[];function u(){l=e(s.map((function(e){return e.props}))),f.canUseDOM?t(l):n&&(l=n(l))}var f=function(e){var t,n;function o(){return e.apply(this,arguments)||this}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,o.peek=function(){return l},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=l;return l=void 0,s=[],e};var i=o.prototype;return i.UNSAFE_componentWillMount=function(){s.push(this),u()},i.componentDidUpdate=function(){u()},i.componentWillUnmount=function(){var e=s.indexOf(this);s.splice(e,1),u()},i.render=function(){return a.createElement(r,this.props)},o}(o.PureComponent);return i(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),i(f,"canUseDOM",c),f}}},7371:function(e,t,n){"use strict";n.d(t,{Z:function(){return xe}});var r,o,a,i,c=n(7294),l=n(5697),s=n.n(l),u=n(4839),f=n.n(u),m=n(2993),p=n.n(m),d=n(6494),h=n.n(d),y="bodyAttributes",b="htmlAttributes",g="titleAttributes",v={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},D=(Object.keys(v).map((function(e){return v[e]})),"charset"),E="cssText",T="href",w="http-equiv",x="innerHTML",C="itemprop",A="name",O="property",N="rel",S="src",k="target",j={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},P="defaultTitle",L="defer",I="encodeSpecialCharacters",M="onChangeClientState",R="titleTemplate",_=Object.keys(j).reduce((function(e,t){return e[j[t]]=t,e}),{}),B=[v.NOSCRIPT,v.SCRIPT,v.STYLE],z="data-react-helmet",H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},F=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),U=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Y=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},K=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},V=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},W=function(e){var t=G(e,v.TITLE),n=G(e,R);if(n&&t)return n.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var r=G(e,P);return t||r||void 0},$=function(e){return G(e,M)||function(){}},Q=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return U({},e,t)}),{})},X=function(e,t){return t.filter((function(e){return void 0!==e[v.BASE]})).map((function(e){return e[v.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var a=r[o].toLowerCase();if(-1!==e.indexOf(a)&&n[a])return t.concat(n)}return t}),[])},Z=function(e,t,n){var r={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&re("Helmet: "+e+' should be of type "Array". Instead found type "'+H(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var o={};n.filter((function(e){for(var n=void 0,a=Object.keys(e),i=0;i<a.length;i++){var c=a[i],l=c.toLowerCase();-1===t.indexOf(l)||n===N&&"canonical"===e[n].toLowerCase()||l===N&&"stylesheet"===e[l].toLowerCase()||(n=l),-1===t.indexOf(c)||c!==x&&c!==E&&c!==C||(n=c)}if(!n||!e[n])return!1;var s=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][s]&&(o[n][s]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var a=Object.keys(o),i=0;i<a.length;i++){var c=a[i],l=h()({},r[c],o[c]);r[c]=l}return e}),[]).reverse()},G=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},J=(r=Date.now(),function(e){var t=Date.now();t-r>16?(r=t,e(t)):setTimeout((function(){J(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||J:n.g.requestAnimationFrame||J,ne="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:n.g.cancelAnimationFrame||ee,re=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},oe=null,ae=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,l=e.onChangeClientState,s=e.scriptTags,u=e.styleTags,f=e.title,m=e.titleAttributes;le(v.BODY,r),le(v.HTML,o),ce(f,m);var p={baseTag:se(v.BASE,n),linkTags:se(v.LINK,a),metaTags:se(v.META,i),noscriptTags:se(v.NOSCRIPT,c),scriptTags:se(v.SCRIPT,s),styleTags:se(v.STYLE,u)},d={},h={};Object.keys(p).forEach((function(e){var t=p[e],n=t.newTags,r=t.oldTags;n.length&&(d[e]=n),r.length&&(h[e]=p[e].oldTags)})),t&&t(),l(e,d,h)},ie=function(e){return Array.isArray(e)?e.join(""):e},ce=function(e,t){void 0!==e&&document.title!==e&&(document.title=ie(e)),le(v.TITLE,t)},le=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(z),o=r?r.split(","):[],a=[].concat(o),i=Object.keys(t),c=0;c<i.length;c++){var l=i[c],s=t[l]||"";n.getAttribute(l)!==s&&n.setAttribute(l,s),-1===o.indexOf(l)&&o.push(l);var u=a.indexOf(l);-1!==u&&a.splice(u,1)}for(var f=a.length-1;f>=0;f--)n.removeAttribute(a[f]);o.length===a.length?n.removeAttribute(z):n.getAttribute(z)!==i.join(",")&&n.setAttribute(z,i.join(","))}},se=function(e,t){var n=document.head||document.querySelector(v.HEAD),r=n.querySelectorAll(e+"["+"data-react-helmet]"),o=Array.prototype.slice.call(r),a=[],i=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===x)n.innerHTML=t.innerHTML;else if(r===E)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[r]?"":t[r];n.setAttribute(r,c)}n.setAttribute(z,"true"),o.some((function(e,t){return i=t,n.isEqualNode(e)}))?o.splice(i,1):a.push(n)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),a.forEach((function(e){return n.appendChild(e)})),{oldTags:o,newTags:a}},ue=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},fe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[j[n]||n]=e[n],t}),t)},me=function(e,t,n){switch(e){case v.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})[z]=!0,o=fe(n,r),[c.createElement(v.TITLE,o,e)];var e,n,r,o},toString:function(){return function(e,t,n,r){var o=ue(n),a=ie(t);return o?"<"+e+' data-react-helmet="true" '+o+">"+V(a,r)+"</"+e+">":"<"+e+' data-react-helmet="true">'+V(a,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case y:case b:return{toComponent:function(){return fe(t)},toString:function(){return ue(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,o=((r={key:n})[z]=!0,r);return Object.keys(t).forEach((function(e){var n=j[e]||e;if(n===x||n===E){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]})),c.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var o=Object.keys(r).filter((function(e){return!(e===x||e===E)})).reduce((function(e,t){var o=void 0===r[t]?t:t+'="'+V(r[t],n)+'"';return e?e+" "+o:o}),""),a=r.innerHTML||r.cssText||"",i=-1===B.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+o+(i?"/>":">"+a+"</"+e+">")}),"")}(e,t,n)}}}},pe=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,l=e.scriptTags,s=e.styleTags,u=e.title,f=void 0===u?"":u,m=e.titleAttributes;return{base:me(v.BASE,t,r),bodyAttributes:me(y,n,r),htmlAttributes:me(b,o,r),link:me(v.LINK,a,r),meta:me(v.META,i,r),noscript:me(v.NOSCRIPT,c,r),script:me(v.SCRIPT,l,r),style:me(v.STYLE,s,r),title:me(v.TITLE,{title:f,titleAttributes:m},r)}},de=f()((function(e){return{baseTag:X([T,k],e),bodyAttributes:Q(y,e),defer:G(e,L),encode:G(e,I),htmlAttributes:Q(b,e),linkTags:Z(v.LINK,[N,T],e),metaTags:Z(v.META,[A,D,w,O,C],e),noscriptTags:Z(v.NOSCRIPT,[x],e),onChangeClientState:$(e),scriptTags:Z(v.SCRIPT,[S,x],e),styleTags:Z(v.STYLE,[E],e),title:W(e),titleAttributes:Q(g,e)}}),(function(e){oe&&ne(oe),e.defer?oe=te((function(){ae(e,(function(){oe=null}))})):(ae(e),oe=null)}),pe)((function(){return null})),he=(o=de,i=a=function(e){function t(){return q(this,t),K(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!p()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case v.SCRIPT:case v.NOSCRIPT:return{innerHTML:t};case v.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,a=e.nestedChildren;return U({},r,((t={})[n.type]=[].concat(r[n.type]||[],[U({},o,this.mapNestedChildrenToProps(n,a))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,a=e.newChildProps,i=e.nestedChildren;switch(r.type){case v.TITLE:return U({},o,((t={})[r.type]=i,t.titleAttributes=U({},a),t));case v.BODY:return U({},o,{bodyAttributes:U({},a)});case v.HTML:return U({},o,{htmlAttributes:U({},a)})}return U({},o,((n={})[r.type]=U({},a),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=U({},t);return Object.keys(e).forEach((function(t){var r;n=U({},n,((r={})[t]=e[t],r))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return c.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,a=o.children,i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[_[n]||n]=e[n],t}),t)}(Y(o,["children"]));switch(n.warnOnInvalidChildren(e,a),e.type){case v.LINK:case v.META:case v.NOSCRIPT:case v.SCRIPT:case v.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:i,nestedChildren:a});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:i,nestedChildren:a})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=Y(e,["children"]),r=U({},n);return t&&(r=this.mapChildrenToProps(t,r)),c.createElement(o,r)},F(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(c.Component),a.propTypes={base:s().object,bodyAttributes:s().object,children:s().oneOfType([s().arrayOf(s().node),s().node]),defaultTitle:s().string,defer:s().bool,encodeSpecialCharacters:s().bool,htmlAttributes:s().object,link:s().arrayOf(s().object),meta:s().arrayOf(s().object),noscript:s().arrayOf(s().object),onChangeClientState:s().func,script:s().arrayOf(s().object),style:s().arrayOf(s().object),title:s().string,titleAttributes:s().object,titleTemplate:s().string},a.defaultProps={defer:!0,encodeSpecialCharacters:!0},a.peek=o.peek,a.rewind=function(){var e=o.rewind();return e||(e=pe({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},i);he.renderStatic=he.rewind;var ye=n(1597);function be(e){var t=e.title,n=e.description,r=e.image,o=e.article,a=(0,ye.useStaticQuery)("26522286").site.siteMetadata,i=a.defaultTitle,l=a.defaultDescription,s=a.siteUrl,u=a.defaultImage,f=a.twitterUsername,m={title:t||i,description:n||l,image:""+s+(r||u),url:""+s};return c.createElement(he,{title:m.title},c.createElement("meta",{name:"description",content:m.description}),c.createElement("meta",{name:"image",content:m.image}),m.url&&c.createElement("meta",{property:"og:url",content:m.url}),!o?null:c.createElement("meta",{property:"og:type",content:"article"}),m.title&&c.createElement("meta",{property:"og:title",content:m.title}),m.description&&c.createElement("meta",{property:"og:description",content:m.description}),m.image&&c.createElement("meta",{property:"og:image",content:m.image}),c.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),f&&c.createElement("meta",{name:"twitter:creator",content:f}),m.title&&c.createElement("meta",{name:"twitter:title",content:m.title}),m.description&&c.createElement("meta",{name:"twitter:description",content:m.description}),m.image&&c.createElement("meta",{name:"twitter:image",content:m.image}))}be.defaultProps={title:null,description:null,image:null,article:!1};var ge=c.forwardRef((function(e,t){return c.createElement("a",{ref:t,className:"font-ocra text-black hover:no-underline "+e.className+" text-right ",href:"/"},c.createElement("div",{className:""+e.titleClassName},"ETHBerlin04"),c.createElement("div",{className:""+e.subtitleClassName},c.createElement("span",{className:"font-ocra"},"  <<<<identity<<crisis<< ")))})),ve=function(e){var t=e.className,n=(0,c.useState)(!1),r=n[0],o=n[1],a=function(e){var t=e.className,n=e.style,r=e.mobile,o=e.setShowNav;return c.createElement("nav",{className:"flex flex-col gap-2 text-xl font-ocra "+t,style:n},r&&c.createElement("button",{className:"p-2 absolute top-0 left-0 text-3xl ml-12 mt-12",onClick:function(){return o((function(e){return!e}))}},c.createElement("div",null,"X")),c.createElement("a",{className:"my-2",href:"/about"}," ","<<a<bout"),c.createElement("a",{className:"my-2",href:"/manifesto"}," ","<<m<anifesto"))};return c.createElement(c.Fragment,null,c.createElement("header",{className:"h-screen hidden sm:flex flex-col py-6 px-6 fixed w-72 text-black font-ocra "+t}," ",c.createElement(ge,{className:"flex flex-col justify-center origin-center",titleClassName:"text-3xl",subtitleClassName:"text-xs"}),c.createElement(a,{className:"mt-16"}),c.createElement("div",{className:"mt-auto"},c.createElement("div",{className:"my-2 text-sm"},"join our"," ",c.createElement("a",{className:"underline",href:"https://matrix.to/#/%23ethberlin:matrix.org",target:"_blank",rel:"noreferrer"},"matrix space")," or"," ",c.createElement("a",{className:"underline",href:"mailto:goerli@ethberlin.org",target:"_blank",rel:"noreferrer"},"e-mail us")))),c.createElement("header",{className:"flex sm:hidden flex-col text-xl text-left"},c.createElement("div",{className:" text-black my-8 mx-4"},c.createElement("div",{className:"flex justify-between"},c.createElement("a",{style:{textDecoration:"none"},href:"/"},c.createElement(ge,{className:"",titleClassName:"text-2xl",subtitleClassName:"text-xs "})),c.createElement("div",{className:" flex flex-col flex-grow-0 font-bundessans text-black bg-white text-2xl leading-3 justify-center"},c.createElement("button",{className:"p-2",onClick:function(){return o((function(e){return!e}))}},c.createElement("div",null,"---"),c.createElement("div",null,"---"),c.createElement("div",null,"---"))),c.createElement(a,{className:"flex z-30 "+(r?"visible opacity-95":"invisible opacity-0")+" flex-col items-center transition-all duration-200 ease-in-out text-xl fixed bg-black top-0 left-0 w-screen h-screen justify-center",style:{backgroundColor:"rgba(255, 255, 255, 0.95)"},setShowNav:o,mobile:!0})))))},De=function(e){var t=e.className,n=(e.isPrimaryColor,e.smallScreen);return c.createElement("div",{className:"whitespace-pre font-ocra font-bold text-[2rem] tracking-tighter leading-tight opacity-[0.15] "+t+" bg-berlin-yellow text-white",style:{marginTop:!n&&"60vh"}},"DoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\nDoD\n")};De.defaultProps={isPrimaryColor:!0};var Ee=De,Te=n.p+"static/ethereum-ba954571c2bcb478e3eed7b85643d518.png",we=function(e){var t=e.children,n=e.showEthDiamond;return c.createElement("div",{className:"flex flex-col min-h-screen min-w-screen"},c.createElement("div",{className:"flex-1 flex flex-col min-h-full font-bundessans text-black max-w-[100rem] m-auto"},c.createElement(ve,null),c.createElement(be,null),c.createElement("div",{className:"z-10 hidden md:flex justify-end my-9 sm:mr-12 font-ocra text-black"},c.createElement("div",null,"May 24-26, 2024"),c.createElement("div",{className:"sm:ml-8"},"Kreuzberg, Berlin")),c.createElement("div",{className:"mx-auto -z-10 hidden "+(n?"lg:block":"hidden")},c.createElement(Ee,{className:"fixed -top-24 left-[66%] transform -translate-x-1/3 -translate-y-1/2"})),c.createElement("div",null,c.createElement("img",{src:Te,className:"hidden sm:block fixed -bottom-36 left-2/3 -z-40 opacity-10",style:{filter:"invert(83%) sepia(47%) saturate(1247%) hue-rotate(353deg) brightness(97%) contrast(109%)"},alt:"Ethereum Logo"})),c.createElement("div",{className:"flex flex-row flex-1 ml-4 mr-4 sm:mr-8  sm:ml-72"},t&&c.createElement("div",{className:"flex-grow sm:mt-24 mb-16 w-full sm:mr-8"},t)),c.createElement("footer",{className:"flex flex-col md:flex-row flex-wrap justify-evenly items-center text-center sm:justify-end my-4 sm:mr-12 z-20 text-sm font-ocra  sm:ml-72"},c.createElement("a",{className:"mx-4 my-2 sm:ml-8 text-black",href:"/decentralization"},"department of <<d<ecentralization"),c.createElement("a",{className:"mx-4 my-2 sm:ml-8 text-black",href:"/contact"},"contact & <<i<mpressum"),c.createElement("a",{className:"mx-4 my-2 sm:ml-8 text-black",href:"/code-of-conduct"},"code <<o<f conduct"),c.createElement("a",{className:"mx-4 my-2 sm:ml-8 text-black",href:"https://github.com/ethb3rlin/4",target:"_blank",rel:"noreferrer"},"source"))))};we.defaultProps={showEthDiamond:!0};var xe=we}}]);
//# sourceMappingURL=19b5b7557534e5b699f20e63172909df2dccc8b7-32619e2cdf3facaa26d2.js.map