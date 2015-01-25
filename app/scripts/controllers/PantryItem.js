(function() {
  'use strict';

  angular
    .module('pantryApp')
    .controller('PantryItem', PantryItem);

  function PantryItem(dataservice) {
    var vm = this;

    vm.create = createPantryItem;

    function createPantryItem() {
      dataservice.pantryitems().save({
        name: vm.name,
        category: vm.category,
        outofstock: false
      });
    }
  }

})();
