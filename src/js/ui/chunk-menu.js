import React from 'react';

export default class ChunkMenu extends React.Component {
	constructor() {
		super();
        this.state = {filterText: ''}
    }

	render () {
		return (
			<div className="chunk-menu">

			</div>
		);
	}
}

ChunkMenu.defaultProps = {
  cells: []
}
