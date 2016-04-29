import React from 'react';
import Applet from './applet.js';
import Icon from '../ui/icon.js';

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

    save (comp) {

    }

	render(){
        var comp = this;
		return (
			<section className="applet file-properties">
                <nav className="panel">
				    <h2>File Properties</h2>
                    <Icon title="Save" src="/images/dark/edit.png" text="Save" open={(evt)=>{ comp.save(comp); }} />
                    <Icon title="Close" src="/images/dark/x.png" open={(evt)=>{ comp.close(); }} />
                </nav>
				<table>
					{this.props.metadata.map(function(option, i){
                	    return <tr key={i} ><td>{option.key}</td><td>
                            <select>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </td></tr>;
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
