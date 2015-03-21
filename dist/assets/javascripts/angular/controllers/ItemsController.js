(function() {

	'use strict';

	angular.module('store').controller('Items', Items);

	function Items($routeParams, ItemsFactory) {

		var that = this;

		that.storeCategory = $routeParams.storeCategory;
    that.items         = [];

    ItemsFactory.getItems({store_category: that.storeCategory}).
      success(function(data) {
        that.items = data;
      }).
      error(function() {
        console.log('Error');
      });
	}

})();
