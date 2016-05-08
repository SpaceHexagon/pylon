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
					visible: false,
					appletClosed: false
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

		closeApplet (data) {
			var applets = this.props.applets,
					applet = applets.length -1;

					console.log("closing applet "+data);
					while (--applet >= 0) {
						console.log(applet, applets[applet], data);
						if (applets[applet].key == data) {
							applets.splice(1, applet);
							this.setState({appletClosed: true});
							this.setState({appletClosed: false});
						}
					}
    }

	componentDidMount () {
		var comp = this;

		this.props.systemEvents.on("toggle-applet-view", function (evt) {
			comp.toggle(evt);
		});

    this.props.systemEvents.on("open-applet", function (evt) {
			comp.openApplet(evt);
		});

		this.props.systemEvents.on("close-applet", function (evt) {
			comp.closeApplet(evt);
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
					var data = option.data,
							fileId = !!option.file_id ? option.file_id : "",
							appletName = option.key;
					switch (option.name) {
						case "upload": return <Upload key={appletName} appletData={data} />; break;
						case "file-properties": return <FileProperties key={appletName} appletData={data} file_id={fileId} />; break;
						case "file-browser": return <FileBrowser key={appletName} appletData={data} />; break;
						case "text-editor": return <TextEditor key={appletName} appletData={data} />; break;
						case "image-editor": return <ImageEditor key={appletName} appletData={data} />; break;
						case "model-editor": return <ModelEditor key={appletName} appletData={data} />; break;
						case "messenger": return <Messenger  key={appletName} appletData={data}/>; break;
						case "clock": return <Clock key={appletName} appletData={data} />; break;
						case "settings": return <Settings key={appletName} appletData={data} />; break;
						case "user-preferences": return <UserPreferences key={appletName} appletData={data} />; break;
						case "sharing": return <Sharing key={appletName} appletData={data} />; break;
						case "terminal": return <Terminal key={appletName} appletData={data} />; break;
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
