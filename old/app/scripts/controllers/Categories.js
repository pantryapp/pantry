(function() {

  'use strict';

  angular
    .module('pantryApp')
    .controller('Categories', Categories);

  function Categories() {
    var vm = this;

    vm.categories = [
      'Pâtisserie',
      'Herbes et épices séchées',
      'Pâtes et nouilles séchées',
      'Confitures et tartinades',
      'Aliments en pot',
      'Moutardes',
      'Noix et graines',
      'Huiles',
      'Pâtes',
      'Légumes marinés',
      'Riz, céréales et légumineuses',
      'Sauces',
      'Conserves',
      'Vinaigres',
      'Autre'
    ];
  }

})();
