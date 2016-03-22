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
        gridFiles = db.collection("fs.files"),
        gridChunks = db.collection("fs.chunks");
		Grid.mongo = mongo;
    var gfs = Grid(db),
		upload = multer({ dest: './tmp/'});

    //router.use(multer({ dest: './tmp/'}).array('files', 12));

	router.post('/', upload.single('file'), function(req, res) {
//		console.log(JSON.stringify(req));
//		var writestream = gfs.createWriteStream({
//			filename: req.files.file.name,
//			mode:'w',
//			content_type:req.files.file.mimetype,
//			metadata:req.body,
//		  });
//		fs.createReadStream(req.files.file.path).pipe(writestream);
//
//		writestream.on('close', function (file) {
//			res.send("Success!");
//			fs.unlink(req.files.file.path, function (err) {
//			  if (err) console.error("Error: " + err);
//			  console.log('successfully deleted : '+ req.files.file.path );
//			});
//		});
		var dirname = path.dirname(__dirname);
		 var filename = req.files.file.name;
		 var path = req.files.file.path;
		 var type = req.files.file.mimetype;
		 var read_stream =  fs.createReadStream(dirname + '/' + path);
		 var writestream = gfs.createWriteStream({
			filename: filename
		});
		writestream.on('finish', function() {
        	res.writeHead(200);
	        res.end('done');
    	});
		read_stream.pipe(writestream);
   });

	router.post('/create', function (req, res) {
		Files.insert({name: req.body.name, data: req.body.data}, function(err){
            if (err) {
                return console.log("Error inserting file: ", err);
            }
        });

		res.json({success: true, message: "File Created"});
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
