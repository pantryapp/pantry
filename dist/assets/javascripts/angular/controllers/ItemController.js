(function() {

	'use strict';

	angular.module('store').controller('Item', Item);

	function Item($routeParams, $location, ItemsFactory, CategoriesFactory) {
    var that = this;

    that.storeCategory  = CategoriesFactory.getStoreCategory($routeParams.storeCategory);
    that.categories     = CategoriesFactory.selectCategoriesFromStore(that.storeCategory.slug);
    that.currentItem    = {};
    that.newItem        = {
     store_category : that.storeCategory.slug,
     outofstock     : false,
     category       : ""
    };

    // Methods
    that.createItem = createItem;
    that.editItem   = editItem;
    that.deleteItem = deleteItem;

    if($routeParams.itemId) {
      getItem();
    }

    function getItem() {
      ItemsFactory.getItemById($routeParams.itemId).
        success(function(data) {          
          that.currentItem                = data;
          that.currentItem.store_category = CategoriesFactory.getStoreCategory(data.store_category);
        }).
        error(function() {});
    }

    function createItem() {
      ItemsFactory.createNewItem(that.newItem).
        success(function(data) {
          $location.path('/' + that.storeCategory.slug);
        }).
        error(function() {});
    }

    function editItem() {
      ItemsFactory.editItem(that.currentItem).
        success(function(data) {
          $location.path('/' + that.storeCategory.slug);
        }).
        error(function() {});
    }

    function deleteItem() {
      ItemsFactory.deleteItem(that.currentItem).
        success(function() {
          $location.path('/' + that.storeCategory.slug);
        }).
        error(function() {});
    }

	}

})();
