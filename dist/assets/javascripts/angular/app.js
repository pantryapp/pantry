(function(angular) {

  'use strict';

  function config($routeProvider) {
    $routeProvider
      .when('/pantry', {
        templateUrl: 'views/pantry.html'
      })
      .when('/groceries', {
        templateUrl: 'views/groceries.html'
      })
      .otherwise({
        redirectTo: '/pantry'
    });
  }

  angular
    .module('pantryApp', [
      'ngResource',
      'ngRoute',
      'ngTouch'
    ])
    .constant('apiEndPoint', {
      dev: 'http://0.0.0.0:3000',
      prod: 'http://pantryapp-api.herokuapp.com'
    }).
    config(config);

})(window.angular);
