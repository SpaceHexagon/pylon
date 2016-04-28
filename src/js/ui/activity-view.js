import React from 'react';
import Icon from './icon.js';
import Card from './card.js';
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
		var comp = this;
		console.log(this.props);
		this.props.systemEvents.on("toggle-activity-view", function (evt) {
			comp.toggle(evt);
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
                    return <Icon key={i} src={option.src} title={option.title} open={option.open} />;
                })}
				</div>
			</section>
		);
	}
}

ActivityView.defaultProps = {
    name: 'activity-view',
    cells: [],
	activities: []
};

