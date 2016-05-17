var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

//  Structure Routes
module.exports = function (app, db, Users) {
	var router = express.Router(),
        structures = db.collection("structures");

    router.post('/', function(req, res) {
		structures.insert({name: req.body.name, type: req.body.type, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting structure ", err);
            }
        });
		res.json({success: true, message: "structure Created"});
	});

	router.get('/all', function(req, res) {
		structures.find({}).toArray(function(err, found) {
            if (err) {
                return console.log("Error getting all structures: ", err);
            }
            res.json(found);
        });
	});

	router.get('/:structure', function(req, res) {
		structures.find({name: req.params.structure}).toArray(function(err, found) {
            if (err) {
                return console.log("Error getting structure: ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:structure', function(req, res) {
		structures.find({name: req.params.structure}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for structures: ", err);
            }
            res.json(found);
        });
	});

	router.put('/:structure', function(req, res) {
		structures.update({_id: ObjectID(req.params.structure)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating structure: ", err);
            }
            res.json({success: true, message: "structure Updated"});
        });
	});

	router.delete('/:structure', function(req, res) {
		structures.remove({_id: ObjectID(req.params.structure)}, function(err) {
            if(err) {
                return console.log('Error removing structure: ', err);
            }
            res.json({success: true, message: "structure Deleted"});
        });
	});

    return router;
};
