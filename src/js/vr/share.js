export default class Share {
	constructor(coords) {
		var data = {},
			geometry = new THREE.OctahedronGeometry(1000, 0),
			material = new THREE.MeshLambertMaterial({
             			color: 0xffffff
					}),
			mesh = new THREE.Mesh(geometry, material);

		three.scene.add(mesh);
		mesh.position.set(0, -1500, -750);
        mesh.rotation.set(0, Math.PI / 6, 0);

		 return {
			cell: coords,
			data: data,
			mesh: mesh
		 }
	}
}


