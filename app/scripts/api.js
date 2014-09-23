'use strict';

angular.module('pantryApi', ['ngResource'])
	.service('API', ['$resource', 'ENV', function($resource, ENV){	
	return{
		pantryitems: function(){
			return $resource(ENV.apiEndpoint + '/pantryitems/:pantryItemId', {pantryItemId: '@id'}, {
				'update' : {method : 'PUT'}
			});
		}
	}
}]);
