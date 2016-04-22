import React from 'react';
import Icon from './icon.js';
import EventEmitter from 'events';

export default class PageEditor extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            resized: false,
			enabled: false
        };
    }

    componentDidMount () {
		var comp = this;
		this.props.systemEvents.on("window-resized", function (evt) {
			comp.flagResized();
		});
	}

	toggleEditor (evt, editor) {
		this.setState({enabled: !this.state.enabled});
	}

    flagResized () {
        this.setState({resized: !this.state.resized});
    }

	render() {
		var editor = this,
			editorStyle = {
				display: editor.state.enabled ? "block" : "none"
			};
		return (
			<aside className="page-editor">
                  <Icon src="images/dark/edit.png" title="Edit Page" open={(evt)=>{ return menu.toggleEditor(evt, editor);}} />
              	<textarea style={editorStyle} className="editor"></textarea>
			</aside>
		);
	}
}

PageEditor.defaultProps = {
    options: [

    ]
};

