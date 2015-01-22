(function() {

  'use strict';

  angular
    .module('pantryApp')
    .controller('PantryItems', PantryItems);

  function PantryItems(api) {
    var vm = this;

    vm.items = [];

    vm.items = api.pantryitems().query();

  }

})();
