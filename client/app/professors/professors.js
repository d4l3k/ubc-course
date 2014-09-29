'use strict';

angular.module('ubcCourseApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('professors', {
        url: '/professors',
        templateUrl: 'app/professors/professors.html',
        controller: 'ProfessorsCtrl'
      });
  });
