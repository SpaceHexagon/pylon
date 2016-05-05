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
		this.props.systemEvents.on("upload-files", function (evt) {
			comp.upload(evt.files, comp);
		});
	}


	bindApplet(applet) {
        this.setState({applet: applet});
    }

	uploadFiles (files, comp) {
		console.log("uploading files");
		var xhr = new XMLHttpRequest(),
			formData = new FormData(),
			ins = files.length,
            thumbs = [],
            images = /(\.jpg|\.jpeg|\.png|\.webp)$/i;

		app.uploading = true;
		app.lightbox.setAttribute("class", "lightbox hover");
		app.lightbox.setAttribute("title", "Uploading...");
		app.lightbox.setAttribute("style", "pointer-events: all;");
		app.lightbox.innerHTML = "<h3>Uploading...</h3>";

		for (var x = 0; x < ins; x++) {
            if (images.test(files[x].name)) {
                thumbs.push(files[x]);
            }
		   formData.append("files[]", files[x]);
		}

		xhr.onload = function () {
			if (xhr.status == 200) {
				app.uploading = false;
				app.lightbox.setAttribute("class", "lightbox");
				app.lightbox.setAttribute("title", "Close");
				app.lightbox.setAttribute("style", "display: none;");
				app.lightbox.innerHTML = "";
				console.log("finished uploading");
				comp.props.systemEvents.emit("add-notification", {
					icon: "/images/dark/upload.png",
					title: "Upload Complete",
					text:"File Upload Complete.",
				});
				socket.emit("pylon event", {type: "refresh", user: app.username, dir: app.cwd});
			}
		};

		xhr.open("POST", "/api/files", true);
		xhr.setRequestHeader("x-access-token", localStorage.getItem("token"));
		if ("upload" in new XMLHttpRequest) { // add upload progress event
				xhr.upload.onprogress = function (event) {
				if (event.lengthComputable) {
					var complete = (event.loaded / event.total * 100 | 0);
					app.lightbox.innerHTML = "<h3>Uploading "+complete+"%</h3>";
				}
            }
		}

        if (thumbs.length < 1) {
             xhr.send(formData);
        } else {
            comp.uploadThumbs(thumbs, function () {
                console.log("thumbnail upload callback");
                xhr.send(formData);
            });
        }

		if (!! document.querySelector("#file-upload")) {
			document.querySelector("#file-upload").files = [];
		}
		return false;
	}

    uploadThumbs (files, callback) {
		var xhr = new XMLHttpRequest(),
			formData = new FormData(),
			ins = files.length,
			thumbs = files.length;

        console.log("uploading thumbs");

		for (var x = 0; x < ins; x++) {
            var reader = new FileReader(),
				file = files[x];
            reader.onload = function(event){
                var img = new Image();
                img.onload = function() {
                    var canvas = document.createElement("canvas"),
                        ctx = canvas.getContext("2d"),
						shortest = 1,
						padding = [0, 0];

					if (img.width > img.height) {
						padding[0] = (img.width - img.height) / 2;
					} else {
						padding[1] = (img.height - img.width) / 2;
					}

                    canvas.setAttribute("style", "display: none;");
                    document.body.appendChild(canvas);
					shortest = Math.min(img.width, img.height);
                    canvas.width = 1024;
                    canvas.height = 1024;
                    ctx.drawImage(img, padding[0], padding[1], shortest, shortest, 0, 0, 1024, 1024);

                	var dataURL = canvas.toDataURL("image/jpeg", 0.75);
					formData.append(files[thumbs-1].name, dataURL);

					if (thumbs == 1) {
						console.log("finished processing thumbnails");
						xhr.send(formData);
					}
					thumbs --;
				}
                img.src = event.target.result;
            }
            reader.readAsDataURL(files[x]);
		}

		xhr.onload = function () {
			if (xhr.status == 200) {
				console.log("finished uploading thumbs");
				//callback();
            }
		};

		xhr.open("POST", "/api/thumbs", true);
        if ("upload" in new XMLHttpRequest) { // add upload progress event
            xhr.upload.onprogress = function (event) {
                if (event.lengthComputable) {
                    var complete = (event.loaded / event.total * 100 | 0);
                    console.log("uploading thumbnail "+complete);
                }
            }
        }
		xhr.setRequestHeader("x-access-token", localStorage.getItem("token"));
//      xhr.send(formData);

        callback();
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
						uploadInput = <input type="file" multiple="multiple" id="file-upload" onChange={(evt)=>{comp.uploadFiles(evt.target.files, comp)}} />;
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
		{src: "/images/dark/folder.png", title: "New Folder", open: function(evt, menu) {
			app.systemEvents.emit("toggle-create-menu", {visible: false});
            app.systemEvents.emit("toggle-applet-view", {visible: true});
			app.systemEvents.emit("open-applet", {name:"file-browser", data:{newFolder: true}});
            console.log("Open File Browser Applet");
        } },
		{src: "/images/dark/star.png", title: "New Page", open: function(){ console.log("New Page"); } },
		{src: "/images/dark/sharing.png", title: "New Share", open: function(){ console.log("New Share"); } },
		{src: "/images/dark/groups.png", title: "New Group", open: function(){ console.log("New Group"); } }

    ]
};

