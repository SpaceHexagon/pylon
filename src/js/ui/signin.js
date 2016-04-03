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

	signin (component, event) {
		console.log("signin state", this.state.login);

		var xhr = new XMLHttpRequest(),
			mode =  this.state.login == 0 ? "authenticate" : "signup",
			username = document.querySelector("#username").value,
			password = document.querySelector("#password").value;
		xhr.onreadystatechange = (function (comp, user) {
			if (xhr.status == 200 && xhr.readyState == 4) {
				var data = JSON.parse(xhr.responseText);
				if (data.success) {
					// data.token
					localStorage.setItem("token", data.token);
					console.log("state", comp.state.login);
					comp.state.login = 2;

				}

			}
		})(component, username);

		setTimeout((function (comp) {
			if (comp.state.login == 0) {
				comp.state.login = 1;
				comp.signin(comp);
			}
		})(component), 2000);

		xhr.open("POST", "/api/authenticate", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("username="+username+"&password="+password);
		console.log("signing in...");
	}

	render() {
        var signinStyle = {
            /* backgroundImage: 'url(' + this.props.src + ')' */
        };

		return (
			<form className="signin" style={signinStyle}  >
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
						<input type='button' id='submit' value="Sign In" onClick={(event)=>this.signin(this, event)}/>
					</div>
				</div>
			</form>
		);
	}
}
