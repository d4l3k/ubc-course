'use strict';

angular.module('ubcCourseApp')
  .controller('MainCtrl', function($scope, $http, DataService) {
    DataService.popularCourses().success(function(courses) {
      $scope.display = _.map(courses, function(v) {
        v.title = v.id + ' — ' + v.name;
        return v;
      });
    });
  });
