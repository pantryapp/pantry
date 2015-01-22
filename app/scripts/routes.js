(function() {

  'use strict';

  angular
    .module('pantryApp')
    .config(routes);

  function routes($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
