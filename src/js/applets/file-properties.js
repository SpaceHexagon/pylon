import React from 'react';
import Applet from './applet.js';


export default class FileProperties extends Applet {
	constructor() {
		super();
		// Initial state of the component
        this.state = {name: 'File Properties'}
    }
    setName(name) {
    	// When there's a change in the state, the component and all its sub-components get updated.
        this.setState({name: name});
    }
	render(){
		return (
			<section className="applet file-properties">
				<h2>File Properties</h2>
				<table>
					{this.props.metadata.map(function(option, i){
                	    return <tr key={i} ><td>{option.key}</td><td>{option.value}</td></tr>;
                	})}
				</table>
			</section>
		);
	}
}


FileProperties.defaultProps = {
	metadata: [
		{key: "public", value: false},
		{key: "opensWith",  value: ""}
	]
}
