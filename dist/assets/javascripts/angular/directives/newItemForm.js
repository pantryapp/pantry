(function() {

  'use strict';

  angular.module('store').directive('newItemForm', newItemForm);

  function newItemForm() {
    return {
      restrict: 'E',
      templateUrl: '/views/templates/new-item-form.html',
      controller: 'Item',
      controllerAs: 'item',
      link: linkFunc
    };
  }

  function linkFunc(scope, element, attrs) {
    $(element).addClass('newitem-form new-item-form--inline');
  }

})();