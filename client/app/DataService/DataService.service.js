'use strict';

angular.module('ubcCourseApp')
  .service('DataService', function ($http) {
    this.popularCourses = function(sort) {
      if (_.isEmpty(sort)) {
        sort = 'like';
      }
      return $http.get('/api/courses', {cache: true});
    };

    this.getCourse = function(name) {
      return $http.get('/api/course?course='+name, {cache: true});
    };
    this.postReview = function(data) {
      return $http.post('/api/review', data);
    }
  });
