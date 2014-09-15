controllers.controller('PantryItemsController', [
		'$scope', 
		'PantryStorage', 
		'PantryItemFactory', 
		'lookup', 
		'$message', 
		'$event', 
		function($scope, PantryStorage, PantryItemFactory, lookup, $message, $event){

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

					$message.open({
						templateUrl: 'partials/messages/pantryitem-new.html',
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



}]);
controllers.controller('PantryItemController', [
	'$scope', 
	'$modal', 
	'$log', 
	'Slug',
	'$timeout', 
	'PantryStorage', 
	'PantryItemFactory', 
	'$event', 
	'$message', 
	'lookup', 
	'_options',
	function($scope, $modal, $log, Slug, $timeout, PantryStorage, PantryItemFactory, $event, $message, lookup, _options){

		/*
		 * Public
		 */

		$scope.toggled = false;
		$scope.edited  = false;
		$scope.focus   = _options.get('autoFocus').value;
		$scope.editingPantryItem = {};
		$scope.showForm = _options.get('showForm').value;

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

}]);