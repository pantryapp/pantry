'use strict';

angular.module('pantryApi', ['ngResource'])
	.factory('API', ['$resource', 'ENV', function($resource, ENV){

	var pantryitems  = $resource(ENV.apiEndpoint + '/pantryitems/:pantryItemId', {pantryItemId: '@id'}, {
		'update' : {method : 'PUT'}
	});
	
	return{
		// pantryitems: function(){
		// 	return{
		// 		getAll: function(){
		// 			return pantryitems.query();
		// 		},
		// 		get: function(id, success, error){
		// 			return pantryitems.get({pantryItemId:id}, success);
		// 		},
		// 		create: function(item, success, error){
		// 			pantryitems.save({pantryitem:item}, function(item){
		// 				success(item);
		// 			});
		// 		},
		// 		update: function(item, success, error){
		// 			pantryitems.update({pantryItemId:item.id}, {pantryitem:item}, success);
		// 		},
		// 		delete: function(id, success, error){
		// 			pantryitems.remove({pantryItemId:id}, success);
		// 		}
		// 	}
		// },
		pantryitems: function(){
			return pantryitems;
		},
		pantryitem: function(){
			return pantryitem;
		}	
	}
}]);
