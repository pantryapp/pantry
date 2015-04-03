(function() {

  'use strict';

  angular.module('store').directive('newItemForm', newItemForm);

  function newItemForm() {
    return {
      restrict: 'E',
      templateUrl: '/views/templates/new-item-form.html',
      controller: 'Item',
      controllerAs: 'item'
    };
  }


})();