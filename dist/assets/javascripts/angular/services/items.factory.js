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

		function getItemsByCategory(category) {
			return $http({method: 'GET', url: apiEndPoint + '/items'});
		}

		return {
			getItemsCategories: getItemsCategories,
			getItemsByCategory: getItemsByCategory
		};
	}
})();