import React from 'react';
import Icon from './icon.js';
import Card from './card.js';


export default class NotificationsArea extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            applet: null
        };
    }

	render() {

		return (
			<aside className="notifications-area">
				{this.props.options.map(function(option, i){
                    return <Icon key={i} src={option.src} title={option.title} open={option.open} />;
                })}
			</aside>
		);
	}
}

NotificationsArea.defaultProps = {
    name: 'notifications-area',
    options: [
        {src: "/images/dark/pylon-w-a.png", title: "Apps", open: function(){ console.log("opening Launcher.."); } },
		{src: "/images/dark/search.png", title: "Search", open: function(){ console.log("opening Search app.."); } }

    ]
};

