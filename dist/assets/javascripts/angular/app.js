(function() {

  'use strict';

  function config($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl   : 'views/dashboard.html',
        controller    : 'Dashboard',
        controllerAs  : 'dashboard'
      })
      .when('/:category', {
        templateUrl   : 'views/items.html',
        controller    : 'Items', 
        controllerAs  : 'items' 
      })
      .when('/:category/new', {
        templateUrl   : 'views/item-new.html',
        controller    : 'Item',
        controllerAs  : 'item'
      })
      .when('/:category/item/:id', {
        templateUrl   : 'view/item.html',
        controller    : 'Item',
        controllerAs  : 'item'  
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  }

  angular
    .module('store', [
      'ngRoute', 
      'ngTouch'
    ])
    .constant('apiEndPoint', 'http://pantryapp-api.herokuapp.com')
    .config(config);

})();
