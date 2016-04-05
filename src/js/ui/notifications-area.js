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
                    return <Card  key={i} CardIcon={<Icon src={option.src} open={option.open} title={option.title} />} title={option.title} text={option.text} />
                })}
			</aside>
		);
	}
}

NotificationsArea.defaultProps = {
    name: 'notifications-area',
    options: [
        {
			src: "/images/dark/star.png",
			title: "Pylon Desktop",
			text:"Welcome to your newly created V-Pylon. You now have access to file storage, documents, messaging and basic web hosting through the web or virtual reality.",
			open: function(){
				console.log("opening notifications..");
			}
		},
		{
			src: "/images/dark/messaging.png",
			title: "Test Message",
			text:"Hello world. Testing message notifications.",
			open: function() {
				console.log("opening user message notification..");
			}
		}
    ]
};

