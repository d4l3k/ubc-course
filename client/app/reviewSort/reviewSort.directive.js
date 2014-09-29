'use strict';

angular.module('ubcCourseApp')
  .directive('reviewSort', function(DataService) {
    return {
      templateUrl: 'app/reviewSort/reviewSort.html',
      scope: {
        display: '='
      },
      restrict: 'EA',
      link: function($scope, element, attrs) {
        $scope.type = attrs.type;
        $scope.filteredCourses = [];

        DataService.getDepartments().success(function(departments) {
          $scope.departments = departments;
        });

        $scope.shownCount = 100;

        $scope.$watch('sort', updateFilter);
        $scope.$watch('search', updateFilter);
        $scope.$watch('department', updateFilter);
        $scope.$watch('shownCount', updateFilter);

        var fixedTop = $('.search-form').position().top;
        $(window).scroll(function(e) {
          $scope.fixed = window.scrollY > fixedTop;
          $scope.$apply();
        });
        function cleanQuery(query) {
          return query.toLowerCase().replace(/[^a-z0-9]/g, '');
        }
        function updateFilter() {
          var $department = $scope.department;
          var $search = cleanQuery($scope.search || '');
          var $sort = $scope.sort;
          $scope.filteredCourses = _.sortBy(_.filter($scope.display, function(v) {
            var department = true;
            var sort = true;
            var search = true;
            if ($department) {
              if (v.departments) {
                department = v.departments.indexOf($department) >= 0;
              } else {
                department = v.department_id == $department;
              }
            }
            if ($search) {
              search = cleanQuery(v.title).indexOf($search) >= 0;
            }
            return department && sort && search;
          }), function(a) {
            if ($sort == 'Name') {
              return a.id;
            } else if ($sort == 'Usefulness') {
              return 1 - a.useful;
            } else if ($sort == 'Easiness') {
              return 1 - a.easy;
            } else {
              return 1 - a.like;
            }
          });
          $scope.shownCourses = $scope.filteredCourses.slice(0, $scope.shownCount);
        }
        $scope.$watch('display', function() {
          updateFilter();
        });
        $scope.showMore = function() {
          $scope.shownCount += 100;
        }
      }
    };
  });
