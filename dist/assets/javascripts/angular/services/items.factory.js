(function() {

	'use strict';

	angular.module('store').factory('ItemsFactory', ItemsFactory);

	function ItemsFactory($http, apiEndPoint) {

		function getItemsCategories() {
			return [
				{
					'slug' : 'garde-manger',
					'name' : 'Garde-manger'
				},
				{
					'slug' : 'produit-menagers',
					'name' : 'Produits ménagers'
				},
				{
					'slug' : 'pharmacie',
					'name' : 'Pharmacie'
				},
				{
					'slug' : 'divers',
					'name' : 'Divers'
				}
			];
		}

		function getItemCategoryBySlug(slug) {
			var categories = getItemsCategories(),
					category;

			for(category in categories) {
				if(categories[category].slug == slug) {
					return categories[category];
				}
			}
			return;
		}

		function getItemsByCategory(category) {
			return $http({method: 'GET', url: apiEndPoint + '/items', params: {store_category: category}});
		}

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
			getItemsCategories		: getItemsCategories,
			getItemCategoryBySlug : getItemCategoryBySlug,
			createNewItem 				: createNewItem,
			deleteItem 						: deleteItem,
			editItem							: editItem,
			getItemById 					: getItemById,
			getItems 							: getItems
		};
	}
})();
