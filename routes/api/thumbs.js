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
        gfs = Grid(db, mongo);
	});

    router.post('/:fileid', function (req, res) {
		var online = req.app.get('online'),
            busboy = new Busboy({ headers : req.headers }),
			username = online[req.headers['x-access-token']];

		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			console.log('got file', filename, mimetype, encoding);
			var fileId = new mongo.ObjectId(),
				writeStream = gfs.createWriteStream({
				_id: fileId,
				filename:filename,
				root: username+".thumbs",
				mode:'w',
				content_type:mimetype,
				metadata: {
					public: false,
					modified: Date.now(),
					username: username
				}
			});

			file.pipe(writeStream);
		}).on('finish', function() {
			res.status(200).send(' ');
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

        userThumbs.find({file_id: req.params.thumb}).toArray(function (err, thumbs) {
			if (err) {
				res.json(err);
			}

			if (thumbs.length > 0) {
				res.set('Content-Type', thumbs[0].contentType);
				var read_stream = gfs.createReadStream({
					root: username,
					thumbname: req.params.thumb
				});
				read_stream.pipe(res);
			} else {
				return res.status(404).send(' ');
			}
		});
	});

	router.delete('/:thumb', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']],
			userThumbs = db.collection(username+".thumbs"),
            thumbId = req.params.thumb;

        userThumbs.remove({_id: ObjectID(thumbId)}, function (err) {
			if(err) {
				return console.log('Error removing thumb: ', err);
			}
            res.json({success: true, message: "Thumbnail Deleted"});
        });
	});

    router.delete('/:thumb', function(req, res) {
		var online = req.app.get('online'),
			username = online[req.headers['x-access-token']],
			userFiles = db.collection(username+".thumbs.files"),
			userChunks = db.collection(username+".thumbs.chunks"),
            fileId = req.params.thumb;

        userFiles.remove({_id: ObjectID(fileId)}, function (err) {
			if(err) {
				return console.log('Error removing file: ', err);
			}
            userChunks.remove({files_id: ObjectID(fileId)}, function (err){
                if(err) {
				    return console.log('Error removing chunks: ', err);
                }
            });
            res.json({success: true, message: "File Deleted"});
        });
	});

  return router;
};
