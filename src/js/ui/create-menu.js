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


	bindApplet(applet) {
        this.setState({applet: applet});
    }


	render() {

		return (
			<aside className="create-menu">
				{this.props.options.map(function(option, i){
                    return <Icon key={i} src={option.src} title={option.title} open={option.open} />;
                })}
			</aside>
		);
	}
}

CreateMenu.defaultProps = {
    name: 'main',
    options: [
//        {src: "/images/dark/new.png", title: "Create & Upload", open: function(){ console.log("Create / Upload Menu"); } },
//		{src: "/images/dark/search.png", title: "Search", open: function(){ console.log("opening Search app.."); } },
//        {src: "/images/dark/star.png", title: "Places", open: function(){ console.log("opening Places app"); } },
//		{src: "/images/dark/file.png", title: "Files", open: function(){ console.log("opening Files app.."); } },
//		{src: "/images/dark/messaging.png", title: "Messaging", open: function(){ console.log("opening Messaging app.."); } },
//		{src: "/images/dark/sharing.png", title: "Sharing", open: function(){ console.log("opening Sharing app.."); } }
//      {src: "/images/dark/notification.png", title: "Notifications", open: function(){ console.log("opening Notification app.."); } },
//		{src: "/images/dark/configure.png", title: "Settings", open:function(){ console.log("opening Settings app.."); } },
    ]
};

