(function() {
  'use strict';

  angular.module('store').directive('listItem', listItem);

  function listItem() {
    return {
      restrict: 'E',
      templateUrl: '/views/templates/list-item.html',
      link: linkFunc
    };
  }

  function linkFunc(scope, element, attrs) {
    var $element = $(element).find('.list__item');
    $element.on('click', function() {
      $element.toggleClass('list__item--editing');
    });
  }

})();