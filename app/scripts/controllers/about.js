'use strict';

/**
 * @ngdoc function
 * @name pantryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pantryApp
 */
angular.module('pantryApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
