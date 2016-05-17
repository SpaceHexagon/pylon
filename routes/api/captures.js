var express = require('express'),
		mongo = require('mongodb'),
    ObjectID = require('mongodb').ObjectID,
		Busboy = require('busboy'),
    shortId = require('shortid'),
    path = require('path'),
		gfs = null;

// Media-Capture Routes
module.exports = function (app, extDB, mongo2, fs, Users) {
	var router = express.Router(),
		upload = null,
        db = new mongo.Db('pylon', new mongo.Server("127.0.0.1", 27017));

	db.open(function (err) {
        if (err) return handleError(err);
        //gfs = Grid(db, mongo);
	});

    router.post('/', function (req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']],
			userCaptures = db.collection(username+".captures"),
			busboy = new Busboy({ headers: req.headers });

		busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
			console.log("fieldname", fieldname);
			if (true) { //fieldname == "files") {
				userCaptures.insert({filename: fieldname,
								 sequence_name: fieldname,
								 frame: 1,
								 dataURL: val});
			}
		});

		busboy.on('finish', function() {
		  console.log('Done parsing form!');
		  res.writeHead(303, { Connection: 'close', Location: '/' });
		  res.end();
		});

		req.pipe(busboy);

	});

	router.get('/all', function (req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			userCaptures = db.collection(username+".captures");
        userCaptures.find({}).toArray(function (err, captures) {
			if (err) {
				res.json(err);
			}
			res.json(captures);
		});
	});

    router.get('/:cap', function (req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			userCaptures = db.collection(username+".captures");

        userCaptures.find({filename: req.params.cap}).toArray(function (err, captures) {
			if (err) {
				res.json(err);
			}

			if (captures.length > 0) {
				res.set('Content-Type', 'application/json');
				res.json({dataURL: captures[0].dataURL});
			} else {
				return res.status(404).send(' ');
			}
		});
	});

	router.get('/frames/:cap/:frame', function (req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			userCaptures = db.collection(username+".captures");

        userCaptures.find({sequence_name: req.params.cap, frame: {$gt: req.params.frame}}).toArray(function (err, captures) {
			if (err) {
				res.json(err);
			}
			if (captures.length > 0) {
				res.set('Content-Type', 'application/json');
				res.json(captures);
			} else {
				return res.status(404).send(' ');
			}
		});
	});

    router.delete('/:cap', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']],
			userCaptures = db.collection(username+".captures"),
            fileId = req.params.cap;

        userCaptures.remove({filename: req.params.cap}, function (err) {
			if(err) {
				return console.log('Error removing file: ', err);
			}
            res.json({success: true, message: "Media-Capture Deleted"});
        });
	});

  return router;
};
