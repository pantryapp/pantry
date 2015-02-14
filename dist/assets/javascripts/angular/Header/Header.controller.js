(function(angular) {

  'use strict';

  angular
    .module('pantryApp')
    .controller('headerController', headerController);

  headerController.$inject = ['$location'];

  function headerController($location) {
    var _this = this;

    _this.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    }
  }

})(window.angular);
