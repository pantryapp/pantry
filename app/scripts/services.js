'use strict';

/* Services */
angular.module('app.services', ['ngResource', 'LocalStorageModule', 'slugifier'])
	.factory('npConfig', ['$resource', function($resource){
	    return $resource('package.json', null, {
	    	query: {method:'GET'}
	    });
	}])
	.factory('PantryStorage', ['localStorageService', function(localStorageService){
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
			saveConfigs: function(configs){
				localStorageService.set('pantry.configs', configs);
			},
			getConfigs: function(defaultConfigs){
				return localStorageService.get('pantry.configs') || defaultConfigs;
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
				var hay = sort(hay, key);
				return hay[needle];
			}
		}
	})
	.factory('PantryItemModel', ['API','Slug', function(API, Slug){
		var item_model = {
			slug:function(name){return Slug.slugify(name);},
			outofstock:false
		};

		return{
			new: function(model, success){
				var item = API.pantryitems().save({
					name 	   : model.name,
					slug 	   : model.slug != undefined ? model.slug : item_model.slug(model.name),
					outofstock : model.outofstock != undefined ? model.outofstock : item_model.outofstock
				}, function(){
					if( success !== undefined )
						success(item);
				});
				return item;
			}
		}
	}])

	.factory('GroceryItemModel', ['API', function(API){
		return{
			new: function(model){
				return API.groceries().save({
					name 		  : model.name,
					slug 		  : model.slug,
					outofstock 	  : true,
					pantryitem_id : model.id,
					id 			  : null
				});
			}
		}
	}])

	.factory('ReceipeModel', ['API', 'Slug', function(API, Slug){
		return{
			new: function(model){

				return API.receipes().save({
					name 		: model.name,
					slug 		: Slug.slugify(model.name),
					ingredients : angular.toJson(model.ingredients)
				});
			},
			update: function(model, success){
				var receipe = API.receipes().update({
					name 		: model.name,
					slug 		: Slug.slugify(model.name),
					ingredients : angular.toJson(model.ingredients),
					id 			: model.id
				}, function(){
					if( success !== undefined )
						success(receipe);
				});
			}
		}
	}])
	
	.factory('$eventStack', ['$log', function($log){
		return{
			createNew: function(){
				var obsCallbacks = [];

				return{
					add: function(events, persistant){
						angular.forEach(events, function(callback, event){
							obsCallbacks.push({
								event:event, 
								callback:callback,
								persistant: persistant != undefined ? persistant : false
							})
						});
					},
					trigger: function(event, args, caller, debug){
						var is_event  = false,
							result    = null;
						angular.forEach(obsCallbacks, function(obj){
							if( obj.event == event ){
								is_event = true;
								if( debug )
									$log.info('Catched by : ' + obj.callback);
								
								result =  obj.callback(args);
							}
						});
						if( !is_event )
							$log.warn ('There is no observer for event ' + event + " from " + caller);

						return result;
					},
					clear:function(){
						var persistants = [];
						for(var i=0;i<obsCallbacks.length;i++){
							if( obsCallbacks[i].persistant )
								persistants.push(obsCallbacks[i]);
						}
						obsCallbacks = persistants;
					},
					getAll: function(){
						return obsCallbacks;
					}
				}
			}
		}
	}])
	.provider('$event', [function(){
		var $eventProvider = {
			$get: ['$eventStack', '$log', function($eventStack, $log){
				var $event 			 = {},
					registeredEvents = $eventStack.createNew(),
					eventInstance 	 = {},
					debug 			 = false;

				$event.registerFor = function(events, persistant){
						registeredEvents.add(events, persistant);
				}

				$event.trigger = function(event, args, caller){
					if( debug ){
						$log.warn('trigger event - ' + Date.now());
						$log.info('Event : ' + event);
						$log.info('Triggered by : ' + caller);

					}

					return registeredEvents.trigger(event, args, caller, debug);
					
				}

				$event.clear = function(){
					registeredEvents.clear();
				}

				$event.debug = function(){
					debug = true;
					$log.info('$eventStack debug ' + Date.now());
					angular.forEach(registeredEvents.getAll(), function(value, key){
						$log.info(value);
					});
				}


				return $event;
			}]

		}
		return $eventProvider;
	}]);