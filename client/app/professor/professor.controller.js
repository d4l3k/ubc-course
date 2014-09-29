
'use strict';

angular.module('ubcCourseApp')
  .controller('ProfessorCtrl', function($scope, $stateParams, DataService) {
    $scope.professor = {
      name: 'Loading...',
      like: 0,
      useful: 0,
      easy: 0,
      description: 'Loading...'
    };
    DataService.getProfessor($stateParams.professorName).success(function(professor) {
      $scope.professor = professor;
    });
    $scope.reviewVisible = 'none';
    $scope.expand = function(review) {
      review.expanded = !review.expanded;
      console.log($scope.professor.reviews, review);
    };
    $scope.openReview = function() {
      $scope.reviewVisible = 'block';
      DataService.getProfs($scope.professor.department_id).success(function(profs) {
        $scope.profs = profs;
      });
      // Fields of Interest
      DataService.getFOI().success(function(fois) {
        $scope.fois = fois;
      });
    };
    $scope.closeReview = function() {
      $scope.reviewVisible = 'none';
    };
    $scope.profs = [];
    $scope.fois = [];
    $scope.review = function() {
      alert('TODO: Implement');
      return;
      DataService.postReview({
        id: $scope.professor.id,
        professor: $scope.professor,
        like: $scope.like || false,
        useful: $scope.useful || false,
        easy: $scope.easy || false,
        text: $scope.text || '',
        foi: $scope.foi
      }).success(function() {
        DataService.getProfessor($stateParams.professorId).success(function(professor) {
          $scope.professor = professor;
        });
      });
      $scope.closeReview();
      $scope.professor = '';
      $scope.life = false;
      $scope.useful = false;
      $scope.easy = false;
      $scope.foi = null;
      $scope.text = '';
    };
    $scope.report = function(review) {
    };
  });
