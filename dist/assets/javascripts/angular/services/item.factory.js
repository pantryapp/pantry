(function () {

  'use strict';

  angular.module('store').factory('ItemFactory', ItemFactory);

  function ItemFactory(Model) {


    function newItemModel(params) {
      
      var item = {
        store_category: null,
        outofstock: false,
        category: null
      };      

      return Model.merge(item, params);
    }

    return {
      newItemModel: newItemModel
    };

  }

})();
