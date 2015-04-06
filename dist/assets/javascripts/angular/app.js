(function() {

  'use strict';

  function config($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl   : 'views/dashboard.html',
        controller    : 'Dashboard',
        controllerAs  : 'dashboard'
      })
      .when('/:storeCategory', {
        templateUrl   : 'views/items.html',
        controller    : 'ItemsController',
        controllerAs  : 'itemsCtrl'
      })
      .when('/:storeCategory/item/new', {
        templateUrl   : 'views/item-new.html',
        controller    : 'ItemController',
        controllerAs  : 'itemCtrl'
      })
      .when('/:storeCategory/item/edit/:itemId', {
        templateUrl   : 'views/item-edit.html',
        controller    : 'ItemController',
        controllerAs  : 'itemCtrl'
      })
      .when('/:storeCategory/item/:itemId', {
        templateUrl   : 'views/item.html',
        controller    : 'ItemController',
        controllerAs  : 'itemCtrl'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  }

  angular
    .module('store', [
      'ngRoute',
      'ngTouch',
      'ngAnimate'
    ])
    .constant('apiEndPoint', 'http://pantryapp-api.herokuapp.com')
    //.constant('apiEndPoint', 'http://192.168.0.107:3000')
    .config(config);

})();
