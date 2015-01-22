(function() {

  'use strict';

  /* jshint validthis: true */ /* Note: Allow `this` in a non constructor function */

  angular
    .module('pantryApp')
    .service('api', api);

  function api($resource, apiEndPoint) {
    this.pantryitems = function() {
      return $resource(apiEndPoint.prod + '/pantryitems/:pantryItemId', {pantryItemId: '@id'}, {
        'update' : {method : 'PUT'}
      });
    };
  }

})();
