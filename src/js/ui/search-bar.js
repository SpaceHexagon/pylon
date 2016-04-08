import React from 'react';

export default class SearchBar extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {
			login: 0
		};
    }

    componentDidMount () {

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
				if (data.success) {
					// data.token
					component.state.login = 2; // authenticate success
					localStorage.setItem("token", data.token);
					console.log("state", component.state.login);

				}
			}
		};

		xhr.open("POST", "/api/"+mode, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("terms="+terms);
		console.log("signing in... " + mode);
		return false;
	}

	render() {
        var signinStyle = {
            /* backgroundImage: 'url(' + this.props.src + ')' */
        };

		return (
			<form className="search" style={signinStyle} onSubmit={(event)=>this.search(this, event)} >
				<h2>Sign in or Register</h2>
				<div>
					<label>Terms</label>
					<input type='text' id='terms'/>
				</div>
				<div>
					<div>
						<label>Remember me?</label>
						<input type='checkbox' id='rememberme'/>
						<input type='submit' id='submit' value="Search" />
					</div>
				</div>
				<ul>
					{this.props.options.map(function(option, i){
                	    return <li><Icon key={i} src={option.src} title={option.title} open={option.open} /><span className="title">{option.title}</span></li>;
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
		{src: "/images/dark/sharing.png", title: "Comments", open: function(){ console.log("Create / Upload Menu"); } },
        {src: "/images/dark/plus.png", title: "Comments", open: function(){ console.log("Create / Upload Menu"); } }
//      {src: "/images/dark/notification.png", title: "Notifications", open: function(){ console.log("opening Notification app.."); } },
//		{src: "/images/dark/configure.png", title: "Settings", open:function(){ console.log("opening Settings app.."); } },
    ]
};
