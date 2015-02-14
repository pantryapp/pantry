(function(angular) {

  'use strict';

  angular
    .module('pantryApp')
    .directive('offsideContent', offsideContent);

  function offsideContent() {
    function link(scope, element, attrs) {

      element.addClass('offside-content-slide');

      scope.toggleOn = function() {
        if(this.forms.new || this.forms.edit && !element.hasClass('open'))
          element.addClass('open');
        else if(element.hasClass('open'))
          element.removeClass('open');
      };
    }

    return {
      restrict: 'EA',
      scope: {
        toggleOn : '='
      },
      link: link
    };
  }

})(window.angular);
