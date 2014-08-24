'use strict';

/* Services */
angular.module('app.services', [])
	.factory('PantryStorage', ['localStorageService', 'PantryItemEvents', function(localStorageService, PantryItemEvents){
		return {
			getPantryItems: function(){
				return localStorageService.get('pantry.items') || [];
			},
			savePantryItems: function(items){
				localStorageService.set('pantry.items', items);
			},
			getGroceries: function(){
				return localStorageService.get('pantry.groceries') || [];
			},
			saveGroceries: function(groceries){
				localStorageService.set('pantry.groceries', groceries);
			},
			itemAlreadyInCollection: function(item, collection){
				for(var i=0, in_array=false;i<collection.length;i++){
					if( collection[i].id == item.id ){
						in_array = true;break;
					}
				}
				return in_array;
			}, 
			lookup:function(items){
				var lookup = {};
				for(var i=0, len=items.length;i<len;i++){
					lookup[items[i].id] = items[i];
				}
				return lookup;
			},
			lookupFor:function(hay, stack){
				var hay = this.lookup(hay);
				return hay[stack.id];
			}
		}
	}])
	.service('PantryItemEvents', [function(){
		var	obsCallbacks = [];
		return {
			registerObserver: function(callback){
				obsCallbacks.push(callback);
			},
			registerObserverForEvent: function(event, callback){
				obsCallbacks.push({event:event, callback:callback});
			},
			notifyObservers: function(event, args){
				angular.forEach(obsCallbacks, function(obj){
					if( obj.event == event ) obj.callback(args);
				});
			}
		}
	}])
	.factory('PantryItemFactory', ['guid', function(guid){
		return{
			new:function(model){
				return {
					name:model.name,
					slug:model.slug,
					outOfStock:false,
					id:guid.new()
				}
			},
			duplicate:function(model){
				return{
					name:model.name,
					slug:model.slug,
					outOfStock:model.outOfStock,
					id:model.id
				}
			}
		}
	}])
	.factory('guid', [function(){
	    var svc = {
	        new: function() {
	            function _p8(s) {
	                var p = (Math.random().toString(16)+"000000000").substr(2,8);
	                return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
	            }
	            return _p8() + _p8(true) + _p8(true) + _p8();
	        }
	    };
	    return svc;
	}]);