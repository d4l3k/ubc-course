'use strict';

angular.module('ubcCourseApp')
  .service('DataService', function () {
    this.popularCourses = function() {
      return [{
        name: "CPSC 110",
        like: 0.10,
        useful: 0.12,
        easy: 0.87
      }, {
        name: "CPSC 121",
        like: 0.30,
        useful: 0.134,
        easy: 0.32
      }]
    };
    this.getCourse = function(name) {
      return {
        name: name,
        like: 0.10,
        useful: 0.12,
        easy: 0.87,
        description: "Fundamental program and computation structures. Introductory programming skills. Computation as a tool for information processing, simulation and modeling, and interacting with the world.",
        reviews: [{
          like: true,
          useful: true,
          easy: true,
          type: "Computer Science",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est."
        }]
      }
    };
  });
