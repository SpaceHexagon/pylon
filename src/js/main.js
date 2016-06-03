console.log('Pylon Interface Loading...');
// React
import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
import EventEmitter from 'events';
// Redux
import { createStore } from 'redux'
import reducer from './reducers'
import App from './containers/App'
// Events
import UserInput from './user-input.js';
import UIEvents from './ui-events.js';
import SocketEvents from './socket-events.js';
import WorldPhysics from './world-physics.js';
// World
import World from './world.js';
import Avatar from './vr/avatar.js';

class SystemEvents extends EventEmitter {}
const systemEvents = new SystemEvents();

var content = document.getElementsByTagName('main')[0].innerHTML,
		token = localStorage.getItem("token"),
		world = null,
		avatar = null,
		userInput = null;

ReactDOM.render(
  (<App systemEvents={systemEvents} content={content} />),
  document.getElementsByTagName('main')[0]
)

window.socket = io.connect("https://vpylon.net:8085", {secure: true, port: 8085});
window.app = {
	user: {
		data: {
            name: localStorage.getItem("username"),
            account: "",
            user_id: 0
        },
		arms: [ ],
		mesh: null,
		password: "",
    velocity: new THREE.Vector3(0, 0, 0),
    userInput: null,
		gravity: 1,
    falling: false
	},
	users: [],
		webcamImage: "",
    systemEvents: systemEvents,
		worldPhysics: null,
		desktopEvents: null,
		socketEvents: null,
    username: localStorage.getItem("username"),
		mobile: (window.innerWidth <= 640),
		mode: "desktop",
		stereo: window.location.search("stereo") > -1,
	  cwd: "/home",
		cells: [],
		chunks: [],
		chunkMap: [],
		chunkCoords: [0, 0, 0],
		lastChunkCoords: [0, 0, 0],
		world: null,
		activity: "none",
		userInput: null,
		sendUpdatePacket: 0,
		lightboxTimeout: 0,
		typeToSearch: true,
    uploading: false,
		capturing: false,
    lightbox: document.querySelector(".lightbox"),
	showChat: function () {},
	vibrate: function (data) {
		if (!! navigator.vibrate ) {
			if (!data) {
				data = 100;
			}
			navigator.vibrate(data);
		}
	},
	captureMode: function (mode) {
		var constraints = {
			  audio: false,
			  video: true
			},
			video = document.querySelector('#webcam');

		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		app.capturing = !!mode ? mode : true;

		function successCallback (stream) {
		  window.stream = stream; // stream available to console
		  if (window.URL) {
				video.src = window.URL.createObjectURL(stream);
		  } else {
				video.src = stream;
		  }
		}
		function errorCallback (error) {
		  console.log('navigator.getUserMedia error: ', error);
		}

		navigator.getUserMedia(constraints, successCallback, errorCallback);
	}
}

app.world = world = new World();
app.userInput = userInput = new UserInput();

avatar = new Avatar("default", {username: app.username, profilePicture: ""});
avatar.toggleBody(false);
app.users[app.username] = {
		"user": app.username,
		"mesh": avatar.mesh,
		"arms": avatar.arms
};
app.user.mesh = app.users[app.username].mesh;
app.user.arms = app.users[app.username].arms;

app.userInput.init(three.camera, app.user);
//UserInput.rotationVector = {x: 0.2, y: 5.65, z: 0};
UserInput.rotationVector = {x: 0, y: -0.7, z: 0};
three.camera.position.y = 10000;

app.desktopEvents = new UIEvents(app);
app.socketEvents = new SocketEvents(app, socket);
app.worldPhysics = new WorldPhysics(app);
app.world.bufferChunks(true, 0);

//app.world.loadChunks([0,0,0], 0);
