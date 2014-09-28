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
      return $http.get('/api/course?course='+name);
    };
    this.getProfs = function(dept) {
      return $http.get('/api/subjprofs?dept='+dept, {cache: true});
    };
    this.getFOI = function(dept) {
      return $http.get('/api/fields', {cache: true});
    };
    this.postReview = function(data) {
      return $http.post('/api/review', data);
    }
  });
