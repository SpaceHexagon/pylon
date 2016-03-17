var express = require('express'),
    ObjectID = require('mongodb').ObjectID,
	jwt    = require('jsonwebtoken'),
	passwordHash = require('password-hash');

var User = require('../app/user.js'),
	Doc = require('../app/doc.js'),
	Group = require('../app/group.js'),
	Share = require('../app/share.js'),
	Message = require('../app/message.js');
	Geometry = require('../app/geometry.js');

module.exports = function (app, db) {
	var router = express.Router(),
		Users = db.collection('users'),
        Groups = db.collection('groups'),
		Shares = db.collection('shares'),
		Messages = db.collection('messages'),
		Notifications = db.collection('notifications'),
        Geometries = db.collection("geometries"),
		Documents = db.collection('documents');

    Users.ensureIndex([['username', 1]], true, function(err, replies){});
	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	router.post('/authenticate', function(req, res) {
	  // find the user
		var enteredPassword = req.body.password;

		Users.findOne({username: req.body.username}, function(err, result) {
			if (err || result == null) {
			  res.json({ success: false, message: 'Authentication failed. User not found.' });
			} else {
			  // check if password matches
			  if (!passwordHash.verify(enteredPassword, result.password)) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			  } else {
				// if user is found and password is right
				var token = jwt.sign({ name: result.name, username: result.username }, app.get('superSecret'), {  // create a token
				  expiresInMinutes: 1440 // expires in 24 hours
				});

				res.json({ // return the information including token as JSON
				  success: true,
				  message: 'Enjoy your token!',
				  token: token
				});
			  }
			}
		});
	});

	router.post('/signup', function(req, res) {
	  // find the user
		Users.findOne({username: req.body.username}, function(err, result) {
			if (err || result == null) {
				var newUser = User(),
					token = null;
				newUser.name = newUser.username = req.body.username;
				newUser.password = passwordHash.generate(req.body.password);
				token = jwt.sign({ name: newUser.name, username: newUser.username }, app.get('superSecret'), {  // create a token
				  expiresInMinutes: 1440 // expires in 24 hours
				});

				Users.insert(newUser, function(err, result) {
					if (err) throw err;
					if (result) console.log('Added!');
					res.json({ // return the information including token as JSON
					  success: true,
					  message: 'Enjoy your token!',
					  token: token
					});
				});

			} else {
				res.json({ success: false, message: 'Signup Failed. A User already exists with that name.' });
			}
		});
	});

	router.use(function(req, res, next) { // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];
	  if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) { // verifies secret and checks exp
		  if (err) {
			return res.json({ success: false, message: 'Failed to authenticate token.' });
		  } else {
			// if everything is good, save to request for use in other routes
			req.decoded = decoded;
			next();
		  }
		});
	  } else {  // if there is no token
		return res.status(403).send({ // return an error
			success: false,
			message: 'No token provided.'
		});
	  }
	});

	router.get('/', function(req, res) {
	  res.json({ message: 'Welcome to the coolest API on earth!' });
	});

	router.get('/search/:terms', function(req, res) { // search everything
		var results = {"searching for": req.params.terms};
		res.json(results);
	});


    // File Routes
	router.post('/files', function(req, res) {
		var results = {"uploading file": ""};
		res.json(results);
	});

	router.post('/files/create/', function(req, res) {
		Files.insert({name: req.body.name, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting file ", err);
            }
        });
		res.json({success: true, message: "File Created"});
	});

	router.get('/files/:file', function(req, res) {
		Files.findOne({name: req.params.file}, function(err, found) {
            if (err) {
                return console.log("Error getting file ", err);
            }
            res.json(found);
        });
	});

	router.get('/files/search/:file', function(req, res) {
		Files.find({name: req.params.file}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for file: ", err);
            }
            res.json(found);
        });
	});

	router.put('/files/:file', function(req, res) {
		Files.update({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating file ", err);
            }
            res.json({success: true, message: "File Updated"});
        });
	});

	router.delete('/files/:file', function(req, res) {
		Files.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing file: ', err);
            }
            res.json({success: true, message: "File Deleted"});
        });
	});


    // Share Routes
	router.post('/shares', function(req, res) {
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


    // Group Routes
    router.post('/groups', function(req, res) {
		Groups.insert({name: req.body.name, members: req.body.members, admin: false}, function(err){
            if (err) {
                return console.log("error inserting group ", err);
            }
        });
        res.json({success: true, group: "Group Created"});
	});

	router.get('/groups/:group', function(req, res) {
		Groups.findOne({name: req.params.group}, function(err, found) {
            if (err) {
                return console.log("Error getting group: ", err);
            }
            res.json(found);
        });
	});

	router.get('/groups/search/:group', function(req, res) {
		Groups.find({name: req.params.group}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for group: ", err);
            }
            res.json(found);
        });
	});

	router.put('/groups/:group', function(req, res) {
		Groups.update({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating group ", err);
            }
            res.json({success: true, group: "Group Updated"});
        });
	});

	router.delete('/groups/:group', function(req, res) {
		Groups.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing group: ', err);
            }
            res.json({success: true, group: "Group Deleted"});
        });
	});


    // Message Routes
	router.post('/messages/create', function(req, res) {
		Messages.insert({title: req.body.title, body: req.body.body}, function(err){
            if (err) {
                return console.log("Error inserting message ", err);
            }
        });
        res.json({success: true, message: "Geometry Created"});
	});

	router.post('/messages/send', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.get('/messages/:message', function(req, res) {
		Messages.findOne({name: req.params.message}, function(err, found) {
            if (err) {
                return console.log("Error getting message ", err);
            }
            res.json(found);
        });
	});

	router.get('/messages/search/:message', function(req, res) {
		Messages.find({name: req.params.message}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for message: ", err);
            }
            res.json(found);
        });
	});

	router.put('/messages/:message', function(req, res) {
		Messages.update({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating message ", err);
            }
            res.json({success: true, message: "Geometry Updated"});
        });
	});

	router.delete('/messages/:message', function(req, res) {
		Messages.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing message: ', err);
            }
            res.json({success: true, message: "Geometry Deleted"});
        });
	});


    // Geometry Routes
	router.post('/geometries', function(req, res) {
		Geometries.insert({name: req.body.name, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting geometry ", err);
            }
        });
        res.json({success: true, message: "Geometry Created"});
	});

	router.get('/geometries/:geometry', function(req, res) {
        Geometries.findOne({name: req.params.geometry}, function(err, found) {
            if (err) {
                return console.log("Error getting geometry ", err);
            }
            res.json(found);
        });
	});

	router.get('/geometries/search/:geometry', function(req, res) {
        Geometries.find({name: req.params.geometry}).toArray(function (err, found) {
            if (err) {
                return console.log("Error searching for geometry: ", err);
            }
            res.json(found);
        });
	});

	router.put('/geometries', function(req, res) {
        Geometries.update({_id: ObjectID(req.body.id)}, {$set: {name: req.body.name, data: req.body.data}}, function(err) {
            if (err) {
                return console.log("Error updating geometry ", err);
            }
            res.json({success: true, message: "Geometry Updated"});
        });
	});

	router.delete('/geometries', function(req, res) {
        Geometries.remove({_id: ObjectID(req.body.id)}, function(err) {
            if(err) {
                return console.log('Error removing geometry: ', err);
            }
            res.json({success: true, message: "Geometry Deleted"});
        });
	});

	return router;
};

//test
