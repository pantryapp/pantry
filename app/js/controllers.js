'use strict';

/* Controllers */
angular.module('app.controllers', [])
	.controller('PantryController', ['$scope', '$log', 'PantryStorage', function($scope, $log, PantryStorage){

		$scope.debug = function(value){
			$log.info(value);
		}

	}])
	.controller('PantryItemsController', ['$scope', 'PantryStorage', 'PantryItemEvents', 'PantryItemFactory', function($scope, PantryStorage, PantryItemEvents, PantryItemFactory){

		/*
		 * Public
		 */

		$scope.pantryItems = PantryStorage.getPantryItems();
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
			if( !$scope.item.outOfStocK) PantryItemEvents.notifyObservers('OUTOFSTOCK', $scope.item);	
			$scope.item.outOfStock = !$scope.item.outOfStock;
			closeItem();
			if( !$scope.item.outOfStock ) animate();
		};

		$scope.confirmDelete = function(){
			$modal.open({
				templateUrl: 'partials/modals/confirm.html',
				controller: 'DeleteModalInstanceController',
				size: 'sm',
				resolve: {
					args: function(){
						return {
							item: $scope.item
						}
					}
				}
			})
			.result.then(function(value){
				if( value === true ) $scope.deleteItem();
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
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
			save();
		});

		PantryItemEvents.registerObserverForEvent('OUTOFSTOCK', function(item){
			addGrocery(item);
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
	.controller('HeaderController', ['$scope', '$location', function($scope, $location){
		$scope.isActive = function(path){
			return path == $location.path();
		}
	}])
	.controller('DeleteModalInstanceController', ['$scope', '$modalInstance', 'args', function($scope, $modalInstance, args){
		$scope.item = args.item;

  		$scope.ok = function () {
    		$modalInstance.close(true);
  		};

  		$scope.cancel = function () {
    		$modalInstance.close(false);
  		};
	}]);

// localStorage.clear();