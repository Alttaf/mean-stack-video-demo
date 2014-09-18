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
exports.index = function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  var vidId = req.query.id;
  var videoTime = req.query.time;
  var action = req.query.action;
  var time = new Date();
  var ip = req.ip;
  console.log("vId="+vidId);
  console.log("time="+time);
  console.log("ip="+req.ip);
  var db = req.db;
  var collection = db.get('videoCollection');
  
	// var x = collection.find();
	// console.log(x);
	// x.success(function(doc){
		// console.log(doc);
	// return  res.send(200,doc);
	// });

  collection.insert({"videoId":vidId, "action":action, "videoTime":videoTime, "time":time, "ip":ip}, function(err, doc) {
	if(err){
	return	res.send("error inserting record")
	}
	return  res.send(200,doc)
  });
};

exports.create = function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  var vidId = req.query.id;
  var ip = req.ip;
  console.log("vId="+vidId);
  // Set our internal MONGO DB variable
  var db = req.db;
  // Set our collection
  console.log(db);
  var collection = db.get('videoCollection');
  collection.insert({"videoId":vidId,"ip":ip, "action":"page load", time:(new Date())}, function(err, doc) {
	if(err){
		res.send("error inserting record")
	} 
  });
  
  return res.send(200,"done");
};