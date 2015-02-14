(function(angular) {

  'use strict';

  angular
    .module('pantryApp')
    .controller('pantryItemsController', pantryItemsController);

  pantryItemsController.$inject = ['foodCategories', 'pantryItemsFactory'];

  function pantryItemsController(foodCategories, pantryItemsFactory) {

    var _this = this;

    _this.foodCategories = foodCategories;

    _this.orderByProp = {
      value   : 'name',
      reverse : false
    };

    _this.forms = {
      'new'  : false,
      'edit' : false
    };

    // Actions on pantry items
    _this.getItems         = getItems;
    _this.createItem       = createItem;
    _this.editItem         = editItem;
    _this.deleteItem       = deleteItem;
    _this.toggleOutOfStock = toggleOutOfStock;

    // Form controls
    _this.toggleForm     = toggleForm;
    _this.closeForms     = closeForms;
    _this.toggleEditForm = toggleEditForm;

    // Reorder list
    _this.orderBy     = orderBy;

    function getItems() {
      return pantryItemsFactory.getItems();
    }

    function createItem(item) {
      pantryItemsFactory.createItem(item);
      closeForms();
    }

    function deleteItem(item) {
      pantryItemsFactory.deleteItem(item);
    }

    function editItem(item) {
      pantryItemsFactory.editItem(item);
      closeForms();
    }

    function toggleOutOfStock(item) {
      pantryItemsFactory.toggleOutOfStock(item);
    }

    function toggleEditForm(item) {
      _this.selectedItem = item;
      _this.forms.edit   = !_this.forms.edit;
      _this.forms.new    = _this.forms.edit ? false : true;
      _this.formToggled();
    }

    function toggleForm(form) {
      _this.forms[form] = !_this.forms[form];
      _this.formToggled();
    }

    function closeForms(form) {
      for(form in _this.forms) {
        if(_this.forms[form])
          _this.forms[form] = false;
      }
      _this.formToggled();
    }

    function orderBy(key) {
      _this.orderByProp.value = key;
      _this.orderByProp.reverse = _this.orderByProp ? !_this.orderByProp.reverse : false;
    }

  }

})(window.angular);
