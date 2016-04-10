import React from 'react';

export default class FileContextMenu extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
			filterText: ''
		}
    }
    handleUserInput(filterText) {
    	// When there's a change in the state, the component and all its sub-components get updated.
        this.setState({filterText: filterText});
    }
	render(){
		return (
			<div className="file-context-menu">
				{this.props.options.map(function(option, i) {
                    return <Icon key={i} src={option.src} title={option.title} open={(evt)=>{option.open(evt, menu);}} />;
                })}
			</div>
		);
	}
}


FileContextMenu.defaultProps = {
    name: 'main',
    options: [
        {src: "/images/dark/x.png", title: "Delete", text: "", open: function(evt, menu) {
			console.log("deleting file");

		} },
		{src: "/images/dark/configure.png", title: "Edit", text: "", open: function(evt, menu) {
			console.log("editing file");

		} },
	]
};
