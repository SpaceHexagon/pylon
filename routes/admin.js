var express = require('express');
var router = express.Router();

// Admin Routes
module.exports = function (app, db) { 
	router.get('/', function(req, res, next) {
		res.send('');
	});

	return router;
};
