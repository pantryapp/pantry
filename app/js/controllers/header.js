controllers.controller('HeaderController', [
	'$scope', 
	'$location', 
	'$event', function($scope, $location, $event){

		$scope.isCollapsed    = true;
		$scope.dropdownIsOpen = false;

		$scope.toggleDropdown = function(){
			$scope.dropdownIsOpen = !$scope.dropdownIsOpen;
		}

		$scope.toggleCollapse = function(){
			$scope.isCollapsed = !$scope.isCollapsed;
		}
		$scope.isActive = function(path){
			return path == $location.path();
		}

		$event.registerFor({
			grocery_change:function(groceries){
				$scope.n_groceries = groceries.length > 0 ? groceries.length : null;
			}
		},true)
}]);