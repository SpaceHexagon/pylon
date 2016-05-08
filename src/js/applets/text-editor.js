import React from 'react';
import Applet from './applet.js';


export default class TextEditor extends Applet {
	constructor() {
		super();
		// Initial state of the component
        this.state = {name: 'Text Editor',
			visible: true
		}
    }

	toggle (set) {
		this.setState({
			visible: typeof(set.visible) != 'undefined' ? set.visible : !this.state.visible
		});
	}

	componentDidMount () {
		var comp = this;
		console.log(this.props);
		app.systemEvents.on("toggle-applet-views", function (evt) {
			comp.toggle(evt);
		});

	}


	render() {
		var appletStyle = {
            display: this.state.visible ? "inline-block" : "none"
        };

		return (
			<section style={appletStyle} className="applet text-editor">

			</section>
		);
	}
}

TextEditor.defaultProps = {
	appletData: {},
	key: 'Text Editor',
	icon: "/images/dark/file.png"
};
