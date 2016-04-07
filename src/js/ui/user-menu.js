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
	}

	render() {
		return (
			<aside className="user-menu">
				<Icon key={1} src="/images/dark/circle.png" title="User Preferences" text="Guest" open={()=>{}} />
                <Icon key={3} src="/images/dark/notification.png" title="Notifications" text="" open={this.toggleNotifications} />
			</aside>
		);
	}
}

/* <Icon key={2} src="/images/dark/messaging.png" title="Messages" text="" open={()=>{ console.log("opening Messaging app.."); }} /> */

UserMenu.defaultProps = {
    name: 'user-menu',
    options: [

    ]
};

