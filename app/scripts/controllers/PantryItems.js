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

    vm.items = dataservice.pantryitems().query(function(data) {
      vm.items = data;
    });

    function create() {
      dataservice.pantryitems().save({
        name: vm.newItem.name,
        category: vm.newItem.category,
        outofstock: false

      }, function(newItem) {
        vm.items.push({name: newItem.name, category: newItem.category, outofstock: false});
        console.log(vm.items);
      });
    }

    function orderBy(key) {
      vm.orderByProp.value = key;
      vm.orderByProp.reverse = vm.orderByProp ? !vm.orderByProp.reverse : false;
    }

  }

})();
