import React from 'react';

export default class Menu extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            name: 'main',
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

			</aside>
		);
	}
}
