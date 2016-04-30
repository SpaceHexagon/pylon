import React from 'react';
import Applet from './applet.js';
import Icon from '../ui/icon.js';

export default class FileProperties extends Applet {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
			name: 'File Properties',
			visible: true
		}
    }

	toggle (set) {
		this.setState({
			visible: typeof(set.visible) != 'undefined' ? set.visible : !this.state.visible
		});
	}

	componentDidMount () {
		var comp = this;
		console.log(this.props);
		app.systemEvents.on("toggle-applet-views", function (evt) {
			comp.toggle(evt);
		});

	}

    save (comp) {

    }

	render(){
        var comp = this,
			appletStyle = {
            display: this.state.visible ? "inline-block" : "none"
        };

		return (
			<section style={appletStyle} className="applet file-properties">
                <nav className="panel">
				    <h2>File Properties</h2>
                    <Icon title="Save" src="/images/edit.png" text="Save" open={(evt)=>{ comp.save(comp); }} />
                    <Icon title="Close" src="/images/x.png" open={(evt)=>{ comp.close(); }} />
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
