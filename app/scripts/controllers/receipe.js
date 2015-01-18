controllers.controller('ReceipesController', [
	'$scope', 
	'$modal', 
	'$event', 
	'ReceipeModel',
	'API',
	function($scope, $modal, $event, ReceipeModel, API){
		
		/*
		 * Public
		 */
		$scope.receipes = API.receipes().query();
		$scope.search   = {};

		$scope.saveReceipes = function(){return saveReceipes();};
		$scope.openForm = function(){return openForm();};

		/*
		 * Private
		 */

		var modalForm;
		$event.registerFor({
			new_receipe: function(receipe){
				$scope.receipes.push(ReceipeModel.new(receipe));
				$scope.search = {};
				modalForm.close();
			},
			search: function(search){
				$scope.search[search.prop] = search.value;
			}
		});


		var openForm = function(){
			modalForm = $modal.open({
				templateUrl: 'views/receipe-form.html',
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

}]);

controllers.controller('ReceipeController', [
	'$scope', 
	'$filter',
	'$event',
	'$message',
	'$modal', 
	'lookup', 
	'Slug',
	'ReceipeModel',
	'API',
	function($scope, $filter, $event, $message,$modal, lookup, Slug, ReceipeModel, API){

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
		$scope.receipe = $scope.receipe || [];
		$scope.receipe.ingredients = angular.fromJson($scope.receipe.ingredients);


		$scope.create  		= function(){return create();};
		$scope.openForm 	= function(){return openForm();};
		$scope.closeItem    = function(){return closeItem();};

		$scope.createItem 	= function(){
			var ingredient = $event.trigger('create_new_pantryitem', $scope.ingredient);
			$scope.ingredient = ingredient;
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

			if( lookup.lookupFor($scope.formReceipe.ingredients, $scope.ingredient.id, 'id') ){
				$message.open({
					templateUrl:'views/messages/ingredient-duplicate.html',
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
			$scope.formReceipe.ingredients.splice($scope.formReceipe.ingredients.indexOf(ingredient), 1);
		}

		$scope.openItem = function(){
			$scope.toggled = true;
			$scope.editingReceipe.name = $scope.receipe.name;
		}

		$scope.confirmDelete = function(){
			$modal.open({
				templateUrl: 'views/modals/confirm.html',
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
			$event.trigger('new_receipe', {
				name 	    : $scope.formReceipe.name,
				ingredients : $scope.formReceipe.ingredients
			}, 'receipe created in receipe form');
		};

		var update = function(){
			$scope.receipe.name 	   = $scope.formReceipe.name;
			$scope.receipe.slug  	   = Slug.slugify($scope.formReceipe.name);
			$scope.receipe.ingredients = $scope.formReceipe.ingredients;

			ReceipeModel.update($scope.receipe, function(){
				$scope.modalForm.close();
			});

		};

		var deleteItem = function(){
			$scope.receipe.$delete(function(){
				$scope.receipes.splice($scope.receipes.indexOf($scope.receipe), 1);	
			});
		}

		var openForm = function(){
			$scope.toggled = false;
			$scope.modalForm = $modal.open({
					templateUrl: 'views/receipe-form.html',
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

		var closeItem = function(){
			$scope.toggled = false;
		}

		$scope.$watch('ingredient', function(newValue, oldValue){
			if( newValue != oldValue && newValue != undefined && newValue != null){
				if( $filter('filter')($scope.pantryItems, {name:newValue}).length == 0 )
						$scope.display_btn_inset = true;
					else 
						$scope.display_btn_inset = false;				
			}

		});


}]);

controllers.controller('IngredientController', [
	'$scope', 
	'$event', function($scope, $event){
		/*
		 * Public
		 */

		$scope.toggled = false;

		$scope.toggleOptions = function(){
			$scope.toggled = !$scope.toggled;
		}

}]);

controllers.controller('ReceipeModalInstance', [
	'$scope', 
	'$modalInstance', 
	'args', 
	function($scope, $modalInstance, args){
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


}]);