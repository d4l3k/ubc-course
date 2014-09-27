'use strict';

angular.module('ubcCourseApp')
  .controller('CourseCtrl', function ($scope, $stateParams, DataService) {
    $scope.course = DataService.getCourse($stateParams.courseId);
    $scope.reviewVisible = "none";
    $scope.expand = function(review) {
      review.expanded = !review.expanded;
      console.log($scope.course.reviews, review);
    };
    $scope.openReview = function() {
      $scope.reviewVisible = "block";
    }
    $scope.closeReview = function() {
      $scope.reviewVisible = "none";
    }
    $scope.report = function(review) {
    }
  });
