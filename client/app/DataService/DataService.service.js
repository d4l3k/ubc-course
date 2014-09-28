'use strict';

angular.module('ubcCourseApp')
  .service('DataService', function ($http) {
    this.popularCourses = function(sort) {
      if (_.isEmpty(sort)) {
        sort = 'like';
      }
      /*return [{
        name: "CPSC 110",
        like: 0.10,
        useful: 0.12,
        easy: 0.87
      }, {
        name: "CPSC 121",
        like: 0.30,
        useful: 0.134,
        easy: 0.32
      }]*/
      return $http.get('/api/courses', {cache: true});
    };

    this.getCourse = function(name) {
      return $http.get('/api/course?course='+name, {cache: true});
    };
    this.postReview = function(data) {
      return $http.post('/api/review', data);
    }
  });
