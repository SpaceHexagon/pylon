export default class Avatar {
	constructor(name, options) {
		var user_id = "user_id",
				data = {},
				mesh = new THREE.Object3D(),
				mat = new THREE.MeshPhongMaterial({color:0xff00ff,
																					specular: 0xffffff,
																					shininess: 30,
																					 shading: THREE.FlatShading}),
				tailGeom = new THREE.BoxGeometry(400, 40, 400),
				bodyGeom = new THREE.BoxGeometry(400, 160, 600),
				headGeom = new THREE.BoxGeometry(600, 40, 600),
				wingGeom = new THREE.BoxGeometry(600, 600, 40),
				tail = new THREE.Mesh(tailGeom, mat),
				body = new THREE.Mesh(bodyGeom, mat),
				head = new THREE.Mesh(headGeom, mat),
				wing = null,
				wings = [],
				userShield = null,
        arm = null,
				arms = [],
        a = 0;

				tail.position.y = -300;
				tail.position.z = 400;
				head.position.y = 400;
				head.position.z = -200;

				tail.rotation.x = Math.PI / 5;
				body.rotation.x = Math.PI / 5;
				head.rotation.x = 2 * Math.PI / 3;

				mesh.add(tail);
				mesh.add(body);
				mesh.add(head);

				while (a < 2) {
					wing = new THREE.Mesh(wingGeom, mat);
					wing.rotation.y = Math.PI / 2;
					wing.rotation.x = Math.PI / 5;
					wing.rotation.z = Math.PI / 5;
					wing.position.set(-400+(800*a), 0, 0);
					wings.push(wing);
					mesh.add(wing);
					a++;
				}
				a = 0;

        if (!! options) {
            if (!! options.profilePicture) {
								var img = document.createElement('img');
								img.onload = function (e) {
									var face = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), new THREE.MeshBasicMaterial({side:2, color: 0xffffff, map: new THREE.Texture(e.target)}));
									face.material.map.needsUpdate = true;
									mesh.add(face);
								};
								img.crossOrigin = ''; // no credentials flag. Same as img.crossOrigin='anonymous'
								img.src = options.profilePicture;
						}
        }

        for (a = 0; a < 2; a++) {
            arm = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 350), new THREE.MeshBasicMaterial({wireframe: true, color:0xffffff}));
            arm.position.set(-150+(a*300), -180, -300);
            arm.visible = false;
            arms.push(arm);
            mesh.add(arm);
        }

        this.mesh = mesh;
				mesh.autoUpdateMatrix = false;
				three.scene.add(mesh);

		 return {
				name: name,
				user_id: user_id,
				data: data,
				arms: arms,
				mesh: mesh,
				tail: tail,
				body: body,
				head: head,
				wings: wings,
				bodyVisible: true,
				toggleBody: function (set) {
					this.mesh.children[2].visible = set;
					this.mesh.children[3].visible = set;
					this.mesh.children[4].visible = set;
				},
				updateImage: function (image) {
						var face = mesh.children[0],
								avatar = mesh;

						avatar.remove(face);
						var img = document.createElement('img');
						img.onload = function (e) {
							var face = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600),
							 													new THREE.MeshBasicMaterial({side:2, color: 0xffffff, map: new THREE.Texture(e.target)}));
							face.material.map.needsUpdate = true;
							avatar.add(face);
						};
						img.crossOrigin = '';
						img.src = image;
				}
		 }
	}
}
