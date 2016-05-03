export default class TitleBar {
	constructor() {
		var name = "New Panel",
			user_id = "user_id",
			data = {},
			mesh = new THREE.Object3D();

		three.scene.add(mesh);

		 return {
			name: name,
			user_id: user_id,
			data: data,
			mesh: mesh
		 }
	}
}
