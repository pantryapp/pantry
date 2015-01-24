(function() {

  'use strict';

  /* jshint validthis: true */ /* Note: Allow `this` in a non constructor function */

  angular
    .module('pantryApp')
    .service('dataservice', dataservice);

  function dataservice($http, apiEndPoint) {
    return {
      getPantryItems: getPantryItems
    };

    function getPantryItems() {
        return $http.get(apiEndPoint.prod + '/pantryitems/')
            .then(getPantryItemsComplete)
            .catch(getPantryItemsFailed);

        function getPantryItemsComplete(response) {
            return response.data;
        }

        function getPantryItemsFailed(error) {
            console.log('XHR Failed for getPantryItems.' + error.data);
        }
    }
  }

})();
