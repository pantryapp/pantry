(function() {

  'use strict';

  angular
    .module('pantryApp')
    .controller('PantryItems', PantryItems);

  PantryItems.$inject = ['foodCategories', 'PantryItemsService'];

  function PantryItems(foodCategories, PantryItemsService) {

    var vm = this;

    vm.foodCategories = foodCategories;

    vm.orderByProp = {
      value   : 'name',
      reverse : false
    };

    vm.forms = {
      'new'  : false,
      'edit' : false
    };

    // Actions on pantry items
    vm.getItems         = getItems;
    vm.createItem       = createItem;
    vm.editItem         = editItem;
    vm.deleteItem       = deleteItem;
    vm.toggleOutOfStock = toggleOutOfStock;

    // Form controls
    vm.toggleForm     = toggleForm;
    vm.closeForms     = closeForms;
    vm.toggleEditForm = toggleEditForm;

    // Reorder list
    vm.orderBy     = orderBy;

    function getItems() {
      return PantryItemsService.getItems();
    }

    function createItem(item) {
      PantryItemsService.createItem(item);
      closeForms();
    }

    function deleteItem(item) {
      PantryItemsService.deleteItem(item);
    }

    function editItem(item) {
      PantryItemsService.editItem(item);
      closeForms();
    }

    function toggleOutOfStock(item) {
      PantryItemsService.toggleOutOfStock(item);
    }

    function toggleEditForm(item) {
      vm.selectedItem = item;
      vm.forms.edit   = !vm.forms.edit;
      vm.forms.new    = vm.forms.edit ? false : true;
    }

    function toggleForm(form) {
      vm.forms[form] = !vm.forms[form];
    }

    function closeForms(form) {
      for(form in vm.forms) {
        if(vm.forms[form])
          vm.forms[form] = false;
      }
    }

    function orderBy(key) {
      vm.orderByProp.value = key;
      vm.orderByProp.reverse = vm.orderByProp ? !vm.orderByProp.reverse : false;
    }

  }

})();
