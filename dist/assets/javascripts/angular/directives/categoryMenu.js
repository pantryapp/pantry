(function() {

  'use strict';

  angular.module('store').directive('categoryMenu', categoryMenu);

  function categoryMenu() {
    return {
      restrict: 'E',
      templateUrl: '/views/templates/category-menu.html',
      controller: CategoryMenuController,
      controllerAs: 'categoryMenu',
      link: linkFunc
    };
  }

  function CategoryMenuController($routeParams, ItemsFactory) {
    var that = this;
    that.categories      = ItemsFactory.getItemsCategories();
    that.activeCategory = $routeParams.storeCategory;
  }

  function linkFunc(scope, element, attrs, categoryMenu) {

    var layout    = (attrs && attrs.layout) ? attrs.layout : "top-menu";

    $(element)
      .addClass('category-menu')
      .addClass(layout);
  }

})();
