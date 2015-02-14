(function(angular) {

  'use strict';

  angular
    .module('pantryApp')
    .directive('buttonBuy', buttonBuy)
    .directive('buttonDelete', buttonDelete)
    .directive('buttonEdit', buttonEdit)
    .directive('buttonOutOfStock', buttonOutOfStock)
    .directive('confirmationNeeded', confirmationNeeded);

    function buttonBuy() {
      return{
        restrict: 'A',
        replace:true,
        templateUrl: 'views/templates/buttons/button-buy.html'
      };
    }

    function buttonDelete() {
      function link(scope, element) {
        element.on('click', function(evt) {
          evt.preventDefault();
          console.log(this);
        });
      }

      return{
        priority: 100,
        link: {
          pre: link
        },
        restrict: 'A',
        replace:true,
        templateUrl: 'views/templates/buttons/button-delete.html'
      };
    }

    function buttonEdit() {
      return{
        restrict: 'A',
        replace:true,
        templateUrl: 'views/templates/buttons/button-edit.html'
      };
    }


    function buttonOutOfStock() {
      return{
        restrict: 'A',
        replace:true,
        templateUrl: 'views/templates/buttons/button-outofstock.html'
      };
    }

    function confirmationNeeded() {
      function link(scope, element, attrs, msg) {

        if(!attrs.ngClick)
          return;

        msg = attrs.confirmationNeeded || "Êtes vous certain?";
        element.on('click',function () {
          if ( window.confirm(msg) ) {
            scope.$eval(attrs.ngClick);
          }
        });
      }

      return {
        priority: 1,
        terminal: true,
        link: link
      };
    }

})(window.angular);
