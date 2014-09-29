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
		client.query('INSERT INTO reviews("like", useful, easy, text, course_id, field, professor_name) values( $1, $2, $3, $4, $5, $6, $7)', [req.param('like'),
		req.param('useful'), req.param('easy'), req.param('text'), req.param('id'), req.param('foi'), req.param('professor')], function(err, result)
		{
			if (err)
			{
				console.log('An error occurred in the query', err);
			}

			res.json(result.rows);
			done();
		});
  });
};
