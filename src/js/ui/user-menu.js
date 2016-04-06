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
				<Icon key={1} src="/images/dark/electron.png" title="User Preferences" text="Guest" open={()=>{}} />
                <Icon key={2} src="/images/dark/notification.png" title="Notifications" text="" open={this.toggleNotifications} />
			</aside>
		);
	}
}

UserMenu.defaultProps = {
    name: 'user-menu',
    options: [

    ]
};
