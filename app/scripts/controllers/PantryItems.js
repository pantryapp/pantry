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

    vm.create = create;

    getItems();

    function getItems() {
      dataservice.pantryitems().query().$promise.then(getItemsComplete, getItemsFailed);
    }

    function create() {

      dataservice.pantryitems().save({
        name        : vm.newItem.name,
        category    : vm.newItem.category,
        outofstock  : false
      }).$promise.then(createItemComplete, createItemFailed);
    }

    function getItemsComplete(data) {
      vm.items = data;
    }

    function getItemsFailed(error) {
      console.log('Error while querying items', error);
    }

    function createItemComplete(newItem) {
      vm.items.push(newItem);
    }

    function createItemFailed(error) {
      console.log('Error while creating an item', error);
    }

    function orderBy(key) {
      vm.orderByProp.value = key;
      vm.orderByProp.reverse = vm.orderByProp ? !vm.orderByProp.reverse : false;
    }

  }

})();
