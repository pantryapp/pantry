(function(){"use strict";var a=angular.module("LocalStorageModule",[]);a.provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/"},this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(a){this.prefix=a},this.setStorageType=function(a){this.storageType=a},this.setStorageCookie=function(a,b){this.cookie={expiry:a,path:b}},this.setStorageCookieDomain=function(a){this.cookie.domain=a},this.setNotify=function(a,b){this.notify={setItem:a,removeItem:b}},this.$get=["$rootScope","$window","$document",function(a,b,c){var d,e=this.prefix,f=this.cookie,g=this.notify,h=this.storageType;c||(c=document),"."!==e.substr(-1)&&(e=e?e+".":"");var i=function(a){return e+a},j=function(){try{var c=h in b&&null!==b[h],e=i("__"+Math.round(1e7*Math.random()));return c&&(d=b[h],d.setItem(e,""),d.removeItem(e)),c}catch(f){return h="cookie",a.$broadcast("LocalStorageModule.notification.error",f.message),!1}}(),k=function(b,c){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),g.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:"cookie"}),q(b,c);"undefined"==typeof c&&(c=null);try{(angular.isObject(c)||angular.isArray(c))&&(c=angular.toJson(c)),d&&d.setItem(i(b),c),g.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:this.storageType})}catch(e){return a.$broadcast("LocalStorageModule.notification.error",e.message),q(b,c)}return!0},l=function(b){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r(b);var c=d?d.getItem(i(b)):null;return c&&"null"!==c?"{"===c.charAt(0)||"["===c.charAt(0)?angular.fromJson(c):c:null},m=function(b){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),g.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:"cookie"}),s(b);try{d.removeItem(i(b)),g.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:this.storageType})}catch(c){return a.$broadcast("LocalStorageModule.notification.error",c.message),s(b)}return!0},n=function(){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),!1;var b=e.length,c=[];for(var f in d)if(f.substr(0,b)===e)try{c.push(f.substr(b))}catch(g){return a.$broadcast("LocalStorageModule.notification.error",g.Description),[]}return c},o=function(b){b=b||"";var c=e.slice(0,-1),f=new RegExp(c+"."+b);if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),t();var g=e.length;for(var h in d)if(f.test(h))try{m(h.substr(g))}catch(i){return a.$broadcast("LocalStorageModule.notification.error",i.message),t()}return!0},p=function(){try{return navigator.cookieEnabled||"cookie"in c&&(c.cookie.length>0||(c.cookie="test").indexOf.call(c.cookie,"test")>-1)}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),!1}},q=function(b,d){if("undefined"==typeof d)return!1;if(!p())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var e="",g=new Date,h="";if(null===d?(g.setTime(g.getTime()+-864e5),e="; expires="+g.toGMTString(),d=""):0!==f.expiry&&(g.setTime(g.getTime()+24*f.expiry*60*60*1e3),e="; expires="+g.toGMTString()),b){var j="; path="+f.path;f.domain&&(h="; domain="+f.domain),c.cookie=i(b)+"="+encodeURIComponent(d)+e+j+h}}catch(k){return a.$broadcast("LocalStorageModule.notification.error",k.message),!1}return!0},r=function(b){if(!p())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var d=c.cookie&&c.cookie.split(";")||[],f=0;f<d.length;f++){for(var g=d[f];" "===g.charAt(0);)g=g.substring(1,g.length);if(0===g.indexOf(i(b)+"="))return decodeURIComponent(g.substring(e.length+b.length+1,g.length))}return null},s=function(a){q(a,null)},t=function(){for(var a=null,b=e.length,d=c.cookie.split(";"),f=0;f<d.length;f++){for(a=d[f];" "===a.charAt(0);)a=a.substring(1,a.length);var g=a.substring(b,a.indexOf("="));s(g)}},u=function(){return h},v=function(a,b,c){var d=l(b);null===d&&angular.isDefined(c)?d=c:angular.isObject(d)&&angular.isObject(c)&&(d=angular.extend(c,d)),a[b]=d,a.$watchCollection(b,function(a){k(b,a)})};return{isSupported:j,getStorageType:u,set:k,add:k,get:l,keys:n,remove:m,clearAll:o,bind:v,deriveKey:i,cookie:{set:q,add:q,get:r,remove:s,clearAll:t}}}]})}).call(this);
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
	'LocalStorageModule',
	'ngRoute',
  'slugifier', 
  'ui.bootstrap',
	'app.filters',
  'app.services',
  'app.directives',
  'app.controllers'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pantry', 
  	{
  		  templateUrl: 'partials/pantry.html',
  	});
  $routeProvider.when('/groceries',{
    templateUrl: 'partials/groceries.html'
  });
  $routeProvider.when('/receipes', {
    templateUrl: 'partials/receipes.html'
  });
  $routeProvider.otherwise(
  	{
  		redirectTo: '/pantry'
  	});
}]);
'use strict';

/* Controllers */
angular.module('app.controllers', [])
	.controller('PantryController', ['$scope', '$route', '$log', 'EventDispatcher', function($scope, $route, $log, EventDispatcher){

		$scope.debug = function(value){
			$log.info(value);
		}

		$scope.$on("$routeChangeSuccess", function(){
			// console.log(' ---- VIEW CHANGE ----');
			EventDispatcher.clear();
		});
	}])
	.controller('PantryItemsController', ['$scope', 'PantryStorage', 'EventDispatcher', 'PantryItemFactory', 'lookup', function($scope, PantryStorage, EventDispatcher, PantryItemFactory, lookup){
		/*
		 * Public
		 */

		$scope.pantryItems = PantryStorage.getPantryItems();
		$scope.search 	   = {};


		$scope.savePantryItems = function(){return savePantryItems();};
		/*
		 * Private
		 */

		var events = {
			RESTOCK: function(groceryItem){
				var pantryItem = lookup.lookupFor($scope.pantryItems, groceryItem, 'id');

				// pantryItem will be undefined if it has been deleted whilst the item was in the grocery list.
				if( pantryItem != undefined ){
					pantryItem.outOfStock = false;
				}else{
					// Create new item if it has been deleted
					pantryItem = PantryItemFactory.duplicate(groceryItem);
					$scope.pantryItems.push(pantryItem);
				}
			},
			SEARCH: function(search){
				$scope.search[search.prop] = search.value;
			},
			CREATE_NEW_PANTRYITEM: function(pantryItemName){
				var pantryItem = PantryItemFactory.new({
					name:pantryItemName,
					outOfStock:true
				});

				EventDispatcher.notifyObservers('OUTOFSTOCK', pantryItem);
				$scope.pantryItems.push(pantryItem);
			}
		};

		var savePantryItems = function(){PantryStorage.savePantryItems($scope.pantryItems);}


		/*
		 * Event listeners
		 */

		// Catch create and delete pantry item
		$scope.$watchCollection('pantryItems.length', function(){
			savePantryItems();
		});
	
		// Controller event listeners
		EventDispatcher.registerObserverForEvents(events);		
		// console.log('pantry items');
		// EventDispatcher.debug();

	}])
	.controller('PantryItemController', ['$scope', '$modal', '$log', 'Slug', '$timeout', 'PantryStorage', 'EventDispatcher', 'PantryItemFactory', function($scope, $modal, $log, Slug, $timeout, PantryStorage, EventDispatcher, PantryItemFactory){

		/*
		 * Public
		 */

		$scope.toggled = false;
		$scope.edited  = false;
		$scope.editingPantryItem = {};

		$scope.createItem = function(){

			$scope.item = PantryItemFactory.new($scope.newPantryItem);

			$scope.pantryItems.push($scope.item);

			// Reset form. Todo : put that away. Directive?
			$scope.pantryItemForm.$setPristine();
			$scope.newPantryItem.name = "";
		};

		$scope.update = function(){
			$scope.item.name = $scope.editingPantryItem.name;
			$scope.item.slug   = Slug.slugify($scope.editingPantryItem.name);
			closeItem();
			animate();

			EventDispatcher.notifyObservers('UPDATE', $scope.item);
		};

		$scope.toggleOutOfStock = function(){

			$scope.item.outOfStock = !$scope.item.outOfStock;
			if( !$scope.item.outOfStock){
				animate();
			}else {
				EventDispatcher.notifyObservers('OUTOFSTOCK', $scope.item);	
			}

			closeItem();
		};

		$scope.confirmDelete = function(){
			$modal.open({
				templateUrl: 'partials/modals/confirm.html',
				controller: 'DeleteModalInstanceController',
				size: 'sm',
				resolve: {
					args: function(){
						return {
							item: $scope.item,
							from: 'votre garde-manger'
						}
					}
				}
			})
			.result.then(function(value){
				if( value === true ) $scope.deleteItem();
			}, function () {
				//dismiss
			});
		};

		$scope.deleteItem = function(){
			$scope.pantryItems.splice($scope.pantryItems.indexOf($scope.item), 1);
		};

		$scope.openItem = function(){
			// Open item
			$scope.toggled = true;
			$scope.editingPantryItem.name = $scope.item.name;
		};

		/*
		 * Private
		 */


		var animate = function(){
			$timeout(function(){$scope.edited = true;}, 100);
			$timeout(function(){$scope.edited = false;}, 800);
		}

		var closeItem = function(){
			$scope.toggled = false;
			$scope.editingPantryItem = {};
		}

		/*
		 * Event listeners
		 */

		$scope.$watchCollection('item.name', function(newValue, oldValue){
			if( newValue != oldValue && oldValue != undefined ){
				$scope.savePantryItems();
			}
		});

		$scope.$watch('item.outOfStock', function(newValue, oldValue){
			if( newValue != oldValue && oldValue != undefined){
				$scope.savePantryItems();
				if( newValue == false ) animate();
			}
		});

	}])
	.controller('GroceryController', ['$scope', 'PantryStorage', 'EventDispatcher', function($scope, PantryStorage, EventDispatcher){
		/*
		 * Public
		 */

		$scope.groceryItems = PantryStorage.getGroceries();
		$scope.search 		= {};

		$scope.hasGroceries = $scope.groceryItems.length > 0 

		$scope.clearGroceries = function(){
			$scope.groceryItems = [];
		}

		$scope.removeGrocery = function(item){return removeGrocery(item);};

		/*
		 * Private
		 */

		var events = {
			ADD_GROCERY: function(item){
				if(item != undefined) 
					addGrocery(item);
			},
			OUTOFSTOCK: function(item){
				addGrocery(item);
			},
			SEARCH: function(search){
				$scope.search[search.prop] = search.value;
			}
		}

		var addGrocery = function(item){
			if( !PantryStorage.itemAlreadyInCollection(item, $scope.groceryItems) ){
				$scope.groceryItems.push({name:item.name, id:item.id});
			}
		};

		var removeGrocery = function(item){
			$scope.groceryItems.splice($scope.groceryItems.indexOf(item), 1);
		};

		var save = function(){
			PantryStorage.saveGroceries($scope.groceryItems);
		}

		/*
		 * Event listeners
		 */ 


		$scope.$watch('groceryItems.length', function(){
			console.log('grocery length changed')
			EventDispatcher.debug();
			EventDispatcher.notifyObservers('GROCERY_CHANGE', $scope.groceryItems);
			$scope.hasGroceries = $scope.groceryItems.length > 0 
			save();
		});

		EventDispatcher.registerObserverForEvents(events);
		// console.log('groceries');
		// EventDispatcher.debug();

	}])
	.controller('GroceryItemController', ['$scope', 'EventDispatcher', function($scope, EventDispatcher){

		/*
		 * Public
		 */

		$scope.toggled 		   = false;
		$scope.groceryItemForm = {};

		$scope.toggleOptions = function(){
			$scope.toggled = !$scope.toggled;
		};

		$scope.buy = function(){
			// EventDispatcher.debug();
			EventDispatcher.notifyObservers('RESTOCK', $scope.item);
			$scope.removeGrocery($scope.item);
		};

		$scope.delete = function(){
			$scope.removeGrocery($scope.item);
		};

		$scope.createNew = function(from){
			EventDispatcher.notifyObservers('CREATE_NEW_PANTRYITEM', $scope.newGroceryItem);
			resetNewGroceryForm();
		}

		$scope.create = function(){
			EventDispatcher.notifyObservers('ADD_GROCERY', $scope.newGroceryItem);
			resetNewGroceryForm();
		}

		/*
		 * Private
		 */

		var resetNewGroceryForm = function(){
			$scope.newGroceryItem = null;
			$scope.groceryItemForm.$setPristine();
		}


	}])
	.controller('ReceipesController', ['$scope', '$modal', 'PantryStorage', 'EventDispatcher', function($scope, $modal, PantryStorage, EventDispatcher){

		/*
		 * Public
		 */
		$scope.receipes    = PantryStorage.getReceipes();
		$scope.search      = {};

		$scope.saveReceipes = function(){return saveReceipes();};
		$scope.openForm = function(){return openForm();};

		/*
		 * Private
		 */

		var modalForm;

		var events = {
			NEW_RECEIPE: function(receipe){
				$scope.receipes.push(receipe);
				modalForm.close();
			},
			RECEIPE_EDITED: function(){
				PantryStorage.saveReceipes($scope.receipes);
			},
			SEARCH: function(search){
				$scope.search[search.prop] = search.value;
			}
		}

		var saveReceipes = function(){
			PantryStorage.saveReceipes($scope.receipes);
		}

		var openForm = function(){
			modalForm = $modal.open({
				templateUrl: 'partials/modals/receipe-form.html',
				controller: 'ReceipeModalInstance',
				size: 'lg',
				resolve: {
					args: function(){
						return {
							panelTitle:"Nouvelle recette",
							pantryItems:$scope.pantryItems,
							mode:'create',
							receipe:{name:null,ingredients:[]}
						}
					}
				}
			});
		}

		/*
		 * Event listener
		 */

		$scope.$watch('receipes.length', function(){
	 		PantryStorage.saveReceipes($scope.receipes);
		});

		EventDispatcher.registerObserverForEvents(events);

	}])
	.controller('ReceipeModalInstance', ['$scope', '$modalInstance', 'args', function($scope, $modalInstance, args){
		$scope.formReceipe  = {
			name:null,
			ingredients:[]
		};

		$scope.panelTitle  	   = args.panelTitle;
		$scope.pantryItems     = args.pantryItems;
		$scope.mode 	       = args.mode != undefined ? args.mode : 'edit';

		if( args.receipe != undefined )
			$scope.formReceipe.name		    = args.receipe.name;
			$scope.formReceipe.ingredients  = args.receipe.ingredients;


	}])
	.controller('ReceipeController', ['$scope', '$modal', 'Slug', 'guid', 'EventDispatcher', function($scope, $modal, Slug, guid, EventDispatcher){

		/*
		 * Public
		 */
		 
		$scope.toggled 		  = false;
		$scope.editingReceipe = {
			name:null,
			ingredients:[]
		};		
		$scope.modalForm;

		$scope.create  		= function(){return create();};
		$scope.updateInline = function(){return updateInline();}
		$scope.openForm 	= function(){return openForm();};

		$scope.save = function(){
			switch($scope.mode){
				case 'create':
					create();
				break;
				case 'edit':
					update();
				break;
			}
		}

		$scope.addIngredient = function(){
			console.log('add ingredient');
			$scope.formReceipe.ingredients.push($scope.ingredient);
			$scope.ingredient = null;
		}	

		$scope.removeIngredient = function(ingredient){
			console.log('remove ingredient');
			$scope.formReceipe.ingredients.splice($scope.formReceipe.ingredients.indexOf(ingredient), 1);
		}

		$scope.openItem = function(){
			$scope.toggled = true;
			$scope.editingReceipe.name = $scope.receipe.name;
		}

		$scope.confirmDelete = function(){
			$modal.open({
				templateUrl: 'partials/modals/confirm.html',
				controller: 'DeleteModalInstanceController',
				size: 'sm',
				resolve: {
					args: function(){
						return {
							item: $scope.receipe,
							from: 'vos recettes'
						}
					}
				}
			})
			.result.then(function(value){
				if( value === true ) deleteItem();
			}, function () {
				//dismiss
			});
		};

		/*
		 * Private
		 */


		var create = function(){
			console.log('create');
			EventDispatcher.notifyObservers('NEW_RECEIPE', {
				name 	    : $scope.formReceipe.name,
				slug 	    : Slug.slugify($scope.formReceipe.name),
				id 		    : guid.new(),
				ingredients : $scope.formReceipe.ingredients
			});
		};

		var update = function(){
			console.log('update');
			$scope.receipe.name 	   = $scope.formReceipe.name;
			$scope.receipe.slug  	   = Slug.slugify($scope.formReceipe.name);
			$scope.receipe.ingredients = $scope.formReceipe.ingredients;
			EventDispatcher.notifyObservers('RECEIPE_EDITED');

			$scope.modalForm.close();

		};

		var updateInline = function(){
			console.log('update inline');
			$scope.receipe.name = $scope.editingReceipe.name;
			$scope.receipe.slug = Slug.slugify($scope.editingReceipe.name);
			$scope.toggled 		= false;
		}

		var deleteItem = function(){
			$scope.receipes.splice($scope.receipes.indexOf($scope.receipe), 1);
		}

		var openForm = function(){
			$scope.toggled = false;
			$scope.modalForm = $modal.open({
					templateUrl: 'partials/modals/receipe-form.html',
					controller: 'ReceipeModalInstance',
					size: 'lg',
					scope:$scope,
					resolve: {
						args: function(){
							return {
								panelTitle:"Modifier " + $scope.receipe.name,
								pantryItems:$scope.pantryItems,
								receipe: $scope.receipe
							}
						}
					}
				});
		}

		/*
		 * Event listeners
		 */

		$scope.$watch('receipe.name', function(newValue, oldValue){
			if( newValue != oldValue && oldValue != undefined ){
				console.log('receipe name change');
				$scope.saveReceipes();
			}
		});

	}])
	.controller('SearchController', ['$scope', 'EventDispatcher', function($scope, EventDispatcher){
		$scope.search = {};

		$scope.$watch('search.name', function(value){
			EventDispatcher.notifyObservers('SEARCH', {prop:'name', value:value});
		});

		$scope.$watch('search.category', function(value){
			EventDispatcher.notifyObservers('SEARCH', {prop:'category', value:value});
		});

		$scope.reset = function(){
			$scope.search = {};
		}
	}])
	.controller('HeaderController', ['$scope', '$location', 'EventDispatcher', function($scope, $location, EventDispatcher){

		$scope.isCollapsed    = true;
		$scope.dropdownIsOpen = false;

		$scope.toggleDropdown = function(){
			$scope.dropdownIsOpen = !$scope.dropdownIsOpen;
		}

		$scope.toggleCollapse = function(){
			$scope.isCollapsed = !$scope.isCollapsed;
		}
		$scope.isActive = function(path){
			return path == $location.path();
		}

		console.log('register header');
		EventDispatcher.registerObserverForEvent('GROCERY_CHANGE', function(groceries){
			console.log('catched groceries length change : '  + groceries.length);
			$scope.n_groceries = groceries.length > 0 ? groceries.length : null;
		}, true)
	}])
	.controller('DeleteModalInstanceController', ['$scope', '$modalInstance', 'args', function($scope, $modalInstance, args){
		$scope.item = args.item;
		$scope.from = args.from;

  		$scope.ok = function () {
    		$modalInstance.close(true);
  		};

  		$scope.cancel = function () {
    		$modalInstance.close(false);
  		};
	}]);

localStorage.clear();
'use strict';

/* Directives */
angular.module('app.directives', [])
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
	.directive('itemFilter', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/item-filter.html',
			controller: 'SearchController'
		}
	});
	

	var KEYS = {
		enter : 13,
		esc	  : 27
	}
'use strict';

/* Filters */
angular.module('app.filters', []);
'use strict';

/* Services */
angular.module('app.services', [])
	.factory('PantryStorage', ['localStorageService', 'EventDispatcher', function(localStorageService, EventDispatcher){
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
	.service('EventDispatcher', ['$log', function($log){
		var	obsCallbacks = [];
		return {
			registerObserverForEvents: function(events){
				var dispatch = this;
				angular.forEach(events, function(callback, event){
					dispatch.registerObserverForEvent(event, callback);
				});
			},
			registerObserverForEvent: function(event, callback, persistant){
				obsCallbacks.push({
					event:event, 
					callback:callback, 
					persistant: persistant != undefined ? persistant : false
				});
			},
			notifyObservers: function(event, args){
				angular.forEach(obsCallbacks, function(obj){
					if( obj.event == event )
						obj.callback(args);
				});
			},
			// Clear all non persistant events
			clear: function(){
				var persistants = [];
				for(var i=0;i<obsCallbacks.length;i++){
					if( obsCallbacks[i].persistant )
						persistants.push(obsCallbacks[i]);
				}
				obsCallbacks = persistants;
			},
			debug:function(){
				$log.info(obsCallbacks.length + " events");
				$log.debug(obsCallbacks);
			}
		}
	}])
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
	}]);