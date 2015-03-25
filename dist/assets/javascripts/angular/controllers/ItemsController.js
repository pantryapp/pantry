(function() {

	'use strict';

	angular.module('store').controller('Items', Items);

	function Items($routeParams, ItemsFactory, CategoriesFactory) {

		var that = this;
    that.storeCategory = CategoriesFactory.getStoreCategory($routeParams.storeCategory);
    that.items         = [];

    ItemsFactory.getItems({store_category: that.storeCategory.slug}).
      success(function(data) {
        that.items = data;
      }).
      error(function() {
        console.log('Error');
      });
	}

})();
