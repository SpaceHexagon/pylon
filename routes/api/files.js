var express = require('express'),
		mongo = require('mongodb'),
		ObjectID = require('mongodb').ObjectID,
		Busboy = require('busboy'),
		Grid = require('gridfs-stream'),
		shortId = require('shortid'),
		path = require('path'),
		gfs = null;

// File Routes
module.exports = function (app, extDB, mongo2, fs, Users) {
	var router = express.Router(),
		upload = null,
		db = new mongo.Db('pylon', new mongo.Server("127.0.0.1", 27017));

	db.open(function (err) { // make sure the db instance is open before passing into `Grid`
		if (err) return handleError(err);
		gfs = Grid(db, mongo);
		// all set!
	});

	router.post('/', function (req, res) {
		var online = req.app.get('online'),
			busboy = new Busboy({
				headers: req.headers
			}),
			username = online[req.headers['x-access-token']];

		busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
			console.log('got file', filename, mimetype, encoding);
			var fileId = new mongo.ObjectId(),
				writeStream = gfs.createWriteStream({
					_id: fileId,
					filename: filename,
					root: username,
					mode: 'w',
					content_type: mimetype,
					metadata: {
						public: false,
						modified: Date.now(),
						username: username
					}
				});

			file.pipe(writeStream);
		}).on('finish', function () {
			res.status(200).send(' ');
		});
		req.pipe(busboy);
	});

	router.post('/create', function (req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']];
	});


	router.get('/all', function (req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			userFiles = db.collection(username + ".files");

		userFiles.find({}).toArray(function (err, files) {
			if (err) {
				res.json(err);
			}
			res.json(files);
		});
	});

	router.get('/:file', function (req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			userFiles = db.collection(username + ".files");

		userFiles.find({
			filename: req.params.file
		}).toArray(function (err, files) {
			if (err) {
				res.json(err);
			}

			if (files.length > 0) {
				res.set('Content-Type', files[0].contentType);
				var read_stream = gfs.createReadStream({
					root: username,
					filename: req.params.file
				});
				read_stream.pipe(res);
			} else {
				return res.status(404).send(' ');
			}
		});
	});

	router.get('/search/:file', function (req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			userFiles = db.collection(username + ".files"),
			results = [];

		userFiles.find({
			filename: {
					$regex: new RegExp(".*" + req.params.file + ".*", 'i')
				}
			},  {
				limit: 108
			}).toArray(function (err, files) {
				if (err) {
					return console.log("Error searching for files ", err);
				}
				res.json(files);
			});
	});

	router.put('/:file', function (req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token'] || req.query.token],
			userFiles = db.collection(username + ".files");

        userFiles.update({_id: req.params.file}, {$set: {metadata: req.body.metadata}}, function(err) {
            if (err) {
                return console.log("Error updating file", err);
            }
            res.json({success: true, message: "File Updated"});
        });
	});

	router.delete('/:file', function (req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']],
			userFiles = db.collection(username + ".files"),
			userChunks = db.collection(username + ".chunks"),
			userThumbs = db.collection(username + ".thumbs"),
			fileId = req.params.file;

		userFiles.find({
			_id: ObjectID(fileId)
		}).toArray(function (err, files) {
			if (err) {
				res.json(err);
			}
			if (files.length > 0) {
				var filename = files[0].filename;
				userFiles.remove({
					_id: ObjectID(fileId)
				}, function (err) {
					if (err) {
						return console.log('Error removing file: ', err);
					}
					userChunks.remove({
						files_id: ObjectID(fileId)
					}, function (err) {
						if (err) {
							return console.log('Error removing chunks: ', err);
						}
						if (/(\.jpg|\.jpeg|\.png)/.test(filename)) {
							userThumbs.remove({
								filename: filename
							}, function (err) {
								if (err) {
									return console.log('Error removing file: ', err);
								}
							});
						}

					});
					res.json({
						success: true,
						message: "File Deleted"
					});
				});

			} else {
				return res.status(404).send(' ');
			}
		});
	});

	return router;
};
