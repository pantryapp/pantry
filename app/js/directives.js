'use strict';

/* Directives */
var directives = angular.module('app.directives', ['ui.bootstrap']);
directives.directive('noCache', function(){
		return{
			restrict: 'A',
			link:function($scope, element, attributes){
				element[0].src = attributes.src + "?v=" + new Date().getTime();
			}
		}
	});
directives.directive('inlineEdit', function($timeout){
		return{
			restrict: 'A',
			link: function($scope, element, attributes){

				element.on('keydown', function(event){
					switch (event.keyCode){
						case KEYS.enter:
							$scope.$apply(attributes.onEdit);
						break;
						case KEYS.esc:
							$scope.$apply(attributes.onCancel);
						break;
					}
				});

				$scope.$watch('editing', function(value){
					if( value )
						$timeout(function(){element[0].focus();});
				});
			}
		}
	});
directives.directive('navLink', function(){
		return{
			restrict: 'A',
			link:function($scope, element){
				element.on('click', function(){
					$scope.isCollapsed = true;
				})
			}
		}
	});
directives.directive('btnInset', function(){
		return{
			restrict: 'A',
			link: function($scope, element ,attributes){
				var input_parent = element.parent().find('input');
				element.addClass('btn-inset');

				input_parent.bind('keydown', function(event){

					switch(event.keyCode){
						case KEYS.enter:
							if( $scope.display_btn_inset )
								element[0].click();
								event.preventDefault();
						break;
					}
				})

			}
		}
	});
directives.directive('focusMe', function($timeout){
		return{
			restrict: 'A',
			link: function($scope, element, attributes){

				var focusInput = function(){
					$timeout(function(){element[0].focus();});
				}

				if( $scope.focus )
					focusInput();

				element.on('blur', function(){
					$scope.focus = false;
				})

				
				$scope.$watch(function(){
					return $scope.focus
				}, function(value){
					if( value ) 
						focusInput();
				})
			}
		}
	});
directives.directive('messageWindow', function($timeout){
		return{
			restrict: 'EA',
			templateUrl: 'partials/message.html',
			transclude:true,
			link: function($scope, element, attributes){
				$timeout(function(){
					$scope.animate = true;
				});
			}
		}
	});
directives.directive('categoryList', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/category-list.html'
		}
	});
directives.directive('pantryItems', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/pantry-list.html',
			controller: 'PantryItemsController'
		}
	});
directives.directive('pantryItem', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/pantry-item.html'
		}
	});
directives.directive('pantryItemOptions', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/pantry-item-options.html'
		}
	});
directives.directive('groceryList', function(){
		return {
			restrict: 'E',
			templateUrl: 'partials/grocery-list.html',
			controller: 'GroceryController'
		}
	});
directives.directive('groceryItem', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/grocery-item.html'
		}
	});
directives.directive('groceryItemOptions', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/grocery-item-options.html'
		}
	});
directives.directive('receipeList', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe-list.html',
			controller:'ReceipesController'
		}
	});
directives.directive('receipe', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe.html',
			controller: 'ReceipeController'
		}
	});
directives.directive('receipeOptions', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe-options.html'
		}
	});
directives.directive('receipeIngredientOptions', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe-ingredient-options.html'
		}
	});
directives.directive('itemFilter', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/item-filter.html',
			controller: 'SearchController'
		}
	});
directives.directive('lastUpdate', ['npConfig', function(npConfig) {
    	return function(scope, elm, attrs) {
			var config = npConfig.query(function(){
				elm.text(config.version);
			});
      		
    	};
 	}]);
 	
	var KEYS = {
		enter : 13,
		esc	  : 27
	}
