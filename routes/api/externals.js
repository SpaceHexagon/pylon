var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// external Routes
module.exports = function (app, db, Users) {
	var router = express.Router(),
        externals = db.collection("externals");

    router.post('/', function(req, res) {
		externals.insert({name: req.body.name, type: req.body.type, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting external ", err);
            }
        });
		res.json({success: true, message: "external file Created"});
	});

	router.get('/list', function(req, res) {
		externals.findOne({name: req.params.external}, function(err, found) {
            if (err) {
                return console.log("Error getting external file: ", err);
            }
            res.json(found);
        });
	});

	router.get('/:external', function(req, res) {
		externals.find({}).toArray( function(err, found) {
            if (err) {
                return console.log("Error getting external file: ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:external', function(req, res) {
		externals.find({name: req.params.external}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for external file: ", err);
            }
            res.json(found);
        });
	});

	router.put('/:external', function(req, res) {
		externals.update({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating external file: ", err);
            }
            res.json({success: true, message: "external Updated"});
        });
	});

	router.delete('/:external', function(req, res) {
		externals.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing external file: ', err);
            }
            res.json({success: true, message: "external file Deleted"});
        });
	});

    return router;
};
