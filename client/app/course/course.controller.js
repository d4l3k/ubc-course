'use strict';

angular.module('ubcCourseApp')
  .controller('CourseCtrl', function ($scope, $stateParams, DataService) {
    $scope.course = DataService.getCourse($stateParams.courseId);
  });
