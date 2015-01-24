(function() {

  'use strict';

  angular
    .module('pantryApp')
    .controller('PantryItems', PantryItems);

  function PantryItems(dataservice) {
    var vm = this;

    vm.items       = [];
    vm.orderBy     = orderBy;
    vm.orderByProp = {value: 'name', reverse: false};

    activate();

    function activate() {
        /**
         * Step 1
         * Ask the getPantryItems function for the
         * avenger data and wait for the promise
         */
        return getPantryItems().then(function() {
            /**
             * Step 4
             * Perform an action on resolve of final promise
             */
            // Remove loading for exemple
        });
    }

    function getPantryItems() {
          /**
           * Step 2
           * Ask the data service for the data and wait
           * for the promise
           */
          return dataservice.getPantryItems()
              .then(function(data) {
                  /**
                   * Step 3
                   * set the data and resolve the promise
                   */
                  vm.items = data;
                  return vm.items;
          });
    }

    function orderBy(key) {
      vm.orderByProp.value = key;
      vm.orderByProp.reverse = vm.orderByProp ? !vm.orderByProp.reverse : false;
    }

  }

})();
