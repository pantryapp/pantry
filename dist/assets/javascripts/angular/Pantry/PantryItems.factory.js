(function(angular) {

  'use strict';

  angular
    .module('pantryApp')
    .factory('PantryItemsService', PantryItemsService);

  PantryItemsService.$inject = ['dataservice'];

  function PantryItemsService(dataservice) {

    var itemList = [];

    _get();

    function getItems() {
      return itemList;
    }

    function createItem(item) {
      dataservice.pantryitems().save({
        name        : item.name,
        category    : item.category,
        outofstock  : false
      }).$promise.then(_createComplete, _createFailed);
    }

    function editItem(item) {
      dataservice.pantryitems().update({
        id          : item.id,
        name        : item.name,
        category    : item.category,
        outofstock  : item.outofstock
      });
    }

    function toggleOutOfStock(item) {
      item.outofstock = !item.outofstock;
      dataservice.pantryitems().update({
        id          : item.id,
        outofstock  : item.outofstock
      });
    }

    function deleteItem(item) {
      item.$delete(function() {
        _deleteComplete(item);
      });
    }

    function _createComplete(newItem) {
      itemList.push(newItem);
    }

    function _createFailed(error) {
      console.error('Error while creating an item', error);
    }

    function _getComplete(data) {
      itemList = data;
    }

    function _getFailed(error) {
      console.error('Error while querying items', error);
    }

    function _get(_list) {
      dataservice.pantryitems().query().$promise.then(_getComplete, _getFailed);
    }

    function _deleteComplete(item) {
      itemList.splice(itemList.indexOf(item), 1);
    }

    return {
      getItems: getItems,
      createItem: createItem,
      editItem: editItem,
      deleteItem: deleteItem,
      toggleOutOfStock: toggleOutOfStock
    };

  }

})(window.angular);
