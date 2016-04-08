import React from 'react';
import Icon from './icon.js';
import EventEmitter from 'events';

export default class CreateMenu extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            applet: null,
        	mode: "minimized"
		};
    }

	toggleMenu () {
		this.setState({
			mode: (this.state.mode == "minimized" ? "expanded" : "minimized")
		});
	}

	componentDidMount () {
		var comp = this;
		console.log(this.props);
		this.props.systemEvents.on("toggle-create-menu", function (evt) {
			comp.toggleMenu();
		});
	}


	bindApplet(applet) {
        this.setState({applet: applet});
    }


	render() {

		var menuStyle = {
			display: this.state.mode == "minimized" ? "none" : "inline-block"
		}

		return (
			<aside className="create-menu" style={menuStyle}>
				<ul>
				{this.props.options.map(function(option, i){
                    return <li><Icon key={i} src={option.src} title={option.title} open={option.open} /><span className="title">{option.title}</span></li>;
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

