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
                    return <Icon src={option.src} title={option.title} />;
                })}
			</aside>
		);
	}
}

Menu.defaultProps = {
    name: 'main',
    options: [
        {src: "images/pylon-w-a.png", title: "Apps"},
        {src: "images/star.png", title: "Places"},
        {src: "images/search.png", title: "Search"},
		{src: "images/file.png", title: "Files"},
		{src: "images/sharing.png", title: "Sharing"},
		{src: "images/messaging.png", title: "Messaging"},
        {src: "images/configure.png", title: "Settings"},
    ]
};

