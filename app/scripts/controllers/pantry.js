controllers.controller('PantryItemsController', [
		'$scope', 
		'PantryStorage', 
		'PantryItemFactory', 
		'lookup', 
		'$message', 
		'$event', 
		'_configs',
		'API',
		function($scope, PantryStorage, PantryItemFactory, lookup, $message, $event, _configs,API){

			/*
			 * Public
			 */

			// $scope.pantryItems = PantryStorage.getPantryItems();
			$scope.pantryItems = API.pantryitems().getAll();
			$scope.search 	   = {};
			$scope.newItemName = null;

			$scope.showForm = _configs.get('showForm').value;

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

						$message.open({
							templateUrl: 'views/messages/pantryitem-new.html',
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
						templateUrl: 'views/messages/pantryitem-new.html',
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
	'_configs',
	'API',
	function($scope, $modal, $log, Slug, $timeout, PantryStorage, PantryItemFactory, $event, $message, lookup, _configs, API){

		/*
		 * Public
		 */

		$scope.toggled = false;
		$scope.edited  = false;
		$scope.focus   = _configs.get('autoFocus').value;
		$scope.editing = false;
		$scope.editingPantryItem = {};

		$scope.createItem = function(){			
			$scope.item = PantryItemFactory.new($scope.newPantryItem);

			// Check if item with same slug exists
			if( lookup.lookupFor($scope.pantryItems, $scope.item, 'slug') ){
				$message.open({
					templateUrl:'views/messages/pantryitem-duplicate.html',
					resolve:{
						args:function(){
							return{
								item:$scope.item,
								type:'warning'
							}
						}
					}
				});
			} else {

				API.pantryitems().create($scope.item, function(item){
					$scope.item = item;
					$scope.pantryItems.push($scope.item);	
				});

				
			}

			// Reset form. Todo : put that away. Directive?
			$scope.pantryItemForm.$setPristine();
			$scope.newPantryItem.name = "";

			$scope.focus = true;
		};

		$scope.update = function(){
			if( $scope.item.name != $scope.editingPantryItem.name ){

				$scope.item.name = $scope.editingPantryItem.name;
				$scope.item.slug = Slug.slugify($scope.editingPantryItem.name);

				API.pantryitems().update($scope.item, function(){
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
			$scope.item.outOfStock = !$scope.item.outOfStock;
			if( !$scope.item.outOfStock)
				animate();
			else
				$event.trigger('outofstock', $scope.item, 'pantry item set out of stock');

			closeItem();
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

		$scope.deleteItem = function(){
			API.pantryitems().delete($scope.item.id, function(){
				$scope.pantryItems.splice($scope.pantryItems.indexOf($scope.item), 1);
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