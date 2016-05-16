export default class Avatar {
	constructor(name, options) {
		var user_id = "user_id",
				data = {},
				mesh = new THREE.Object3D(),
				userShield = null,
        arm = null,
				arms = [],
        a = 0;

        if (!! options) {
            if (!! options.profilePicture) { // false ) { //
								var img = document.createElement('img');
								img.onload = function (e) {
									var face = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), new THREE.MeshBasicMaterial({side:2, color: 0xffffff, map: new THREE.Texture(e.target)}));
									face.material.map.needsUpdate = true;
									mesh.add(face);
								};
								img.crossOrigin = ''; // no credentials flag. Same as img.crossOrigin='anonymous'
								img.src = options.profilePicture;
						} else {
								mesh = new THREE.Mesh(
									new THREE.OctahedronGeometry(1600, 0),
									new THREE.MeshPhongMaterial({color:0xffffff, wireframe: false})
								);
								userShield = new THREE.Mesh(
									new THREE.OctahedronGeometry(1800, 1),
									new THREE.MeshBasicMaterial({wireframe: false, color: 0xffffff,})
								);
								mesh.add(userShield);
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
