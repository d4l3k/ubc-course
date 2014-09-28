'use strict';

angular.module('ubcCourseApp')
  .controller('MainCtrl', function ($scope, $http, DataService) {
    $scope.courses = [];
    $scope.filteredCourses = [];

    $scope.$watch('sort', updateFilter)
    $scope.$watch('search', updateFilter)
    $scope.$watch('department', updateFilter)
    function updateFilter() {
      console.log("Woof");
      var $department = $scope.department;
      var $search = ($scope.search || '').toLowerCase();
      var $sort = $scope.sort;
      $scope.filteredCourses = _.filter($scope.courses, function(v) {
        var department = true;
        var sort = true;
        var search = true;
        if ($department) {
          department = v.id.slice(0, $department.length) == $department;
        }
        if ($search) {
          search = v.title.toLowerCase().indexOf($search) >= 0;
        }
        return department && sort && search;
      });
      $scope.shownCourses = $scope.filteredCourses.slice(0,100);
    }
    $scope.departments = [];
    DataService.popularCourses().success(function(courses) {
      $scope.courses = _.map(courses, function(v) {
        v.title = v.id + ' - ' + v.name;
        return v;
      });
      updateFilter();
      $scope.departments = _.sortBy(_.uniq(_.map(courses, function(v) {
        return v.id.match(/^\D*/g)[0];
      })));
    });
  });
