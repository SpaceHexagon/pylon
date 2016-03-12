var express = require('express'),
	http = require('http').Server(express),
    io = require('socket.io')(http),
	https = require('https'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	jwt    = require('jsonwebtoken');

var routes = require('./routes/index'),
	userRoutes = require('./routes/users'),
	shareRoutes = require('./routes/shares'),
	appRoutes = require('./routes/apps'),
	apiRoutes = express.Router(),
	messageRoutes = require('./routes/messages');

var config = require('./app/config.js'),
    db = require('mongoskin').db('localhost:27017/pylon'),
    app = express(),
    secureApp = null,
    secureIO = null;

var User = require('./app/user.js'),
	Doc = require('./app/doc.js'),
	Model = require('./app/model.js'),
	Share = require('./app/share.js'),
	Message = require('./app/message.js');

var Users = db.collection('users'),
	Shares = db.collection('shares'),
	Messages = db.collection('messages'),
	Notifications = db.collection('notifications'),
	Documents = db.collection('documents');

var usersOnline = [];

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // uncomment after placing your favicon in /public
app.set('superSecret', config.secret);
app.set('json spaces', 2);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);
app.use('/users', userRoutes);
app.use('/shares', shareRoutes);
app.use('/apps', appRoutes);
app.use('/messages', messageRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler // will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
  });
}

// production error handler // no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
  // find the user
	Users.findOne({username: req.body.username}, function(e, result) {
		 if (e) return next(e);
        var user = result;
		console.log(result);
		if (!user) {
		  res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {
		  // check if password matches
		  if (user.password != req.body.password) {
			res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		  } else {
			// if user is found and password is right
			var token = jwt.sign({ name: user.name, username: user.username }, app.get('superSecret'), {  // create a token
			  expiresInMinutes: 1440 // expires in 24 hours
			});

            var token = jwt.sign({ name: user.name, username: user.username },  app.get('superSecret'), { expiresInMinutes: 1440 });

			res.json({ // return the information including token as JSON
			  success: true,
			  message: 'Enjoy your token!',
			  token: token
			});
		  }
		}
	});
});

apiRoutes.use(function(req, res, next) { // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) { // verifies secret and checks exp
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {  // if there is no token
    return res.status(403).send({ // return an error
        success: false,
        message: 'No token provided.'
    });
  }
});

apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/list', function(req, res) {
	var results = {};
 	res.json(results);
});

apiRoutes.get('/search', function(req, res) {
	var results = {};
 	res.json(results);
});

apiRoutes.get('/upload', function(req, res) {
	var results = {};
 	res.json(results);
});

apiRoutes.get('/update', function(req, res) {
	var results = {};
 	res.json(results);
});

apiRoutes.get('/delete', function(req, res) {
	var results = {};
 	res.json(results);
});

apiRoutes.get('/share', function(req, res) {
	var results = {};
 	res.json(results);
});

apiRoutes.get('/message', function(req, res) {
	var results = {};
 	res.json(results);
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
        userCount --;
        console.log(d.getHours() + ":" + d.getMinutes()+": User Quit");
		wio.emit('user disconnect', "");
  	});
}

io.on('connection', function (socket) { connection(socket, io);} );

http.listen(8084, "spacehexagon.com", function () {
  console.log('listening on *:8084');
});

secureApp = https.createServer(config);
secureIO = require('socket.io').listen(secureApp);     //socket.io server listens to https connections
secureApp.listen(8085, "spacehexagon.com");
secureIO.on('connection', function (socket) {
	connection(socket, secureIO);
});



module.exports = app;
