import React from 'react';

export default class ListView extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {filterText: ''}
    }
    handleUserInput(filterText) {
    	// When there's a change in the state, the component and all its sub-components get updated.
        this.setState({filterText: filterText});
    }
	render(){
        let sections = [];
		let data = this.props.data;

		data.forEach(function(item){
			if (item.name.indexOf(this.props.filterText) === -1) {
				return;
			}
			sections.push(<Section data={item} />);
		}.bind(this));

		return (
			<div htmlClass="list-view">
				{sections}
			</div>
		);
	}
}


