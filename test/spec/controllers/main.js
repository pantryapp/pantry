'use strict';

describe('Controller: PantryController', function () {

  // load the controller's module
  beforeEach(module('app'));

  var PantryController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PantryController = $controller('PantryController', {
      $scope: scope
    });
  }));

  it('should attach a list of categories to the scope', function () {
    expect(scope.categories.length).toBe(14);
  });
});
