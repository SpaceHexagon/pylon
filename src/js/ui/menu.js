import React from 'react';
import Icon from './icon.js';


export default class Menu extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            name: 'main',
			options: [{src: "images/test.png", title: "Test Icon"},
					  {src: "images/test.png", title: "Test Icon"},
					  {src: "images/test.png", title: "Test Icon"},
					  {src: "images/test.png", title: "Test Icon"},
					  {src: "images/test.png", title: "Test Icon"},
					  {src: "images/test.png", title: "Test Icon"}],
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
			<aside htmlClass="menu">
				 {this.state.options.map(function(object, i){
					return <Icon src={object.src} title={object.title} />;
				})}
			</aside>
		);
	}
}


