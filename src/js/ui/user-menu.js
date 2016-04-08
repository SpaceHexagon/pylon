import React from 'react';
import Icon from './icon.js';
import EventEmitter from 'events';

export default class UserMenu extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            applet: null
        };

		this.toggleNotifications = this.toggleNotifications.bind(this);

    }

	toggleNotifications () {
		this.props.systemEvents.emit("toggle-notifications", {});
		this.props.systemEvents.emit("toggle-activity-view", {visible: false});
		this.props.systemEvents.emit("toggle-search-bar", {visible: false});
		this.props.systemEvents.emit("toggle-create-menu", {visible: false});
	}

	render() {
		return (
			<aside className="user-menu">
				<Icon key={1} src="/images/dark/circle.png" title="User Preferences" text={this.props.username} open={()=>{}} />
                <Icon key={2} src="/images/dark/notification.png" title="Notifications" text="" open={this.toggleNotifications} />
				<Icon key={3} src="/images/dark/configure.png" title="System Settings"  open={()=>{ console.log("system settings"); }} />
			</aside>
		);
	}
}

/* <Icon key={2} src="/images/dark/messaging.png" title="Messages" text="" open={()=>{ console.log("opening Messaging app.."); }} /> */

UserMenu.defaultProps = {
    name: 'user-menu',
	username: localStorage.getItem("username") || "Guest",
    options: [

    ]
};

