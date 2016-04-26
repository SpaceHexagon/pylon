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
		editor.setState({enabled: !editor.state.enabled});
		if (editor.state.enabled) {
			editor.saveChanges();
		}
	}

	saveChanges (evt, editor) {
		var configure = {
				  baseURL: 'https://vpylon.net',
				  timeout: 1000,
				  headers: {'x-access-token': localStorage.getItem("token")}
				};

		axios.put('/api/pages/'+app.username, {"content": document.querySelector(".editor").value}, configure)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (response) {
				console.log(response);
			});
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
                  <Icon src="images/dark/edit.png" title="Edit Page" open={(evt)=>{ return editor.toggleEditor(evt, editor);}} />
              	<textarea style={editorStyle} className="editor"></textarea>
			</aside>
		);
	}
}

PageEditor.defaultProps = {
    options: [

    ]
};

