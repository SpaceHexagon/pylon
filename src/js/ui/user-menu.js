import React from 'react';
import Icon from './icon.js';


export default class UserMenu extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            applet: null
        };
    }

	render() {

		return (
			<aside className="user-menu">
				{this.props.options.map(function(option, i){
                    return <Icon key={i} src={option.src} title={option.title} open={option.open} />;
                })}
			</aside>
		);
	}
}

UserMenu.defaultProps = {
    name: 'user-menu',
    options: [
		{src: "/images/dark/electron.png", title: "User Preferences", open: function(){ console.log("opening user preferences.."); } },
        {src: "/images/dark/notification.png", title: "Notifications", open: function(){ console.log("opening notifications.."); } }
    ]
};
