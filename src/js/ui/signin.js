import React from 'react';

export default class SignIn extends React.Component {
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

	signin (component, event, signup) {
		if (!! event) {
			event.preventDefault();
		}
		console.log("signin state", this.state.login);

		var xhr = new XMLHttpRequest(),
			mode =  !signup ? "authenticate" : "signup",
			username = document.querySelector("#username").value,
			password = document.querySelector("#password").value;
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				console.log("data", data);
				if (data.success) {
					// data.token
					component.state.login = 2; // authenticate success
					localStorage.setItem("token", data.token);
					console.log("state", component.state.login);
					window.location.href = "/"+username;

				}
			}
		};

		setTimeout(function () {
						if (component.state.login == 0) {
							component.state.login = 1;
							console.log("timeout");
							component.signin(component, null, true);
						}
					}, 1000);

		xhr.open("POST", "/api/"+mode, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("username="+username+"&password="+password);
		console.log("signing in... " + mode);
		return false;
	}

	render() {
        var signinStyle = {
            /* backgroundImage: 'url(' + this.props.src + ')' */
        };

		return (
			<form className="signin" style={signinStyle} onSubmit={(event)=>this.signin(this, event)} >
				<h2>Sign in or Register</h2>
				<div>
					<label>Username</label>
					<input type='text' id='username'/>
				</div>
				<div>
					<label>Password</label>
					<input type='password' id='password'/>
				</div>
				<div>
					<div>
						<label>Remember me?</label>
						<input type='checkbox' id='rememberme'/>
						<input type='submit' id='submit' value="Sign In" />
					</div>
				</div>
			</form>
		);
	}
}
