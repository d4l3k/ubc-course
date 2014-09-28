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
      DataService.getProfs($scope.course.department_id).success(function(profs) {
        $scope.profs = profs;
      });
      // Fields of Interest
      DataService.getFOI().success(function(fois) {
        $scope.fois = fois;
      });
    }
    $scope.closeReview = function() {
      $scope.reviewVisible = "none";
    }
    $scope.profs = [];
    $scope.fois = []
    $scope.review = function() {
      DataService.postReview({
        id: $scope.course.id,
        professor: $scope.professor,
        like: $scope.like || false,
        useful: $scope.useful || false,
        easy: $scope.easy || false,
        text: $scope.text || '',
        foi: $scope.foi
      }).success(function() {
        DataService.getCourse($stateParams.courseId).success(function(course) {
          $scope.course = course;
        });
      });
      $scope.closeReview();
      $scope.professor = "";
      $scope.life = false;
      $scope.useful = false;
      $scope.easy = false;
      $scope.foi = null;
      $scope.text = "";
    }
    $scope.report = function(review) {
    }
  });
