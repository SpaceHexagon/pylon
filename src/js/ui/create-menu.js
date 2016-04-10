import React from 'react';
import Icon from './icon.js';
import EventEmitter from 'events';

export default class CreateMenu extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            applet: null,
        	visible: false
		};
    }

	toggle (set) {
		this.setState({
			visible: typeof(set.visible) != 'undefined' ? set.visible : !this.state.visible
		});
	}

	componentDidMount () {
		var comp = this;
		console.log(this.props);
		this.props.systemEvents.on("toggle-create-menu", function (evt) {
			comp.toggle(evt);
		});
	}


	bindApplet(applet) {
        this.setState({applet: applet});
    }

	uploadFiles (evt, comp) {
		console.log("uploading files");
		var xhr = new XMLHttpRequest(),
			formData = new FormData(),
			files = document.querySelector("#file-upload").files,
			ins = files.length;
//		app.uploading = true;
//		app.lightbox.setAttribute("class", "lightbox hover");
//		app.lightbox.setAttribute("title", "Uploading...");
//		app.lightbox.setAttribute("style", "pointer-events: all;");
//		app.lightbox.innerHTML = "Uploading...";

		for (var x = 0; x < ins; x++) {
		   formData.append("files[]", files[x]);
		}

		xhr.onload = function () {
			if (xhr.status == 200) {
//				app.uploading = false;
//				app.lightbox.setAttribute("class", "lightbox");
//				app.lightbox.setAttribute("title", "Close");
//				app.lightbox.setAttribute("style", "display: none;");
//				app.lightbox.innerHTML = "";
				console.log("finished uploading");
				alert("Upload Complete");
				//socket.emit("pylon event", {user: app.user.name, dir: app.cwd, type: "refresh"});
			}
		};
		if ("upload" in new XMLHttpRequest) { // add upload progress event
				xhr.upload.onprogress = function (event) {
				if (event.lengthComputable) {
					var complete = (event.loaded / event.total * 100 | 0);
					window.title = "Uploading "+complete+"%";
					//document.querySelector("#lightbox").innerHTML = "Uploading "+complete+"%";
					}
				}
		}

		xhr.open("POST", "/api/files", true);
		xhr.setRequestHeader("x-access-token", localStorage.getItem("token"));
		xhr.send(formData);
		if (!! document.querySelector("#file-upload")) {
			document.querySelector("#file-upload").files = [];
		}
		return false;
	}


	render() {

		var comp = this,
			menuStyle = {
				display: this.state.visible ? "inline-block" : "none"
		},
		uploadInput = "";

		return (
			<aside className="create-menu" style={menuStyle}>
				<ul>
				{this.props.options.map(function(option, i){
					if (option.title == "Upload Files") {
						uploadInput = <input type="file" multiple="multiple" id="file-upload" onChange={(evt)=>{comp.uploadFiles(evt, comp)}} />;
					} else {
						uploadInput = "";
					}
                    return <li key={i} ><Icon src={option.src} title={option.title} open={option.open} text={option.title} uploadInput={uploadInput} /></li>;
                })}
				</ul>
			</aside>
		);
	}
}

CreateMenu.defaultProps = {
    name: 'main',
    options: [
        {src: "/images/dark/upload.png", title: "Upload Files", open: function(){
			console.log("Create / Upload Menu");
		} },
		{src: "/images/dark/file.png", title: "New File", open: function(){ console.log("New File"); } },
		{src: "/images/dark/folder.png", title: "New Folder", open: function(){ console.log("New Folder"); } },
		{src: "/images/dark/star.png", title: "New Page", open: function(){ console.log("New Page"); } },
		{src: "/images/dark/sharing.png", title: "New Share", open: function(){ console.log("New Share"); } },
		{src: "/images/dark/groups.png", title: "New Group", open: function(){ console.log("New Group"); } }

    ]
};

