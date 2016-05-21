console.log('Pylon Interface Loading...');

import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
import EventEmitter from 'events';

// Stores
// import AppletStore from './stores/AppletStore';
// import DocumentStore from './stores/DocumentStore';
// import MessageStore from './stores/MessageStore';
// World
import World from './world.js';
import Avatar from './vr/avatar.js';
// Events
import UserInput from './user-input.js';
import UIEvents from './ui-events.js';
import SocketEvents from './socket-events.js';
import WorldPhysics from './world-physics.js';
// UI Components
import Menu from './ui/menu.js';
import UserMenu from './ui/user-menu.js';
import SearchBar from './ui/search-bar.js';
import Icon from './ui/icon.js';
import Card from './ui/card.js';
import ContextMenu from './ui/context-menu.js';
import CreateMenu from './ui/create-menu.js';
import NotificationsArea from './ui/notifications-area.js';
import FileView from './ui/file-view.js';
import ListView from './ui/list-view.js';
import ActivityView from './ui/activity-view.js';
import AppletView from './ui/applet-view.js';
import VrView from './ui/vr-view.js';
import Editor from './ui/editor.js';
import Emojis from './ui/emojis.js';
import SignIn from './ui/signin.js';
import PageEditor from './ui/page-editor.js';
// Applets
import Applet from './applets/applet.js';
import Upload from './applets/upload.js';
import FileProperties from './applets/file-properties.js';
import FileBrowser from './applets/file-browser.js';
import TextEditor from './applets/text-editor.js';
import ImageEditor from './applets/image-editor.js';
import ModelEditor from './applets/model-editor.js';
import Messenger from './applets/messaging.js';
import Clock from './applets/clock.js';
import Settings from './applets/settings.js';
import UserPreferences from './applets/user-preferences.js';
import Sharing from './applets/sharing.js';
import Terminal from './applets/terminal.js';

class SystemEvents extends EventEmitter {}
const systemEvents = new SystemEvents();

var content = document.getElementsByTagName('main')[0].innerHTML;
var token = localStorage.getItem("token"),
		world = null,
		avatar = null,
		userInput = null;

if (window.location.href.split(".net/")[1] == "") {
	content = <SignIn />;
}

ReactDOM.render(
  (
      <div className="root">
		{content}
	  	<Menu systemEvents={systemEvents}/>
	  	<UserMenu systemEvents={systemEvents} />
	  	<SearchBar systemEvents={systemEvents} />
	  	<NotificationsArea systemEvents={systemEvents}/>
	  	<CreateMenu systemEvents={systemEvents} />
	  	<ActivityView systemEvents={systemEvents} />
	  	<AppletView systemEvents={systemEvents} />
	  	<PageEditor systemEvents={systemEvents} />
	  	<video id="webcam" ></video>
			<canvas id="webcam-canvas"></canvas>
        <div className="lightbox" style={{display: "none"}}></div>
      </div>
  ),
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
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		var constraints = {
		  audio: false,
		  video: true
		},
		video = document.querySelector('#webcam');

		app.capturing = !!mode ? mode : true;

		function successCallback(stream) {
		  window.stream = stream; // stream available to console
		  if (window.URL) {
				video.src = window.URL.createObjectURL(stream);
		  } else {
				video.src = stream;
		  }
		}

		function errorCallback(error) {
		  console.log('navigator.getUserMedia error: ', error);
		}

		navigator.getUserMedia(constraints, successCallback, errorCallback);
	}
}

app.world = world = new World();
app.userInput = userInput = new UserInput();

avatar = new Avatar("default", {username: app.username, profilePicture: ""});
app.users[app.username] = {
		"user": app.username,
		"mesh": avatar.mesh,
		"arms": avatar.arms
};
app.user.mesh = app.users[app.username].mesh;
app.user.arms = app.users[app.username].arms;

app.userInput.init(three.camera, app.user);
UserInput.rotationVector = {x: 0.2, y: 5.65, z: 0};

app.desktopEvents = new UIEvents(app);
app.socketEvents = new SocketEvents(app, socket);
app.worldPhysics = new WorldPhysics(app);
