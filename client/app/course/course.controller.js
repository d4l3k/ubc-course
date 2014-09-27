'use strict';

angular.module('ubcCourseApp')
  .controller('CourseCtrl', function ($scope, $stateParams, DataService) {
    $scope.course = {
      name: "Loading...",
      like: 0,
      useful: 0,
      easy: 0,
      description: "Loading..."
    };
    DataService.getCourse($stateParams.courseId).success(function(course) {
      $scope.course = course;
    });
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
    $scope.review = function() {
      DataService.postReview({
        id: $scope.course.id,
        professor: 'None',
        like: $scope.like || false,
        useful: $scope.useful || false,
        easy: $scope.easy || false,
        text: $scope.text,
        foi: $scope.foi
      });
    }
    $scope.report = function(review) {
    }
  });
