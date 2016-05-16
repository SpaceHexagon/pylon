export default class SocketEvents {
	constructor (sys, sock) {
		sock.on("chat message", function (evt) {
			sys.systemEvents.emit("add-notification", {icon: "/images/dark/messaging.png", title:"Message", text: evt.text })
		});

		sock.on('user update', function (userData) {
						var user,
								userShield,
								sys = app;

						if (userData.username != sys.username) {
							if (sys.users[userData.username] == null) {
								avatar = new Avatar("default", {username: userData.username, profilePicture: userData.image});
								sys.users[userData.username] = {
										"user": userData.username,
										"mesh": avatar.mesh,
										"arms": avatar.arms
								};
							} else {
									user = sys.users[userData.username];
									user.mesh.position.set(userData.position.x, userData.position.y, userData.position.z);
									user.mesh.quaternion.set(userData.quaternion.x, userData.quaternion.x, userData.quaternion.x, userData.quaternion.w);
									if (userData.image != "") {
										user.updateImage(userData.image);
									}
									userData.arms.forEach(function (arm, i) {
										user.arms[i].position.set(arm.pos[0], arm.pos[1], arm.pos[2]);
										user.arms[i].quaternion.set(arm.quat[0], arm.quat[1], arm.quat[2], arm.quat[3]);
									});
							}

						}
		});
	}
}
