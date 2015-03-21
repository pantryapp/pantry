(function() {

	'use strict';

	angular.module('store').controller('Item', Item);

	function Item($routeParams, ItemsFactory) {
    var that = this;

    that.category = $routeParams.category;

    that.createItem = createItem;

    function createItem() {
      console.log(that);
    }

	}

})();
