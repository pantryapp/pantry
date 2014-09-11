controllers.controller('GroceryController', [
	'$scope', 
	'PantryStorage', 
	'$event', function($scope, PantryStorage, $event){

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

}]);
controllers.controller('GroceryItemController', [
	'$scope',
	'$event', 
	function($scope, $event){

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


}]);