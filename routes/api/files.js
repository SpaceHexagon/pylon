var express = require('express'),
    ObjectID = require('mongodb').ObjectID,
    shortId = require('shortid');

// File Routes
module.exports = function (app, db, fs, gfs) {
	var router = express.Router(),
        Files = db.collection("files"),
        gridFiles = db.collection("fs"),
        gridChunks = db.collection("chunks");
	router.post('/', function(req, res) {
        var is = null,
            os = null,
            extension = req.files.file.path.split(/[. ]+/).pop(); //get the extenstion of the file
          is = fs.createReadStream(req.files.file.path);
          os = gridfs.createWriteStream({ filename: shortId.generate()+'.'+extension });
          is.pipe(os);
          os.on('close', function (file) {
            fs.unlink(req.files.file.path, function() { //delete file from temp folder
              res.json(200, file);
            });
          });
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
        var readstream = gridfs.createReadStream({
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
