(function() {
  'use strict';

  angular.module('store').directive('listItem', listItem);

  function listItem() {
    return {
      restrict: 'E',
      templateUrl: '/views/templates/list-item.html',
      controller: 'ItemController',
      controllerAs: 'itemCtrl',
      link: linkFunc
    };
  }

  function linkFunc(scope, element, attrs, itemCtrl) {

    //$element.on('click', function() {
    //  $element.toggleClass('list__item--editing');
    //});
  }

})();