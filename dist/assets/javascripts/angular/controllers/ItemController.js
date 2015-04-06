(function () {

	'use strict';

	angular.module('store').controller('ItemController', ItemController);

	function ItemController($routeParams, $location, Item, ItemsFactory, CategoriesFactory) {
    var that = this;

    that.storeCategory  = CategoriesFactory.getStoreCategory($routeParams.storeCategory);
    that.categories     = CategoriesFactory.selectCategoriesFromStore(that.storeCategory.slug);
    that.item           = new Item({store_category : that.storeCategory.slug});   

    // Methods
    that.createItem = function() {
      that.item.save().then(function(item) {
        that.item = new Item({store_category: that.storeCategory.slug});
        ItemsFactory.addItem(item);
      });
    };

    that.deleteItem = function(item) {
      that.item.delete(item.id).then(function(result) {
        ItemsFactory.removeItem(item);
      });
    };


    if($routeParams.itemId) {
      //Get a single item
    }


	}

})();
