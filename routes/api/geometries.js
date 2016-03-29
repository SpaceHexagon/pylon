var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// Geometry Routes
module.exports = function (app, db, Users) {
	var router = express.Router(),
        Geometries = db.collection("geometries");

	router.post('/', function(req, res) {
		Geometries.insert({name: req.body.name, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting geometry ", err);
            }
        });
        res.json({success: true, message: "Geometry Created"});
	});

	router.get('/:geometry', function(req, res) {
        Geometries.findOne({name: req.params.geometry}, function(err, found) {
            if (err) {
                return console.log("Error getting geometry ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:geometry', function(req, res) {
        Geometries.find({name: req.params.geometry}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for geometry: ", err);
            }
            res.json(found);
        });
	});

	router.put('', function(req, res) {
        Geometries.update({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating geometry ", err);
            }
            res.json({success: true, message: "Geometry Updated"});
        });
	});

	router.delete('', function(req, res) {
        Geometries.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing geometry: ', err);
            }
            res.json({success: true, message: "Geometry Deleted"});
        });
	});

    return router;
};
