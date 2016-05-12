export default class Cell {
	constructor(coords, mobile, height, data) {
			var golden = 1.61803398875,
					geometry = new THREE.CylinderGeometry(1600, 1600, !!height ? height : 1600, 6),
					material = new THREE.MeshBasicMaterial(),
			size = 2666.667,
			mesh = new THREE.Mesh(geometry, material);

			mesh.position.set((coords[0]*size)+ (coords[2] % 2==0 ? 0 : size / golden), (coords[1]*size), coords[2]*size);

		 return {
			cell: coords,
			data: data,
			mesh: mesh,
			geometry: geometry
		 }
	}
}
