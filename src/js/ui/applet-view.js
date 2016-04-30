import React from 'react';
import Icon from './icon.js';
import Card from './card.js';
import Applet from '../applets/applet.js';
// Applets
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
import EventEmitter from 'events';

export default class AppletView extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
			visible: false
        };
    }

	toggle (set) {
		this.setState({
			visible: typeof(set.visible) != 'undefined' ? set.visible : !this.state.visible
		});
	}

    openApplet (data) {
		this.props.applets.push(data);
		app.systemEvents.emit("toggle-search-bar", {visible: false});
		app.systemEvents.emit("toggle-activity-view", {visible: false});
    }

	componentDidMount () {
		var comp = this;

		this.props.systemEvents.on("toggle-applet-view", function (evt) {
			comp.toggle(evt);
		});

        this.props.systemEvents.on("open-applet", function (evt) {
			comp.openApplet(evt);
		});
	}

	render() {
		var appletViewStyle = {
			display: this.state.visible ? "inline-block" : "none"
        };

		return (
			<section className="applet-view" style={appletViewStyle}>
				<div className="grid">
				{this.props.applets.map(function(option, i){
					switch (option) {
						case "upload": return <Upload />; break;
						case "file-properties": return <FileProperties />; break;
						case "file-browser": return <FileBrowser />; break;
						case "text-editor": return <TextEditor />; break;
						case "image-editor": return <ImageEditor />; break;
						case "model-editor": return <ModelEditor />; break;
						case "messenger": return <Messenger />; break;
						case "clock": return <Clock />; break;
						case "settings": return <Settings />; break;
						case "user-preferences": return <UserPreferences />; break;
						case "sharing": return <Sharing />; break;
						case "terminal": return <Terminal />; break;
					}
                })}
				</div>
			</section>
		);
	}
}

AppletView.defaultProps = {
    name: 'applet-view',
    applets: []
};
