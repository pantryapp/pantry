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
	.controller('PantryItemsController', ['$scope', 'PantryStorage', 'PantryItemFactory', 'lookup', '$message', '$event', '$filter', function($scope, PantryStorage, PantryItemFactory, lookup, $message, $event, $filter){
		/*
		 * Public
		 */

		$scope.pantryItems = PantryStorage.getPantryItems();
		$scope.search 	   = {};

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
				$event.trigger('pantryItemsFilter', 
					$filter('filter')($scope.pantryItems, {name:search.value}).length
				);

			},
			create_new_pantryitem: function(pantryItemName){
				var pantryItem = PantryItemFactory.new({
					name:pantryItemName,
					outOfStock:true
				});

				$event.trigger('outofstock', pantryItem, 'new pantry item created, demanded by grocery controller');
				$scope.pantryItems.push(pantryItem);

				$message.open({
					templateUrl: 'partials/messages/new_pantryitem.html',
					scope:$scope,
					resolve:{
						args: function(){
							return {
								item: pantryItem,
								type:'success'
							}
						}
					}
				});
				return pantryItem;
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
	.controller('PantryItemController', ['$scope', '$modal', '$log', 'Slug', '$timeout', 'PantryStorage', 'PantryItemFactory', '$event', '$message', 'lookup', function($scope, $modal, $log, Slug, $timeout, PantryStorage, PantryItemFactory, $event, $message, lookup){

		/*
		 * Public
		 */

		$scope.toggled = false;
		$scope.edited  = false;
		$scope.focus   = true;
		$scope.editingPantryItem = {};

		$scope.createItem = function(){			
			$scope.item = PantryItemFactory.new($scope.newPantryItem);

			// Check if item with same slug exists
			if( lookup.lookupFor($scope.pantryItems, $scope.item, 'slug') ){
				$message.open({
					templateUrl:'partials/messages/pantryitem-duplicate.html',
					resolve:{
						args:function(){
							return{
								item:$scope.item,
								type:'warning'
							}
						}
					}
				});
			} else $scope.pantryItems.push($scope.item);

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
	.controller('ReceipeController', ['$scope', '$modal', 'Slug', 'guid', '$event', '$message', 'lookup', function($scope, $modal, Slug, guid, $event, $message, lookup){

		/*
		 * Public
		 */
		 
		$scope.toggled 		  = false;
		$scope.editingReceipe = {
			name:null,
			ingredients:[]
		};		
		$scope.modalForm;
		$scope.display_btn_inset = false;

		$scope.create  		= function(){return create();};
		$scope.updateInline = function(){return updateInline();}
		$scope.openForm 	= function(){return openForm();};

		$scope.createItem 	= function(){
			console.log('create item');
			var ingredient = $event.trigger('create_new_pantryitem', $scope.ingredient);
			$scope.ingredient = {name:$scope.ingredient};
			$scope.addIngredient();
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
			// console.log('add ingredient');
			if( lookup.lookupFor($scope.formReceipe.ingredients, $scope.ingredient, 'id') ){
				$message.open({
					templateUrl:'partials/messages/ingredient-duplicate.html',
					resolve:{
						args:function(){
							return{
								item:{ingredient:$scope.ingredient.name, receipe:$scope.formReceipe.name},
								type:'warning'
							}
						}
					}
				});
			} else $scope.formReceipe.ingredients.push($scope.ingredient);
			
			$scope.ingredient = null;
		}	

		$scope.removeIngredient = function(ingredient){
			// console.log('remove ingredient');
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
				$scope.saveReceipes();
			}
		});

		$event.registerFor({
			pantryItemsFilter: function(n_items){
				if( n_items == 0 )
					$scope.display_btn_inset = true;
				else
					$scope.display_btn_inset = false;
					
			}
		})

		$scope.$watch('ingredient', function(newValue, oldValue){
			if( newValue != oldValue && oldValue != undefined )
				$event.trigger('search', {prop:'name', value:newValue}, 'ingredient search from receipe controller');

		});

	}])
	.controller('IngredientController', ['$scope', '$event', function($scope, $event){
		/*
		 * Public
		 */

		$scope.toggled = false;

		$scope.toggleOptions = function(){
			$scope.toggled = !$scope.toggled;
		}

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