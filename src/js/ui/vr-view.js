import React from 'react';

export default class FileView extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {filterText: ''}
    }
    handleUserInput(filterText) {
    	// When there's a change in the state, the component and all its
    	// sub-components get updated.
        this.setState({filterText: filterText});
    }
	render(){
		return (
			<canvas className="vr-view">

			</canvas>
		);
	}
}
