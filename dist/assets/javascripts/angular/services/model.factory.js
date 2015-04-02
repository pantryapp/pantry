(function() {

  'use strict';

  angular.module('store').factory('Model', Model);

  function Model() {

    function merge(original, params, param) {

      for(param in params) {
        if(params.hasOwnProperty(param)) {
          original[param] = params[param];
        }
      }
      return original;
    }

    return {
      merge: merge
    };
  }

})();
