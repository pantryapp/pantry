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
				return hay[needle[key]];
			}
		}
	})
	.factory('PantryItemModel', ['API','Slug', function(API, Slug){
		var item_model = {
			slug:function(name){return Slug.slugify(name);},
			outofstock:false
		};

		return{
			new: function(model){
				return API.pantryitems().save({
					name:model.name,
					slug:model.slug != undefined ? model.slug : item_model.slug(model.name),
					outofstock:model.outofstock != undefined ? model.outofstock : item_model.outofstock
				});
			}
		}
	}])
	.factory('$$stackedMessages', [function(){
	    return {
	      createNew: function () {
	        var stack = [];

	        return {
	          add: function (key, value) {
	            stack.push({
	              key: key,
	              value: value
	            });
	          },
	          get: function (key) {
	            for (var i = 0; i < stack.length; i++) {
	              if (key == stack[i].key) {
	                return stack[i];
	              }
	            }
	          },
	          getAll:function(){
	          	return stack;
	          },
	          keys: function() {
	            var keys = [];
	            for (var i = 0; i < stack.length; i++) {
	              keys.push(stack[i].key);
	            }
	            return keys;
	          },
	          top: function () {
	            return stack[stack.length - 1];
	          },
	          remove: function (key) {
	            var idx = -1;
	            for (var i = 0; i < stack.length; i++) {
	              if (key == stack[i].key) {
	                idx = i;
	                break;
	              }
	            }
	            return stack.splice(idx, 1)[0];
	          },
	          removeBottom: function () {
	            return stack.splice(0, 1)[0];
	          },
	          length: function () {
	            return stack.length;
	          }
	        };
	      }
	    };
	}])
	.factory('$messageStack', ['$document', '$compile', '$timeout', '$transition', '$$stackedMessages', function($document, $compile, $timeout, $transition, $$stackedMessages){
		var $messageStack = {};
		var openedWindows  = $$stackedMessages.createNew();

		$messageStack.open = function(messageInstance, message){

	        openedWindows.add(messageInstance, {
				messageScope: message.scope
	        });

			var open_messages = openedWindows.length();	        

	        updateMessagesPositions(openedWindows.getAll());
	        
			var body 	     = $document.find('body').eq(0),
				angularDomEL = angular.element("<message-window >"+message.content+"</message-window"),
				messageDomEl = $compile(angularDomEL)(message.scope);

			openedWindows.top().value.messageDomEl = messageDomEl;
	       	body.append(messageDomEl);

			$timeout(function(){
				removeMessage(messageInstance);
	       	}, 3000);

		}

		function updateMessagesPositions(active_messages){
			var message_height = 66,
				message_margin = 10,
				default_height = 60;
			for(var x=active_messages.length - 1,y=0;x>=0;x--,y++){
				active_messages[x].value.messageScope.pos = default_height + ( message_height * y ) + ( message_margin * y );
			}
			
		}

		function removeMessage(messageInstance) {
			var body = $document.find('body').eq(0);
			var messageWindow = openedWindows.get(messageInstance).value;

			//clean up the stack
			openedWindows.remove(messageInstance);

			//remove window DOM element
			removeAfterAnimate(messageWindow.messageDomEl, messageWindow.messageScope, 300, function() {
				messageWindow.messageScope.$destroy();
			});
		}

		function removeAfterAnimate(domEl, scope, emulateTime, done) {
			// Closing animation
			scope.animate = false;
			var transitionEndEventName = $transition.transitionEndEventName;
			if (transitionEndEventName) {
		  		// transition out
		  		var timeout = $timeout(afterAnimating, emulateTime);

		  		domEl.bind(transitionEndEventName, function () {
		    		$timeout.cancel(timeout);
		    		afterAnimating();
		    		scope.$apply();
		  		});
			} else {
		  		// Ensure this call is async
		  		$timeout(afterAnimating, 0);
			}

			function afterAnimating() {
		  		if (afterAnimating.done) {
		    		return;
		  		}
		  		afterAnimating.done = true;

		  		domEl.remove();
		  		if (done) {
		    		done();
		  		}
			}
		}

		return $messageStack;
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
	}])
	.provider('$message', [function(){
		var $messageProvider = {
		 
			$get: ['$messageStack', '$rootScope', '$http', '$q', '$templateCache', '$injector', '$controller', function($messageStack, $rootScope, $http, $q, $templateCache, $injector, $controller){
				var $message = {};
				var controller = 'MessageController';

				function getTemplatePromise(options) {
					return options.template ? $q.when(options.template) :
					  $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
					    return result.data;
				  	});
				}

				function getResolvePromises(resolves) {
					var promisesArr = [];
					angular.forEach(resolves, function (value, key) {
					  if (angular.isFunction(value) || angular.isArray(value)) {
					    promisesArr.push($q.when($injector.invoke(value)));
					  }
					});
					return promisesArr;
				}

				$message.open = function(messageOptions){
					var messageInstance = {}

            		messageOptions.resolve = messageOptions.resolve || {};

		            if (!messageOptions.template && !messageOptions.templateUrl) {
		              throw new Error('One of template or templateUrl options is required.');
		            }

		            var templateAndResolvePromise =
		              $q.all([getTemplatePromise(messageOptions)].concat(getResolvePromises(messageOptions.resolve)));

					templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {	
						var messageScope = (messageOptions.scope || $rootScope).$new();
              			var ctrlInstance, ctrlLocals = {};
              			var resolveIter = 1;

						//controllers
						ctrlLocals.$scope = messageScope;
						ctrlLocals.$messageInstance = messageInstance;
						angular.forEach(messageOptions.resolve, function (value, key) {
						  ctrlLocals[key] = tplAndVars[resolveIter++];
						});


						ctrlInstance = $controller(controller, ctrlLocals);

		              	$messageStack.open(messageInstance, {
							scope:messageScope, 
		              		content:tplAndVars[0]
		              	});
	    	        }, function resolveError(reason) {});

		      	}

		      return $message;
		    }]
		};

		return $messageProvider;
	}]);