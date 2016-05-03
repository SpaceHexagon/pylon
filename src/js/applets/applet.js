import React from 'react';

export default class Applet extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {name: 'generic applet'}
    }
    setName(name) {
    	// When there's a change in the state, the component and all its sub-components get updated.
        this.setState({name: name});
    }

    close () {
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
    }


	render(){
		return (
			<section className="applet">
                <nav className="panel">

                </nav>
			</section>
		);
	}
}


Applet.defaultProps = {
	appletData: {}
};
