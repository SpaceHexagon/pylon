export default class Panel {
	constructor(coords, direction, mobile, data) {
		var data = {},
			geometry = new THREE.BoxGeometry(1200, 1854, 3000),
			material = (mobile ? new THREE.MeshLambertMaterial({
             			color: 0xffffff
					}) : new THREE.MeshPhongMaterial({
             			color: 0xffffff
					})),
			size = 5000,
			mesh = new THREE.Mesh(geometry, material);

		three.scene.add(mesh);
		mesh.position.set((coords[0]*size*1.1)+ (coords[2] % 2==0 ? 0 : size / 1.68), coords[1]*size, coords[2]*size);
    mesh.rotation.set(0, (direction * (Math.PI / 3)), 0);

		 return {
			cell: coords,
      direction: direction,
			data: data,
			mesh: mesh
		 }
	}
}
