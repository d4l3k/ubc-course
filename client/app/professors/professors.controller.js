'use strict';

angular.module('ubcCourseApp')
  .controller('ProfessorsCtrl', function($scope, DataService) {
    DataService.getPopularProfessors().success(function(courses) {
      $scope.display = _.map(courses, function(v) {
        v.title = v.name + ' — ' + v.departments.join(', ');
        v.id = v.name;
        return v;
      });
    });
  });
