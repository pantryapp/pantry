controllers.controller('GroceryController', [
	'$scope',
	'$event',
	'GroceryItemModel',
	'lookup',
	'API',
	'$event', function($scope, $event, GroceryItemModel, lookup, API){

		/*
		 * Public
		 */

		$scope.groceryItems = API.groceries().query();
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
			var groceryItem = lookup.lookupFor($scope.groceryItems, item.slug, 'slug');
			if( groceryItem === undefined )
				$scope.groceryItems.push(GroceryItemModel.new(item));
		};

		var removeGrocery = function(item){
			item.$delete();
			$scope.groceryItems.splice($scope.groceryItems.indexOf(item), 1);
		};


		/*
		 * Event listeners
		 */ 

		$scope.$watch('groceryItems.length', function(){
			$event.trigger('grocery_change', $scope.groceryItems, 'Grocery controller');
			$scope.hasGroceries = $scope.groceryItems.length > 0 
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

		$scope.closeItem = function(){
			$scope.toggled = false;
		}

		/*
		 * Private
		 */

		var resetNewGroceryForm = function(){
			$scope.newGroceryItem = null;
			$scope.groceryItemForm.$setPristine();
		}


}]);