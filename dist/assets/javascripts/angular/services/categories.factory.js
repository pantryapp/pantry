(function() {

  'use strict';

  angular.module('store').factory('CategoriesFactory', CategoriesFactory);

  function CategoriesFactory() {

    var gardeMangerCategories = [
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
      'Autre'
    ],

    produitsMenagersCategories = [],
    pharmacieCategories        = [],
    diversCategories           = [],
    storeCategories            = { 
      'garde-manger' : {
        'slug' : 'garde-manger',
        'name' : 'Garde-manger',
        categories: gardeMangerCategories
        },
      'produit-menagers' : {
        'slug' : 'produit-menagers',
        'name' : 'Produits ménagers',
        categories: produitsMenagersCategories
      },
      'pharmacie' : {
        'slug' : 'pharmacie',
        'name' : 'Pharmacie',
        categories: pharmacieCategories
      },
      'divers' : {
        'slug' : 'divers',
        'name' : 'Divers',
        categories: diversCategories
      }
    };

    function getStoreCategories() {
      return storeCategories;
    }

    function getStoreCategory(storeCategory) {
      return storeCategories[storeCategory];
    }

    function getStoreCategoriesToDisplay() {
      var category, display = [];
      for(category in storeCategories) {
        display.push(storeCategories[category]);
      }
      return display;
    }

    function selectCategoriesFromStore(storeCategory) {
      return storeCategories[storeCategory].categories;
    }


    return {
      getStoreCategories: getStoreCategories,
      getStoreCategory: getStoreCategory,
      getStoreCategoriesToDisplay: getStoreCategoriesToDisplay,
      selectCategoriesFromStore: selectCategoriesFromStore
    }; 

  }

})();