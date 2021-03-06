'use strict';

var _ = require('lodash');
var pg = require('pg');


// Get list of coursess
exports.index = function(req, res) {
  pg.connect('postgres://postgres:@localhost/ubcourses', function(err, client, done) {
    if (err) {
      return console.error('A problem with the connection occurred', err);
    }
    client.query('select p.name, p.id, array_agg(dp.department_id) as departments from professors p LEFT JOIN department_professors dp ON p.name = dp.professor_name group by p.name order by p.name ASC', function(err, result) {
      if (err){
        return console.error('The query resulted in an error', err);
      }

      var courses = [];
      var rowCount = result.rows.length;

      _.each(result.rows, function(row) {
        client.query('SELECT avg("easy"::integer) AS easy, avg("like"::integer) AS like, avg("useful"::integer) AS useful from reviews WHERE professor_name = $1', [row.name], function(err, result) {
          courses.push(_.merge(row, result.rows[0]));
          if (courses.length == rowCount) {
            res.json(courses);
            done();
          }
        });
      });
    });
  });
};
