var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// Share Routes
module.exports = function (app, db, Users) {
	var router = express.Router(),
        Shares = db.collection('shares');

	router.post('/', function(req, res) {
		Shares.insert({name: req.body.name, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting share ", err);
            }
        });
		res.json({success: true, message: "Geometry Created"});
	});

	router.get('/shares/:share', function(req, res) {
		Shares.findOne({name: req.params.share}, function(err, found) {
            if (err) {
                return console.log("Error getting share ", err);
            }
            res.json(found);
        });
	});

	router.get('/shares/search/:share', function(req, res) {
		Shares.find({name: req.params.share}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for share: ", err);
            }
            res.json(found);
        });
	});

	router.put('/shares/:share', function(req, res) {
		Shares.update({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating share ", err);
            }
            res.json({success: true, message: "Geometry Updated"});
        });
	});

	router.delete('/shares/:share', function(req, res) {
		Shares.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing share: ', err);
            }
            res.json({success: true, message: "Geometry Deleted"});
        });
	});
  return router;
};
