import React from 'react';
import Icon from './icon.js';
import EventEmitter from 'events';

export default class UserMenu extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
            applet: null,
            resized: false
        };
		this.toggleNotifications = this.toggleNotifications.bind(this);
    }

    componentDidMount () {
		var comp = this;
		this.props.systemEvents.on("window-resized", function (evt) {
			comp.flagResized();
		});
	}

    flagResized () {
        this.setState({resized: !this.state.resized});
    }

	toggleNotifications () {
		this.props.systemEvents.emit("toggle-notifications", {});
		this.props.systemEvents.emit("toggle-activity-view", {visible: false});
		this.props.systemEvents.emit("toggle-search-bar", {visible: false});
		this.props.systemEvents.emit("toggle-create-menu", {visible: false});
	}

	toggleVRMode () {
		app.mode = app.mode == "desktop" ? "vr" : "desktop";
		document.body.setAttribute("class", app.mode);
		this.props.systemEvents.emit("toggle-notifications", {visible: false});
		this.props.systemEvents.emit("toggle-activity-view", {visible: false});
		this.props.systemEvents.emit("toggle-search-bar", {visible: false});
		this.props.systemEvents.emit("toggle-create-menu", {visible: false});
	}

	render() {
		var menu = this;
		return (
			<aside className="user-menu">
			{this.props.options.map(function(option, i){
				var iconSRC = option.src;
				if (window.innerWidth <= 640) {
					iconSRC = iconSRC.replace("/images", "/images/dark");
				}
				return <Icon key={i} src={iconSRC} title={option.title} open={(evt)=>{option.open(evt, menu);}} />;
            })}
			</aside>

		);
	}
}

/**/
/* <Icon key={2} src="/images/messaging.png" title="Messages" text="" open={()=>{ console.log("opening Messaging app.."); }} /> */
UserMenu.defaultProps = {
    name: 'user-menu',
	username: localStorage.getItem("username") || "Guest",
    options: [
			{src:"/images/eye.png", title:"Virtual Reality Mode" , text: "", open: (evt, menu)=>{menu.toggleVRMode(); } },
//			{src:"/images/circle.png", title:"User Preferences" , text: "", open: (evt, menu)=>{} },
			{src:"/images/notification.png", title:"Notifications" , text: "" , open: (evt, menu)=>{ menu.toggleNotifications(); }}
    ]
};

