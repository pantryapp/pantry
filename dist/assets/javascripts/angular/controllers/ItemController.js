(function() {

	'use strict';

	angular.module('store').controller('Item', Item);

	function Item($routeParams, ItemsFactory) {
    var that = this;

    that.storeCategory  = ItemsFactory.getItemCategoryBySlug($routeParams.storeCategory);
    that.currentItem    = {};
    that.newItem        = {
      store_category: that.storeCategory.slug,
      outofstock: false
    };

    that.createItem = createItem;
    that.editItem   = editItem;
    this.deleteItem = deleteItem;

    if($routeParams.itemId) {
      getItem();
    }

    function getItem() {
      ItemsFactory.getItemById($routeParams.itemId).
        success(function(data) {
          data.store_category = ItemsFactory.getItemCategoryBySlug(data.store_category);
          //that.currentItem    = data;
        }).
        error(function() {
          console.error('error while fetching item');
          console.info($routeParams.itemId);
      });
    }

    function createItem() {
      ItemsFactory.createNewItem(that.newItem).
        success(function(data) {
          console.log('done creating new item');
          console.info(data);
        }).
        error(function() {
          console.error('error while create new item');
          console.info(that.newItem);
        });
    }

    function editItem() {
      ItemsFactory.editItem(that.currentItem).
        success(function(data) {
          console.log('done editing item');
          console.info(data);
          that.currentItem = data;
        }).
        error(function() {
          console.error('error while editing item');
          console.info(that.currentItem);
        });
    }

    function deleteItem() {
      ItemsFactory.deleteItem(that.currentItem).
        success(function() {
          console.log('done delete item');
        }).
        error(function() {

        });
    }

	}

})();
