var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// Group Routes
module.exports = function (app, db) {
	var router = express.Router(),
        Group = require('../../app/group.js'),
        Groups = db.collection('groups');

    router.post('/', function(req, res) {
		Groups.insert({name: req.body.name, members: req.body.members, admin: false}, function(err){
            if (err) {
                return console.log("error inserting group ", err);
            }
        });
        res.json({success: true, group: "Group Created"});
	});

	router.get('/:group', function(req, res) {
		Groups.findOne({name: req.params.group}, function(err, found) {
            if (err) {
                return console.log("Error getting group: ", err);
            }
            res.json(found);
        });
	});

	router.get('/search/:group', function(req, res) {
		Groups.find({name: req.params.group}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for group: ", err);
            }
            res.json(found);
        });
	});

	router.put('/:group', function(req, res) {
		Groups.update({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating group ", err);
            }
            res.json({success: true, group: "Group Updated"});
        });
	});

	router.delete('/:group', function(req, res) {
		Groups.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing group: ', err);
            }
            res.json({success: true, group: "Group Deleted"});
        });
	});

    return router;
};
