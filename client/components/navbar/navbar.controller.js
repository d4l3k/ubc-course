'use strict';

angular.module('ubcCourseApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;

    setTimeout(function() {
      var text = $(".hero-titles h1").text();
      if (text != "UBCourses") {
        document.title = text + " - UBCourses";
      } else {
        document.title = text;
      }
    }, 500);

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    };
    $scope.getClass = function(url) {
      return window.location.pathname == url ? 'pure-menu-selected' : '';
    }
  });

