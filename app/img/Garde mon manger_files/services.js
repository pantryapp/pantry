'use strict';

/* Services */
angular.module('app.services', [])
	.factory('PantryStorage', ['localStorageService', 'EventDispatcher', function(localStorageService, EventDispatcher){
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
			getReceipes: function(){
				return localStorageService.get('pantry.receipes') || [];
			},
			saveReceipes: function(receipes){
				localStorageService.set('pantry.receipes', receipes);
			},
			itemAlreadyInCollection: function(item, collection){
				for(var i=0, in_array=false;i<collection.length;i++){
					if( collection[i].id == item.id ){
						in_array = true;break;
					}
				}
				return in_array;
			}
		}
	}])
	.service('lookup', function(){
		var sort = function(hay, key){
			var lookup = {};
			for(var i=0, len=hay.length;i<len;i++){
				lookup[hay[i][key]] = hay[i];
			}
			return lookup;
		}
		return{
			lookupFor:function(hay, needle, key){
				// console.log(needle);
				// console.log(hay);
				var hay = sort(hay, key);
				console.log(hay);
				return hay[needle];
			}
		}
	})
	.service('EventDispatcher', ['lookup', function(lookup){
		var	obsCallbacks = [];
		return {
			registerObserverForEvents: function(events){
				var dispatch = this;
				angular.forEach(events, function(callback, event){
					dispatch.registerObserverForEvent(event, callback);
				});
			},
			registerObserverForEvent: function(event, callback){
				obsCallbacks.push({event:event, callback:callback});
			},
			notifyObservers: function(event, args){
				angular.forEach(obsCallbacks, function(obj){
					if( obj.event == event )
						obj.callback(args);
				});
			},
			clear: function(){obsCallbacks = [];}
		}
	}])
	.factory('PantryItemFactory', ['guid', 'Slug', function(guid, Slug){
		var item_model = {
			slug:function(name){return Slug.slugify(name);},
			outOfStock:false
		};

		return{
			new:function(model){
				return {
					name:model.name,
					slug:model.slug != undefined ? model.slug : item_model.slug(model.name),
					outOfStock:model.outOfStock != undefined ? model.outOfStock : item_model.outOfStock,
					id:guid.new()
				}
			},
			duplicate:function(model){
				return{
					name:model.name,
					slug:Slug.slugify(model.name),
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