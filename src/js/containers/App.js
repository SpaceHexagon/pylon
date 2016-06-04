import React, { Component } from 'react';
// UI Containers

// UI Components
import Menu from '../ui/menu.js';
import UserMenu from '../ui/user-menu.js';
import SearchBar from '../ui/search-bar.js';
import Icon from '../ui/icon.js';
import Card from '../ui/card.js';
import ContextMenu from '../ui/context-menu.js';
import CreateMenu from '../ui/create-menu.js';
import NotificationsArea from '../ui/notifications-area.js';
import FileView from '../ui/file-view.js';
import ListView from '../ui/list-view.js';
import ActivityView from '../ui/activity-view.js';
import AppletView from '../ui/applet-view.js';
import VrView from '../ui/vr-view.js';
import Editor from '../ui/editor.js';
import Emojis from '../ui/emojis.js';
import SignIn from '../ui/signin.js';
import PageEditor from '../ui/page-editor.js';
// Applets
import Applet from '../applets/applet.js';
import Upload from '../applets/upload.js';
import FileProperties from '../applets/file-properties.js';
import FileBrowser from '../applets/file-browser.js';
import TextEditor from '../applets/text-editor.js';
import ImageEditor from '../applets/image-editor.js';
import ModelEditor from '../applets/model-editor.js';
import Messenger from '../applets/messaging.js';
import Clock from '../applets/clock.js';
import Settings from '../applets/settings.js';
import UserPreferences from '../applets/user-preferences.js';
import Sharing from '../applets/sharing.js';
import Terminal from '../applets/terminal.js';


export default class App extends Component {
  render() {
    var content = this.props.content;
    if (window.location.href.split(".net/")[1] == "") {
    	content = <SignIn />;
    }

    return (
      <div className="root">
    		{content}
    	  	<Menu systemEvents={this.props.systemEvents}/>
    	  	<UserMenu systemEvents={this.props.systemEvents} />
    	  	<SearchBar systemEvents={this.props.systemEvents} />
    	  	<NotificationsArea systemEvents={this.props.systemEvents}/>
    	  	<CreateMenu systemEvents={this.props.systemEvents} />
    	  	<ActivityView systemEvents={this.props.systemEvents} />
    	  	<AppletView systemEvents={this.props.systemEvents} />
    	  	<PageEditor systemEvents={this.props.systemEvents} />
    	  	<video id="webcam" ></video>
    			<canvas id="webcam-canvas"></canvas>
            <div className="lightbox" style={{display: "none"}}></div>
          </div>
    )
  }
}

App.defaultProps = {
  systemEvents: null,
  content: ""
}
