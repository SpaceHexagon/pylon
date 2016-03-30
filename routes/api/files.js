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
		online = app.get('online'),
		upload = null;

	var db = new mongo.Db('pylon', new mongo.Server("127.0.0.1", 27017));

	db.open(function (err) { // make sure the db instance is open before passing into `Grid`
	  if (err) return handleError(err);
		gfs = Grid(db, mongo);
	  // all set!
	});


	router.post('/', function (req, res) {
		var busboy = new Busboy({ headers : req.headers }),
			fileId = new mongo.ObjectId();
		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			console.log('got file', filename, mimetype, encoding);
			var writeStream = gfs.createWriteStream({
				_id: fileId,
				filename:filename,
				mode:'w',
				content_type:mimetype,
				metadata: {
					ip: req.ip,
					modified: Date.now(),
					username: online[req.headers['x-access-token']]
				}
			});
			file.pipe(writeStream);
		}).on('finish', function() {
			res.writeHead(200, {'content-type':'text/html'});
		});
		req.pipe(busboy);
	});

	router.post('/create', function (req, res) {

	});

    router.get('/:file', function (req, res) {
        gfs.files.find({filename: req.params.file}).toArray(function (err, files) {
			if (err) {
				res.json(err);
			}

			if (files.length > 0) {
				res.set('Content-Type', files[0].contentType);
				var read_stream = gfs.createReadStream({filename: req.params.file});
				read_stream.pipe(res);
			} else {
				return res.status(404).send(' ');
			}
		});
	});

	router.get('/search/:file', function (req, res) {
        var results = [];
		gfs.files.find({ filename: req.params.file }).toArray(function (err, files) {
            if (err) {
                return console.log("Error updating file ", err);
            }
			if (files.length > 0) {
				res.set('Content-Type', files[0].contentType);
				var read_stream = gfs.createReadStream({filename: req.params.file});
				read_stream.pipe(res);
			} else {
				return res.status(404).send(' ');
			}
        });


	});

	router.put('/', function(req, res) {
        res.json({success: true, message: "Put / Update method has been disabled for now."});
	});

	router.delete('/:file', function(req, res) {
        gfs.remove({_id: ObjectID(req.params.file)}, function (err) {
            if(err) {
                return console.log('Error removing file: ', err);
            }
            res.json({success: true, message: "File Deleted"});
        });
	});

  return router;
};
