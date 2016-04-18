import React from 'react';
import Icon from './icon.js';
import Card from './card.js';
import FileContextMenu from './file-context-menu.js';

export default class SearchBar extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
			visible: false,
			results: [],
			lastSearch: ""
		};
    }

    toggle (set) {
		var input = null;
		this.setState({
			visible: typeof(set.visible) != 'undefined' ? set.visible : !this.state.visible
		});
		if (this.state.visible) {
			input = document.querySelector("#terms");
			input.focus();
			input.select();
		}
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

	handleKeyDown (comp, evt) {
		if (evt.which == 27) {
			comp.toggle({visible: false});
		} else {
			if (comp.state.lastSearch != evt.target.value) {
				comp.search(comp, event);
			}
			comp.setState({lastSearch: evt.target.value});
		}
	}

	search (component, event) {
		if (!! event) {
			event.preventDefault();
		}

		component.setState({results: []});

		var xhr = new XMLHttpRequest(),
			mode =  "files",
			terms = document.querySelector("#terms").value;
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				component.setState({results: data});
			}
		};

		xhr.open("GET", "/api/"+mode+"/search/"+terms, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("x-access-token", localStorage.getItem("token"));
		xhr.send();
		console.log("searching " + mode +"...");
		return false;
	}

	render() {
        var searchBarStyle = {
				display: this.state.visible ? "inline-block" : "none"
        	},
			fileTypes = this.props.fileTypes;

		return (
			<form className="search" style={searchBarStyle} onSubmit={(event)=>this.search(this, event)} >
				<div className="options">
					<div className="searchInputs">
						<input type='text' id='terms' onKeyDown={(event)=>this.handleKeyDown(this, event)}/><input type='submit' id='submit' value="Search" />
					</div>
					<ul className="modes">
						{this.props.options.map(function(option, i){
							return <li key={i} ><Icon src={option.src} title={option.title} text={option.title} open={option.open} /></li>;
						})}
					</ul>
				</div>
					<ul className="results">
					{this.state.results.map(function(result, i){
					 	var cardSrc = fileTypes[result.contentType] || "",
					 		fileURL = "/api/files/"+result.filename+"?token="+localStorage.getItem("token"),
					 		thumbURL = "/api/thumbs/"+result.filename+"?token="+localStorage.getItem("token"),
					 		cardBG = /(\.jpg|\.png|.jpeg)$/.test(result.filename) ? thumbURL : "",
							cardText = ""; /*" Type "+result.contentType+" Length "+result.length+" Date "+result.uploadDate+" URL "+localStorage.getItem("username")+".vpylon.net/"+result.filename;*/
						return <li key={i} ><Card CardIcon={<Icon src={cardSrc} open={()=>{ /*window.location.href = fileURL;*/ }} link={fileURL} title={result.filename} />}
								   thumbURL={cardBG} title={result.filename} text={cardText} link={fileURL} contextMenu={<FileContextMenu file_id={result._id} />}/></li>;
                	})}
				</ul>

			</form>
		);
	}
}

SearchBar.defaultProps = {
    name: 'main',
	results: [],
    options: [
        {src: "/images/dark/circle.png", title: "People", open: function() {
			console.log("searching for people"); } },
		{src: "/images/dark/file.png", title: "Files", open: function() {
			console.log("searching for files"); } },
		{src: "/images/dark/folder.png", title: "Folders", open: function() {
			console.log("searching for folders"); } },
		{src: "/images/dark/star.png", title: "Pages", open: function() {
			console.log("searching for pages"); } },
		{src: "/images/dark/messaging.png", title: "Messages", open: function() {
			console.log("searching for messages"); } },
		{src: "/images/dark/sharing.png", title: "Shares", open: function() {
			console.log("searching for shares"); } },
		{src: "/images/dark/groups.png", title: "Groups", open: function(){
			console.log("Searching Groups"); } }
    ],
	fileTypes: {
		"image/png": "/images/files/image.png",
		"image/jpeg": "/images/files/image.png",
		"text/plain": "/images/dark/file.png",
		"text/json": "/images/dark/file.png"
	}
};
