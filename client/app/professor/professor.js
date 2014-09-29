'use strict';

angular.module('ubcCourseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('professor', {
        url: '/professor/{professorName}',
        templateUrl: 'app/professor/professor.html',
        controller: 'ProfessorCtrl'
      });
  });
