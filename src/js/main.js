console.log('Pylon Interface Loading...');

import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';

// UI Components
import Menu from './ui/menu.js';
import Icon from './ui/icon.js';
import Card from './ui/card.js';
import ContextMenu from './ui/context-menu.js';
import FileView from './ui/file-view.js';
import ListView from './ui/list-view.js';
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
      </div>
  ),
  document.getElementsByTagName('main')[0]
)

window.socket = io.connect("https://vpylon.net:8085", {secure:true, port: 8085});

var scene = new THREE.Scene(),
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
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

// <Card CardIcon={<Icon src="test" title="test"/>} title="Test Card" text="this is a test card" />
