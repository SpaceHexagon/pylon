export default class UserInput {
	constructor() {
		 return {
			camera: null,
			device: null,
			focus: false,
			rotationVector: {
				x: 0,
				y: 0,
				z: 0
			},
			tmpQuaternion: null,
			moveVector: null,
			keys: {
				w: false, a: false, s: false, d: false, r: false, f: false, shift: false, space: false
			},
			lastTouch: [[0,0], [0,0]],
			leapMotion: false,
			init: function (camera, device) {
				this.connect(camera, device);
				var canvas = document.querySelector("canvas");
				canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
				canvas.onclick = function (event) {
					var elem = event.target;
					elem.requestPointerLock();
					if (!Settings.fullscreen) {
						Settings.toggleFullscreen();
					}
				};
				if ("onpointerlockchange" in document) {
					document.addEventListener('pointerlockchange', lockChangeAlert, false);
				} else if ("onmozpointerlockchange" in document) {
					document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
				} else if ("onwebkitpointerlockchange" in document) {
					document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);
				}
				function lockChangeAlert() {
					UserInput.focus =(document.pointerLockElement===canvas||document.mozPointerLockElement===canvas||document.webkitPointerLockElement===canvas);
					Settings.fullscreen = UserInput.focus;
					if (!Settings.fullscreen && app.user.data.name != "") {
						Settings.showChat();
						app.mode = 0;
						//document.querySelector("#chatMode").click();
					} else {
						if (app.user.data.name != "") {
							app.mode = 1;
						}
					}
				}
				if (!app.mobile) {
					document.addEventListener("mousemove", function (e) {
						if (UserInput.focus) {
						  UserInput.rotationVector.y  -=(e.movementX || e.mozMovementX || e.webkitMovementX || 0) / 300.0;
						  UserInput.rotationVector.x  -=(e.movementY || e.mozMovementY || e.webkitMovementY || 0) / 300.0;
						}
					});
				}
				document.addEventListener("keydown", function (event) {
					if (app.mode) { // 0 = chat, 1 = vr
						switch (event.keyCode) {
							case 87: UserInput.keys.w = true; break;
							case 65: UserInput.keys.a = true; break;
							case 83: UserInput.keys.s = true; break;
							case 68: UserInput.keys.d = true; break;
							case 82: UserInput.keys.r = true; break;
							case 70: UserInput.keys.f = true; break;
							case 16: UserInput.keys.shift = true; break;
							case 32: UserInput.keys.space = true; break;
							case 27: // escape key
								if (app.user.data.name != "") {
									Settings.showChat();
									app.mode = 0;
									//document.querySelector("#chatMode").click();
								}
							break;
						}
					}
				});
				document.addEventListener("keyup", function (event) {
					switch (event.keyCode) {
						case 87: UserInput.keys.w = false; break;
						case 65: UserInput.keys.a = false; break;
						case 83: UserInput.keys.s = false; break;
						case 68: UserInput.keys.d = false; break;
						case 82: UserInput.keys.r = false; break;
						case 70: UserInput.keys.f = false; break;
						case 16: UserInput.keys.shift = false; break;
						case 32: UserInput.keys.space = false; break;
					}
				});
				document.body.addEventListener("touchmove", function(event) {
					var data = event.touches, touch = data.length;
					if (app.mode == 1) {
						event.preventDefault();
						if (touch < 2) {
							UserInput.rotationVector.y += (data[0].pageX - UserInput.lastTouch[0][0]) / 10000.0;
							UserInput.rotationVector.x += (data[0].pageY - UserInput.lastTouch[0][1]) / 10000.0;
							UserInput.lastTouch = [ [data[touch].pageX, data[touch].pageY], [data[touch].pageX, data[touch].pageY]];
						} else {
							while (touch-- > 0) {
								UserInput.moveVector.x -= (data[touch].pageX - UserInput.lastTouch[touch][0])*120;
								UserInput.moveVector.z -= (data[touch].pageY - UserInput.lastTouch[touch][1])*120;
								UserInput.lastTouch[touch] = [data[touch].pageX, data[touch].pageY];
							}
						}
					}
				});
				document.body.addEventListener("touchstart", function(event) {
					var data = event.touches, touch = data.length ;
					UserInput.lastTouch = [[0,0],[0,0]];
					if (app.mode == 1) {
						event.preventDefault();
						while (touch-- > 0) {
							UserInput.lastTouch[touch] = [data[touch].pageX, data[touch].pageY];
						}
					}
				});


				// leap code here
				Leap.loop(function (frame) {
				  var mode = app.mode,
					  input = UserInput;
					UserInput.leapMotion = true;
					if (Settings.leapMode == "movement") {
						frame.hands.forEach(function (hand, index) {
							var position = hand.screenPosition();
							if (mode == 1) { // if its VR mode and not chat mode
								input.moveVector.x = ((-window.innerWidth / 2) + position[0])/3;
								input.moveVector.z = ((-window.innerWidth / 2) + position[2])/3;
								input.rotationVector.y -= 0.025 * hand.yaw(); //((-window.innerWidth / 2) + position[0]) / 3000;
								input.rotationVector.x += 0.015 * hand.pitch();
							}
						});
					} else {
						if (Settings.leapMode == "avatar") {
							frame.hands.forEach(function (hand, index) {
								var position = hand.screenPosition();
								if (mode == 1) { // if its VR mode and not chat mode
									app.user.arms[index].visible = true;
									app.user.arms[index].rotation.set(hand.pitch(), -hand.yaw(), 0);
									app.user.arms[index].position.set(-50+((-window.innerWidth / 2) + position[0]), 0, -350 + position[2]);
									app.user.arms[index].updateMatrix();
								}
							});
						} else {
							frame.hands.forEach(function (hand, index) {
								var position = hand.screenPosition(),
									handIndex = 0;
								if (mode == 1) { // if its VR mode and not chat mode
									app.user.gravity = 0.66;
									if (index == 0) { // if its the first hand, control the camera
										input.moveVector.x = ((-window.innerWidth / 2) + position[0])/3;
										input.moveVector.z = ((-window.innerWidth / 2) + position[2])/3;
										input.rotationVector.y -= 0.025 * hand.yaw(); //((-window.innerWidth / 2) + position[0]) / 3000;
										input.rotationVector.x += 0.015 * hand.pitch();
									} else { // if its the second hand, control the arms/hands
										while (handIndex < 2) {
											app.user.arms[handIndex].visible = true;
											app.user.arms[handIndex].rotation.set(hand.pitch(), -hand.yaw(), 0);
											app.user.arms[handIndex].position.set(-50+((300*handIndex)+((-window.innerWidth / 2) + position[0])), 0, -350 + position[2]);
											app.user.arms[handIndex].updateMatrix();
											handIndex ++;
										}
									}
								}
							});
						}
					}
					// define more leapModes here...

				}).use('screenPosition', {scale: 0.15});


				this.tmpQuaternion = new THREE.Quaternion();
				this.moveVector = new THREE.Vector3(0, 0, 0);
			},
			connect: function (camera, device) {
				this.camera = camera;
				this.device = device;
				device.userInput = this;
			},
			update: function (delta) {
				var elevation = 0; //world.getElevation(this.camera.position);
				this.camera.rotation.set(this.rotationVector.x, this.rotationVector.y, 0, "YXZ");
				this.handleKeys();
				this.device.velocity.add(this.moveVector.applyQuaternion(this.camera.quaternion));
				if (this.device.gravity > 0.25 ) {
					this.device.velocity.y -= 280 * this.device.gravity;
				}
				if (this.leapMotion && this.moveVector.length() > 0) {
					if (this.device.velocity.y < 0) {
						this.device.velocity.y *= 0.88;
					}
				}
				this.moveVector.set(0, 0, 0);
				if (this.camera.position.y < elevation + 500) {
					if (this.keys.shift) {
						this.device.velocity.y *= -0.70;
					} else {
						this.device.velocity.y *= -0.20;
					}
					this.device.falling = false;
					this.camera.position.y = elevation + 500;
					if (this.device.velocity.y > 1000) {
						app.vibrate(50);
					}
				}
				this.camera.matrix.setPosition(this.camera.position.add(new THREE.Vector3(this.device.velocity.x*delta,
																						 this.device.velocity.y*delta,
																						 this.device.velocity.z*delta)) );
				this.camera.matrix.makeRotationFromQuaternion( this.camera.quaternion );
				this.camera.matrixWorldNeedsUpdate = true;
				this.device.velocity.x *= 0.98;
				this.device.velocity.z *= 0.98;
				if (!! app.user.mesh) {
					 app.user.mesh.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
				}
				if (!! app.user.mesh) {
					app.user.mesh.rotation.y = (this.camera.rotation.y); //rotation.set(this.camera.rotation.x, this.camera.rotation.y, this.camera.rotation.z);
				}
			},
			handleKeys: function () {
				if (this.keys.a) {  // maybe insert more options here...
					this.moveVector.x = -120;
				} else if (this.keys.d) {
					this.moveVector.x = 120;
				}
				if (this.keys.w) {
					this.moveVector.z = -120;
				} else if (this.keys.s) {
					this.moveVector.z = 120;
				}
				if (this.keys.r) {
					this.moveVector.y = 120;
				} else if (this.keys.f) {
					this.moveVector.y = -120;
				}
				if (this.keys.shift) {
					this.device.velocity.x *= 1.02;
					this.device.velocity.z *= 1.02;
				}
				if (this.keys.space && !this.device.falling) {
					this.device.falling = true;
					this.device.velocity.y = 16000;
				}
			}
		};
	}
};
