(function() {

  'use strict';

  angular
    .module('pantryApp')
    .factory('foodCategories', foodCategories);

  function foodCategories() {
    return [
      'Pâtisserie',
      'Herbes et épices séchées',
      'Pâtes et nouilles séchées',
      'Confitures et tartinades',
      'Aliments en pot',
      'Moutardes',
      'Noix et graines',
      'Huiles',
      'Pâtes',
      'Viandes',
      'Fruits & Légumes',
      'Produits laitier',
      'Herbes fraîches',
      'Légumes marinés',
      'Riz, céréales et légumineuses',
      'Sauces',
      'Conserves',
      'Vinaigres',
      'Autre',
    ];
  }
})();
