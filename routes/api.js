var express = require('express'),
	jwt    = require('jsonwebtoken'),
	passwordHash = require('password-hash');

var User = require('../app/user.js'),
	Doc = require('../app/doc.js'),
	Model = require('../app/model.js'),
	Share = require('../app/share.js'),
	Message = require('../app/message.js');

module.exports = function (app, db) {
	var router = express.Router(),
		Users = Users = db.collection('users'),
		Shares = db.collection('shares'),
		Messages = db.collection('messages'),
		Notifications = db.collection('notifications'),
		Documents = db.collection('documents');
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

	router.get('/list', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.get('/search', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.get('/upload', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.get('/update', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.get('/delete', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.get('/share', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.get('/message', function(req, res) {
		var results = {};
		res.json(results);
	});

	return router;
};

