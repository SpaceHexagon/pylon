export default class PathNode {
	constructor(coords, mobile, data) {
			var size = 6200,
					geometry = new THREE.CylinderGeometry(size, size, 600, 6),
					material = new THREE.MeshBasicMaterial(),

			mesh = new THREE.Mesh(geometry, material);

			mesh.position.set((coords[0]*size)+ (coords[2] % 2==0 ? 0 : size / 2), (coords[1]*size)/3, coords[2]*size);

		 return {
			cell: coords,
			data: data,
			mesh: mesh,
			geometry: geometry
		 }
	}
}
