'use strict';

/**
 * @ngdoc function
 * @name pantryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pantryApp
 */
angular.module('pantryApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
