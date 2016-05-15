import React from 'react';
import ChunkMenu from './chunk-menu.js';

export default class ChunkRow extends React.Component {
	constructor() {
		super();
        this.state = {filterText: ''}
    }

	render () {
		return (
			<div className={"chunk-row"+this.props.offset}>
      {this.props.chunks.map(function (chunk, i) {
        return <ChunkMenu key={i} cells={chunk.cells} coords={chunk.coords} />;
      })}
			</div>
		);
	}
}

ChunkRow.defaultProps = {
  chunks: [],
	offset: ""
}
