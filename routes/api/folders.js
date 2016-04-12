var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// Folder Routes
module.exports = function (app, db, Users) {
	var router = express.Router(),
        Folders = db.collection("folders");

    router.post('/', function(req, res) {
        var online = req.app.get('online'),
            username = online[req.headers['x-access-token']],
            userFolders = db.collection(username+".folders");

		userFolders.insert({name: req.body.name, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting folder ", err);
            }
        });
		res.json({success: true, message: "Folder Created"});
	});

	router.get('/:folder', function(req, res) {
        var online = req.app.get('online'),
            username = online[req.headers['x-access-token']],
            userFolders = db.collection(username+".folders");

		userFolders.findOne({name: req.params.folder}, function(err, found) {
            if (err) {
                return console.log("Error getting folder: ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:folder', function(req, res) {
        var online = req.app.get('online'),
            username = online[req.headers['x-access-token']],
            userFolders = db.collection(username+".folders");

		userFolders.find({name: req.params.folder}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for folder: ", err);
            }
            res.json(found);
        });
	});

	router.delete('/:folder', function(req, res) {
        var online = req.app.get('online'),
            username = online[req.headers['x-access-token']],
            userFolders = db.collection(username+".folders");

		userFolders.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing folder: ', err);
            }
            res.json({success: true, message: "Folder Deleted"});
        });
	});

    return router;
};
