(function() {

	'use strict';

	angular.module('store').controller('ItemsController', ItemsController);

	function ItemsController($routeParams,CategoriesFactory, ItemsFactory) {

		var that = this;
    that.storeCategory = CategoriesFactory.getStoreCategory($routeParams.storeCategory);
    that.items         = ItemsFactory.getItems();

    ItemsFactory.findItems({store_category: that.storeCategory.slug}).then(function(items) {
      that.items = items;
    });
	}

})();
