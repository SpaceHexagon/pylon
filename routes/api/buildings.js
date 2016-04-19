var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// Building Routes
module.exports = function (app, db, Users) {
	var router = express.Router();

    router.post('/', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			buildings = db.collection(username+".buildings");

		buildings.insert({name: req.body.name, type: req.body.type, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting building ", err);
            }
        });
		res.json({success: true, message: "building Created"});
	});

	router.get('/all', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			buildings = db.collection(username+".buildings");

		buildings.find({}).toArray(function(err, found) {
            if (err) {
                return console.log("Error getting all buildings: ", err);
            }
            res.json(found);
        });
	});

	router.get('/:building', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			buildings = db.collection(username+".buildings");

		buildings.find({_id: ObjectID(req.params.building)}).toArray(function(err, found) {
            if (err) {
                return console.log("Error getting building: ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:building', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			buildings = db.collection(username+".buildings");

		buildings.find({name: req.params.building}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for building: ", err);
            }
            res.json(found);
        });
	});

	router.put('/:building', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			buildings = db.collection(username+".buildings");

		buildings.update({_id: ObjectID(req.params.building)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating building: ", err);
            }
            res.json({success: true, message: "building Updated"});
        });
	});

	router.delete('/:building', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			buildings = db.collection(username+".buildings");

		buildings.remove({_id: ObjectID(req.params.building)}, function(err) {
            if(err) {
                return console.log('Error removing building: ', err);
            }
            res.json({success: true, message: "building Deleted"});
        });
	});

    return router;
};
