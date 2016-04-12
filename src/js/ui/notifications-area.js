import React from 'react';
import Icon from './icon.js';
import Card from './card.js';
import EventEmitter from 'events';



export default class NotificationsArea extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            visible: false
        };

    }

	toggle (set) {
		this.setState({
			visible: typeof(set.visible) != 'undefined' ? set.visible : !this.state.visible
		});
	}

	componentDidMount () {
		var comp = this;
		console.log(this.props);
		this.props.systemEvents.on("toggle-notifications", function (evt) {
			comp.toggle(evt);
		});
	}


	render() {
		var cardStyle = {
            display: this.state.visible ? "inline-block" : "none"
        };

		return (
			<aside className="notifications-area" style={cardStyle}>
				{this.props.options.map(function (option, i) {
                    return <Card  key={i} CardIcon={<Icon src={option.src} open={option.open} title={option.title} />} title={option.title} text={option.text} />
                })}
			</aside>
		);
	}
}

NotificationsArea.defaultProps = {
    name: 'notifications-area',
	systemEvents: null,
    options: [
        {
			src: "/images/dark/star.png",
			title: "Pylon Desktop",
			text:"Welcome to your newly created V-Pylon. You now have access to file storage, documents, messaging and basic web hosting through the web or virtual reality.",
			open: function (){
				console.log("opening notifications..");
			}
		},
		{
			src: "/images/dark/messaging.png",
			title: "Test Message",
			text:"Hello world. Testing message notifications.",
			open: function () {
				console.log("opening user message notification..");
			}
		},
		{
			src: "/images/dark/upload.png",
			title: "Upload Complete",
			text:"Hello World.txt was uploaded successfully",
			open: function () {
				console.log("opening user message notification..");
			}
		}
    ]
};

