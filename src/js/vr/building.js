export default class Building {
	constructor(coords) {
		var data = {},
			geometry = new THREE.CylinderGeometry(3000, 3000, 2000, 3),
			material = new THREE.MeshLambertMaterial({
             			color: 0xffffff
					}),
			mesh = new THREE.Mesh(geometry, material);

		three.scene.add(mesh);
		mesh.position.set(coords[0]*3000, coords[1]*3000, coords[2]*3000);
        mesh.rotation.set(0, Math.PI / 6, 0);

		 return {
			cell: coords,
			data: data,
			mesh: mesh
		 }
	}
}


