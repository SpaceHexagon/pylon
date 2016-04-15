import React from 'react';
import Icon from './icon.js';

export default class FileContextMenu extends React.Component {
	constructor() {
		super();
        this.state = {
			expanded: false
		}
    }
    configure() {
    	// When there's a change in the state, the component and all its sub-components get updated.
        this.setState({expanded: !this.state.expanded});
    }
	render(){
		var comp = this,
            menuStyle = {
//                maxWidth: this.state.expanded ? "auto" : 60+"px"
            },
            optionsStyle = {
                height: this.state.expanded ? "auto" : 0+"px"
            };
		return (
			<div className="file-context-menu" style={menuStyle}>
				<Icon src="/images/dark/configure.png" title="Options" open={(evt)=>{comp.configure();}} />
                <ul className="context-options" style={optionsStyle}>
				{this.props.options.map(function(option, i) {
                    return <li key={i}><Icon src={option.src} title={option.title} open={(evt)=>{option.open(evt, menu);}} /></li>;
                })}
                </ul>
			</div>
		);
	}
}


FileContextMenu.defaultProps = {
    name: 'main',
    file_id: "",
    images: /(\.jpg|\.jpeg|\.png|\.webp)$/i,
    documents: /(\.txt|\.text|\.tx|\.md|\.js|\.css|\.html|\.htm|\.jsx|\.sh)$/i,
    multimedia: /(\.gif|\.webm|\.mp4|\.ogg|\.wav|\.midi)$/i,
    options: [
		{src: "/images/dark/download.png", title: "Save", text: "Download", open: function(){ console.log("downloading file.."); } },
        {src: "/images/dark/folder.png", title: "Open", text: "Open", open: function(){ console.log("opening Files app.."); } },
		{src: "/images/dark/edit.png", title: "Edit", text: "Edit", open: function(){ console.log("opening appropriate editing app.."); } },
        {src: "/images/dark/sharing.png", title: "Share", text: "Share", open: function(){ console.log("opening sharing app.."); } },
        {src: "/images/dark/x.png", title: "Delete", text: "Delete", open: function(){ console.log("opening sharing app.."); } },
        {src: "/images/dark/configure.png", title: "Options", text: "Options", open: function(){ console.log("opening sharing app.."); } }
	]
};
//        { src: "/images/dark/x.png", title: "Delete", text: "", open: function(evt, menu) {
//                console.log("deleting file");
//            }
//        }
