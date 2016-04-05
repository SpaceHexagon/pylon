console.log('Pylon Interface Loading...');

import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';

// UI Components
import Menu from './ui/menu.js';
import UserMenu from './ui/user-menu.js';
import Icon from './ui/icon.js';
import Card from './ui/card.js';
import ContextMenu from './ui/context-menu.js';
import NotificationsArea from './ui/notifications-area.js';
import FileView from './ui/file-view.js';
import ListView from './ui/list-view.js';
import ActivitiesView from './ui/activities-view.js';
import VrView from './ui/vr-view.js';
import Editor from './ui/editor.js';
import Emojis from './ui/emojis.js';
import SignIn from './ui/signin.js';

// Applets
import Applet from './applets/applet.js';
import TextEditor from './applets/text-editor.js';
import ImageEditor from './applets/image-editor.js';
import ModelEditor from './applets/model-editor.js';
import Messenger from './applets/messaging.js';
import Clock from './applets/clock.js';
import Settings from './applets/settings.js';
import Sharing from './applets/sharing.js';
import Terminal from './applets/terminal.js';

var content = document.getElementsByTagName('main')[0].innerHTML;

var token = localStorage.getItem("token");

if (window.location.href.split(".net/")[1] == "") {
	content = <SignIn />;
}

ReactDOM.render(
  (
      <div className="root">
		{content}
	  	<Menu />
	  	<UserMenu />
	  	<NotificationsArea />
	  	<ActivitiesView />
      </div>
  ),
  document.getElementsByTagName('main')[0]
)

// <Card CardIcon={<Icon src="/images/dark/star.png" title="test"/>} title="New Activity!" text="This is a test activity cards" />

window.socket = io.connect("https://vpylon.net:8085", {secure:true, port: 8085});

var scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 2, 100000 ),
	renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.three = {
	scene: scene,
	camera: camera,
	renderer: renderer
};

var geometry = new THREE.BoxGeometry( 1, 1, 1 ),
	material = new THREE.MeshBasicMaterial( { color: 0x333333 } ),
	cube = new THREE.Mesh( geometry, material );

renderer.setClearColor(0xfafafa);
scene.add( cube );
camera.position.z = 5;


var world = { skybox: null };

//var skyTexture = THREE.ImageUtils.loadTexture("/app/data/data-sky.png", null, function () {
//	var skybox = new THREE.Object3D(), // used to use larger jpeg version sunset-5.jpg
//	    skyboxFace = null,
//	    skyboxSideMat = new THREE.MeshBasicMaterial({
//	        map: skyTexture,
//			side: 1,
//			fog: false
//	        }),
//		skyboxTopMat = new THREE.MeshBasicMaterial(),
//		x = 0;
//	while (x < 4) {
//		skyboxFace = new THREE.Mesh(new THREE.PlaneGeometry(60000, 60000, 1, 1), skyboxSideMat);
//		skyboxFace.position.set(Math.sin(x*(Math.PI / 2))*30000, 0, Math.cos(x*(Math.PI / 2))*30000 );
//		skyboxFace.rotation.y = x*(Math.PI / 2);
//		skybox.add(skyboxFace);
//		x++;
//	}
//	world.skybox = skybox;
//	three.scene.add(skybox);
//	skybox.position.set(three.camera.position.x, 60000, three.camera.position.z);
//	skyTexture.needsUpdate = true;
//});




var render = function () {
	requestAnimationFrame( render );
	cube.rotation.x += 0.02;
	cube.rotation.y += 0.02;
	renderer.render(scene, camera);
};

render();


window.onresize = function () {
	if (!! three.renderer) {
		three.renderer.setSize(innerWidth, innerHeight);
		three.camera.aspect = innerWidth / innerHeight;
		three.camera.updateProjectionMatrix();
	}
};


