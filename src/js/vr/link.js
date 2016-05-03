export default class Link {
	constructor(coords) {
		var data = {},
			geometry = new THREE.BoxGeometry(1000, 1000, 1000),
			material = new THREE.MeshLambertMaterial({
             			color: 0xff00ff
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


