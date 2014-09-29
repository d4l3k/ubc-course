'use strict';

describe('Directive: reviewSort', function() {

  // load the directive's module and view
  beforeEach(module('ubcCourseApp'));
  beforeEach(module('app/reviewSort/reviewSort.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<review-sort></review-sort>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the reviewSort directive');
  }));
});
