import React from 'react';
import Icon from './icon.js';
import EventEmitter from 'events';

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

	toggleCreateMenu () {
		this.props.systemEvents.emit("toggle-create-menu", {});
		this.props.systemEvents.emit("toggle-activity-view", {visible: false});
		this.props.systemEvents.emit("toggle-search-bar", {visible: false});
		this.props.systemEvents.emit("toggle-notifications", {visible: false});
	}

	toggleSearchBar () {
		this.props.systemEvents.emit("toggle-search-bar", {});
		this.props.systemEvents.emit("toggle-activity-view", {visible: false});
		this.props.systemEvents.emit("toggle-create-menu", {visible: false});
		this.props.systemEvents.emit("toggle-notifications", {visible: false});
	}

	toggleActivityView () {
		this.props.systemEvents.emit("toggle-activity-view", {});
		this.props.systemEvents.emit("toggle-create-menu", {visible: false});
		this.props.systemEvents.emit("toggle-search-bar", {visible: false});
		this.props.systemEvents.emit("toggle-notifications", {visible: false});
	}

	render() {
		var menu = this;
		return (
			<aside className="menu">
				{this.props.options.map(function(option, i){
                    return <Icon key={i} src={option.src} title={option.title} open={(evt)=>{option.open(evt, menu);}} />;
                })}
			</aside>
		);
	}
}

Menu.defaultProps = {
    name: 'main',
    options: [
        {src: "/images/dark/pylon-w-a.png", title: "Activities", open: function(evt, menu) {
			console.log("opening Launcher / activity view..");
			menu.toggleActivityView();
		} },
		{src: "/images/dark/search.png", title: "Search", open: function(evt, menu) {
			console.log("opening Search app..");
			menu.toggleSearchBar();
		} },
		{src: "/images/dark/folder.png", title: "File Browser", open: function(){ console.log("opening Files app.."); } },
		{src: "/images/dark/messaging.png", title: "Messaging", open: function(){ console.log("opening Messaging app.."); } },
		//		{src: "/images/dark/sharing.png", title: "Sharing", open: function(){ console.log("opening Sharing app.."); } },
        {src: "/images/dark/plus.png", title: "Create & Upload", open: function(evt, menu) {
			menu.toggleCreateMenu();}
		}
//      {src: "/images/dark/notification.png", title: "Notifications", open: function(){ console.log("opening Notification app.."); } },
//		{src: "/images/dark/configure.png", title: "Settings", open:function(){ console.log("opening Settings app.."); } },
    ]
};

