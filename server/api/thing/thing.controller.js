/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function (req, res) {
	// TODO must change to something sensible, FOR TESTING ONLY a cross domain allow all cowboy type of thing
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'GET'); // should really be a put
	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	// params in
	var vidId = req.query.id;
	var videoTime = req.query.time;
	var action = req.query.action;
	var time = new Date();
	var ip = req.ip;
	// use sunblock db
	var db = req.db;
	var collection = db.get('videoCollection');

	collection.update({"ip" : ip}, 
	{
		'$push' : {
			"transaction" : {
				"videoId" : vidId,
				"action" : action,
                "videoTime":videoTime,
				time : (new Date())
			}
		}
	}, function (err) {
		if (err) {
			return res.send(500, "error updating record");
		}
		console.log("updated record");
		return res.send(200, "updated record");
	});
};

exports.create = function (req, res) {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST');
	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	var vidId = req.query.id;
	var ip = req.ip;
	// Set our internal MONGO DB variable
	var db = req.db;
	// Set our collection
	var collection = db.get('videoCollection');
	collection.insert({	"ip" : ip,
		"transaction" : [{
				"videoId" : vidId,
				"action" : "page load",
				"videoTime" : "",
				time : (new Date())
			}
		]
	}, function (err, doc) {
		if (err) {
			res.send("error inserting record");
		}
	});

	return res.send(200, "done");
};
