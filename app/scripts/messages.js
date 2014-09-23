var messages = angular.module('Messages', []);

var MESSAGES = {
	'pantryitem-new' : {
		template : 'views/messages/pantryitem-new.html',
		type 	 : 'success'
	},
	'pantryitem-edit' : {
		template: 'views/messages/pantryitem-edit.html', 
		type : 'success'
	},
	'pantryitem-duplicate' : {
		template : 'views/messages/pantryitem-duplicate.html',
		type 	 : 'warning'
	}
};

messages.provider('$message', [function(){
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

			$message.open = function(templateUrl, resolveArgs){

				var messageInstance = {},
					messageOptions  = {templateUrl: MESSAGES[templateUrl].template},
					resolve  	    = {};

				resolve.args = function(){
					var args = resolveArgs;
					args.type = MESSAGES[templateUrl].type;
					return args;
				};				

				messageOptions.resolve = resolve;
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

messages.factory('$$stackedMessages', [function(){
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
}]);

messages.factory('$messageStack', ['$document', '$compile', '$timeout', '$transition', '$$stackedMessages', function($document, $compile, $timeout, $transition, $$stackedMessages){
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
}]);