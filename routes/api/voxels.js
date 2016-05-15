var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// voxel Routes
module.exports = function (app, db, Users) {
	var router = express.Router();

	router.get('/all', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			voxels = db.collection(username+".voxels");

		voxels.find({}).toArray(function(err, found) {
            if (err) {
                return console.log("Error getting all voxels: ", err);
            }
            res.json(found);
        });
	});

	router.get('/:voxel', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			voxels = db.collection(username+".voxels");

		voxels.find({_id: ObjectID(req.params.voxel)}).toArray(function(err, found) {
            if (err) {
                return console.log("Error getting voxel: ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:voxel', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			voxels = db.collection(username+".voxels");

		voxels.find({name: req.params.voxel}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for voxel: ", err);
            }
            res.json(found);
        });
	});

	router.put('/:voxel', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			voxels = db.collection(username+".voxels");

		voxels.update({_id: ObjectID(req.params.voxel)}, {$set: {name: req.params.voxel, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating voxel: ", err);
            }
            res.json({success: true, message: "voxel Updated"});
        });
	});

	 router.post('/', function(req, res) { // almost doesn't make sense to use post
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			voxels = db.collection(username+".voxels");

		voxels.insert({name: req.body.name, type: req.body.type, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting voxel ", err);
            }
        });
		res.json({success: true, message: "voxel Created"});
	});

	router.delete('/:voxel', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			voxels = db.collection(username+".voxels");

		voxels.remove({_id: ObjectID(req.params.voxel)}, function(err) {
            if(err) {
                return console.log('Error removing voxel: ', err);
            }
            res.json({success: true, message: "voxel Deleted"});
        });
	});

    return router;
};
