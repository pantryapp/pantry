(function(angular) {

  'use strict';

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .otherwise({
        redirectTo: '/'
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
