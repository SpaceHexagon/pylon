var express = require('express'),
	mongo = require('mongodb'),
    ObjectID = require('mongodb').ObjectID,
	Busboy = require('busboy'),
    Grid = require('gridfs-stream'),
    shortId = require('shortid'),
    path = require('path'),
	gfs = null;

// Thumbnail Routes
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
			userThumbs = db.collection(username+".thumbs"),
			busboy = new Busboy({ headers: req.headers });

		busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
			console.log("fieldname", fieldname);
			userThumbs.insert({filename: fieldname, dataURL: val});
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
			userThumbs = db.collection(username+".thumbs");
        userThumbs.find({}).toArray(function (err, thumbs) {
			if (err) {
				res.json(err);
			}
			res.json(thumbs);
		});
	});

    router.get('/:thumb', function (req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			userThumbs = db.collection(username+".thumbs");

        userThumbs.find({filename: req.params.thumb}).toArray(function (err, thumbs) {
			if (err) {
				res.json(err);
			}

			if (thumbs.length > 0) {
				res.set('Content-Type', 'application/json');
				res.json({dataURL: thumbs[0].dataURL});
			} else {
				return res.status(404).send(' ');
			}
		});
	});

    router.delete('/:thumb', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']],
			userFiles = db.collection(username+".thumbs"),
            fileId = req.params.thumb;

        userFiles.remove({_id: ObjectID(fileId)}, function (err) {
			if(err) {
				return console.log('Error removing file: ', err);
			}
            res.json({success: true, message: "Thumbnail Deleted"});
        });
	});

  return router;
};
