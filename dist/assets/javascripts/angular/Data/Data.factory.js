(function() {

  'use strict';

  angular
    .module('pantryApp')
    .factory('dataservice', dataservice);

  function dataservice($resource, apiEndPoint) {

    return {
      pantryitems : pantryitems,
      groceries   : groceries
    };

    function pantryitems() {
      return $resource(apiEndPoint.prod + '/pantryitems/:pantryItemId', {pantryItemId: '@id'}, {
        'update' : {method : 'PUT'}
      });
    }

    function groceries() {
      return $resource(apiEndPoint.prod + '/groceries/:groceryId', {groceryId: '@id'}, {
        'update' : {method : 'PUT'}
      });
    }
  }

})();
