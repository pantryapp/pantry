(function() {

	'use strict';

	angular.module('store').factory('ItemsFactory', ItemsFactory);

	function ItemsFactory(Item) {

		var item  = new Item(),
				items = [];

		function findItems(params) {
			return item.find(params).then(function(result) {
				items = result.data;
				return result.data;
			});
		}

		function getItems() {
			return items;
		}

		function addItem(item) {
			items.push(item);
		}

		function removeItem(item) {
			if(items.indexOf(item) > -1) {
				items = items.splice(items.indexOf(item), 1);
			}
		}
		
		return {
			findItems 	: findItems,
			getItems 		: getItems,
			addItem 		: addItem,
			removeItem 	: removeItem
		};
	}
})();
