var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// Share Routes
module.exports = function (app, db, Users) {
	var router = express.Router(),
        Pages = db.collection('pages');

	router.post('/', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']];

		Pages.insert({name: req.body.name, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting page ", err);
            }
        });
		res.json({success: true, message: "Page Created"});
	});

	router.get('/:page', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']];

		Pages.findOne({name: req.params.page}, function(err, found) {
            if (err) {
                return console.log("Error getting page ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:page', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']];

		Pages.find({name: req.params.page}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for page: ", err);
            }
            res.json(found);
        });
	});

	router.put('/:page', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']];
		Pages.update({title: req.params.page}, {$set: {"content": req.body.content}}, function(err) {
            if (err) {
                return console.log("Error updating page ", err);
            }
            res.json({success: true, message: "Page Updated"});
        });
	});

	router.delete('/:page', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']];

		Pages.remove({_id: ObjectID(req.params.page)}, function(err) {
            if(err) {
                return console.log('Error removing page: ', err);
            }
            res.json({success: true, message: "Page Deleted"});
        });
	});
  return router;
};
