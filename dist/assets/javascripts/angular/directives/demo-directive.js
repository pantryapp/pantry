(function (angular) {

  'use strict';

  function demoDirective($location) {
    function link(scope) {
      var that = {};

      that.choose = function () {
        $location.url('/');
      };

      scope.pickFaction = that;
    }

    return {
      templateUrl: '/views/templates/demo-directive.html',
      replace: true,
      restrict: 'E',
      scope: {
        faction: '@'
      },
      link: link
    };
  }
  angular
    .module('demoApp')
    .directive('demoDirective', demoDirective);

}(window.angular));
