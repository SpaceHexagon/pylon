export default class UIEvents {
	constructor (sys) { // reference to app
		document.body.addEventListener("keydown", function (evt) {
			var visible = true,
					elemType = "",
					systemEvents = sys.systemEvents;

			if (sys.mode == "desktop") {
				if (evt.which == 27) {
					visible = false;
					sys.typeToSearch = true;
				} else if (evt.which == 17) {
					sys.typeToSearch = false;
				}
				if (sys.typeToSearch) {
					elemType = evt.target.tagName.toLowerCase();
					if (elemType != "input" && elemType != "textarea") {
						if (evt.which == 27 || (evt.which > 47 && evt.which < 91)) {
							systemEvents.emit("toggle-search-bar", {visible: visible});
							systemEvents.emit("toggle-activity-view", {visible: false});
							systemEvents.emit("toggle-create-menu", {visible: false});
							systemEvents.emit("toggle-notifications", {visible: false});
							systemEvents.emit("toggle-syslet-views", {visible: false});
						}
					}
				}
			} else {
				if (evt.which == 27) {
					sys.mode = "desktop";
					document.body.setAttribute("class", "desktop");
				}
			}
		}, true);

		document.body.addEventListener("keyup", function (evt) {
			if (evt.which == 17) {
				sys.typeToSearch = true;
			}
		}, true);

		window.onresize = function () {
			var world = sys.world,
					rendererDom = three.renderer.domElement;
		  sys.systemEvents.emit("window-resized", {});
			world.three.renderer.setSize(window.innerWidth, window.innerHeight);
			world.three.renderer.setSize(innerWidth, innerHeight);
			world.three.camera.aspect = innerWidth / innerHeight;
			world.three.camera.updateProjectionMatrix();
			sys.mobile = (window.innerWidth <= 640);
		}

		document.body.ondragover = function () {
		       sys.lightbox.setAttribute("class", "lightbox hover");
		       clearTimeout(sys.lightboxTimeout);
		       sys.lightboxTimeout = setTimeout(function () {
		            if (!sys.uploading) {
		                sys.lightbox.setAttribute("class", "lightbox");
		                sys.lightbox.setAttribute("style", "display: none;");
		            }
		       }, 1000);
		       return false;
		};

		document.body.ondragend = function () {
			sys.lightbox.setAttribute("class", "lightbox"); return false;
		};

		document.body.ondrop = function (e) {
			sys.lightbox.setAttribute("class", "lightbox");
			e.preventDefault();
			document.querySelector("#file-upload").files = e.dataTransfer.files;
		};
	}
}
