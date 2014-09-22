'use strict';

(function(){

var api = angular.module('pantryAPI', ['ngResource']);

api.factory('API', ['$resource', function($resource){

	var pantryitems = $resource('http://pantryapp-api.herokuapp.com/pantryitems/:pantryItemId', {pantryItemId: '@id'});
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
					var item = pantryitems.save(item, function(item){
						success(item);
					});
				},
				delete: function(id, success, error){
					var item = pantryitems.remove({pantryItemId:id}, function(){
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


