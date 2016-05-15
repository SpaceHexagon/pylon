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
				{this.props.chunkRows.map(function(row, i){
					var rowOffset =	(i % 2 == 0 ? "" : "offset");
                    return <ChunkRow key={i} className={rowOffset} chunks={row.chunks}/>;
                })}
				</div>
			</section>
		);
	}
}

ActivityView.defaultProps = {
    name: 'activity-view',
    chunkRows: [{
								chunks: [
										{coords: [-1, 0, -1], cells: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
										{coords: [1, 0, -1], cells: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
								]}, {
									chunks: [
										{coords: [-1, 0, 0], cells: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
										{coords: [0, 0, 0], cells: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
										{coords: [1, 0, 0], cells: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
								]}, {
									chunks: [
										{coords: [-1, 0, 1], cells: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]},
										{coords: [1, 0, 1], cells: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
								]}],
	activities: []
};
