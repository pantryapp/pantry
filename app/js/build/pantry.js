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
	.controller('PantryController', ['$scope', '$route', '$log', '$message', '$event', function($scope, $route, $log, $message, $event){

		$scope.debug = function(value){
			$log.info(value);
		}

		$scope.$on("$routeChangeSuccess", function(){
			// console.log(' ---- VIEW CHANGE ----');
			$event.clear();
		});

		$scope.showEvents = function(){
			$event.debug();
		}

		//Hardcoded categories
		$scope.categories = categories;

		$scope.openAMessage = function(type){

			var messages = {
				success:{
					template:'new_pantryitem',
					type:'success'
				},
				error:{
					template:'delete_pantryitem',
					type:'danger'
				}
			}

			$message.open({
				templateUrl: 'partials/messages/'+messages[type].template+'.html',
				scope:$scope,
				resolve:{
					args: function(){
						return {
							item: {
								name:"Lorem ipsum",
								outOfStock:false
							},
							type:messages[type].type
						}
					}
				}
			})
		}

	}])
	.controller('PantryItemsController', ['$scope', 'PantryStorage', 'PantryItemFactory', 'lookup', '$message', '$event', function($scope, PantryStorage, PantryItemFactory, lookup, $message, $event){
		/*
		 * Public
		 */

		$scope.pantryItems = PantryStorage.getPantryItems();
		$scope.search 	   = {};
		$scope.newItemName = null;

		$event.registerFor({
			restock: function(groceryItem){
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
			search: function(search){
				$scope.search[search.prop] = search.value;
			},
			newItemCreation: function(name){
				$scope.newItemName = name;
			},
			create_new_pantryitem: function(pantryItemName){
				var pantryItem = PantryItemFactory.new({
					name:pantryItemName,
					outOfStock:true
				});

				$event.trigger('outofstock', pantryItem, 'new pantry item created, demanded by grocery controller');
				$scope.pantryItems.push(pantryItem);
			}
		});

		$scope.clearPantry = function(){
			$scope.pantryItems = [];
			savePantryItems();
		}

		$scope.savePantryItems = function(){return savePantryItems();};

		/*
		 * Private
		 */

		var savePantryItems = function(){PantryStorage.savePantryItems($scope.pantryItems);}


		/*
		 * Event listeners
		 */

		// Catch create and delete pantry item
		$scope.$watchCollection('pantryItems.length', function(){			
			savePantryItems();
		});



	}])
	.controller('PantryItemController', ['$scope', '$modal', '$log', 'Slug', '$timeout', 'PantryStorage', 'PantryItemFactory', '$event', '$message', function($scope, $modal, $log, Slug, $timeout, PantryStorage, PantryItemFactory, $event, $message){

		/*
		 * Public
		 */

		$scope.toggled = false;
		$scope.edited  = false;
		$scope.focus   = true;
		$scope.editingPantryItem = {};

		$scope.createItem = function(){			
			$scope.item = PantryItemFactory.new($scope.newPantryItem);

			$scope.pantryItems.push($scope.item);

			// Reset form. Todo : put that away. Directive?
			$scope.pantryItemForm.$setPristine();
			$scope.newPantryItem.name = "";

			$scope.focus = true;
		};

		$scope.update = function(){
			$scope.item.name = $scope.editingPantryItem.name;
			$scope.item.slug   = Slug.slugify($scope.editingPantryItem.name);
			closeItem();
			animate();

			$message.open({
				templateUrl: 'partials/messages/pantryitem-edit.html', scope:$scope,
				resolve:{
					args: function(){
						return {
							item: {
								name:$scope.item.name
							},
							type:'success'
						}
					}
				}
			});
		};

		$scope.toggleOutOfStock = function(){
			$scope.item.outOfStock = !$scope.item.outOfStock;
			if( !$scope.item.outOfStock)
				animate();
			else
				$event.trigger('outofstock', $scope.item, 'pantry item set out of stock');

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
				if( value === true )
					$scope.deleteItem();
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
				$event.trigger('pantryitem_edited', {}, 'pantry item edited');
				$scope.savePantryItems();
			}
		});

		$scope.$watch('item.outOfStock', function(newValue, oldValue){
			if( newValue != oldValue && oldValue != undefined){
				$scope.savePantryItems();
				if( newValue == false ) animate();
			}
		});

		$scope.$watch('newPantryItem.name', function(newValue, oldValue){
			if( newValue != oldValue && oldValue != undefined )
				$event.trigger('newItemCreation', newValue);
		});

	}])
	.controller('GroceryController', ['$scope', 'PantryStorage', '$event', function($scope, PantryStorage, $event){
		/*
		 * Public
		 */

		$scope.groceryItems = PantryStorage.getGroceries();
		$scope.search 		= {};

		$scope.hasGroceries = $scope.groceryItems.length > 0 

		$scope.clearGroceries = function(){
			$scope.groceryItems = [];
		}

		$event.registerFor({
			add_grocery:function(item){
				if(item != undefined) 
					addGrocery(item);
			},
			outofstock: function(item){
				addGrocery(item);
			},
			search: function(search){
				$scope.search[search.prop] = search.value;	
			}
		});

		$scope.removeGrocery = function(item){return removeGrocery(item);};

		/*
		 * Private
		 */

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
			$event.trigger('grocery_change', $scope.groceryItems, 'Grocery controllerƒ');
			$scope.hasGroceries = $scope.groceryItems.length > 0 
			save();
		});

	}])
	.controller('GroceryItemController', ['$scope', '$event', function($scope, $event){

		/*
		 * Public
		 */

		$scope.toggled 		   = false;
		$scope.groceryItemForm = {};

		$scope.toggleOptions = function(){
			$scope.toggled = !$scope.toggled;
		};

		$scope.buy = function(){
			$event.trigger('restock', $scope.item, 'grocery item bought');
			$scope.removeGrocery($scope.item);
		};

		$scope.delete = function(){
			$scope.removeGrocery($scope.item);
		};

		$scope.createNew = function(){
			$event.trigger('create_new_pantryitem', $scope.newGroceryItem, 'new item created from grocery');
			resetNewGroceryForm();
		}

		$scope.create = function(){
			$event.trigger('add_grocery', $scope.newGroceryItem, 'Grocery controller');
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
	.controller('ReceipesController', ['$scope', '$modal', 'PantryStorage', '$event', function($scope, $modal, PantryStorage, $event){

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

		$event.registerFor({
			new_receipe: function(receipe){
				$scope.receipes.push(receipe);
				modalForm.close();
			},
			receipe_edited: function(){
				PantryStorage.saveReceipes($scope.receipes);
			},
			search: function(search){
				$scope.search[search.prop] = search.value;
			}
		});

		var saveReceipes = function(){
			PantryStorage.saveReceipes($scope.receipes);
		}

		var openForm = function(){
			modalForm = $modal.open({
				templateUrl: 'partials/receipe-form.html',
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
	.controller('ReceipeController', ['$scope', '$modal', 'Slug', 'guid', '$event', function($scope, $modal, Slug, guid, $event){

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
		$scope.createItem 	= function(){
			// console.log('create item');
		}

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
			$scope.formReceipe.ingredients.push($scope.ingredient);
			$scope.ingredient = null;
		}	

		$scope.removeIngredient = function(ingredient){	
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
			// console.log('create');
			$event.trigger('new_receipe', {
				name 	    : $scope.formReceipe.name,
				slug 	    : Slug.slugify($scope.formReceipe.name),
				id 		    : guid.new(),
				ingredients : $scope.formReceipe.ingredients
			}, 'receipe created in receipe form');
		};

		var update = function(){
			console.log('update');
			$scope.receipe.name 	   = $scope.formReceipe.name;
			$scope.receipe.slug  	   = Slug.slugify($scope.formReceipe.name);
			$scope.receipe.ingredients = $scope.formReceipe.ingredients;
			$event.trigger('receipe_edited', {}, 'recipe edited by receipe form');

			$scope.modalForm.close();

		};

		var updateInline = function(){
			// console.log('update inline');
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
					templateUrl: 'partials/receipe-form.html',
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
				// console.log('receipe name change');
				$scope.saveReceipes();
			}
		});

	}])
	.controller('SearchController', ['$scope', '$event', function($scope, $event){
		$scope.search = {};

		$scope.$watch('search.name', function(value){
			$event.trigger('search', {prop:'name', value:value}, 'name search from search controller');
		});

		$scope.$watch('search.category', function(value){
			$event.trigger('search', {prop:'category', value:value}, 'category search from search controller');
		});

		$scope.reset = function(){
			$scope.search = {};
		}
	}])
	.controller('HeaderController', ['$scope', '$location', '$event', function($scope, $location, $event){

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

		$event.registerFor({
			grocery_change:function(groceries){
				$scope.n_groceries = groceries.length > 0 ? groceries.length : null;
			}
		},true)
	}])
	.controller('MessageController', ['$scope', '$messageInstance', 'args', function($scope, $messageInstance, args){
		$scope.item = args.item;
		$scope.type = args.type;
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
angular.module('app.services', [])
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
						var is_event = false;
						angular.forEach(obsCallbacks, function(obj){
							if( obj.event == event ){
								obj.callback(args);
								is_event = true;
								if( debug )
									$log.info('Catched by : ' + obj.callback);
							}
						});
						if( !is_event )
							$log.warn ('There is no observer for event ' + event + " from " + caller);

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
					registeredEvents.trigger(event, args, caller, debug);
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
					var messageInstance = {
					}


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