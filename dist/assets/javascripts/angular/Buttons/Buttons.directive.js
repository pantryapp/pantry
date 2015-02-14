(function() {

  'use strict';

  angular
    .module('pantryApp')
    .directive('buttonBuy', buttonBuy)
    .directive('buttonDelete', buttonDelete)
    .directive('buttonEdit', buttonEdit)
    .directive('buttonOutOfStock', buttonOutOfStock);

    function buttonBuy() {
      return{
        restrict: 'A',
        replace:true,
        templateUrl: 'views/templates/buttons/button-buy.html'
      };
    }

    function buttonDelete() {
      return{
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
})();
