import React from 'react';

export default class Icon extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
			callback: function () {

			}
		};
    }
    handleClick() {
    	// When there's a change in the state, the component and all its
    	// sub-components get updated.
        this.state.callback();
    }
	render(){
        var iconStyle = {
          backgroundImage: 'url(' + this.props.src + ')'
        };

		return (
			<div className="icon" style={iconStyle} title={this.props.title}>

			</div>
		);
	}
}
