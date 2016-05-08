import React from 'react';
import Applet from './applet.js';
import Icon from '../ui/icon.js';
import PropertyEdit from '../ui/property-edit.js';

export default class FileProperties extends Applet {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
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

		close (comp) {

		}

		updateValues (key, value) {
			var comp = this,
					meta = this.props.metadata,
					item = meta.length -1,
					configure = {
								baseURL: 'https://vpylon.net',
								timeout: 1000,
								headers: {'x-access-token': localStorage.getItem("token")}
					};

					while (-- item > -1) {
						if (meta[item].key == key) {
							meta[item].value = value;
							item = -1;
						}
					}

					axios.put('/api/files/'+comp.props.file_id, {"metadata": comp.props.metadata}, configure)
						.then(function (response) {
							console.log(response);
							console.log("updated file metadata");
						})
						.catch(function (response) {
							console.log("failed updating file metadata");
							console.log(response);
						});
		}

	render () {
        var comp = this,
						appletStyle = {
            	display: this.state.visible ? "inline-block" : "none"
        		},
						input = null;

		return (
			<section style={appletStyle} className="applet file-properties">
          <nav className="panel">
				    <h2>{comp.props.key}</h2>
            <Icon title="Close" src="/images/x.png" open={(evt)=>{ app.systemEvents.emit("close-applet", comp.props.key)}} />
          </nav>
				<table>
					<tbody>
					{this.props.metadata.map(function(option, i){
						return (
							<tr key={i} >
								<td key={1}>{option.key}</td>
								<td key={2}><PropertyEdit keyname={option.key} value={option.value} component={comp} /></td>
							</tr>
						);
					})}
					</tbody>
				</table>
			</section>
		);
	}
}

FileProperties.defaultProps = {
	appletData: { },
	file_id: "",
	key: "File Properties",
	icon: "/images/dark/file.png",
	metadata: [
		{key: "public", value: false},
		{key: "opensWith",  value: ""}
	]
};
