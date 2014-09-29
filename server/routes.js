/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/professor/', require('./api/professor-view'));
  app.use('/api/professors', require('./api/professor'));
  app.use('/api/departments', require('./api/department'));
  app.use('/api/subjprofs', require('./api/subjprof'));
  app.use('/api/fields', require('./api/field'));
  app.use('/api/review', require('./api/review'));
  app.use('/api/course', require('./api/course'));
  app.use('/api/courses', require('./api/courses'));
  app.use('/api/things', require('./api/thing'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
