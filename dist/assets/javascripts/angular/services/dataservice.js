(function() {

  'use strict';

  angular
    .module('pantryApp')
    .factory('dataservice', dataservice);

  function dataservice($resource, apiEndPoint) {

    return {
      pantryitems : pantryitems
    };

    function pantryitems() {
      return $resource(apiEndPoint.prod + '/pantryitems/:pantryItemId', {pantryItemId: '@id'}, {
        'update' : {method : 'PUT'}
      });
    }
  }

})();
