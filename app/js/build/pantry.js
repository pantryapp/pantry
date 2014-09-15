(function(){"use strict";var a=angular.module("LocalStorageModule",[]);a.provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/"},this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(a){this.prefix=a},this.setStorageType=function(a){this.storageType=a},this.setStorageCookie=function(a,b){this.cookie={expiry:a,path:b}},this.setStorageCookieDomain=function(a){this.cookie.domain=a},this.setNotify=function(a,b){this.notify={setItem:a,removeItem:b}},this.$get=["$rootScope","$window","$document",function(a,b,c){var d,e=this.prefix,f=this.cookie,g=this.notify,h=this.storageType;c||(c=document),"."!==e.substr(-1)&&(e=e?e+".":"");var i=function(a){return e+a},j=function(){try{var c=h in b&&null!==b[h],e=i("__"+Math.round(1e7*Math.random()));return c&&(d=b[h],d.setItem(e,""),d.removeItem(e)),c}catch(f){return h="cookie",a.$broadcast("LocalStorageModule.notification.error",f.message),!1}}(),k=function(b,c){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),g.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:"cookie"}),q(b,c);"undefined"==typeof c&&(c=null);try{(angular.isObject(c)||angular.isArray(c))&&(c=angular.toJson(c)),d&&d.setItem(i(b),c),g.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:this.storageType})}catch(e){return a.$broadcast("LocalStorageModule.notification.error",e.message),q(b,c)}return!0},l=function(b){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r(b);var c=d?d.getItem(i(b)):null;return c&&"null"!==c?"{"===c.charAt(0)||"["===c.charAt(0)?angular.fromJson(c):c:null},m=function(b){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),g.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:"cookie"}),s(b);try{d.removeItem(i(b)),g.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:this.storageType})}catch(c){return a.$broadcast("LocalStorageModule.notification.error",c.message),s(b)}return!0},n=function(){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),!1;var b=e.length,c=[];for(var f in d)if(f.substr(0,b)===e)try{c.push(f.substr(b))}catch(g){return a.$broadcast("LocalStorageModule.notification.error",g.Description),[]}return c},o=function(b){b=b||"";var c=e.slice(0,-1),f=new RegExp(c+"."+b);if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),t();var g=e.length;for(var h in d)if(f.test(h))try{m(h.substr(g))}catch(i){return a.$broadcast("LocalStorageModule.notification.error",i.message),t()}return!0},p=function(){try{return navigator.cookieEnabled||"cookie"in c&&(c.cookie.length>0||(c.cookie="test").indexOf.call(c.cookie,"test")>-1)}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),!1}},q=function(b,d){if("undefined"==typeof d)return!1;if(!p())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var e="",g=new Date,h="";if(null===d?(g.setTime(g.getTime()+-864e5),e="; expires="+g.toGMTString(),d=""):0!==f.expiry&&(g.setTime(g.getTime()+24*f.expiry*60*60*1e3),e="; expires="+g.toGMTString()),b){var j="; path="+f.path;f.domain&&(h="; domain="+f.domain),c.cookie=i(b)+"="+encodeURIComponent(d)+e+j+h}}catch(k){return a.$broadcast("LocalStorageModule.notification.error",k.message),!1}return!0},r=function(b){if(!p())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var d=c.cookie&&c.cookie.split(";")||[],f=0;f<d.length;f++){for(var g=d[f];" "===g.charAt(0);)g=g.substring(1,g.length);if(0===g.indexOf(i(b)+"="))return decodeURIComponent(g.substring(e.length+b.length+1,g.length))}return null},s=function(a){q(a,null)},t=function(){for(var a=null,b=e.length,d=c.cookie.split(";"),f=0;f<d.length;f++){for(a=d[f];" "===a.charAt(0);)a=a.substring(1,a.length);var g=a.substring(b,a.indexOf("="));s(g)}},u=function(){return h},v=function(a,b,c){var d=l(b);null===d&&angular.isDefined(c)?d=c:angular.isObject(d)&&angular.isObject(c)&&(d=angular.extend(c,d)),a[b]=d,a.$watchCollection(b,function(a){k(b,a)})};return{isSupported:j,getStorageType:u,set:k,add:k,get:l,keys:n,remove:m,clearAll:o,bind:v,deriveKey:i,cookie:{set:q,add:q,get:r,remove:s,clearAll:t}}}]})}).call(this);
/*! Hammer.JS - v2.0.3 - 2014-09-10
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */


!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==ib?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<gb.length;){if(c=gb[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return mb++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:pb?N:qb?O:ob?Q:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&wb&&d-e===0,g=b&(yb|zb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=lb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===wb||f.eventType===yb)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=zb&&(i>vb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=kb(l.x)>kb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:jb(a.pointers[c].clientX),clientY:jb(a.pointers[c].clientY)},c++;return{timeStamp:lb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:jb(a[0].clientX),y:jb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:jb(c/b),y:jb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Ab:kb(a)>=kb(b)?a>0?Bb:Cb:b>0?Db:Eb}function I(a,b,c){c||(c=Ib);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Ib);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Jb)-J(a[1],a[0],Jb)}function L(a,b){return I(b[0],b[1],Jb)/I(a[0],a[1],Jb)}function M(){this.evEl=Lb,this.evWin=Mb,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Pb,this.evWin=Qb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Sb,this.targetIds={},y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=this.targetIds;if(b&(wb|xb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f=t(a.targetTouches),g=t(a.changedTouches),h=[];if(b===wb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(yb|zb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function Q(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new O(this.manager,a),this.mouse=new M(this.manager,a)}function R(a,b){this.manager=a,this.set(b)}function S(a){if(q(a,Yb))return Yb;var b=q(a,Zb),c=q(a,$b);return b&&c?Zb+" "+$b:b||c?b?Zb:$b:q(a,Xb)?Xb:Wb}function T(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=_b,this.simultaneous={},this.requireFail=[]}function U(a){return a&ec?"cancel":a&cc?"end":a&bc?"move":a&ac?"start":""}function V(a){return a==Eb?"down":a==Db?"up":a==Bb?"left":a==Cb?"right":""}function W(a,b){var c=b.manager;return c?c.get(a):a}function X(){T.apply(this,arguments)}function Y(){X.apply(this,arguments),this.pX=null,this.pY=null}function Z(){X.apply(this,arguments)}function $(){T.apply(this,arguments),this._timer=null,this._input=null}function _(){X.apply(this,arguments)}function ab(){X.apply(this,arguments)}function bb(){T.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function cb(a,b){return b=b||{},b.recognizers=m(b.recognizers,cb.defaults.preset),new db(a,b)}function db(a,b){b=b||{},this.options=i(b,cb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new R(this,this.options.touchAction),eb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function eb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function fb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var gb=["","webkit","moz","MS","ms","o"],hb=b.createElement("div"),ib="function",jb=Math.round,kb=Math.abs,lb=Date.now,mb=1,nb=/mobile|tablet|ip(ad|hone|od)|android/i,ob="ontouchstart"in a,pb=v(a,"PointerEvent")!==d,qb=ob&&nb.test(navigator.userAgent),rb="touch",sb="pen",tb="mouse",ub="kinect",vb=25,wb=1,xb=2,yb=4,zb=8,Ab=1,Bb=2,Cb=4,Db=8,Eb=16,Fb=Bb|Cb,Gb=Db|Eb,Hb=Fb|Gb,Ib=["x","y"],Jb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Kb={mousedown:wb,mousemove:xb,mouseup:yb},Lb="mousedown",Mb="mousemove mouseup";j(M,y,{handler:function(a){var b=Kb[a.type];b&wb&&0===a.button&&(this.pressed=!0),b&xb&&1!==a.which&&(b=yb),this.pressed&&this.allow&&(b&yb&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:tb,srcEvent:a}))}});var Nb={pointerdown:wb,pointermove:xb,pointerup:yb,pointercancel:zb,pointerout:zb},Ob={2:rb,3:sb,4:tb,5:ub},Pb="pointerdown",Qb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Pb="MSPointerDown",Qb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Nb[d],f=Ob[a.pointerType]||a.pointerType,g=f==rb;e&wb&&(0===a.button||g)?b.push(a):e&(yb|zb)&&(c=!0);var h=s(b,a.pointerId,"pointerId");0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Rb={touchstart:wb,touchmove:xb,touchend:yb,touchcancel:zb},Sb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Rb[a.type],c=P.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:rb,srcEvent:a})}}),j(Q,y,{handler:function(a,b,c){var d=c.pointerType==rb,e=c.pointerType==tb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(yb|zb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Tb=v(hb.style,"touchAction"),Ub=Tb!==d,Vb="compute",Wb="auto",Xb="manipulation",Yb="none",Zb="pan-x",$b="pan-y";R.prototype={set:function(a){a==Vb&&(a=this.compute()),Ub&&(this.manager.element.style[Tb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),S(a.join(" "))},preventDefaults:function(a){if(!Ub){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,Yb),f=q(d,$b),g=q(d,Zb);return e||f&&c&Fb||g&&c&Gb?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var _b=1,ac=2,bc=4,cc=8,dc=cc,ec=16,fc=32;T.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=W(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=W(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=W(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=W(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?U(d):""),a)}var c=this,d=this.state;cc>d&&b(!0),b(),d>=cc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=fc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(fc|_b)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(dc|ec|fc)&&(this.state=_b),this.state=this.process(b),void(this.state&(ac|bc|cc|ec)&&this.tryEmit(b))):(this.reset(),void(this.state=fc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(X,T,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ac|bc),e=this.attrTest(a);return d&&(c&zb||!e)?b|ec:d||e?c&yb?b|cc:b&ac?b|bc:ac:fc}}),j(Y,X,{defaults:{event:"pan",threshold:10,pointers:1,direction:Hb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Fb&&b.push($b),a&Gb&&b.push(Zb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Fb?(e=0===f?Ab:0>f?Bb:Cb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ab:0>g?Db:Eb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return X.prototype.attrTest.call(this,a)&&(this.state&ac||!(this.state&ac)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=V(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(Z,X,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Yb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ac)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j($,T,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Wb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(yb|zb)&&!f)this.reset();else if(a.eventType&wb)this.reset(),this._timer=e(function(){this.state=dc,this.tryEmit()},b.time,this);else if(a.eventType&yb)return dc;return fc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===dc&&(a&&a.eventType&yb?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=lb(),this.manager.emit(this.options.event,this._input)))}}),j(_,X,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Yb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ac)}}),j(ab,X,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Fb|Gb,pointers:1},getTouchAction:function(){return Y.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Fb|Gb)?b=a.velocity:c&Fb?b=a.velocityX:c&Gb&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&kb(b)>this.options.velocity&&a.eventType&yb},emit:function(a){var b=V(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(bb,T,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Xb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&wb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=yb)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=dc,this.tryEmit()},b.interval,this),ac):dc}return fc},failTimeout:function(){return this._timer=e(function(){this.state=fc},this.options.interval,this),fc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==dc&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),cb.VERSION="2.0.3",cb.defaults={domEvents:!1,touchAction:Vb,enable:!0,inputTarget:null,inputClass:null,preset:[[_,{enable:!1}],[Z,{enable:!1},["rotate"]],[ab,{direction:Fb}],[Y,{direction:Fb},["swipe"]],[bb],[bb,{event:"doubletap",taps:2},["tap"]],[$]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var gc=1,hc=2;db.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?hc:gc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&dc)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===hc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ac|bc|cc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof T)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&fb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&eb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(cb,{INPUT_START:wb,INPUT_MOVE:xb,INPUT_END:yb,INPUT_CANCEL:zb,STATE_POSSIBLE:_b,STATE_BEGAN:ac,STATE_CHANGED:bc,STATE_ENDED:cc,STATE_RECOGNIZED:dc,STATE_CANCELLED:ec,STATE_FAILED:fc,DIRECTION_NONE:Ab,DIRECTION_LEFT:Bb,DIRECTION_RIGHT:Cb,DIRECTION_UP:Db,DIRECTION_DOWN:Eb,DIRECTION_HORIZONTAL:Fb,DIRECTION_VERTICAL:Gb,DIRECTION_ALL:Hb,Manager:db,Input:y,TouchAction:R,TouchInput:O,MouseInput:M,PointerEventInput:N,TouchMouseInput:Q,Recognizer:T,AttrRecognizer:X,Tap:bb,Pan:Y,Swipe:ab,Pinch:Z,Rotate:_,Press:$,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==ib&&define.amd?define(function(){return cb}):"undefined"!=typeof module&&module.exports?module.exports=cb:a[c]=cb}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.map
/**
 * angular-slugify -- provides slugification for AngularJS
 *
 * Copyright © 2013 Paul Smith <paulsmith@pobox.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
"use strict";

(function() {
    var mod = angular.module("slugifier", []);

    // Unicode (non-control) characters in the Latin-1 Supplement and Latin
    // Extended-A blocks, transliterated into ASCII characters.
    var charmap = {
        ' ': " ",
        '¡': "!",
        '¢': "c",
        '£': "lb",
        '¥': "yen",
        '¦': "|",
        '§': "SS",
        '¨': "\"",
        '©': "(c)",
        'ª': "a",
        '«': "<<",
        '¬': "not",
        '­': "-",
        '®': "(R)",
        '°': "^0",
        '±': "+/-",
        '²': "^2",
        '³': "^3",
        '´': "'",
        'µ': "u",
        '¶': "P",
        '·': ".",
        '¸': ",",
        '¹': "^1",
        'º': "o",
        '»': ">>",
        '¼': " 1/4 ",
        '½': " 1/2 ",
        '¾': " 3/4 ",
        '¿': "?",
        'À': "`A",
        'Á': "'A",
        'Â': "^A",
        'Ã': "~A",
        'Ä': '"A',
        'Å': "A",
        'Æ': "AE",
        'Ç': "C",
        'È': "`E",
        'É': "'E",
        'Ê': "^E",
        'Ë': '"E',
        'Ì': "`I",
        'Í': "'I",
        'Î': "^I",
        'Ï': '"I',
        'Ð': "D",
        'Ñ': "~N",
        'Ò': "`O",
        'Ó': "'O",
        'Ô': "^O",
        'Õ': "~O",
        'Ö': '"O',
        '×': "x",
        'Ø': "O",
        'Ù': "`U",
        'Ú': "'U",
        'Û': "^U",
        'Ü': '"U',
        'Ý': "'Y",
        'Þ': "Th",
        'ß': "ss",
        'à': "`a",
        'á': "'a",
        'â': "^a",
        'ã': "~a",
        'ä': '"a',
        'å': "a",
        'æ': "ae",
        'ç': "c",
        'è': "`e",
        'é': "'e",
        'ê': "^e",
        'ë': '"e',
        'ì': "`i",
        'í': "'i",
        'î': "^i",
        'ï': '"i',
        'ð': "d",
        'ñ': "~n",
        'ò': "`o",
        'ó': "'o",
        'ô': "^o",
        'õ': "~o",
        'ö': '"o',
        '÷': ":",
        'ø': "o",
        'ù': "`u",
        'ú': "'u",
        'û': "^u",
        'ü': '"u',
        'ý': "'y",
        'þ': "th",
        'ÿ': '"y',
        'Ā': "A",
        'ā': "a",
        'Ă': "A",
        'ă': "a",
        'Ą': "A",
        'ą': "a",
        'Ć': "'C",
        'ć': "'c",
        'Ĉ': "^C",
        'ĉ': "^c",
        'Ċ': "C",
        'ċ': "c",
        'Č': "C",
        'č': "c",
        'Ď': "D",
        'ď': "d",
        'Đ': "D",
        'đ': "d",
        'Ē': "E",
        'ē': "e",
        'Ĕ': "E",
        'ĕ': "e",
        'Ė': "E",
        'ė': "e",
        'Ę': "E",
        'ę': "e",
        'Ě': "E",
        'ě': "e",
        'Ĝ': "^G",
        'ĝ': "^g",
        'Ğ': "G",
        'ğ': "g",
        'Ġ': "G",
        'ġ': "g",
        'Ģ': "G",
        'ģ': "g",
        'Ĥ': "^H",
        'ĥ': "^h",
        'Ħ': "H",
        'ħ': "h",
        'Ĩ': "~I",
        'ĩ': "~i",
        'Ī': "I",
        'ī': "i",
        'Ĭ': "I",
        'ĭ': "i",
        'Į': "I",
        'į': "i",
        'İ': "I",
        'ı': "i",
        'Ĳ': "IJ",
        'ĳ': "ij",
        'Ĵ': "^J",
        'ĵ': "^j",
        'Ķ': "K",
        'ķ': "k",
        'Ĺ': "L",
        'ĺ': "l",
        'Ļ': "L",
        'ļ': "l",
        'Ľ': "L",
        'ľ': "l",
        'Ŀ': "L",
        'ŀ': "l",
        'Ł': "L",
        'ł': "l",
        'Ń': "'N",
        'ń': "'n",
        'Ņ': "N",
        'ņ': "n",
        'Ň': "N",
        'ň': "n",
        'ŉ': "'n",
        'Ō': "O",
        'ō': "o",
        'Ŏ': "O",
        'ŏ': "o",
        'Ő': '"O',
        'ő': '"o',
        'Œ': "OE",
        'œ': "oe",
        'Ŕ': "'R",
        'ŕ': "'r",
        'Ŗ': "R",
        'ŗ': "r",
        'Ř': "R",
        'ř': "r",
        'Ś': "'S",
        'ś': "'s",
        'Ŝ': "^S",
        'ŝ': "^s",
        'Ş': "S",
        'ş': "s",
        'Š': "S",
        'š': "s",
        'Ţ': "T",
        'ţ': "t",
        'Ť': "T",
        'ť': "t",
        'Ŧ': "T",
        'ŧ': "t",
        'Ũ': "~U",
        'ũ': "~u",
        'Ū': "U",
        'ū': "u",
        'Ŭ': "U",
        'ŭ': "u",
        'Ů': "U",
        'ů': "u",
        'Ű': '"U',
        'ű': '"u',
        'Ų': "U",
        'ų': "u",
        'Ŵ': "^W",
        'ŵ': "^w",
        'Ŷ': "^Y",
        'ŷ': "^y",
        'Ÿ': '"Y',
        'Ź': "'Z",
        'ź': "'z",
        'Ż': "Z",
        'ż': "z",
        'Ž': "Z",
        'ž': "z",
        'ſ': "s"
    };

    function _slugify(s) {
        if (!s) return "";
        var ascii = [];
        var ch, cp;
        for (var i = 0; i < s.length; i++) {
            if ((cp = s.charCodeAt(i)) < 0x180) {
                ch = String.fromCharCode(cp);
                ascii.push(charmap[ch] || ch);
            }
        }
        s = ascii.join("");
        s = s.replace(/[^\w\s-]/g, "").trim().toLowerCase();
        return s.replace(/[-\s]+/g, "-");
    }

    mod.factory("Slug", function() {
        return {
            slugify: _slugify
        };
    });

    mod.directive("slug", ["Slug", function(Slug) {
        return {
            restrict: "E",
            scope: {
                to: "=",
            },
            transclude: true,
            replace: true,
            template: "<div ng-transclude></div>",
            link: function(scope, elem, attrs) {
                if (!attrs.from) {
                    throw "must set attribute 'from'";
                }
                scope.$parent.$watch(attrs.from, function(val) {
                    scope.to = Slug.slugify(val);
                });
            }
        };
    }]);

    mod.filter("slugify", function(Slug) {
        return function(input) {
            return Slug.slugify(input);
        };
    });
})();
'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('app', [
	'ngRoute',
	'app.filters',
  'app.services',
  'app.directives',
  'app.controllers'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pantry', 
  	{
  		  templateUrl: 'partials/pantry.html',
        title: 'Garde-manger'
  	});
  $routeProvider.when('/groceries',{
    templateUrl: 'partials/groceries.html',
    title: 'Épicerie'
  });
  $routeProvider.when('/receipes', {
    templateUrl: 'partials/receipes.html',
    title:'Recettes'
  });
  $routeProvider.otherwise(
  	{
  		redirectTo: '/pantry'
  	});
}]);

'use strict';

/* Controllers */
var controllers = angular.module('app.controllers', []);


controllers.controller('PantryController', [
	'$scope', 
	'$route', 
	'$log', 
	'$message', 
	'$event',
	function($scope, $route, $log, $message, $event){

		$scope.pageTitle = "";

		$scope.debug = function(value){
			$log.info(value);
		}

		$scope.$on("$routeChangeSuccess", function(){
			$scope.pageTitle = $route.current.title;
			$event.clear();
		});

		$scope.showEvents = function(){
			$event.debug();
		}

		//Hardcoded categories
		$scope.categories = categories;
}]);


controllers.controller('DeleteModalInstanceController', [
	'$scope', 
	'$modalInstance', 
	'args', 
	function($scope, $modalInstance, args){
		$scope.item = args.item;
		$scope.from = args.from;

  		$scope.ok = function () {
    		$modalInstance.close(true);
  		};

  		$scope.cancel = function () {
    		$modalInstance.close(false);
  		};
}]);

controllers.controller('MessageController', [
	'$scope', 
	'$messageInstance', 
	'args', function($scope, $messageInstance, args){
		$scope.item = args.item;
		$scope.type = args.type;
}]);


// localStorage.clear();
var categories = [
  "Pâtisserie",
  "Herbes et épices",
  "Nouilles",
  "Confitures",
  "Aliments en pot",
  "Moutardes",
  "Noix & graines",
  "Huiles",
  "Pâtes",
  "Légumes marinés",
  "Riz, céréales & légumineuses",
  "Sauces",
  "Conserves",
  "Vinaigres",
];
'use strict';

/* Directives */
angular.module('app.directives', ['ui.bootstrap'])
	.directive('quickEdit', function($timeout){
		return{
			restrict: 'A',
			link: function($scope, element, attributes){

				element.on('keydown', function(event){
					switch (event.keyCode){
						case KEYS.enter:
							$scope.$apply(attributes.onEdit);
						break;
						case KEYS.esc:
							$scope.toggled = false;
							$scope.$apply($scope.toggled);
						break;
					}
				});

				$scope.$watch('toggled', function(value){
					if( value ) $timeout(function(){element[0].focus();});
				});
			}
		}
	})
	.directive('openItem', function($timeout, isTouch){
		return{
			restrict: 'A',
			priority: 1000,
			link:function($scope, element){

				$timeout(function(){
					var element_width = element[0].offsetWidth,
						options_ratio = 30,
						_hammer 	  = new Hammer(element[0]),
						threshold     = element_width * (options_ratio/100), // 30% of element width = item options width
						wrapper       = element.children(),
						buttons		  = element.find('pantry-item-options').children(),
						scrolling     = false,
						margin_left   = 0;



					
					_hammer.on('panleft panright', function(event){
						if( event.distance >= threshold && !$scope.toggled ){
							$scope.openItem();
							$scope.$apply('toggled');
						}else if( !$scope.toggled ){
							margin_left = 100*(event.distance/element_width);
							wrapper.css('margin-left', margin_left + '%');
							buttons.css('margin-left', parseInt(-1 * (options_ratio - margin_left)) + '%');
						}
					});

					_hammer.on('panend', function(event){
						wrapper.css('margin-left', '');
						buttons.css('margin-left', '');
					});		
				}, 100);
	
				
			}
		}
	})
	.directive('navLink', function(){
		return{
			restrict: 'A',
			link:function($scope, element){
				element.on('click', function(){
					$scope.isCollapsed = true;
				})
			}
		}
	})
	.directive('btnInset', function(){
		return{
			restrict: 'A',
			link: function($scope, element ,attributes){
				var input_parent = element.parent().find('input');
				element.addClass('btn-inset');

				input_parent.bind('keydown', function(event){

					switch(event.keyCode){
						case KEYS.enter:
							if( $scope.display_btn_inset )
								element[0].click();
								event.preventDefault();
						break;
					}
				})

			}
		}
	})
	.directive('focusMe', function($timeout){
		return{
			restrict: 'A',
			link: function($scope, element, attributes){

				var focusInput = function(){
					$timeout(function(){element[0].focus();});
				}

				if( $scope.focus )
					focusInput();

				element.on('blur', function(){
					$scope.focus = false;
				})

				
				$scope.$watch(function(){
					return $scope.focus
				}, function(value){
					if( value ) 
						focusInput();
				})
			}
		}
	})
	.directive('messageWindow', function($timeout){
		return{
			restrict: 'EA',
			templateUrl: 'partials/message.html',
			transclude:true,
			link: function($scope, element, attributes){
				$timeout(function(){
					$scope.animate = true;
				});
			}
		}
	})
	.directive('categoryList', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/category-list.html'
		}
	})
	.directive('pantryItems', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/pantry-list.html',
			controller: 'PantryItemsController'
		}
	})
	.directive('pantryItem', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/pantry-item.html'
		}
	})
	.directive('pantryItemOptions', function(){
		return{
			restrict: 'E',
			priority: 100,
			templateUrl: 'partials/pantry-item-options.html'
		}
	})
	.directive('groceryList', function(){
		return {
			restrict: 'E',
			templateUrl: 'partials/grocery-list.html',
			controller: 'GroceryController'
		}
	})
	.directive('groceryItem', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/grocery-item.html'
		}
	})
	.directive('groceryItemOptions', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/grocery-item-options.html'
		}
	})
	.directive('receipeList', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe-list.html',
			controller:'ReceipesController'
		}
	})
	.directive('receipe', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe.html',
			controller: 'ReceipeController'
		}
	})
	.directive('receipeOptions', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe-options.html'
		}
	})
	.directive('receipeIngredientOptions', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe-ingredient-options.html'
		}
	})
	.directive('itemFilter', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/item-filter.html',
			controller: 'SearchController'
		}
	})
	.directive('lastUpdate', ['npConfig', function(npConfig) {
    	return function(scope, elm, attrs) {
			var config = npConfig.query(function(){
				elm.text(config.version);
			});
      		
    	};
 	}]);
 	
	var KEYS = {
		enter : 13,
		esc	  : 27
	}

'use strict';

/* Filters */
angular.module('app.filters', [])
	.filter('item_exists', ['$filter', function($filter){
		return function(items, newItemName){
			var new_items = items;
			if( newItemName != null && newItemName != undefined )
				items = $filter('filter')(items, {name:newItemName});

			if( items.length == 0 )
				items = new_items;

			return items;
		}
	}]);	
'use strict';

/* Services */
angular.module('app.services', ['ngResource', 'LocalStorageModule', 'slugifier'])
	.factory('npConfig', ['$resource', function($resource){
	    return $resource('../package.json', null, {
	    	query: {method:'GET'}
	    });
	}])
	.factory('isTouch', function(){
		return 'ontouchstart' in document.documentElement;
	})
	.factory('PantryStorage', ['localStorageService', function(localStorageService){
		return {
			getPantryItems: function(){
				return localStorageService.get('pantry.items') || [];
			},
			savePantryItems: function(items){
				localStorageService.set('pantry.items', items);
			},
			getGroceries: function(){
				return localStorageService.get('pantry.groceries') || [];
			},
			saveGroceries: function(groceries){
				localStorageService.set('pantry.groceries', groceries);
			},
			getReceipes: function(){
				return localStorageService.get('pantry.receipes') || [];
			},
			saveReceipes: function(receipes){
				localStorageService.set('pantry.receipes', receipes);
			},
			itemAlreadyInCollection: function(item, collection){
				for(var i=0, in_array=false;i<collection.length;i++){
					if( collection[i].id == item.id ){
						in_array = true;break;
					}
				}
				return in_array;
			}
		}
	}])
	.service('lookup', function(){
		var sort = function(hay, key){
			var lookup = {};
			for(var i=0, len=hay.length;i<len;i++){
				lookup[hay[i][key]] = hay[i];
			}
			return lookup;
		}
		return{
			lookupFor:function(hay, needle, key){
				var hay = sort(hay, key);
				return hay[needle[key]];
			}
		}
	})
	.factory('PantryItemFactory', ['guid', 'Slug', function(guid, Slug){
		var item_model = {
			slug:function(name){return Slug.slugify(name);},
			outOfStock:false
		};

		return{
			new:function(model){
				return {
					name:model.name,
					slug:model.slug != undefined ? model.slug : item_model.slug(model.name),
					outOfStock:model.outOfStock != undefined ? model.outOfStock : item_model.outOfStock,
					id:guid.new()
				}
			},
			duplicate:function(model){
				return{
					name:model.name,
					slug:Slug.slugify(model.name),
					outOfStock:model.outOfStock,
					id:model.id
				}
			}
		}
	}])
	.factory('guid', [function(){
	    var svc = {
	        new: function() {
	            function _p8(s) {
	                var p = (Math.random().toString(16)+"000000000").substr(2,8);
	                return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
	            }
	            return _p8() + _p8(true) + _p8(true) + _p8();
	        }
	    };
	    return svc;
	}])
	.factory('$$stackedMessages', [function(){
	    return {
	      createNew: function () {
	        var stack = [];

	        return {
	          add: function (key, value) {
	            stack.push({
	              key: key,
	              value: value
	            });
	          },
	          get: function (key) {
	            for (var i = 0; i < stack.length; i++) {
	              if (key == stack[i].key) {
	                return stack[i];
	              }
	            }
	          },
	          getAll:function(){
	          	return stack;
	          },
	          keys: function() {
	            var keys = [];
	            for (var i = 0; i < stack.length; i++) {
	              keys.push(stack[i].key);
	            }
	            return keys;
	          },
	          top: function () {
	            return stack[stack.length - 1];
	          },
	          remove: function (key) {
	            var idx = -1;
	            for (var i = 0; i < stack.length; i++) {
	              if (key == stack[i].key) {
	                idx = i;
	                break;
	              }
	            }
	            return stack.splice(idx, 1)[0];
	          },
	          removeBottom: function () {
	            return stack.splice(0, 1)[0];
	          },
	          length: function () {
	            return stack.length;
	          }
	        };
	      }
	    };
	}])
	.factory('$messageStack', ['$document', '$compile', '$timeout', '$transition', '$$stackedMessages', function($document, $compile, $timeout, $transition, $$stackedMessages){
		var $messageStack = {};
		var openedWindows  = $$stackedMessages.createNew();

		$messageStack.open = function(messageInstance, message){

	        openedWindows.add(messageInstance, {
				messageScope: message.scope
	        });

			var open_messages = openedWindows.length();	        

	        updateMessagesPositions(openedWindows.getAll());
	        
			var body 	     = $document.find('body').eq(0),
				angularDomEL = angular.element("<message-window >"+message.content+"</message-window"),
				messageDomEl = $compile(angularDomEL)(message.scope);

			openedWindows.top().value.messageDomEl = messageDomEl;
	       	body.append(messageDomEl);

			$timeout(function(){
				removeMessage(messageInstance);
	       	}, 3000);

		}

		function updateMessagesPositions(active_messages){
			var message_height = 66,
				message_margin = 10,
				default_height = 60;
			for(var x=active_messages.length - 1,y=0;x>=0;x--,y++){
				active_messages[x].value.messageScope.pos = default_height + ( message_height * y ) + ( message_margin * y );
			}
			
		}

		function removeMessage(messageInstance) {
			var body = $document.find('body').eq(0);
			var messageWindow = openedWindows.get(messageInstance).value;

			//clean up the stack
			openedWindows.remove(messageInstance);

			//remove window DOM element
			removeAfterAnimate(messageWindow.messageDomEl, messageWindow.messageScope, 300, function() {
				messageWindow.messageScope.$destroy();
			});
		}

		function removeAfterAnimate(domEl, scope, emulateTime, done) {
			// Closing animation
			scope.animate = false;
			var transitionEndEventName = $transition.transitionEndEventName;
			if (transitionEndEventName) {
		  		// transition out
		  		var timeout = $timeout(afterAnimating, emulateTime);

		  		domEl.bind(transitionEndEventName, function () {
		    		$timeout.cancel(timeout);
		    		afterAnimating();
		    		scope.$apply();
		  		});
			} else {
		  		// Ensure this call is async
		  		$timeout(afterAnimating, 0);
			}

			function afterAnimating() {
		  		if (afterAnimating.done) {
		    		return;
		  		}
		  		afterAnimating.done = true;

		  		domEl.remove();
		  		if (done) {
		    		done();
		  		}
			}
		}

		return $messageStack;
	}])
	.factory('$eventStack', ['$log', function($log){
		return{
			createNew: function(){
				var obsCallbacks = [];

				return{
					add: function(events, persistant){
						angular.forEach(events, function(callback, event){
							obsCallbacks.push({
								event:event, 
								callback:callback,
								persistant: persistant != undefined ? persistant : false
							})
						});
					},
					trigger: function(event, args, caller, debug){
						var is_event  = false,
							result    = null;
						angular.forEach(obsCallbacks, function(obj){
							if( obj.event == event ){
								is_event = true;
								if( debug )
									$log.info('Catched by : ' + obj.callback);
								
								result =  obj.callback(args);
							}
						});
						if( !is_event )
							$log.warn ('There is no observer for event ' + event + " from " + caller);

						return result;
					},
					clear:function(){
						var persistants = [];
						for(var i=0;i<obsCallbacks.length;i++){
							if( obsCallbacks[i].persistant )
								persistants.push(obsCallbacks[i]);
						}
						obsCallbacks = persistants;
					},
					getAll: function(){
						return obsCallbacks;
					}
				}
			}
		}
	}])
	.provider('$event', [function(){
		var $eventProvider = {
			$get: ['$eventStack', '$log', function($eventStack, $log){
				var $event 			 = {},
					registeredEvents = $eventStack.createNew(),
					eventInstance 	 = {},
					debug 			 = false;

				$event.registerFor = function(events, persistant){
						registeredEvents.add(events, persistant);
				}

				$event.trigger = function(event, args, caller){
					if( debug ){
						$log.warn('trigger event - ' + Date.now());
						$log.info('Event : ' + event);
						$log.info('Triggered by : ' + caller);

					}

					return registeredEvents.trigger(event, args, caller, debug);
					
				}

				$event.clear = function(){
					registeredEvents.clear();
				}

				$event.debug = function(){
					debug = true;
					$log.info('$eventStack debug ' + Date.now());
					angular.forEach(registeredEvents.getAll(), function(value, key){
						$log.info(value);
					});
				}


				return $event;
			}]

		}
		return $eventProvider;
	}])
	.provider('$message', [function(){
		var $messageProvider = {
		 
			$get: ['$messageStack', '$rootScope', '$http', '$q', '$templateCache', '$injector', '$controller', function($messageStack, $rootScope, $http, $q, $templateCache, $injector, $controller){
				var $message = {};
				var controller = 'MessageController';

				function getTemplatePromise(options) {
					return options.template ? $q.when(options.template) :
					  $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
					    return result.data;
				  	});
				}

				function getResolvePromises(resolves) {
					var promisesArr = [];
					angular.forEach(resolves, function (value, key) {
					  if (angular.isFunction(value) || angular.isArray(value)) {
					    promisesArr.push($q.when($injector.invoke(value)));
					  }
					});
					return promisesArr;
				}

				$message.open = function(messageOptions){
					var messageInstance = {}

            		messageOptions.resolve = messageOptions.resolve || {};

		            if (!messageOptions.template && !messageOptions.templateUrl) {
		              throw new Error('One of template or templateUrl options is required.');
		            }

		            var templateAndResolvePromise =
		              $q.all([getTemplatePromise(messageOptions)].concat(getResolvePromises(messageOptions.resolve)));

					templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {	
						var messageScope = (messageOptions.scope || $rootScope).$new();
              			var ctrlInstance, ctrlLocals = {};
              			var resolveIter = 1;

						//controllers
						ctrlLocals.$scope = messageScope;
						ctrlLocals.$messageInstance = messageInstance;
						angular.forEach(messageOptions.resolve, function (value, key) {
						  ctrlLocals[key] = tplAndVars[resolveIter++];
						});


						ctrlInstance = $controller(controller, ctrlLocals);

		              	$messageStack.open(messageInstance, {
							scope:messageScope, 
		              		content:tplAndVars[0]
		              	});
	    	        }, function resolveError(reason) {});

		      	}

		      return $message;
		    }]
		};

		return $messageProvider;
	}]);