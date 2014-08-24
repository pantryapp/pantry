'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('app', [
	'LocalStorageModule',
	'ngRoute',
  'slugifier', 
  'ui.bootstrap',
	'app.filters',
  'app.services',
  'app.directives',
  'app.controllers'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pantry', 
  	{
  		  templateUrl: 'partials/pantry.html',
  	});
  $routeProvider.when('/groceries',{
    templateUrl: 'partials/groceries.html',
    controller: 'GroceryController'
  });
  $routeProvider.when('/receipes', {
    templateUrl: 'partials/receipes.html',
    controller: 'ReceipesController'
  });
  $routeProvider.otherwise(
  	{
  		redirectTo: '/pantry'
  	});
}]);