import React from 'react';

export default class CellIcon extends React.Component {
	constructor() {
		super();
        this.state = {filterText: ''}
    }

	render () {
		var cellClass = "cell-icon " + this.props.offset; 
		return (
			<div className={cellClass}>

			</div>
		);
	}
}

CellIcon.defaultProps = {
	offset: ""
}
