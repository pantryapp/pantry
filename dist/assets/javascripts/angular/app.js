(function() {

  'use strict';

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl   : 'views/dashboard.html',
        controller    : 'Dashboard',
        controllerAs  : 'dashboard'
      })
      .when('/:category', {
        templateUrl   : 'views/items.html',
        controller    : 'Items', 
        controllerAs  : 'items' 
      })
      .when('/item/:id', {
        templateUrl   : 'view/item.html',
        controller    : 'Item',
        controllerAs  : 'item'  
      })
      .otherwise({
        redirectTo: '/'
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
