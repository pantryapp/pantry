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

		//Hardcoded categories
		$scope.categories = categories;
		console.log($scope.categories);

	}])
	.controller('PantryItemsController', ['$scope', 'PantryStorage', 'EventDispatcher', 'PantryItemFactory', 'lookup', function($scope, PantryStorage, EventDispatcher, PantryItemFactory, lookup){
		/*
		 * Public
		 */

		$scope.pantryItems = PantryStorage.getPantryItems();
		$scope.search 	   = {};

		$scope.clearPantry = function(){
			$scope.pantryItems = [];
			savePantryItems();
		}
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
			// console.log('grocery length changed')
			// EventDispatcher.debug();
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

		$scope.createNew = function(){
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
			// console.log('add ingredient');
			$scope.formReceipe.ingredients.push($scope.ingredient);
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
			EventDispatcher.notifyObservers('NEW_RECEIPE', {
				name 	    : $scope.formReceipe.name,
				slug 	    : Slug.slugify($scope.formReceipe.name),
				id 		    : guid.new(),
				ingredients : $scope.formReceipe.ingredients
			});
		};

		var update = function(){
			// console.log('update');
			$scope.receipe.name 	   = $scope.formReceipe.name;
			$scope.receipe.slug  	   = Slug.slugify($scope.formReceipe.name);
			$scope.receipe.ingredients = $scope.formReceipe.ingredients;
			EventDispatcher.notifyObservers('RECEIPE_EDITED');

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

		// console.log('register header');
		EventDispatcher.registerObserverForEvent('GROCERY_CHANGE', function(groceries){
			// console.log('catched groceries length change : '  + groceries.length);
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