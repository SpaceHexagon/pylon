import React from 'react';
import Applet from './applet.js';


export default class UserPreferences extends Applet {
	constructor() {
		super();
		// Initial state of the component
        this.state = {name: 'User Preferences'}
    }
    setName(name) {
    	// When there's a change in the state, the component and all its sub-components get updated.
        this.setState({name: name});
    }
	render(){
		return (
			<section className="applet user-preferences">

			</section>
		);
	}
}

UserPreferences.defaultProps = {
	appletData: {},
	key: 'User Preferences',
	name: 'User Preferences',
	icon: "/images/dark/circle.png"
};
