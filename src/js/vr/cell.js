export default class Cell {
	constructor(coords, mobile) {
		var data = {},
			geometry = new THREE.CylinderGeometry(3000, 3000, 1854, 6),
			material = (mobile ? new THREE.MeshLambertMaterial({
             			color: 0xffffff
					}) : new THREE.MeshPhongMaterial({
             			color: 0xffffff
					})),
			size = 5000,
			mesh = new THREE.Mesh(geometry, material);

		three.scene.add(mesh);
		mesh.position.set((coords[0]*size*1.1)+ (coords[2] % 2==0 ? 0 : size / 1.68), coords[1]*size, coords[2]*size);
       	//mesh.rotation.set(0, (coords[0] % 2==0 ? 0 : Math.PI/2), 0);

		 return {
			cell: coords,
			data: data,
			mesh: mesh
		 }
	}
}


