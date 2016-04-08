import React from 'react';
import Icon from './icon.js';
import EventEmitter from 'events';

export default class CreateMenu extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            applet: null,
        	visible: false
		};
    }

	toggle (set) {
		this.setState({
			visible: typeof(set.visible) != 'undefined' ? set.visible : !this.state.visible
		});
	}

	componentDidMount () {
		var comp = this;
		console.log(this.props);
		this.props.systemEvents.on("toggle-create-menu", function (evt) {
			comp.toggle(evt);
		});
	}


	bindApplet(applet) {
        this.setState({applet: applet});
    }


	render() {

		var menuStyle = {
			display: this.state.visible ? "inline-block" : "none"
		}

		return (
			<aside className="create-menu" style={menuStyle}>
				<ul>
				{this.props.options.map(function(option, i){
                    return <li><Icon key={i} src={option.src} title={option.title} open={option.open} text={option.title} /></li>;
                })}
				</ul>
			</aside>
		);
	}
}

CreateMenu.defaultProps = {
    name: 'main',
    options: [
        {src: "/images/dark/upload.png", title: "Upload Files", open: function(){ console.log("Create / Upload Menu"); } },
		{src: "/images/dark/file.png", title: "New File", open: function(){ console.log("Create / Upload Menu"); } },
		{src: "/images/dark/folder.png", title: "New Folder", open: function(){ console.log("Create / Upload Menu"); } },
		{src: "/images/dark/sharing.png", title: "New Share", open: function(){ console.log("Create / Upload Menu"); } },
		{src: "/images/dark/star.png", title: "New Page", open: function(){ console.log("Create / Upload Menu"); } }
    ]
};

