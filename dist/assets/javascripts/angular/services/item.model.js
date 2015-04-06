(function() {

  'use strict';

  angular.module('store').service('Item', ItemModel);

  function ItemModel(ItemResource) {
    var model = {
      store_category: null,
      category: null,
      name: null,
      outofstock: false
    };

    function Item(data) {
      // Extend default model
      angular.extend(this, model);
      // Extend provided attributes
      angular.extend(this, data);
    }

    function trim(item) {
      var data = {};
      for(var key in model) {
        if(item.hasOwnProperty(key)) {
          data[key] = item[key];
        }
      }
      return data;
    }

    Item.prototype = {
      save: function() {
        return ItemResource.save(trim(this)).then(function(result) {
          return result.data;
        });
      }, 
      delete: function(itemId) {
        return ItemResource.delete(itemId);
      },
      find: function(params) {
        return ItemResource.find(params);
      }
    };

    return Item;
  }

})();