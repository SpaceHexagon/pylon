import React from 'react';

export default class CellEditor extends React.Component {
	constructor() {
		super();
        this.state = {filterText: ''}
    }

	render () {
		return (
			<div className="cell-editor">

			</div>
		);
	}
}

CellEditor.defaultProps = {

}
