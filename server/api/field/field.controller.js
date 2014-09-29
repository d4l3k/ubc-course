'use strict';

var _ = require('lodash');
var pg = require('pg');


// Get list of coursess
exports.index = function(req, res) {
  pg.connect('postgres://postgres:@localhost/ubcourses', function(err, client, done) {
    if (err) {
      return console.error('A problem with the connection occurred', err);
    }
    client.query('SELECT DISTINCT description FROM departments ORDER BY description ASC', function(err, result) {
      if (err) {
        return console.error('The query resulted in an error', err);
      }
      res.json(_.map(result.rows, function(row) { return row.description }));
      done();
    });
  });
};
