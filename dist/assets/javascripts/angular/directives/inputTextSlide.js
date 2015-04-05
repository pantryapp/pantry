(function () {

  'use strict';

  angular.module('store').directive('inputTextSlide', inputTextSlide);

  function inputTextSlide() {
    return {
      restrict: 'E',
      templateUrl: '/views/templates/input-text-slide.html',
      transclude: true,
      link: linkFunc
    };
  }

  function linkFunc(scope, element, attrs) {
    var $element = $(element),
        $input   = $element.find('.input__field');

    $input.on('blur', function() {
      console.log($input);
      if($input.val() !== "") {
        $input.addClass('filled');
      } else {
        $input.removeClass('filled');
      }
    });
  }

})();