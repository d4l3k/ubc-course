'use strict';

angular.module('ubcCourseApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('course', {
        url: '/course/{courseId}',
        templateUrl: 'app/course/course.html',
        controller: 'CourseCtrl'
      });

    $locationProvider.html5Mode(true);
  });
