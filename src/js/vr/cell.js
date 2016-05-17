export default class Cell {
	constructor(coords, mobile, height, data) {
			var size = 6400,
					narrow = size*0.9,
					geometry = new THREE.CylinderGeometry(3400, 3400, !!height ? height : 6400, 6),
					material = new THREE.MeshBasicMaterial(),

			mesh = new THREE.Mesh(geometry, material);

			mesh.position.set((coords[0]*size)+(coords[2] % 2==0 ? 0 : size / 2), (coords[1]*size)/3, coords[2]*narrow);
//+
		 return {
			cell: coords,
			data: data,
			mesh: mesh,
			geometry: geometry
		 }
	}
}
