var express = require('express'),
    mongo = require('mongodb'),
    ObjectId = mongo.ObjectID,
    Grid = require('gridfs-stream'),
    fs = require('fs'),
	jwt = require('jsonwebtoken'),
	passwordHash = require('password-hash');

var User = require('../app/user.js'),
	Doc = require('../app/doc.js'),
	Group = require('../app/group.js'),
	Share = require('../app/share.js'),
	Message = require('../app/message.js'),
	Geometry = require('../app/geometry.js');

module.exports = function (app, db) {
	var router = express.Router(),
		Users = db.collection('users'),
        Groups = db.collection('groups'),
		Pages = db.collection('pages'),
        userRouter = require("./api/users.js")(app, db, Users),
        groupRouter = require("./api/groups.js")(app, db, Users),
        postsRouter = require("./api/posts.js")(app, db, Users),
		pageRouter = require("./api/pages.js")(app, db, Users),
        commentsRouter = require("./api/comments.js")(app, db, Users),
        fileRouter = require("./api/files.js")(app, db, mongo, fs, Users),
        thumbRouter = require("./api/thumbs.js")(app, db, mongo, fs, Users),
        folderRouter = require("./api/folders.js")(app, db, mongo, fs, Users),
		externalRouter = require("./api/externals.js")(app, db, Users),
		structureRouter = require("./api/structures.js")(app, db, Users),
		buildingRouter = require("./api/buildings.js")(app, db, Users),
		cellRouter = require("./api/cells.js")(app, db, Users),
        shareRouter = require("./api/shares.js")(app, db, Users, Pages),
        messageRouter = require("./api/messages.js")(app, db, Users),
        geometryRouter = require("./api/geometries.js")(app, db, Users);

    Users.ensureIndex([['username', 1]], true, function(err, replies){});
    Groups.ensureIndex([['name', 1]], true, function(err, replies){});
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

				var online = app.get('online');
				online[token] = req.body.username;
				console.log(online[token]);

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
					token = null,
					username = req.body.username;

				newUser.name = newUser.username = req.body.username;
				newUser.password = passwordHash.generate(req.body.password);
				token = jwt.sign({ name: newUser.name, username: newUser.username }, app.get('superSecret'), {  // create a token
				  expiresInMinutes: 1440 // expires in 24 hours
				});

				Users.insert(newUser, function(err, insertResult) {
					if (err) throw err;
					if (insertResult) console.log('Added!');

					var online = app.get('online'),
                        userFolders = null;
					online[token] = username;
					console.log(online[token]);
					db.createCollection(username + ".cells");
					db.createCollection(username + ".buildings");
					db.createCollection(username + ".captures");
                    db.createCollection(username + ".folders");
					db.createCollection(username + ".thumbs");
                    userFolders = db.collection(username + ".folders");
                    userFolders.insert({name: "home", public: false});

					Users.findOne({username: username}, function(err, foundNewUser) { // work around to get ObjectId of newly created user
						if (err) throw err;
						if (foundNewUser != null) {
							Pages.insert({user_id: ObjectId(foundNewUser._id), title: username, content: username+"'s Pylon"});

							res.json({ // return the information including token as JSON
							  success: true,
							  message: 'Enjoy your token!',
							  token: token
							});
						}
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

    router.use('/users', userRouter);
    router.use('/groups', groupRouter);
    router.use('/posts', postsRouter);
	router.use('/pages', pageRouter);
    router.use('/comments', commentsRouter);
    router.use('/files', fileRouter);
    router.use('/thumbs', thumbRouter);
    router.use('/folders', folderRouter);
	router.use('/externals', externalRouter);
	router.use('/structures', structureRouter);
	router.use('/buildings', buildingRouter);
	router.use('/cells', cellRouter);
    router.use('/shares', shareRouter);
    router.use('/messages', messageRouter);
    router.use('/geometries', geometryRouter);

	return router;
};

//test
