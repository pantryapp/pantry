(function() {

  'use strict';

  angular
    .module('pantryApp')
    .factory('groceriesFactory', groceriesFactory);

  groceriesFactory.$inject = ['dataservice', 'pantryItemsFactory'];

  function groceriesFactory(dataservice, pantryItemsFactory) {

    var groceryList = [];

    _get();

    function getGroceries() {
      return groceryList;
    }

    function _getComplete(data) {
      groceryList = data;
    }

    function _getFailed(error) {
      console.error('Error while querying groceries', error);
    }

    function _get() {
      dataservice.groceries().query().$promise.then(_getComplete, _getFailed);
    }


    return {
      getGroceries: getGroceries
    };

  }

})();
