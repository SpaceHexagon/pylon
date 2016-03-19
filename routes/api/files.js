var express = require('express'),
    ObjectID = require('mongodb').ObjectID,
	pauseStream = require('pause-stream'),
	Busboy = require('busboy'),
    shortId = require('shortid'),
    path = require('path');

// File Routes
module.exports = function (app, db, fs, gfs) {
	var router = express.Router(),
        Files = db.collection("files"),
        gridFiles = db.collection("fs"),
        gridChunks = db.collection("chunks");
	router.post('/', function(req, res) {
		// Create an Busyboy instance passing the HTTP Request headers.
		var busboy = new Busboy({ headers: req.headers }),
			cntProcessingFiles = 0;
		// Listen for event when Busboy finds a file to stream.

		busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
			// We are streaming! Handle chunks
			var pStream = pauseStream(); // use pause stream to have time to open the GridStore
    		file.pipe(pStream.pause());

			console.log('POST ' + req.originalUrl + ' File: '+ filename + ' Field: ' + fieldname);
    		cntProcessingFiles++;

			new GridStore(db, null, filename , 'w', {content_type:contentType}).open(function(err, gridFile) {
				if(err) console.log(err);

			  	gridFile.on('close', function() {
					gridFile.close(function(err, data) {
						cntProcessingFiles--;
						// do something with the gridfile
				  	});
				});

			  	pStream.pipe(gridFile);
			  	pStream.resume();
			});

			file.on('data', function (data) {
				// Here we can act on the data chunks streamed.
			});
			// Completed streaming the file.
			file.on('end', function () {
				console.log('Finished with ' + fieldname);
			});
		});
		// Listen for event when Busboy finds a non-file field.
		busboy.on('field', function (fieldname, val) {
			// Do something with non-file field.
		});
		// Listen for event when Busboy is finished parsing the form.
		busboy.on('finish', function () {
			res.statusCode = 200;
			res.end();
		});
		// Pipe the HTTP Request into Busboy.
		req.pipe(busboy);
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
