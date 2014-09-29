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
    client.query('SELECT * FROM professors WHERE name=$1', [req.param('name')], function(err, result)
    {
      if (err)
      {
        return console.error('The query resulted in an error', err);
      }
      var professor = result.rows[0];
      client.query('SELECT avg("easy"::integer) AS easy, avg("like"::integer) AS like, avg("useful"::integer) AS useful from reviews WHERE professor_name = $1', [professor.name], function(err, result) {

        professor = _.merge({}, professor, result.rows[0]);
        client.query('SELECT * FROM reviews WHERE professor_name = $1', [professor.name], function(err, result) {
          professor.reviews = result.rows;
          res.json(professor);
          done();
        });
      });
    });
  });
};
