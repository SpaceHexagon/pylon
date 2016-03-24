console.log('Pylon Interface Loading...');

import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';

// UI Components
import Menu from './ui/menu.js';
import ContextMenu from './ui/context-menu.js';
import FileView from './ui/file-view.js';
import ListView from './ui/list-view.js';
import VrView from './ui/vr-view.js';
import Editor from './ui/editor.js';

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


ReactDOM.render(
  (
    <Menu />
  ),
  document.getElementsByTagName('main')[0]
)

window.socket = io.connect("https://vpylon.net:8085", {secure:true, port: 8085});
