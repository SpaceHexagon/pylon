console.log('Pylon Interface Loading...');

import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
import EventEmitter from 'events';
// World
import World from './world.js';
// User Input
import UserInput from './user-input.js';
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

        <div className="lightbox" style={{display: "none"}}></div>
      </div>
  ),
  document.getElementsByTagName('main')[0]
)

window.socket = io.connect("https://vpylon.net:8085", {secure: true, port: 8085});

window.app = {
	user: {
		data: {
            name: "",
            account: "",
            user_id: 0
        },
		arms: [ ],
		password: "",
        velocity: new THREE.Vector3(0, 0, 0),
        userInput: null,
		gravity: 1,
        falling: false
	},
    systemEvents: systemEvents,
    username: localStorage.getItem("username"),
	mobile: (window.innerWidth <= 640),
	mode: "desktop",
    cwd: "/home",
	world: null,
	activity: "none",
	userInput: null,
	sendUpdatePacket: false,
	lightboxTimeout: 0,
	typeToSearch: true,
    uploading: false,
    lightbox: document.querySelector(".lightbox"),
	showChat: function () {},
	vibrate: function (data) {
		if (!! navigator.vibrate ) {
			if (!data) {
				data = 100;
			}
			navigator.vibrate(data);
		}
	}
}

app.world = world = new World();
app.userInput = userInput = new UserInput();

app.userInput.init(three.camera, app.user);
UserInput.rotationVector = {x: 0, y: Math.PI / 4, z: 0};

document.body.addEventListener("keydown", function (evt) {
	var visible = true,
		elemType = "";
	if (app.mode == "desktop") {
		if (evt.which == 27) {
			visible = false;
			app.typeToSearch = true;
		} else if (evt.which == 17) {
			app.typeToSearch = false;
		}
		if (app.typeToSearch) {
			elemType = evt.target.tagName.toLowerCase();
			if (elemType != "input" && elemType != "textarea") {
				if (evt.which == 27 || (evt.which > 47 && evt.which < 91)) {
					systemEvents.emit("toggle-search-bar", {visible: visible});
					systemEvents.emit("toggle-activity-view", {visible: false});
					systemEvents.emit("toggle-create-menu", {visible: false});
					systemEvents.emit("toggle-notifications", {visible: false});
					systemEvents.emit("toggle-applet-views", {visible: false});
				}
			}
		}
	} else {
		if (evt.which == 27) {
			app.mode = "desktop";
			document.body.setAttribute("class", "desktop");
		}
	}
}, true);

document.body.addEventListener("keyup", function (evt) {
	if (evt.which == 17) {
		app.typeToSearch = true;
	}
}, true);

window.onresize = function () {
    systemEvents.emit("window-resized", {});
	world.three.renderer.setSize(window.innerWidth, window.innerHeight);
	world.three.renderer.setSize(innerWidth, innerHeight);
	world.three.camera.aspect = innerWidth / innerHeight;
	world.three.camera.updateProjectionMatrix();
	app.mobile = (window.innerWidth <= 640);
}

document.body.ondragover = function () {
       app.lightbox.setAttribute("class", "lightbox hover");
       clearTimeout(app.lightboxTimeout);
       app.lightboxTimeout = setTimeout(function () {
            if (!app.uploading) {
                app.lightbox.setAttribute("class", "lightbox");
                app.lightbox.setAttribute("style", "display: none;");
            }
       }, 1000);
       return false;
};

document.body.ondragend = function () { app.lightbox.setAttribute("class", "lightbox"); return false; };

document.body.ondrop = function (e) {
	app.lightbox.setAttribute("class", "lightbox");
	e.preventDefault();
	document.querySelector("#file-upload").files = e.dataTransfer.files;
	//systemEvents.emit("start-upload", {files: e.dataTransfer.files});
};

