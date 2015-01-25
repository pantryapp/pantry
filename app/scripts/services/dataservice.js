(function() {

  'use strict';

  angular
    .module('pantryApp')
    .service('dataservice', dataservice);

  function dataservice($resource, apiEndPoint) {

    function pantryitems() {
      return $resource(apiEndPoint.prod + '/pantryitems/:pantryItemId', {pantryItemId: '@id'}, {
        'update' : {method : 'PUT'}
      });
    }

    return {
      pantryitems : pantryitems
    };
  }


  // function dataservice($http, apiEndPoint) {
  //   return {
  //     getPantryItems: getPantryItems
  //   };

  //   function getPantryItems() {
  //       return $http.get(apiEndPoint.prod + '/pantryitems/')
  //           .then(getPantryItemsComplete)
  //           .catch(getPantryItemsFailed);

  //       function getPantryItemsComplete(response) {
  //           return response.data;
  //       }

  //       function getPantryItemsFailed(error) {
  //           console.log('XHR Failed for getPantryItems.' + error.data);
  //       }
  //   }
  // }

})();
