(function () {

  'use strict';

  angular.module('store').directive('inlineForm', inlineForm);

  function inlineForm() {
    return {
      restrict: 'EA',
      link: linkFunc
    };
  }

  function linkFunc(scope, element, attrs) {
    var $form = $(element).find('form');
    
    $form.on('submit', function() {
      $form.find('.filled').removeClass('filled');
      $form.find("input")[0].focus();
    });
  }

})();