(function() {

  'use strict';

  angular
    .module('pantryApp')
    .directive('pantryItemNewForm', pantryItemNewForm)
    .directive('pantryItemEditForm', pantryItemEditForm);

  function pantryItemNewForm() {
    return {
      templateUrl: 'views/templates/pantry/newForm.html'
    };
  }

  function pantryItemEditForm() {
    return {
      templateUrl: 'views/templates/pantry/editForm.html'
    };
  }

})();
