(function() {

	'use strict';

	angular.module('store').controller('Dashboard', Dashboard);

  Dashboard.$inject = ['ItemsFactory'];

	function Dashboard(ItemsFactory) {

    var that = this;

    that.categories = ItemsFactory.getItemsCategories();

	}
})();