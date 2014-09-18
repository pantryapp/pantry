controllers.controller('SearchController', [
	'$scope', 
	'$event', 
	function($scope, $event){
		
		$scope.search = {};

		$scope.$watch('search.name', function(value){
			$event.trigger('search', {prop:'name', value:value}, 'name search from search controller');
		});

		$scope.$watch('search.category', function(value){
			$event.trigger('search', {prop:'category', value:value}, 'category search from search controller');
		});

		$scope.reset = function(){
			$scope.search = {};
		}
}]);