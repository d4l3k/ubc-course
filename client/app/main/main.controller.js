'use strict';

angular.module('ubcCourseApp')
  .controller('MainCtrl', function ($scope, $http, DataService) {
    $scope.awesomeThings = [];

    $scope.courses = DataService.popularCourses();



    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  });
