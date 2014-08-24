'use strict';

/* Controllers */
angular.module('app.controllers', [])
	.controller('PantryController', ['$scope', '$log', function($scope, $log){

		$scope.debug = function(value){
			$log.info(value);
		}

	}])
	.controller('PantryItemsController', ['$scope', 'PantryStorage', 'PantryItemEvents', 'PantryItemFactory', function($scope, PantryStorage, PantryItemEvents, PantryItemFactory){

		/*
		 * Public
		 */

		$scope.pantryItems = PantryStorage.getPantryItems();
		$scope.search 	   = {};

		$scope.savePantryItems = function(){return savePantryItems();};

		/*
		 * Private
		 */

		 var savePantryItems = function(){
		 	PantryStorage.savePantryItems($scope.pantryItems);
		 }

		/*
		 * Event listeners
		 */

		// Catch create and delete pantry item
		$scope.$watchCollection('pantryItems.length', function(){
			savePantryItems();
		});

		// Controller catch the call from GroceryItem
		PantryItemEvents.registerObserverForEvent('RESTOCK', function(groceryItem){

			var pantryItem = PantryStorage.lookupFor($scope.pantryItems, groceryItem);

			// pantryItem will be undefined if it has been deleted whilst the item was in the grocery list.
			if( pantryItem != undefined ){
				pantryItem.outOfStock = false;
			}else{
				// Create new item if it has been deleted
				pantryItem = PantryItemFactory.duplicate(groceryItem);
				$scope.pantryItems.push(pantryItem);
			}
		});

		PantryItemEvents.registerObserverForEvent('SEARCH', function(search){
			$scope.search[search.prop] = search.value;
		});

	}])
	.controller('PantryItemController', ['$scope', '$modal', '$log', 'Slug', '$timeout', 'PantryStorage', 'PantryItemEvents', 'PantryItemFactory', function($scope, $modal, $log, Slug, $timeout, PantryStorage, PantryItemEvents, PantryItemFactory){

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

			PantryItemEvents.notifyObservers('UPDATE', $scope.item);
		};

		$scope.toggleOutOfStock = function(){

			$scope.item.outOfStock = !$scope.item.outOfStock;
			if( !$scope.item.outOfStock){
				animate();
			}else {
				PantryItemEvents.notifyObservers('OUTOFSTOCK', $scope.item);	
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
	.controller('GroceryController', ['$scope', 'PantryStorage', 'PantryItemEvents', function($scope, PantryStorage, PantryItemEvents){

		/*
		 * Public
		 */

		$scope.groceryItems = PantryStorage.getGroceries();
		$scope.search 		= {};


		$scope.clearGroceries = function(){
			$scope.groceryItems = [];
		}

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
			PantryItemEvents.notifyObservers('GROCERY_CHANGE', $scope.groceryItems);
			save();
		});

		PantryItemEvents.registerObserverForEvent('OUTOFSTOCK', function(item){
			addGrocery(item);
		});

		PantryItemEvents.registerObserverForEvent('SEARCH', function(search){
			$scope.search[search.prop] = search.value;
		});

	}])
	.controller('GroceryItemController', ['$scope', 'PantryItemEvents', function($scope, PantryItemEvents){

		/*
		 * Public
		 */

		$scope.toggled = false;

		$scope.toggleOptions = function(){
			$scope.toggled = !$scope.toggled;
		};

		$scope.buy = function(){
			PantryItemEvents.notifyObservers('RESTOCK', $scope.item);
			$scope.removeGrocery($scope.item);
		};

		$scope.delete = function(){
			$scope.removeGrocery($scope.item);
		}


	}])
	.controller('ReceipesController', ['$scope', 'PantryStorage', 'PantryItemEvents', function($scope, PantryStorage, PantryItemEvents){

		/*
		 * Public
		 */
		$scope.pantryItems = PantryStorage.getPantryItems();
		$scope.receipes = PantryStorage.getReceipes();
		$scope.search   = {};
		console.log($scope.pantryItems);

		$scope.saveReceipes = function(){return saveReceipes();};

		/*
		 * Private
		 */

		var saveReceipes = function(){
			PantryStorage.saveReceipes($scope.receipes);
		}

		/*
		 * Event listener
		 */

		$scope.$watch('receipes.length', function(){
	 		PantryStorage.saveReceipes($scope.receipes);
		});

		PantryItemEvents.registerObserverForEvent('SEARCH', function(search){
			$scope.search[search.prop] = search.value;
		});


	}])
	.controller('ReceipeController', ['$scope', '$modal', 'Slug', 'guid', function($scope, $modal, Slug, guid){

		/*
		 * Public
		 */

		$scope.toggled 		  = false;
		$scope.editingReceipe = {};		


		$scope.create = function(){
			$scope.receipe = {};
			$scope.receipe.name = $scope.newReceipe.name;
			$scope.receipe.slug = Slug.slugify($scope.newReceipe.name);
			$scope.receipe.id 	= guid.new();
			$scope.receipe.ingredients = $scope.newReceipe.ingredients;
			$scope.receipes.push($scope.receipe);
			$scope.newReceipe = {};
			$scope.receipeForm.$setPristine();
		}

		$scope.update = function(){
			$scope.receipe.name = $scope.editingReceipe.name;
			$scope.receipe.slug = Slug.slugify($scope.receipe.name);
			$scope.toggled 		= false;
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

		var deleteItem = function(){
			$scope.receipes.splice($scope.receipes.indexOf($scope.receipe), 1);
		}

		/*
		 * Event listeners
		 */

		$scope.$watch('receipe.name', function(newValue, oldValue){
			if( newValue != oldValue && oldValue != undefined ){
				$scope.saveReceipes();
			}
		});



	}])
	.controller('SearchController', ['$scope', 'PantryItemEvents', function($scope, PantryItemEvents){
		$scope.search = {};

		$scope.$watch('search.name', function(value){
			PantryItemEvents.notifyObservers('SEARCH', {prop:'name', value:value});
		});

		$scope.$watch('search.category', function(value){
			PantryItemEvents.notifyObservers('SEARCH', {prop:'category', value:value});
		});

		$scope.reset = function(){
			$scope.search = {};
		}
	}])
	.controller('HeaderController', ['$scope', '$location', 'PantryItemEvents', function($scope, $location, PantryItemEvents){

		$scope.isCollapsed = true;

		$scope.toggleCollapse = function(){
			console.log('Fds');
			$scope.isCollapsed = !$scope.isCollapsed;
		}
		$scope.isActive = function(path){
			return path == $location.path();
		}

		PantryItemEvents.registerObserverForEvent('GROCERY_CHANGE', function(groceries){
			$scope.n_groceries = groceries.length > 0 ? groceries.length : null;
		})
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