var express = require('express'),
	jwt    = require('jsonwebtoken'),
	passwordHash = require('password-hash');

var User = require('../app/user.js'),
	Doc = require('../app/doc.js'),
	Model = require('../app/model.js'),
	Share = require('../app/share.js'),
	Message = require('../app/message.js');
	Geometry = require('../app/geometry.js');

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

	router.get('/search/:terms', function(req, res) { // search everything
		var results = {"searching for": req.params.terms};
		res.json(results);
	});

	router.post('/files/:file', function(req, res) {  // files
		var results = {"uploading file": ""};
		res.json(results);
	});

	router.post('/files/create/', function(req, res) {
		var results = {"creating file": req.body.file};
		res.json(results);
	});

	router.get('/files/:file', function(req, res) {
		var results = {requesting: req.params.file};
		res.json(results);
	});

	router.get('/files/search/:file', function(req, res) {
		var results = {"searching for": req.params.file};
		res.json(results);
	});

	router.put('/files/:file', function(req, res) {
		var results = {"updating": req.params.file};
		res.json(results);
	});

	router.delete('/files/:file', function(req, res) {
		var results = {"deleting": req.params.file};
		res.json(results);
	});

	router.post('/shares/create/', function(req, res) {  // shares
		var results = {"creating share": req.body.share};
		res.json(results);
	});

	router.get('/shares/:share', function(req, res) {
		var results = {"loading share": req.params.share};
		res.json(results);
	});

	router.get('/shares/search/:share', function(req, res) {
		var results = {"seaching shares": req.params.share};
		res.json(results);
	});

	router.put('/shares/:share', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.delete('/shares/:share', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.post('/messages/create', function(req, res) { // messages
		var results = {"creating message": req.body.message};
		res.json(results);
	});

	router.post('/messages/send', function(req, res) {
		var results = {};
		res.json(results);
	});

	router.get('/messages/:message', function(req, res) {
		var results = {"loading message": req.params.message};
		res.json(results);
	});

	router.get('/messages/search/:message', function(req, res) {
		var results = {"searching for message": req.params.message};
		res.json(results);
	});

	router.put('/messages/:message', function(req, res) {
		var results = {"updating message": req.params.message};
		res.json(results);
	});

	router.delete('/messages/:message', function(req, res) {
		var results = {"deleting message": req.params.message};
		res.json(results);
	});

	router.post('/geometries/create', function(req, res) { // geometries
		var results = {"creating geometry": req.body.geometry};
		res.json(results);
	});

	router.get('/geometries/:geometry', function(req, res) {
		var results = {"loading geometry": req.params.geometry};
		res.json(results);
	});

	router.get('/geometries/search/:geometry', function(req, res) {
		var results = {"searching for geometry": req.params.geometry};
		res.json(results);
	});

	router.put('/geometries/:geometry', function(req, res) {
		var results = {"updating geometry": req.params.geometry};
		res.json(results);
	});

	router.delete('/geometries/:geometry', function(req, res) {
		var results = {"deleting geometry": req.params.geometry};
		res.json(results);
	});

	return router;
};

