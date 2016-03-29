import React from 'react';
import Icon from './icon.js';


export default class Menu extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            applet: null
        };
    }
    bindApplet(applet) {
    	// When there's a change in the state, the component and all its
    	// sub-components get updated.
        this.setState({applet: applet});
    }
	render() {

		return (
			<aside className="menu">
				{this.props.options.map(function(option){
                    return <Icon src={option.src} title={option.title} open={option.open} />;
                })}
			</aside>
		);
	}
}

Menu.defaultProps = {
    name: 'main',
    options: [
        {src: "images/pylon-w-a.png", title: "Apps", open: function(){ console.log("opening Launcher.."); } },
        {src: "images/star.png", title: "Places", open: function(){ console.log("opening Places app"); } },
        {src: "images/search.png", title: "Search", open: function(){ console.log("opening Search app.."); } },
		{src: "images/file.png", title: "Files", open: function(){ console.log("opening Files app.."); } },
		{src: "images/sharing.png", title: "Sharing", open: function(){ console.log("opening Sharing app.."); } },
		{src: "images/messaging.png", title: "Messaging", open: function(){ console.log("opening Messaging app.."); } },
        {src: "images/configure.png", title: "Settings", open:function(){ console.log("opening Settings app.."); } },
    ]
};

