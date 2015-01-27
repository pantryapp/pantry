(function (angular) {

  'use strict';

  function Demo($http) {
    var methods;

    methods = {

      getDemos: function () {
        return $http({ method: 'GET', url: '/data/demo/fake.json'});
      }

    };

    return methods;
  }
  angular
    .module('demoApp')
    .factory('Demo', Demo);

}(window.angular));
