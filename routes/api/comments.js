var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// Message Routes
module.exports = function (app, db, Users) {
	var router = express.Router(),
        Comments = db.collection('comments');

	router.post('/', function(req, res) {
		Comments.insert({user_id: null, title: req.body.title, body: req.body.body}, function(err){
            if (err) {
                return console.log("Error inserting comment ", err);
            }
        });
        res.json({success: true, comment: "Comment Created"});
	});

	router.post('/send', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.get('/:id', function(req, res) {
		Comments.findOne({_id: ObjectID(req.params.id)}, function(err, found) {
            if (err) {
                return console.log("Error getting comment ", err);
            }
            // res.status(404).json({"status": 404, "error": "Comment Not Found"});
            res.json(found);
        });
	});

	router.get('/search/:comment', function(req, res) {
		Comments.find({title: req.params.comment}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for comment: ", err);
            }
            res.json(found);
        });
	});

	router.put('/', function(req, res) {
		Comments.update({_id: ObjectID(req.body.id)}, {$set: {title: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating comment ", err);
            }
            res.json({success: true, comment: "Comment Updated"});
        });
	});

	router.delete('/', function(req, res) {
		Comments.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing comment: ', err);
            }
            res.json({success: true, comment: "Comment Deleted"});
        });
	});

    return router;
};
