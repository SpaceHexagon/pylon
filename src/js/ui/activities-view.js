import React from 'react';
import Icon from './icon.js';
import Card from './card.js';


export default class ActivitiesView extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {

        };
    }

	render() {

		return (
			<aside className="activities-view">
				{this.props.activities.map(function(option, i){
                    return <Icon key={i} src={option.src} title={option.title} open={option.open} />;
                })}
			</aside>
		);
	}
}

NotificationsArea.defaultProps = {
    name: 'activities-view',
    activities: [
        {src: "/images/dark/pylon-w-a.png", title: "Apps", open: function(){ console.log("opening Launcher.."); } },
		{src: "/images/dark/search.png", title: "Search", open: function(){ console.log("opening Search app.."); } }

    ]
};

