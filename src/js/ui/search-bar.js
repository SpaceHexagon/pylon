import React from 'react';
import Icon from './icon.js';

export default class SearchBar extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
			visible: false
		};
    }

    toggle (set) {
		this.setState({
			visible: typeof(set.visible) != 'undefined' ? set.visible : !this.state.visible
		});
	}

	minimize () {
		this.setState({
			visible: false
		});
	}

	componentDidMount () {
		var comp = this;
		console.log(this.props);
		this.props.systemEvents.on("toggle-search-bar", function (evt) {
			comp.toggle(evt);
		});
	}

    handleClick (component, event) {
        component.props.open();
    }

	search (component, event, signup) {
		if (!! event) {
			event.preventDefault();
		}
		console.log("signin state", this.state.login);

		var xhr = new XMLHttpRequest(),
			mode =  !signup ? "authenticate" : "signup",
			terms = document.querySelector("#terms");
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				console.log("data", data);

			}
		};

		xhr.open("POST", "/api/"+mode, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("terms="+terms);
		console.log("Searching.. " + mode);
		return false;
	}

	render() {
        var searchBarStyle = {
			display: this.state.visible ? "inline-block" : "none"
        };

		return (
			<form className="search" style={searchBarStyle} onSubmit={(event)=>this.search(this, event)} >
				<div>
					<label>Terms</label>
					<input type='text' id='terms'/><input type='submit' id='submit' value="Search" />
				</div>
				<ul>
					{this.props.options.map(function(option, i){
                	    return <li><Icon key={i} src={option.src} title={option.title} text={option.title} open={option.open} /></li>;
                	})}
				</ul>
			</form>
		);
	}
}


SearchBar.defaultProps = {
    name: 'main',
    options: [
        {src: "/images/dark/circle.png", title: "People", open: function(){ console.log("opening Activity View"); } },
		{src: "/images/dark/file.png", title: "Files", open: function(){ console.log("opening Files app.."); } },
		{src: "/images/dark/folder.png", title: "Folders", open: function(){ console.log("opening Files app.."); } },
		{src: "/images/dark/star.png", title: "Pages", open: function(){ console.log("opening Messaging app.."); } },
		{src: "/images/dark/messaging.png", title: "Messages", open: function(){ console.log("opening Sharing app.."); } },
		{src: "/images/dark/sharing.png", title: "Shares", open: function(){ console.log("Create / Upload Menu"); } }
    ]
};
