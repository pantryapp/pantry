(function () {

  'use strict';

  angular.module('store').factory('ItemFactory', ItemFactory);

  function ItemFactory(Model) {

    var item = {
      store_category: null,
      outofstock: false,
      category: null
    };

    function newItemModel(params) {
      return Model.merge(item, params);
    }

    return {
      newItemModel: newItemModel
    };

  }

})();
