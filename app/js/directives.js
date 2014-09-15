'use strict';

/* Directives */
angular.module('app.directives', ['ui.bootstrap'])
	.directive('quickEdit', function($timeout){
		return{
			restrict: 'A',
			link: function($scope, element, attributes){

				element.on('keydown', function(event){
					switch (event.keyCode){
						case KEYS.enter:
							$scope.$apply(attributes.onEdit);
						break;
						case KEYS.esc:
							$scope.toggled = false;
							$scope.$apply($scope.toggled);
						break;
					}
				});

				$scope.$watch('toggled', function(value){
					if( value ) $timeout(function(){element[0].focus();});
				});
			}
		}
	})
	.directive('openItem', function($timeout, isTouch){
		return{
			restrict: 'A',
			priority: 1000,
			link:function($scope, element){

				$timeout(function(){
					var element_width = element[0].offsetWidth,
						options_ratio = 30,
						_hammer 	  = new Hammer(element[0]),
						threshold     = element_width * (options_ratio/100), // 30% of element width = item options width
						wrapper       = element.children(),
						buttons		  = element.find('pantry-item-options').children(),
						panning       = false,
						margin_left   = 0;

						
					_hammer.on('pan', function(event){
						if( event.distance >= threshold && !$scope.toggled ){
							$scope.openItem();
							$scope.$apply('toggled');
						}else if( !$scope.toggled ){
							margin_left = 100*(event.distance/element_width);
							wrapper.css('margin-left', margin_left + '%');
							buttons.css('margin-left', parseInt(-1 * (options_ratio - margin_left)) + '%');
						}
							
					});

					_hammer.on('panend', function(event){
						wrapper.css('margin-left', '');
						buttons.css('margin-left', '');
					});		
				}, 100);
	
				
			}
		}
	})
	.directive('navLink', function(){
		return{
			restrict: 'A',
			link:function($scope, element){
				element.on('click', function(){
					$scope.isCollapsed = true;
				})
			}
		}
	})
	.directive('btnInset', function(){
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
	})
	.directive('focusMe', function($timeout){
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
	})
	.directive('messageWindow', function($timeout){
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
	})
	.directive('categoryList', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/category-list.html'
		}
	})
	.directive('pantryItems', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/pantry-list.html',
			controller: 'PantryItemsController'
		}
	})
	.directive('pantryItem', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/pantry-item.html'
		}
	})
	.directive('pantryItemOptions', function(){
		return{
			restrict: 'E',
			priority: 100,
			templateUrl: 'partials/pantry-item-options.html'
		}
	})
	.directive('groceryList', function(){
		return {
			restrict: 'E',
			templateUrl: 'partials/grocery-list.html',
			controller: 'GroceryController'
		}
	})
	.directive('groceryItem', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/grocery-item.html'
		}
	})
	.directive('groceryItemOptions', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/grocery-item-options.html'
		}
	})
	.directive('receipeList', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe-list.html',
			controller:'ReceipesController'
		}
	})
	.directive('receipe', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe.html',
			controller: 'ReceipeController'
		}
	})
	.directive('receipeOptions', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe-options.html'
		}
	})
	.directive('receipeIngredientOptions', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/receipe-ingredient-options.html'
		}
	})
	.directive('itemFilter', function(){
		return{
			restrict: 'E',
			templateUrl: 'partials/item-filter.html',
			controller: 'SearchController'
		}
	})
	.directive('lastUpdate', ['npConfig', function(npConfig) {
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
