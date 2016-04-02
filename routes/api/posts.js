var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// post Routes
module.exports = function (app, db, Users) {
	var router = express.Router(),
        posts = db.collection('posts');

	router.post('/', function(req, res) {
		posts.insert({title: req.body.title, body: req.body.body}, function(err){
            if (err) {
                return console.log("Error inserting post ", err);
            }
        });
        res.json({success: true, post: "Post Created"});
	});

	router.post('/send', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.get('/:id', function(req, res) {
		posts.findOne({_id: ObjectID(req.params.id)}, function(err, found) {
            if (err) {
                return console.log("Error getting post ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:post', function(req, res) {
		posts.find({title: req.params.post}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for post: ", err);
            }
            res.json(found);
        });
	});

	router.put('/', function(req, res) {
		posts.update({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating post ", err);
            }
            res.json({success: true, post: "Post Updated"});
        });
	});

	router.delete('/', function(req, res) {
		posts.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing post: ', err);
            }
            res.json({success: true, post: "Post Deleted"});
        });
	});

    return router;
};
