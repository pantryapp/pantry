(function () {

  'use strict';

  angular.module('store').factory('ItemResource', ItemResource);

  function ItemResource($http, apiEndPoint) {

    function getItems(params) {
      params = params || {};
      return $http({method: 'GET', url: apiEndPoint + '/items', params : params});
    } 

    function get(itemId) {
      return $http.get(apiEndPoint + '/items/' + itemId);
    }
    
    function saveItem(item) {
      if(item.id) {
        // Update
        return $http.put(apiEndPoint + '/items/' + item.id, item);
      } else {
        // New
        return $http.post(apiEndPoint + '/items', item);
      }
    }

    function deleteItem(itemId) {
      return $http.delete(apiEndPoint + '/items/' + itemId);
    }

    return {
      find      : getItems,
      findById  : get,
      save      : saveItem,
      delete    : deleteItem
    };
    
  }

})();
