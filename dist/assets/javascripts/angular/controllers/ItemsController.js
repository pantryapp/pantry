(function() {

	'use strict';

	angular.module('store').controller('Items', Items);

	function Items($routeParams, ItemsFactory) {

		var that = this;

		that.category = $routeParams.category;
    that.items    = [];

    ItemsFactory.getItemsByCategory(that.category).
      success(function(data) {
        that.items = data;
        console.log(data);
      }).
      error(function() {
        console.log('Error');
      });
	}

})();
