(function() {

	'use strict';

	angular.module('store').factory('ItemsFactory', ItemsFactory);

	function ItemsFactory($http, apiEndPoint) {

		function getItems(params) {
			params = params || {};
			return $http({method: 'GET', url: apiEndPoint + '/items', params : params});
		}

		function getItemById(id) {
			return $http.get(apiEndPoint + '/items/' + id);
		}

		function createNewItem(item) {
			return $http.post(apiEndPoint + '/items', item);
		}

		function editItem(item) {
			return $http.put(apiEndPoint + '/items/' + item.id, item);
		}

		function deleteItem(item) {
			return $http.delete(apiEndPoint + '/items/' + item.id);
		}

		return {
			createNewItem 				: createNewItem,
			deleteItem 						: deleteItem,
			editItem							: editItem,
			getItemById 					: getItemById,
			getItems 							: getItems
		};
	}
})();
