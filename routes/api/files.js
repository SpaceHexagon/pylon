var express = require('express'),
    ObjectID = require('mongodb').ObjectID,
    multer  = require('multer'),
    Grid = require('gridfs-stream'),
    shortId = require('shortid'),
    path = require('path'),
	gfs = null,
	storage = require('gridfs-storage-engine')({
    	database: 'pylon'
	});

// File Routes
module.exports = function (app, extDB, mongo, fs, Users) {
	var router = express.Router(),
		upload = multer({ storage: storage }),
		db = new mongo.Db('pylon', new mongo.Server("127.0.0.1", 27017));

	db.open(function (err) { // make sure the db instance is open before passing into `Grid`
	  if (err) return handleError(err);
	  gfs = Grid(db, mongo);
	  // all set!
	});

	router.post('/', upload.array('files', 16), function(req, res) {
		res.status(204); // everything is fine
		// look up the user maybe?
		// set metadata?

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
				res.json('File Not Found');
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
				res.json('File Not Found');
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
