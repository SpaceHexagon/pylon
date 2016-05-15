import React from 'react';

export default class ChunkRow extends React.Component {
	constructor() {
		super();
        this.state = {filterText: ''}
    }

	render () {
		return (
			<div className="chunk-row">

			</div>
		);
	}
}

ChunkRow.defaultProps = {
  chunks: []
}
