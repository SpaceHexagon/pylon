import Cell from './cell.js';
import Tile from './tile.js';
import Avatar from './avatar.js';

export default class Chunk {
	constructor(coords, mobile, data) {
		var material = new THREE.MeshBasicMaterial(),
				finalGeom = new THREE.Geometry(),
				cellGeom = new THREE.CylinderGeometry(3500, 3500, 5600, 6),
				tallCell = new THREE.CylinderGeometry(3400, 3400, 11200, 6),
				cellSize = 6200,
				narrow = cellSize*0.9,
				mesh = null,
				bsp = null,
				cellMesh = null,
				cellWidth = 6,
				chunkWidth = cellSize * cellWidth,
				chunkLength = 3200 * 6 * Math.sqrt(3),
				base = new THREE.Geometry(),
				baseMaterial = (app.mobile ? new THREE.MeshLambertMaterial({
					color: (coords[0]+coords[2])%3 == 0 ? 0xdfdfdf : 0xffffff,
					shading: THREE.FlatShading
				}) : new THREE.MeshPhongMaterial({
					color: (coords[0]+coords[2])%3 == 0 ? 0xdfdfdf : 0xffffff,
					specular: 0xffffff,
					shininess: 20,
					shading: THREE.FlatShading
				})),
				cell = null,
				localTurbulence = 0,
				globalTurbulence = 0,
				altitude = 0,
				x = 0,
				y = 0;

		while (x < cellWidth) {
			while (y < cellWidth) {
				globalTurbulence = Math.sin((coords[0]/12)*Math.PI*2) * Math.cos(((coords[2]/12)+y/cellWidth*12)*Math.PI*2) * 6;
				altitude = Math.floor(globalTurbulence + localTurbulence);
				cellMesh = new THREE.Mesh(cellGeom, material);
				cellMesh.position.set((x*cellSize)+(y % 2==0 ? 0 : cellSize / 2), (altitude * cellSize)/4, y*narrow);
				cellMesh.updateMatrix();
				base.merge(cellGeom, cellMesh.matrix);
				// if (x == 0 && y == 0) {
				// 	bsp = new ThreeBSP(cellMesh);
				// } else {
				// 	bsp = bsp.union(new ThreeBSP(cellMesh));
				// }
				y++;
			}
			y = 0;
			x++;
		}
		//finalGeom = bsp.toGeometry();
		mesh = new THREE.Mesh(base, baseMaterial);
		mesh.position.set((coords[0]*chunkWidth)+ (coords[2] % 2==0 ? 0 : chunkWidth / 2), (coords[1]*chunkWidth) / 2, coords[2]*chunkLength);

		this.cell = coords;
		this.data = data;
		this.mesh = mesh;
		this.getMapKey = function () {
			var coords = this.coords;
			return coords[0]+"."+coords[1]+"."+coords[2];
		};
	}
}
