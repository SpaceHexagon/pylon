var express = require('express'),
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
        gridFiles = db.collection("fs"),
        gridChunks = db.collection("chunks");

    var gfs = Grid(db, mongo);

    router.use(multer({ dest: './uploads/'}).array('files', 12));

	router.post('/', function(req, res) {
		/*
        var dirname = path.dirname(__dirname),
             filename = req.files.file.name,
             path = req.files.file.path,
             type = req.files.file.mimetype,
             read_stream =  fs.createReadStream(dirname + '/' + path),
             writestream = gfs.createWriteStream({
                filename: filename
            });
        read_stream.pipe(writestream);
        res.send(204);
        */
        var tempfile    = req.files.filename.path;
        var origname    = req.files.filename.name;
        var writestream = gfs.createWriteStream({ filename: origname });
        // open a stream to the temporary file created by Express...
        fs.createReadStream(tempfile)
          .on('end', function() {
            res.send('OK');
          })
          .on('error', function() {
            res.send('ERR');
          })
          .pipe(writestream); // and pipe it to gfs

	});

	router.post('/create/', function(req, res) {
		Files.insert({name: req.body.name, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting file: ", err);
            }
        });

		res.json({success: true, message: "File Created"});
	});

    router.get('/:file', function(req, res) {
        var readstream = gfs.createReadStream({
            _id: req.params.file
        });
        req.on('error', function(err) {
            res.send(500, err);
        });
        readstream.on('error', function (err) {
            res.send(500, err);
        });

        readstream.pipe(res);
	});

	router.get('/search/:file', function(req, res) {
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
