var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// Message Routes
module.exports = function (app, db, Users) {
	var router = express.Router(),
        Messages = db.collection('messages');

	router.post('/', function(req, res) {
		Messages.insert({title: req.body.title, body: req.body.body}, function(err){
            if (err) {
                return console.log("Error inserting message ", err);
            }
        });
        res.json({success: true, message: "Geometry Created"});
	});

	router.post('/send', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.get('/:message', function(req, res) {
		Messages.findOne({name: req.params.message}, function(err, found) {
            if (err) {
                return console.log("Error getting message ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:message', function(req, res) {
		Messages.find({name: req.params.message}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for message: ", err);
            }
            res.json(found);
        });
	});

	router.put('/:message', function(req, res) {
		Messages.update({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating message ", err);
            }
            res.json({success: true, message: "Geometry Updated"});
        });
	});

	router.delete('/:message', function(req, res) {
		Messages.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing message: ', err);
            }
            res.json({success: true, message: "Geometry Deleted"});
        });
	});

    return router;
};
