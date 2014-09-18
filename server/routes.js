/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below// setup Mongo
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/sunblock');

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

  app.use('/api/things', require('./api/thing'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/dashboard')
	.get(function(req, res) {
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Methods', 'GET');
		res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
		var db = req.db;
		var collection = db.get('videoCollection');
		var x = collection.find({},{sort:[['time','desc'], ['ip','desc']]});
		x.success(function(doc){
		console.log(doc);
		return  res.send(200,doc);
		});
		x.error(function(err){
		console.log(err);
		return res.send(400,err);
		});
	});
     // res.sendfile(app.get('appPath') + '/index.html');
};
