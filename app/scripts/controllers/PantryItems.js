(function() {

  'use strict';

  angular
    .module('pantryApp')
    .controller('PantryItems', PantryItems);

  PantryItems.$inject = ['dataservice'];

  function PantryItems(dataservice) {
    var vm = this;

    vm.pantry       = [];

    vm.orderBy     = orderBy;
    vm.orderByProp = {value: 'name', reverse: false};

    vm.createItem     = items().createItem;
    vm.toggleEditForm = toggleEditForm;
    vm.toggleNewForm  = toggleNewForm;
    vm.closeForms     = closeForms;

    vm.showNewForm  = false;
    vm.showEditForm = false;
    vm.editItem     = null;

    items().get();

    vm.items = items;

    function closeForms() {
      vm.showNewForm  = false;
      vm.showEditForm = false;
    }

    function toggleNewForm() {
      vm.showNewForm = !vm.showNewForm;

      if(vm.showNewForm === true) {
        vm.showEditForm = false;
      }
    }

    function toggleEditForm(item) {
      vm.editItem = item;
      vm.showEditForm = !vm.showEditForm;

      if(vm.showEditForm === true) {
        vm.showNewForm = false;
      }
    }

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

      function edit() {
        console.log(vm.editItem);
      }

      return {
        get: get,
        add: create,
        edit: edit
      };
    }

    function orderBy(key) {
      vm.orderByProp.value = key;
      vm.orderByProp.reverse = vm.orderByProp ? !vm.orderByProp.reverse : false;
    }

  }

})();
