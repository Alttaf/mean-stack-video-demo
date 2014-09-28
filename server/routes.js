/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function (app) {

	// Insert routes below// setup Mongo
	var mongo = require('mongodb');
	// use data access layer monk :/
	var monk = require('monk');
	var db = monk('localhost:27017/sunblock');

	// Make our db accessible to our router
	app.use(function (req, res, next) {
		req.db = db;
		next();
	});
	// on use of the things api require the api thing express route
	app.use('/api/things', require('./api/thing'));

	// All undefined asset or api routes should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets)/*')
	.get(errors[404]);

	// All other routes should redirect to the index.html but not implemented
	app.route('/dashboard')
	.get(function (req, res) {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Methods', 'GET');
		res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
		// load the sunblock database
		var db = req.db;
		var collection = db.get('videoCollection');
		// get all the videos in time and ip order (monk returns a promise at this point)
		var videos = collection.find({}, {
				sort : [['transaction.time', '-1'],['_id', 'desc']]
			});
		// on success send back the list of videos 
		videos.success(function (doc) {			
			return res.send(200, doc);
		});
		// on failure return 500 internal server error
		videos.error(function (err) {
			console.log(err);
			return res.send(500, err);
		});
	});
};
// TO DO set up web sockets HERE

