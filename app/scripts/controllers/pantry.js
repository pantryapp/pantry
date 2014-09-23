controllers.controller('PantryItemsController', [
		'$scope', 
		'PantryItemModel', 
		'lookup', 
		'$message', 
		'$event', 
		'_configs',
		'API',
		function($scope, PantryItemModel, lookup, $message, $event, _configs, API){

			/*
			 * Public
			 */

			$scope.pantryItems = API.pantryitems().query();
			$scope.search 	   = {};
			$scope.newItemName = null;

			$scope.showForm = _configs.get('showForm').value;

			$event.registerFor({
				restock: function(groceryItem){
					var pantryItem = lookup.lookupFor($scope.pantryItems, groceryItem, 'id');

					// pantryItem will be undefined if it has been deleted whilst the item was in the grocery list.
					if( pantryItem != undefined ){
						pantryItem.outofstock = false;
						pantryItem.$update();
					}else{
						// Create new item if it has been deleted
						pantryItem = PantryItemModel.new({name:groceryItem.name});
						$message.open('pantryitem-new', {item:pantryItem});
					}
				},
				search: function(search){
					$scope.search[search.prop] = search.value;
				},
				newItemCreation: function(name){
					$scope.newItemName = name;
				},
				create_new_pantryitem: function(pantryItemName){

					var pantryItem = PantryItemModel.new({
						name:pantryItemName,
						outofstock:true
					});

					$event.trigger('outofstock', pantryItem, 'new pantry item created, demanded by grocery controller');
					$scope.pantryItems.push(pantryItem);

					$message.open('pantryitem-new', {item:pantryItem});
					return pantryItem;
				}
			});

}]);
controllers.controller('PantryItemController', [
	'$scope', 
	'$modal', 
	'$log', 
	'Slug',
	'$timeout', 
	'PantryItemModel', 
	'$event', 
	'$message', 
	'lookup', 
	'_configs',
	function($scope, $modal, $log, Slug, $timeout, PantryItemModel, $event, $message, lookup, _configs){

		/*
		 * Public
		 */

		$scope.toggled = false;
		$scope.edited  = false;
		$scope.focus   = _configs.get('autoFocus').value;
		$scope.editing = false;
		$scope.editingPantryItem = {};

		$scope.createItem = function(){			
			// Check if item with same slug exists
			if( lookup.lookupFor($scope.pantryItems, Slug.slugify($scope.newPantryItem.name), 'slug') )
				$message.open('pantryitem-duplicate', {item:{name:$scope.newPantryItem.name}});
			// If not create new item
			else 
				$scope.pantryItems.push(PantryItemModel.new($scope.newPantryItem));

			// Reset form.
			$scope.newPantryItem.name = "";
			$scope.focus 			  = true;
			$scope.pantryItemForm.$setPristine();
		};

		$scope.updateName = function(){
			if( $scope.item.name != $scope.editingPantryItem.name ){

				$scope.item.name = $scope.editingPantryItem.name;
				$scope.item.slug = Slug.slugify($scope.editingPantryItem.name);


				$scope.item.$update(function(){
					animate();
					$message.open({
						templateUrl: 'views/messages/pantryitem-edit.html', 
						scope:$scope,
						resolve:{args: function(){return {
									item: {
										name:$scope.item.name
									},
									type:'success'
								}}}
					});
				});
			}

			showOptions();
		};

		$scope.toggleOutOfStock = function(){
			$scope.item.outofstock = !$scope.item.outofstock;
			$scope.item.$update(function(){
				if( !$scope.item.outofstock)
					animate();
				else
					$event.trigger('outofstock', $scope.item, 'pantry item set out of stock');

				closeItem();
			});
		};

		$scope.deleteItem = function(){
			$scope.item.$delete(function(){
				$scope.pantryItems.splice($scope.pantryItems.indexOf($scope.item), 1);
			});
		};

		$scope.confirmDelete = function(){
			$modal.open({
				templateUrl: 'views/modals/confirm.html',
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

		$scope.showOptions = function(){
			showOptions();
		};

		$scope.showEditForm = function(){
			if( !$scope.editing )
				$scope.editing = true;
			if( $scope.toggled )
				$scope.toggled = false;
				$scope.editingPantryItem.name = $scope.item.name;
		}


		$scope.closeItem = function(){
			closeItem();
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
			$scope.editing = false;
			$scope.editingPantryItem = {};
		}

		var showOptions = function(){
			if( !$scope.toggled )
				$scope.toggled = true;
			if( $scope.editing )
				$scope.editing = false;
		}

		/*
		 * Event listeners
		 */

		$scope.$watchCollection('item.name', function(newValue, oldValue){
			if( newValue != oldValue && oldValue != undefined ){
				// $scope.savePantryItems();
			}
		});

		$scope.$watch('item.outofstock', function(newValue, oldValue){
			if( newValue != oldValue && oldValue != undefined){
				// $scope.savePantryItems();
				if( newValue == false ) animate();
			}
		});

		$scope.$watch('newPantryItem.name', function(newValue, oldValue){
			if( newValue != oldValue && oldValue != undefined )
				$event.trigger('newItemCreation', newValue);
		});

}]);