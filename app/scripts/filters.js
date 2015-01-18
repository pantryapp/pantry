'use strict';

/* Filters */
angular.module('app.filters', [])
	.filter('item_exists', ['$filter', function($filter){
		return function(items, newItemName){
			var new_items = items;
			if( newItemName != null && newItemName != undefined )
				items = $filter('filter')(items, {name:newItemName});

			if( items.length == 0 )
				items = new_items;

			return items;
		}
	}]);	