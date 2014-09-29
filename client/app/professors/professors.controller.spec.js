'use strict';

describe('Controller: ProfessorsCtrl', function() {

  // load the controller's module
  beforeEach(module('ubcCourseApp'));

  var ProfessorsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfessorsCtrl = $controller('ProfessorsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
