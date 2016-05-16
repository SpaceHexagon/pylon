export default class Building {
	constructor(coords, height, mobile, data) {
			var size = 6200,
					golden = 1.61803398875,
					geometry = new THREE.CylinderGeometry(3200, 3200, !!height ? height : 6400, 6),
					matOptions = {
						color: 0xffff00
					},
					material = mobile ? new THREE.MeshLambertMaterial(options) : new THREE.MeshPhongMaterial(options);

			mesh = new THREE.Mesh(geometry, material);
			mesh.position.set((coords[0]*size)+ (coords[2] % 2==0 ? 0 : size / 2), (coords[1]*size)/3, coords[2]*size);

			this.cell = coords;
			this.data = data;
			this.mesh = mesh;
			this.geometry = geometry;
	}
}
