'use strict';

/* Controllers */
var controllers = angular.module('app.controllers', []);


controllers.controller('PantryController', [
	'$scope', 
	'$route', 
	'$log', 
	'$message', 
	'$event',
	function($scope, $route, $log, $message, $event){

		$scope.pageTitle = "";

		$scope.debug = function(value){
			$log.info(value);
		}

		$scope.$on("$routeChangeSuccess", function(){
			$scope.pageTitle = $route.current.title;
			$event.clear();
		});

		$scope.showEvents = function(){
			$event.debug();
		}

		//Hardcoded categories
		$scope.categories = categories;
}]);

controllers.controller('DeleteModalInstanceController', [
	'$scope', 
	'$modalInstance', 
	'args', 
	function($scope, $modalInstance, args){
		$scope.item = args.item;
		$scope.from = args.from;

  		$scope.ok = function () {
    		$modalInstance.close(true);
  		};

  		$scope.cancel = function () {
    		$modalInstance.close(false);
  		};
}]);

controllers.controller('MessageController', [
	'$scope', 
	'$messageInstance', 
	'args', function($scope, $messageInstance, args){
		$scope.item = args.item;
		$scope.type = args.type;
}]);


// localStorage.clear();
var categories = [
  "Pâtisserie",
  "Herbes et épices",
  "Nouilles",
  "Confitures",
  "Aliments en pot",
  "Moutardes",
  "Noix & graines",
  "Huiles",
  "Pâtes",
  "Légumes marinés",
  "Riz, céréales & légumineuses",
  "Sauces",
  "Conserves",
  "Vinaigres",
];