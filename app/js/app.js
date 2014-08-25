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
    templateUrl: 'partials/groceries.html'
  });
  $routeProvider.when('/receipes', {
    templateUrl: 'partials/receipes.html'
  });
  $routeProvider.otherwise(
  	{
  		redirectTo: '/pantry'
  	});
}]);