console.log('Loading Pylon..');

import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';

import Menu from './ui/menu.js';
import ContextMenu from './ui/context-menu.js';
import FileView from './ui/file-view.js';
import ListView from './ui/list-view.js';
import VrView from './ui/vr-view.js';
import Editor from './ui/editor.js';


ReactDOM.render(
  (
    <div className='root'>
	  <Menu />
	</div>
  ),
  document.getElementsByTagName('main')[0]
)

window.socket = io.connect("https://vpylon.net:8085", {secure:true, port: 8085});
