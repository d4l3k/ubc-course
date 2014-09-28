'use strict';

angular.module('ubcCourseApp')
  .controller('MainCtrl', function ($scope, $http, DataService) {
    $scope.courses = [];
    $scope.filteredCourses = [];

    $scope.$watch('sort', updateFilter)
    $scope.$watch('search', updateFilter)
    $scope.$watch('department', updateFilter)
    var fixedTop = $('.search-form').position().top;
    $(window).scroll(function(e) {
      $scope.fixed = window.scrollY > fixedTop;
      $scope.$apply();
    });
    function cleanQuery(query) {
      return query.toLowerCase().replace(/[^a-z0-9]/g,'');
    }
    function updateFilter() {
      var $department = $scope.department;
      var $search = cleanQuery($scope.search || '');
      var $sort = $scope.sort;
      $scope.filteredCourses = _.sortBy(_.filter($scope.courses, function(v) {
        var department = true;
        var sort = true;
        var search = true;
        if ($department) {
          department = v.id.slice(0, $department.length) == $department;
        }
        if ($search) {
          search = cleanQuery(v.title).indexOf($search) >= 0;
        }
        return department && sort && search;
      }), function(a) {
        if ($sort == 'Name') {
          return a.id;
        } else if ($sort == 'Usefulness') {
          return 1-a.useful;
        } else if ($sort == 'Easiness') {
          return 1- a.easy;
        } else {
          return 1-a.like;
        }
      });
      $scope.shownCourses = $scope.filteredCourses.slice(0,100);
    }
    $scope.departments = [];
    DataService.popularCourses().success(function(courses) {
      $scope.courses = _.map(courses, function(v) {
        v.title = v.id + ' — ' + v.name;
        return v;
      });
      updateFilter();
      $scope.departments = _.sortBy(_.uniq(_.map(courses, function(v) {
        return v.id.match(/^\D*/g)[0];
      })));
    });
  });
