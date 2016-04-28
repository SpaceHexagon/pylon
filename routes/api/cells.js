var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// Cell Routes
module.exports = function (app, db, Users) {
	var router = express.Router();

	router.get('/all', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			cells = db.collection(username+".cells");

		cells.find({}).toArray(function(err, found) {
            if (err) {
                return console.log("Error getting all cells: ", err);
            }
            res.json(found);
        });
	});

	router.get('/:cell', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			cells = db.collection(username+".cells");

		cells.find({_id: ObjectID(req.params.cell)}).toArray(function(err, found) {
            if (err) {
                return console.log("Error getting cell: ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:cell', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			cells = db.collection(username+".cells");

		cells.find({name: req.params.cell}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for cell: ", err);
            }
            res.json(found);
        });
	});

	router.put('/:cell', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			cells = db.collection(username+".cells");

		cells.update({_id: ObjectID(req.params.cell)}, {$set: {name: req.params.cell, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating cell: ", err);
            }
            res.json({success: true, message: "cell Updated"});
        });
	});

	 router.post('/', function(req, res) { // almost doesn't make sense to use post
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			cells = db.collection(username+".cells");

		cells.insert({name: req.body.name, type: req.body.type, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting cell ", err);
            }
        });
		res.json({success: true, message: "cell Created"});
	});

	router.delete('/:cell', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			cells = db.collection(username+".cells");

		cells.remove({_id: ObjectID(req.params.cell)}, function(err) {
            if(err) {
                return console.log('Error removing cell: ', err);
            }
            res.json({success: true, message: "cell Deleted"});
        });
	});

    return router;
};
