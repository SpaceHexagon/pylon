import React from 'react';
import Icon from './icon.js';
import Card from './card.js';
import Applet from '../applets/applet.js';
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

