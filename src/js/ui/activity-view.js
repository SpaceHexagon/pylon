import React from 'react';
import Icon from './icon.js';
import Card from './card.js';
import ChunkMenu from './chunk-menu.js';
import ChunkRow from './chunk-row.js';
import CellIcon from './cell-icon.js';
import CellEditor from './cell-editor.js';



import EventEmitter from 'events';

export default class ActivityView extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
			visible: false
        };
    }

	toggle (set) {
		this.setState({
			visible: typeof(set.visible) != 'undefined' ? set.visible : !this.state.visible
		});
	}

	componentDidMount () {
		var comp = this,
			configure = {
				 baseURL: 'https://vpylon.net',
				 timeout: 1000,
				 headers: {'x-access-token': localStorage.getItem("token")}
			};

		this.props.systemEvents.on("toggle-activity-view", function (evt) {
			comp.toggle(evt);
		});

		//load cells
		axios.get('/api/cells/all', configure)
			.then(function (response) {
				//comp.setState({cells: response.data});
			})
			.catch(function (response) {
				console.log(response);
			});
	}

	render() {
		var activityViewStyle = {
			display: this.state.visible ? "inline-block" : "none"
        };

		return (
			<section className="activity-view" style={activityViewStyle}>
				<div className="grid">
				{this.props.cells.map(function(option, i){
					var iconSrc = "/images/dark/triangle-"+(i % 2 == 0 ? "round" : "down")+".png";
                    return <Icon key={i} src={iconSrc} title={""} open={()=>{}} />;
                })}
				</div>
			</section>
		);
	}
}

ActivityView.defaultProps = {
    name: 'activity-view',
    cells: [{},{},{},{},{},{},{},{}],
	activities: []
};
