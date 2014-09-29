'use strict';

describe('Controller: ProfessorCtrl', function () {

  // load the controller's module
  beforeEach(module('ubcCourseApp'));

  var ProfessorCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfessorCtrl = $controller('ProfessorCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
