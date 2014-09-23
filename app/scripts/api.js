'use strict';

(function(){

var api = angular.module('pantryAPI', ['ngResource']);

api.factory('API', ['$resource', function($resource){

	var pantryitems = $resource(api_url + '/pantryitems/:pantryItemId', {pantryItemId: '@id'}, {
		'update' : { method : 'PUT' }
	});
	// var groceries 	= $resource('http://localhost:3000/groceries');

	return{
		pantryitems: function(){
			return{
				getAll: function(){
					return pantryitems.query();
				},
				get: function(id, success, error){
					return pantryitems.get({pantryItemId:id}, function(){
						success();
					});
				},
				create: function(item, success, error){
					var item = pantryitems.save({pantryitem:item}, function(){
						success(item);
					});
				},
				update: function(item, success, error){
					// var item = pantryitems.save({method: 'PUT', pantryItemId:item.id, pantryitem:item}, function(){
					// 	success();
					// });
					// var _item = pantryitems.get({pantryItemId: item.id}, function(){
					// 	_item = item;
					// 	_item.$update(pantryItemId: item.id, );
					// 	success();
					// });
					pantryitems.update({pantryItemId:item.id}, {pantryitem:item});
				},
				delete: function(id, success, error){
					pantryitems.remove({pantryItemId:id}, function(){
						success();
					});
				}
			}
		},
		groceries: function(){
			return{
				query: function(){
					return groceries.query();
				}
			}
		}
	}
}]);

}).call(this);


var developement_url = "http://localhost:3000";
var production_url = "http://pantryapp-api.herokuapp.com";

var api_url = developement_url;