'use strict';

// Declare app level module which depends on filters, and services
angular.module('app', [
	'ngRoute',
  'pantryAppConfigs', 
  'pantryApi',
  'env',
  'hmTouchEvents',
	'app.filters',
  'app.services',
  'app.directives',
  'app.controllers'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pantry', 
  	{
  		  templateUrl: 'views/pantry.html',
        title: 'Garde-manger'
  	});
  $routeProvider.when('/groceries',{
    templateUrl: 'views/groceries.html',
    title: 'Épicerie'
  });
  $routeProvider.when('/receipes', {
    templateUrl: 'views/receipes.html',
    title:'Recettes'
  });
  $routeProvider.when('/configs', {
    templateUrl: 'views/configs.html',
    controller: 'ConfigsController'
  });
  $routeProvider.otherwise(
  	{
  		redirectTo: '/pantry'
  	});
}]);
