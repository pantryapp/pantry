(function(){"use strict";var a=angular.module("LocalStorageModule",[]);a.provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/"},this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(a){this.prefix=a},this.setStorageType=function(a){this.storageType=a},this.setStorageCookie=function(a,b){this.cookie={expiry:a,path:b}},this.setStorageCookieDomain=function(a){this.cookie.domain=a},this.setNotify=function(a,b){this.notify={setItem:a,removeItem:b}},this.$get=["$rootScope","$window","$document",function(a,b,c){var d,e=this.prefix,f=this.cookie,g=this.notify,h=this.storageType;c||(c=document),"."!==e.substr(-1)&&(e=e?e+".":"");var i=function(a){return e+a},j=function(){try{var c=h in b&&null!==b[h],e=i("__"+Math.round(1e7*Math.random()));return c&&(d=b[h],d.setItem(e,""),d.removeItem(e)),c}catch(f){return h="cookie",a.$broadcast("LocalStorageModule.notification.error",f.message),!1}}(),k=function(b,c){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),g.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:"cookie"}),q(b,c);"undefined"==typeof c&&(c=null);try{(angular.isObject(c)||angular.isArray(c))&&(c=angular.toJson(c)),d&&d.setItem(i(b),c),g.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:this.storageType})}catch(e){return a.$broadcast("LocalStorageModule.notification.error",e.message),q(b,c)}return!0},l=function(b){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r(b);var c=d?d.getItem(i(b)):null;return c&&"null"!==c?"{"===c.charAt(0)||"["===c.charAt(0)?angular.fromJson(c):c:null},m=function(b){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),g.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:"cookie"}),s(b);try{d.removeItem(i(b)),g.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:this.storageType})}catch(c){return a.$broadcast("LocalStorageModule.notification.error",c.message),s(b)}return!0},n=function(){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),!1;var b=e.length,c=[];for(var f in d)if(f.substr(0,b)===e)try{c.push(f.substr(b))}catch(g){return a.$broadcast("LocalStorageModule.notification.error",g.Description),[]}return c},o=function(b){b=b||"";var c=e.slice(0,-1),f=new RegExp(c+"."+b);if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),t();var g=e.length;for(var h in d)if(f.test(h))try{m(h.substr(g))}catch(i){return a.$broadcast("LocalStorageModule.notification.error",i.message),t()}return!0},p=function(){try{return navigator.cookieEnabled||"cookie"in c&&(c.cookie.length>0||(c.cookie="test").indexOf.call(c.cookie,"test")>-1)}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),!1}},q=function(b,d){if("undefined"==typeof d)return!1;if(!p())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var e="",g=new Date,h="";if(null===d?(g.setTime(g.getTime()+-864e5),e="; expires="+g.toGMTString(),d=""):0!==f.expiry&&(g.setTime(g.getTime()+24*f.expiry*60*60*1e3),e="; expires="+g.toGMTString()),b){var j="; path="+f.path;f.domain&&(h="; domain="+f.domain),c.cookie=i(b)+"="+encodeURIComponent(d)+e+j+h}}catch(k){return a.$broadcast("LocalStorageModule.notification.error",k.message),!1}return!0},r=function(b){if(!p())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var d=c.cookie&&c.cookie.split(";")||[],f=0;f<d.length;f++){for(var g=d[f];" "===g.charAt(0);)g=g.substring(1,g.length);if(0===g.indexOf(i(b)+"="))return decodeURIComponent(g.substring(e.length+b.length+1,g.length))}return null},s=function(a){q(a,null)},t=function(){for(var a=null,b=e.length,d=c.cookie.split(";"),f=0;f<d.length;f++){for(a=d[f];" "===a.charAt(0);)a=a.substring(1,a.length);var g=a.substring(b,a.indexOf("="));s(g)}},u=function(){return h},v=function(a,b,c){var d=l(b);null===d&&angular.isDefined(c)?d=c:angular.isObject(d)&&angular.isObject(c)&&(d=angular.extend(c,d)),a[b]=d,a.$watchCollection(b,function(a){k(b,a)})};return{isSupported:j,getStorageType:u,set:k,add:k,get:l,keys:n,remove:m,clearAll:o,bind:v,deriveKey:i,cookie:{set:q,add:q,get:r,remove:s,clearAll:t}}}]})}).call(this),function(){function a(a){if(!a)return"";for(var b,d,e=[],f=0;f<a.length;f++)(d=a.charCodeAt(f))<384&&(b=String.fromCharCode(d),e.push(c[b]||b));return a=e.join(""),a=a.replace(/[^\w\s-]/g,"").trim().toLowerCase(),a.replace(/[-\s]+/g,"-")}var b=angular.module("slugifier",[]),c={" ":" ","¡":"!","¢":"c","£":"lb","¥":"yen","¦":"|","§":"SS","¨":'"',"©":"(c)","ª":"a","«":"<<","¬":"not","­":"-","®":"(R)","°":"^0","±":"+/-","²":"^2","³":"^3","´":"'","µ":"u","¶":"P","·":".","¸":",","¹":"^1","º":"o","»":">>","¼":" 1/4 ","½":" 1/2 ","¾":" 3/4 ","¿":"?","À":"`A","Á":"'A","Â":"^A","Ã":"~A","Ä":'"A',"Å":"A","Æ":"AE","Ç":"C","È":"`E","É":"'E","Ê":"^E","Ë":'"E',"Ì":"`I","Í":"'I","Î":"^I","Ï":'"I',"Ð":"D","Ñ":"~N","Ò":"`O","Ó":"'O","Ô":"^O","Õ":"~O","Ö":'"O',"×":"x","Ø":"O","Ù":"`U","Ú":"'U","Û":"^U","Ü":'"U',"Ý":"'Y","Þ":"Th","ß":"ss","à":"`a","á":"'a","â":"^a","ã":"~a","ä":'"a',"å":"a","æ":"ae","ç":"c","è":"`e","é":"'e","ê":"^e","ë":'"e',"ì":"`i","í":"'i","î":"^i","ï":'"i',"ð":"d","ñ":"~n","ò":"`o","ó":"'o","ô":"^o","õ":"~o","ö":'"o',"÷":":","ø":"o","ù":"`u","ú":"'u","û":"^u","ü":'"u',"ý":"'y","þ":"th","ÿ":'"y',"Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"'C","ć":"'c","Ĉ":"^C","ĉ":"^c","Ċ":"C","ċ":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"D","đ":"d","Ē":"E","ē":"e","Ĕ":"E","ĕ":"e","Ė":"E","ė":"e","Ę":"E","ę":"e","Ě":"E","ě":"e","Ĝ":"^G","ĝ":"^g","Ğ":"G","ğ":"g","Ġ":"G","ġ":"g","Ģ":"G","ģ":"g","Ĥ":"^H","ĥ":"^h","Ħ":"H","ħ":"h","Ĩ":"~I","ĩ":"~i","Ī":"I","ī":"i","Ĭ":"I","ĭ":"i","Į":"I","į":"i","İ":"I","ı":"i","Ĳ":"IJ","ĳ":"ij","Ĵ":"^J","ĵ":"^j","Ķ":"K","ķ":"k","Ĺ":"L","ĺ":"l","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ŀ":"L","ŀ":"l","Ł":"L","ł":"l","Ń":"'N","ń":"'n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","ŉ":"'n","Ō":"O","ō":"o","Ŏ":"O","ŏ":"o","Ő":'"O',"ő":'"o',"Œ":"OE","œ":"oe","Ŕ":"'R","ŕ":"'r","Ŗ":"R","ŗ":"r","Ř":"R","ř":"r","Ś":"'S","ś":"'s","Ŝ":"^S","ŝ":"^s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ŧ":"T","ŧ":"t","Ũ":"~U","ũ":"~u","Ū":"U","ū":"u","Ŭ":"U","ŭ":"u","Ů":"U","ů":"u","Ű":'"U',"ű":'"u',"Ų":"U","ų":"u","Ŵ":"^W","ŵ":"^w","Ŷ":"^Y","ŷ":"^y","Ÿ":'"Y',"Ź":"'Z","ź":"'z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ſ":"s"};b.factory("Slug",function(){return{slugify:a}}),b.directive("slug",["Slug",function(a){return{restrict:"E",scope:{to:"="},transclude:!0,replace:!0,template:"<div ng-transclude></div>",link:function(b,c,d){if(!d.from)throw"must set attribute 'from'";b.$parent.$watch(d.from,function(c){b.to=a.slugify(c)})}}}]),b.filter("slugify",["Slug",function(a){return function(b){return a.slugify(b)}}])}(),angular.module("app",["ngRoute","pantryAppConfigs","pantryApi","env","hmTouchEvents","Messages","app.filters","app.services","app.directives","app.controllers"]).config(["$routeProvider",function(a){a.when("/pantry",{templateUrl:"views/pantry.html",title:"Garde-manger"}),a.when("/groceries",{templateUrl:"views/groceries.html",title:"Épicerie"}),a.when("/receipes",{templateUrl:"views/receipes.html",title:"Recettes"}),a.when("/configs",{templateUrl:"views/configs.html",controller:"ConfigsController"}),a.otherwise({redirectTo:"/pantry"})}]),angular.module("pantryApi",["ngResource"]).service("API",["$resource","ENV",function(a,b){return{pantryitems:function(){return a(b.apiEndpoint+"/pantryitems/:pantryItemId",{pantryItemId:"@id"},{update:{method:"PUT"}})},groceries:function(){return a(b.apiEndpoint+"/groceries/:groceryId",{groceryId:"@id"})},receipes:function(){return a(b.apiEndpoint+"/receipes/:receipeId",{receipeId:"@id"},{update:{method:"PUT"}})}}}]);var pantryConfigs=angular.module("pantryAppConfigs",[]);pantryConfigs.provider("_configs",function(){this.$get=["PantryStorage",function(a){var b={BOOLEAN:"Boolean",STRING:"String"},c=a.getConfigs({autoFocus:{key:"autoFocus",name:"Auto focus",description:"Focus automatiquement le formulaire d'ajout",type:b.BOOLEAN,value:!1},showForm:{key:"showForm",name:"Formulaire d'ajout",description:"Toggle les formulaires",type:b.BOOLEAN,value:!0}}),d=function(a){return c[a]},e=function(a,b){c[a].value=b},f=function(){return c},g=function(b){c=b,a.saveConfigs(c)};return{get:d,set:e,getAll:f,types:b,save:g}}]}),pantryConfigs.controller("ConfigsController",["$scope","_configs",function(a,b){a.configs=b.getAll(),a.config_types=b.types}]),pantryConfigs.controller("ConfigController",["$scope","_configs",function(a,b){a.toggle=function(){b.set(a.config.key,!a.config.value),b.save(a.configs)}}]);var messages=angular.module("Messages",[]),MESSAGES={"pantryitem-new":{template:"views/messages/pantryitem-new.html",type:"success"},"pantryitem-edit":{template:"views/messages/pantryitem-edit.html",type:"success"},"pantryitem-duplicate":{template:"views/messages/pantryitem-duplicate.html",type:"warning"}};messages.provider("$message",[function(){var a={$get:["$messageStack","$rootScope","$http","$q","$templateCache","$injector","$controller",function(a,b,c,d,e,f,g){function h(a){return a.template?d.when(a.template):c.get(a.templateUrl,{cache:e}).then(function(a){return a.data})}function i(a){var b=[];return angular.forEach(a,function(a){(angular.isFunction(a)||angular.isArray(a))&&b.push(d.when(f.invoke(a)))}),b}var j={},k="MessageController";return j.open=function(c,e){var f={},j={templateUrl:MESSAGES[c].template},l={};if(l.args=function(){var a=e;return a.type=MESSAGES[c].type,a},j.resolve=l,j.resolve=j.resolve||{},!j.template&&!j.templateUrl)throw new Error("One of template or templateUrl options is required.");var m=d.all([h(j)].concat(i(j.resolve)));m.then(function(c){var d,e=(j.scope||b).$new(),h={},i=1;h.$scope=e,h.$messageInstance=f,angular.forEach(j.resolve,function(a,b){h[b]=c[i++]}),d=g(k,h),a.open(f,{scope:e,content:c[0]})},function(){})},j}]};return a}]),messages.factory("$$stackedMessages",[function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b==a[c].key)return a[c]},getAll:function(){return a},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b==a[d].key){c=d;break}return a.splice(c,1)[0]},removeBottom:function(){return a.splice(0,1)[0]},length:function(){return a.length}}}}}]),messages.factory("$messageStack",["$document","$compile","$timeout","$transition","$$stackedMessages",function(a,b,c,d,e){function f(a){for(var b=66,c=10,d=60,e=a.length-1,f=0;e>=0;e--,f++)a[e].value.messageScope.pos=d+b*f+c*f}function g(b){var c=(a.find("body").eq(0),j.get(b).value);j.remove(b),h(c.messageDomEl,c.messageScope,300,function(){c.messageScope.$destroy()})}function h(a,b,e,f){function g(){g.done||(g.done=!0,a.remove(),f&&f())}b.animate=!1;var h=d.transitionEndEventName;if(h){var i=c(g,e);a.bind(h,function(){c.cancel(i),g(),b.$apply()})}else c(g,0)}var i={},j=e.createNew();return i.open=function(d,e){j.add(d,{messageScope:e.scope});j.length();f(j.getAll());var h=a.find("body").eq(0),i=angular.element("<message-window >"+e.content+"</message-window"),k=b(i)(e.scope);j.top().value.messageDomEl=k,h.append(k),c(function(){g(d)},3e3)},i}]),angular.module("app.services",["ngResource","LocalStorageModule","slugifier"]).factory("npConfig",["$resource",function(a){return a("package.json",null,{query:{method:"GET"}})}]).factory("PantryStorage",["localStorageService",function(a){return{getPantryItems:function(){return a.get("pantry.items")||[]},savePantryItems:function(b){a.set("pantry.items",b)},getGroceries:function(){return a.get("pantry.groceries")||[]},saveGroceries:function(b){a.set("pantry.groceries",b)},getReceipes:function(){return a.get("pantry.receipes")||[]},saveReceipes:function(b){a.set("pantry.receipes",b)},saveConfigs:function(b){a.set("pantry.configs",b)},getConfigs:function(b){return a.get("pantry.configs")||b}}}]).service("lookup",function(){var a=function(a,b){for(var c={},d=0,e=a.length;e>d;d++)c[a[d][b]]=a[d];return c};return{lookupFor:function(b,c,d){var b=a(b,d);return b[c]}}}).factory("PantryItemModel",["API","Slug",function(a,b){var c={slug:function(a){return b.slugify(a)},outofstock:!1};return{"new":function(b,d){var e=a.pantryitems().save({name:b.name,slug:void 0!=b.slug?b.slug:c.slug(b.name),outofstock:void 0!=b.outofstock?b.outofstock:c.outofstock},function(){void 0!==d&&d(e)});return e}}}]).factory("GroceryItemModel",["API",function(a){return{"new":function(b){return a.groceries().save({name:b.name,slug:b.slug,outofstock:!0,pantryitem_id:b.id,id:null})}}}]).factory("ReceipeModel",["API","Slug",function(a,b){return{"new":function(c){return a.receipes().save({name:c.name,slug:b.slugify(c.name),ingredients:angular.toJson(c.ingredients)})},update:function(c,d){var e=a.receipes().update({name:c.name,slug:b.slugify(c.name),ingredients:angular.toJson(c.ingredients),id:c.id},function(){void 0!==d&&d(e)})}}}]).factory("$eventStack",["$log",function(a){return{createNew:function(){var b=[];return{add:function(a,c){angular.forEach(a,function(a,d){b.push({event:d,callback:a,persistant:void 0!=c?c:!1})})},trigger:function(c,d,e,f){var g=!1,h=null;return angular.forEach(b,function(b){b.event==c&&(g=!0,f&&a.info("Catched by : "+b.callback),h=b.callback(d))}),g||a.warn("There is no observer for event "+c+" from "+e),h},clear:function(){for(var a=[],c=0;c<b.length;c++)b[c].persistant&&a.push(b[c]);b=a},getAll:function(){return b}}}}}]).provider("$event",[function(){var a={$get:["$eventStack","$log",function(a,b){var c={},d=a.createNew(),e=!1;return c.registerFor=function(a,b){d.add(a,b)},c.trigger=function(a,c,f){return e&&(b.warn("trigger event - "+Date.now()),b.info("Event : "+a),b.info("Triggered by : "+f)),d.trigger(a,c,f,e)},c.clear=function(){d.clear()},c.debug=function(){e=!0,b.info("$eventStack debug "+Date.now()),angular.forEach(d.getAll(),function(a){b.info(a)})},c}]};return a}]);var controllers=angular.module("app.controllers",["ngResource"]);controllers.controller("PantryController",["$scope","$route","$log","$message","$event",function(a,b,c,d,e){a.pageTitle="",a.debug=function(a){c.info(a)},a.$on("$routeChangeSuccess",function(){a.pageTitle=b.current.title,e.clear()}),a.showEvents=function(){e.debug()},a.categories=categories}]),controllers.controller("DeleteModalInstanceController",["$scope","$modalInstance","args",function(a,b,c){a.item=c.item,a.from=c.from,a.ok=function(){b.close(!0)},a.cancel=function(){b.close(!1)}}]),controllers.controller("MessageController",["$scope","$messageInstance","args",function(a,b,c){a.item=c.item,a.type=c.type}]);var categories=["Pâtisserie","Herbes et épices","Nouilles","Confitures","Aliments en pot","Moutardes","Noix & graines","Huiles","Pâtes","Légumes marinés","Riz, céréales & légumineuses","Sauces","Conserves","Vinaigres"];angular.module("app.filters",[]).filter("item_exists",["$filter",function(a){return function(b,c){var d=b;return null!=c&&void 0!=c&&(b=a("filter")(b,{name:c})),0==b.length&&(b=d),b}}]);var directives=angular.module("app.directives",["ui.bootstrap"]);directives.directive("noCache",function(){return{restrict:"A",link:function(a,b,c){b[0].src=c.src+"?v="+(new Date).getTime()}}}),directives.directive("inlineEdit",["$timeout",function(a){return{restrict:"A",link:function(b,c,d){c.on("keydown",function(a){switch(a.keyCode){case KEYS.enter:b.$apply(d.onEdit);break;case KEYS.esc:b.$apply(d.onCancel)}}),b.$watch("editing",function(b){b&&a(function(){c[0].focus()})})}}}]),directives.directive("navLink",function(){return{restrict:"A",link:function(a,b){b.on("click",function(){a.isCollapsed=!0})}}}),directives.directive("btnInset",function(){return{restrict:"A",link:function(a,b){var c=b.parent().find("input");b.addClass("btn-inset"),c.bind("keydown",function(c){switch(c.keyCode){case KEYS.enter:a.display_btn_inset&&b[0].click(),c.preventDefault()}})}}}),directives.directive("focusMe",["$timeout",function(a){return{restrict:"A",link:function(b,c){var d=function(){a(function(){c[0].focus()},100)};b.focus&&d(),c.on("blur",function(){b.focus=!1}),b.$watch(function(){return b.focus},function(a){a&&d()})}}}]),directives.directive("messageWindow",["$timeout",function(a){return{restrict:"EA",templateUrl:"views/message.html",transclude:!0,link:function(b){a(function(){b.animate=!0})}}}]),directives.directive("categoryList",function(){return{restrict:"E",templateUrl:"views/category-list.html"}}),directives.directive("pantryItems",function(){return{restrict:"E",templateUrl:"views/pantry-list.html",controller:"PantryItemsController"}}),directives.directive("pantryItem",function(){return{restrict:"E",templateUrl:"views/pantry-item.html"}}),directives.directive("pantryItemOptions",function(){return{restrict:"E",templateUrl:"views/pantry-item-options.html"}}),directives.directive("groceryList",function(){return{restrict:"E",templateUrl:"views/grocery-list.html",controller:"GroceryController"}}),directives.directive("groceryItem",function(){return{restrict:"E",templateUrl:"views/grocery-item.html"}}),directives.directive("groceryItemOptions",function(){return{restrict:"E",templateUrl:"views/grocery-item-options.html"}}),directives.directive("receipeList",function(){return{restrict:"E",templateUrl:"views/receipe-list.html",controller:"ReceipesController"}}),directives.directive("receipe",function(){return{restrict:"E",templateUrl:"views/receipe.html",controller:"ReceipeController"}}),directives.directive("receipeOptions",function(){return{restrict:"E",templateUrl:"views/receipe-options.html"}}),directives.directive("receipeIngredientOptions",function(){return{restrict:"E",templateUrl:"views/receipe-ingredient-options.html"}}),directives.directive("itemFilter",function(){return{restrict:"E",templateUrl:"views/item-filter.html",controller:"SearchController"}}),directives.directive("lastUpdate",["npConfig",function(a){return function(b,c){var d=a.query(function(){c.text(d.version)})}}]);var KEYS={enter:13,esc:27};directives.directive("buttonBuy",function(){return{restrict:"A",replace:!0,templateUrl:"views/buttons/button-buy.html"}}),directives.directive("buttonSave",function(){return{restrict:"A",replace:!0,templateUrl:"views/buttons/button-save.html"}}),directives.directive("buttonClose",function(){return{restrict:"A",replace:!0,templateUrl:"views/buttons/button-close.html"}}),directives.directive("buttonDelete",function(){return{restrict:"A",replace:!0,templateUrl:"views/buttons/button-delete.html"}}),directives.directive("buttonEdit",function(){return{restrict:"A",replace:!0,templateUrl:"views/buttons/button-edit.html"}}),directives.directive("buttonOutofstock",function(){return{restrict:"A",replace:!0,templateUrl:"views/buttons/button-outofstock.html"}}),controllers.controller("PantryItemsController",["$scope","PantryItemModel","lookup","$message","$event","_configs","API",function(a,b,c,d,e,f,g){a.pantryItems=g.pantryitems().query(),a.search={},a.newItemName=null,a.showForm=f.get("showForm").value,e.registerFor({restock:function(e){var f=c.lookupFor(a.pantryItems,e.pantryitem_id,"id");void 0!=f?(f.outofstock=!1,f.$update()):(f=b.new({name:e.name}),d.open("pantryitem-new",{item:f}))},search:function(b){a.search[b.prop]=b.value},newItemCreation:function(b){a.newItemName=b},create_new_pantryitem:function(c){var f=b.new({name:c,outofstock:!0},function(b){e.trigger("outofstock",b,"new pantry item created, demanded by grocery controller"),a.pantryItems.push(b),d.open("pantryitem-new",{item:b})});return f}})}]),controllers.controller("PantryItemController",["$scope","$modal","$log","Slug","$timeout","PantryItemModel","$event","$message","lookup","_configs",function(a,b,c,d,e,f,g,h,i,j){a.toggled=!1,a.edited=!1,a.focus=j.get("autoFocus").value,a.editing=!1,a.editingPantryItem={},a.createItem=function(){i.lookupFor(a.pantryItems,d.slugify(a.newPantryItem.name),"slug")?h.open("pantryitem-duplicate",{item:{name:a.newPantryItem.name}}):a.pantryItems.push(f.new(a.newPantryItem)),h.open("pantryitem-new",{item:{name:a.newPantryItem.name}}),a.newPantryItem.name="",a.focus=!0,a.pantryItemForm.$setPristine()},a.updateName=function(){a.item.name!=a.editingPantryItem.name&&(a.item.name=a.editingPantryItem.name,a.item.slug=d.slugify(a.editingPantryItem.name),a.item.$update(function(){k(),h.open("pantryitem-edit",{item:{name:a.item.name}})})),m()},a.toggleOutOfStock=function(){a.item.outofstock=!a.item.outofstock,a.item.$update(function(){a.item.outofstock?g.trigger("outofstock",a.item,"pantry item set out of stock"):k(),l()})},a.deleteItem=function(){a.item.$delete(function(){a.pantryItems.splice(a.pantryItems.indexOf(a.item),1)})},a.confirmDelete=function(){b.open({templateUrl:"views/modals/confirm.html",controller:"DeleteModalInstanceController",size:"sm",resolve:{args:function(){return{item:a.item,from:"votre garde-manger"}}}}).result.then(function(b){b===!0&&a.deleteItem()},function(){})},a.showOptions=function(){m()},a.showEditForm=function(){a.editing||(a.editing=!0),a.toggled&&(a.toggled=!1),a.editingPantryItem.name=a.item.name},a.closeItem=function(){l()};var k=function(){e(function(){a.edited=!0},100),e(function(){a.edited=!1},800)},l=function(){a.toggled=!1,a.editing=!1,a.editingPantryItem={}},m=function(){a.toggled||(a.toggled=!0),a.editing&&(a.editing=!1)};a.$watch("newPantryItem.name",function(a,b){a!=b&&void 0!=b&&g.trigger("newItemCreation",a)})}]),controllers.controller("ReceipesController",["$scope","$modal","$event","ReceipeModel","API",function(a,b,c,d,e){a.receipes=e.receipes().query(),a.search={},a.saveReceipes=function(){return saveReceipes()},a.openForm=function(){return g()};var f;c.registerFor({new_receipe:function(b){a.receipes.push(d.new(b)),a.search={},f.close()},search:function(b){a.search[b.prop]=b.value}});var g=function(){f=b.open({templateUrl:"views/receipe-form.html",controller:"ReceipeModalInstance",size:"lg",resolve:{args:function(){return{panelTitle:"Nouvelle recette",pantryItems:a.pantryItems,mode:"create",receipe:{name:null,ingredients:[]}}}}})}}]),controllers.controller("ReceipeController",["$scope","$filter","$event","$message","$modal","lookup","Slug","ReceipeModel","API",function(a,b,c,d,e,f,g,h){a.toggled=!1,a.editingReceipe={name:null,ingredients:[]},a.modalForm,a.display_btn_inset=!1,a.receipe=a.receipe||[],a.receipe.ingredients=angular.fromJson(a.receipe.ingredients),a.create=function(){return i()},a.openForm=function(){return l()},a.closeItem=function(){return m()},a.createItem=function(){var b=c.trigger("create_new_pantryitem",a.ingredient);a.ingredient=b,a.addIngredient()},a.save=function(){switch(a.mode){case"create":i();break;case"edit":j()}},a.addIngredient=function(){f.lookupFor(a.formReceipe.ingredients,a.ingredient.id,"id")?d.open({templateUrl:"views/messages/ingredient-duplicate.html",resolve:{args:function(){return{item:{ingredient:a.ingredient.name,receipe:a.formReceipe.name},type:"warning"}}}}):a.formReceipe.ingredients.push(a.ingredient),a.ingredient=null},a.removeIngredient=function(b){a.formReceipe.ingredients.splice(a.formReceipe.ingredients.indexOf(b),1)},a.openItem=function(){a.toggled=!0,a.editingReceipe.name=a.receipe.name},a.confirmDelete=function(){e.open({templateUrl:"views/modals/confirm.html",controller:"DeleteModalInstanceController",size:"sm",resolve:{args:function(){return{item:a.receipe,from:"vos recettes"}}}}).result.then(function(a){a===!0&&k()},function(){})};var i=function(){c.trigger("new_receipe",{name:a.formReceipe.name,ingredients:a.formReceipe.ingredients},"receipe created in receipe form")},j=function(){a.receipe.name=a.formReceipe.name,a.receipe.slug=g.slugify(a.formReceipe.name),a.receipe.ingredients=a.formReceipe.ingredients,h.update(a.receipe,function(){a.modalForm.close()})},k=function(){a.receipe.$delete(function(){a.receipes.splice(a.receipes.indexOf(a.receipe),1)})},l=function(){a.toggled=!1,a.modalForm=e.open({templateUrl:"views/receipe-form.html",controller:"ReceipeModalInstance",size:"lg",scope:a,resolve:{args:function(){return{panelTitle:"Modifier "+a.receipe.name,pantryItems:a.pantryItems,receipe:a.receipe}}}})},m=function(){a.toggled=!1};a.$watch("ingredient",function(c,d){c!=d&&void 0!=c&&null!=c&&(a.display_btn_inset=0==b("filter")(a.pantryItems,{name:c}).length?!0:!1)})}]),controllers.controller("IngredientController",["$scope","$event",function(a){a.toggled=!1,a.toggleOptions=function(){a.toggled=!a.toggled}}]),controllers.controller("ReceipeModalInstance",["$scope","$modalInstance","args",function(a,b,c){a.formReceipe={name:null,ingredients:[]},a.panelTitle=c.panelTitle,a.pantryItems=c.pantryItems,a.mode=void 0!=c.mode?c.mode:"edit",void 0!=c.receipe&&(a.formReceipe.name=c.receipe.name),a.formReceipe.ingredients=c.receipe.ingredients}]),controllers.controller("GroceryController",["$scope","$event","GroceryItemModel","lookup","API","$event",function(a,b,c,d,e){a.groceryItems=e.groceries().query(),a.search={},a.hasGroceries=a.groceryItems.length>0,a.clearGroceries=function(){a.groceryItems=[]},b.registerFor({add_grocery:function(a){void 0!=a&&f(a)},outofstock:function(a){f(a)},search:function(b){a.search[b.prop]=b.value}}),a.removeGrocery=function(a){return g(a)};var f=function(b){var e=d.lookupFor(a.groceryItems,b.slug,"slug");void 0===e&&a.groceryItems.push(c.new(b))},g=function(b){b.$delete(),a.groceryItems.splice(a.groceryItems.indexOf(b),1)};a.$watch("groceryItems.length",function(){b.trigger("grocery_change",a.groceryItems,"Grocery controller"),a.hasGroceries=a.groceryItems.length>0})}]),controllers.controller("GroceryItemController",["$scope","$event",function(a,b){a.toggled=!1,a.groceryItemForm={},a.toggleOptions=function(){a.toggled=!a.toggled},a.buy=function(){b.trigger("restock",a.item,"grocery item bought"),a.removeGrocery(a.item)},a.delete=function(){a.removeGrocery(a.item)},a.createNew=function(){b.trigger("create_new_pantryitem",a.newGroceryItem,"new item created from grocery"),c()},a.create=function(){b.trigger("add_grocery",a.newGroceryItem,"Grocery controller"),c()},a.closeItem=function(){a.toggled=!1};var c=function(){a.newGroceryItem=null,a.groceryItemForm.$setPristine()}}]),controllers.controller("SearchController",["$scope","$event",function(a,b){a.search={},a.$watch("search.name",function(a){b.trigger("search",{prop:"name",value:a},"name search from search controller")}),a.$watch("search.category",function(a){b.trigger("search",{prop:"category",value:a},"category search from search controller")}),a.reset=function(){a.search={}}}]),controllers.controller("HeaderController",["$scope","$location","$event",function(a,b,c){a.isCollapsed=!0,a.dropdownIsOpen=!1,a.toggleDropdown=function(){a.dropdownIsOpen=!a.dropdownIsOpen},a.toggleCollapse=function(){a.isCollapsed=!a.isCollapsed},a.isActive=function(a){return a==b.path()},c.registerFor({grocery_change:function(b){a.n_groceries=b.length>0?b.length:null}},!0)}]);