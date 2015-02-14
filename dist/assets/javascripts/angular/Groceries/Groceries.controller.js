(function() {

  'use strict';

  angular
    .module('pantryApp')
    .controller('groceriesController', groceriesController);

  groceriesController.$inject = ['groceriesFactory']

  function groceriesController(groceriesFactory) {
    var _this = this;

    _this.getGroceries = getGroceries

    function getGroceries() {
      return groceriesFactory.getGroceries();
    }

  }

})();
