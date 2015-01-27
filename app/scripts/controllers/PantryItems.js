(function() {

  'use strict';

  angular
    .module('pantryApp')
    .controller('PantryItems', PantryItems);

  function PantryItems(dataservice) {
    var vm = this;

    vm.pantry       = [];

    vm.orderBy     = orderBy;
    vm.orderByProp = {value: 'name', reverse: false};

    vm.createItem = items().createItem;

    items().get();

    vm.items = items;

    function items() {

      function _createComplete(newItem) {
        vm.pantry.push(newItem);
        vm.newItem.name = '';
      }

      function _createFailed(error) {
        console.log('Error while creating an item', error);
      }

      function _getComplete(data) {
        vm.pantry = data;
      }

      function _getFailed(error) {
        console.log('Error while querying items', error);
      }

      function get() {
          dataservice.pantryitems().query().$promise.then(_getComplete, _getFailed);
      }

      function create() {
        dataservice.pantryitems().save({
          name        : vm.newItem.name,
          category    : vm.newItem.category,
          outofstock  : false
        }).$promise.then(_createComplete, _createFailed);
      }

      return {
        get: get,
        add: create
      };
    }

    function orderBy(key) {
      vm.orderByProp.value = key;
      vm.orderByProp.reverse = vm.orderByProp ? !vm.orderByProp.reverse : false;
    }

  }

})();
