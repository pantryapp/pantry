'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('app', [
	'ngRoute',
  'hmTouchevents',
	'app.filters',
  'app.services',
  'app.directives',
  'app.controllers'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pantry', 
  	{
  		  templateUrl: 'partials/pantry.html',
        title: 'Garde-manger'
  	});
  $routeProvider.when('/groceries',{
    templateUrl: 'partials/groceries.html',
    title: 'Épicerie'
  });
  $routeProvider.when('/receipes', {
    templateUrl: 'partials/receipes.html',
    title:'Recettes'
  });
  $routeProvider.otherwise(
  	{
  		redirectTo: '/pantry'
  	});
}]);
