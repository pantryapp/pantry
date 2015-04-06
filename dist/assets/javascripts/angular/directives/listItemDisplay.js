(function() {
  
  'use strict';

  angular.module('store').directive('listItemDisplay', listItemDisplay);

  function listItemDisplay() {
    return {
      restrict: 'EA',
      controller: ListItemDisplayController,
      controllerAs: 'listItemDisplayCtrl',
      link: linkFunc
    };
  }

  function ListItemDisplayController($routeParams) {
    var that = this;

    that.showConfirmation = false;
  
    that.confirmation = function() {
      that.showConfirmation = !that.showConfirmation;
    };
  }

  function linkFunc(scope, element, attrs, listItemDisplayCtrl) {
    var $element = $(element);
  }

})();