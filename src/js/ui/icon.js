import React from 'react';

export default class Icon extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {

		};
    }

    componentDidMount () {

    }

    handleClick (component, event) {
        component.props.open();
    }

	render() {
        var iconStyle = {
            backgroundImage: 'url(' + this.props.src + ')'
        };

		return (
			<div className="icon" style={iconStyle} title={this.props.title} onClick={(event)=>this.handleClick(this, event)}>

			</div>
		);
	}
}
