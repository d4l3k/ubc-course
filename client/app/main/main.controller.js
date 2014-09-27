'use strict';

angular.module('ubcCourseApp')
  .controller('MainCtrl', function ($scope, $http, DataService) {
    $scope.awesomeThings = [];

    $scope.courses = [];
    DataService.popularCourses().success(function(courses) {
      $scope.courses = courses;
    });
  });
