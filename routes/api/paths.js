var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// path Routes
module.exports = function (app, db, Users) {
	var router = express.Router();

	router.get('/all', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			paths = db.collection(username+".paths");

		paths.find({}).toArray(function(err, found) {
            if (err) {
                return console.log("Error getting all paths: ", err);
            }
            res.json(found);
        });
	});

	router.get('/:path', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			paths = db.collection(username+".paths");

		paths.find({_id: ObjectID(req.params.path)}).toArray(function(err, found) {
            if (err) {
                return console.log("Error getting path: ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:path', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			paths = db.collection(username+".paths");

		paths.find({name: req.params.path}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for path: ", err);
            }
            res.json(found);
        });
	});

	router.put('/:path', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			paths = db.collection(username+".paths");

		paths.update({_id: ObjectID(req.params.path)}, {$set: {name: req.params.path, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating path: ", err);
            }
            res.json({success: true, message: "path Updated"});
        });
	});

	 router.post('/', function(req, res) { // almost doesn't make sense to use post
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			paths = db.collection(username+".paths");

		paths.insert({name: req.body.name, type: req.body.type, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting path ", err);
            }
        });
		res.json({success: true, message: "path Created"});
	});

	router.delete('/:path', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			paths = db.collection(username+".paths");

		paths.remove({_id: ObjectID(req.params.path)}, function(err) {
            if(err) {
                return console.log('Error removing path: ', err);
            }
            res.json({success: true, message: "path Deleted"});
        });
	});

    return router;
};
