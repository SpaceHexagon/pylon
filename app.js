var express = require('express'),
	http = require('http').Server(express),
    io = require('socket.io')(http),
	https = require('https'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
    shortId = require('shortid'),
	Grid = require('gridfs-stream');

var config = require('./app/config.js'),
    db = require('mongoskin').db('mongodb://localhost:27017/pylon'),
	gfs = null,
	mongo = require('mongodb'),
	gridDB = new mongo.Db('pylon', new mongo.Server("127.0.0.1", 27017)),
    ObjectID = mongo.ObjectID,
    app = express(),
    secureApp = https.createServer(config, app),
    secureIO = null,
	online = [];

var routes = require('./routes/index'),
	groupRoutes = require('./routes/groups'),
	shareRoutes = require('./routes/shares'),
	appRoutes = require('./routes/apps'),
	apiRoutes = require('./routes/api')(app, db),
	adminRoutes = require('./routes/admin');

var User = require('./app/user.js'),
	Group = require('./app/group.js'),
	Doc = require('./app/doc.js'),
	Share = require('./app/share.js'),
	Message = require('./app/message.js');

var Users = db.collection('users'),
    Groups = db.collection('groups'),
	Shares = db.collection('shares'),
	Pages = db.collection('pages'),
	Messages = db.collection('messages'),
	Notifications = db.collection('notifications'),
	Documents = db.collection('documents');

gridDB.open(function (err) { // make sure the db instance is open before passing into `Grid`
	if (err) return handleError(err);
	gfs = Grid(gridDB, mongo);
});

app.set('online', online);
app.set('superSecret', config.secret);
app.set('json spaces', 2);
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(busboy()); // might want to move this above other wares
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);
app.use('/apps', appRoutes);
app.use('/groups', groupRoutes);
app.use('/shares', shareRoutes);
app.use('/admin', adminRoutes);

app.post("/oauth2callback", function(req, res) {
	res.send("OAuth2 Callback... ");
});

app.get('/:username/:file', function (req, res) {
		var online = req.app.get('online'),
			username = req.params.username,
			userFiles = db.collection(username+".files");

        userFiles.find({filename: req.params.file}).toArray(function (err, files) {
			if (err) {
				res.json(err);
			}

			if (files.length > 0) {
				if (files[0].metadata.public == true) {
					res.set('Content-Type', files[0].contentType);
					var read_stream = gfs.createReadStream({
						root: username,
						filename: req.params.file
					});
					read_stream.pipe(res);
				} else {
					res.status(403).send("Forbidden");
				}

			} else {
				return res.status(404).send(' ');
			}
		});
	});

	app.get('/:username', function (req, res, next) {  // user homepage / portals

		if (req.url.substr(-1) == '/' && req.url.length > 1) {
			res.redirect(301, req.url.slice(0, -1));
		} else {
			Users.findOne({username: req.params.username}, function(err, result) {
				var username = "";
				if (err || result == null) {
					res.json({
						"pylon-user-home": req.params.username,
						"user-exists": false
					});
				} else {
					username = req.params.username
					Pages.findOne({user_id: ObjectID(result._id), home: true}, function (err, pageResult) {
						var pylon = "<!DOCTYPE html><html>";
						if (!err && pageResult != null) {
							pylon += `
							<head>
							 <title>${pageResult.title}</title>
								<meta name='viewport' content='width=device-width, initial-scale=1'>
								<link rel='icon' type='image/png' sizes='192x192' href='/images/pylon-c-a.png'>
								<meta name='theme-color' content='rgb(255, 255, 255)'>
								<style> html { font-family: sans-serif; } </style>
								<link rel='stylesheet' href='/css/app.css'>
							${!! pageResult.twemoji ? "<script src='//twemoji.maxcdn.com/2/twemoji.min.js'></script>" +
								'<script>document.addEventListener("DOMContentLoaded", function () { if (window.innerWidth > 640) { twemoji.parse(document.body); } }, true); </script>'
								: ""}
							</head>
							<body>
							<main>${pageResult.content}</main>
							<script src='lib/axios.min.js'></script>
							<script src='lib/socket.io.js'></script>
							<script src='lib/leapmotion/leap.js'></script>
							<script src='lib/leapmotion/leap-plugins.js'></script>
							<script src='lib/three.min.js'></script>
							<script src='lib/csg.js'></script>
							<script src='lib/ThreeCSG.js'></script>
							<script src='js/main.js'></script>
							</body>
							</html>
							`;
							res.send(pylon);
						} else {
							res.json({
								"user-exists": true,
								"user-page-exists": false,
								"err": err,
								"page-result": pageResult
							});
						}
					});
				}
			});
		}
	});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') { // development error handler // will print stacktrace
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
  });
}

app.use(function(err, req, res, next) { // production error handler // no stacktraces leaked to user
  res.status(err.status || 500);
  res.json(err);
});

function connection (socket, wio) {
    var d = new Date(),
	    loginNotification = d.getHours() + ":" + d.getMinutes()+": User Connected";
    console.log(loginNotification);

    socket.on('chat message', function (msg) {
	    wio.emit('chat message', msg);
        messages.push(msg);
    });

    socket.on('user update', function (msg) {
	    wio.emit('user update', msg);
    });

	socket.on('sync event', function (msg) {

	});

    socket.on('remove user',function (userData) {
        wio.emit('remove user', userData);
    });

	socket.on('disconnect', function () {
        console.log(d.getHours() + ":" + d.getMinutes()+": User Quit");
		wio.emit('user disconnect', "");
  	});
}

io.on('connection', function (socket) { connection(socket, io);} );

http.listen(8084, "vpylon.net", function () {
  console.log('listening on *:8084');
});

secureIO = require('socket.io').listen(secureApp);     //socket.io server listens to https connections
secureApp.listen(8085, "vpylon.net");
secureIO.on('connection', function (socket) {
	connection(socket, secureIO);
});

module.exports = app;
