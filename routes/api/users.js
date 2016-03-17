var express = require('express'),
    ObjectID = require('mongodb').ObjectID;

// User routing...
module.exports = function (app, db) {
	var router = express.Router(),
        User = require('../../app/user.js'),
        Users =  db.collection('users');


    return router;
};
