'use strict';

(function (angular) {

  'use strict';

  var constant = {
    'someConstant': 'Hello'
  };

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        controllerAs: 'main',
        templateUrl: '/views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  angular
    .module('demoApp', [
      'ngAnimate',
      'ngRoute'
    ])
    .constant('appSettings', constant)
    .config(config);

}(window.angular));
