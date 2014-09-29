'use strict';

var _ = require('lodash');
var pg = require('pg');


// Get list of coursess
exports.index = function(req, res) {
  pg.connect('postgres://postgres:@localhost/ubcourses', function(err, client, done)
  {
    if (err)
    {
      return console.error('A problem with the connection occurred', err);
    }
    client.query('SELECT * FROM courses WHERE id=$1', [req.param('course')], function(err, result)
    {
      if (err)
      {
        return console.error('The query resulted in an error', err);
      }
      var course = result.rows[0];
      client.query('SELECT avg("easy"::integer) AS easy, avg("like"::integer) AS like, avg("useful"::integer) AS useful from reviews WHERE course_id = $1', [req.param('course')], function(err, result) {

        course = _.merge({}, course, result.rows[0]);
        client.query('SELECT * FROM reviews WHERE course_id = $1', [req.param('course')], function(err, result) {
          course.reviews = result.rows;
          res.json(course);
          done();
        });
      });
    });
  });
};
