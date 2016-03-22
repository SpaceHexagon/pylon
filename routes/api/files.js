var async = require('async'),
    express = require('express'),
    ObjectID = require('mongodb').ObjectID,
    multer  = require('multer'),
    Grid = require('gridfs-stream'),
	pauseStream = require('pause-stream'),
	Busboy = require('busboy'),
    shortId = require('shortid'),
    path = require('path');

// File Routes
module.exports = function (app, db, mongo, fs) {
	var router = express.Router(),
        Files = db.collection("files"),
        gridFiles = db.collection("fs.files"),
        gridChunks = db.collection("fs.chunks");

    Grid.mongo = mongo;

    var gfs = Grid(db),
		upload = multer({ dest: './tmp/'});

    router.use(upload.array('files', 16));

	router.post('/', function(req, res) {

        async.eachLimit(Object.keys(req.files), 16, function(file, callback) {
            var fileobj = req.files[file];
            console.log(gfs);
             try {
                var writeStream = gfs.createWriteStream({
                  "root": "fs",
                  "filename": fileobj.originalname
                });

                fs.createReadStream(fileobj.path).pipe(writeStream);

                writeStream.on('close',function() {
                  console.log('done');
                  callback();
                });

                writeStream.on('error',callback);
            } catch (e) {
                console.trace(e);
            }
          }, function(err) {
            if (err) {
              console.log(err);
              res.status(500).end();
            }
            res.status(200).end();
        });

   });

	router.post('/create', function (req, res) {

	});

    router.get('/:file', function (req, res) {
        gfs.files.find({filename: req.params.file}).toArray(function (err, files) {
			if (err) {
				res.json(err);
			}

			if (files.length > 0) {
				var mime = 'image/jpeg';
				res.set('Content-Type', mime);
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
            res.json(files);
        });
	});

	router.put('/', function(req, res) {
        res.json({success: true, message: "Put / Update method has been disabled for now."});
	});

	router.delete('/', function(req, res) {
        gfs.remove({_id: ObjectID(req.body.id)}, function (err) {
            if(err) {
                return console.log('Error removing file: ', err);
            }
            res.json({success: true, message: "File Deleted"});
        });
	});

  return router;
};
