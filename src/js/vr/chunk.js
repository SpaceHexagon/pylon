import Cell from './cell.js';
import Tile from './tile.js';
import Avatar from './avatar.js';

export default class Chunk {
	constructor(coords, mobile, data) {
			var golden = 1.61803398875,
					material = new THREE.MeshBasicMaterial(),
          cellSize = 6800,
			    mesh = null,
          cellWidth = 6,
					size = cellSize * cellWidth,
          base = new THREE.Geometry(),
          baseMaterial = (app.mobile ? new THREE.MeshLambertMaterial({
             color: 0xffffff
          }) : new THREE.MeshPhongMaterial({
             color: 0xffffff
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
					altitude = Math.floor(globalTurbulence+localTurbulence);
					cell = new Cell([x, altitude, y], mobile, 3200);
          cell.mesh.updateMatrix();
          base.merge(cell.geometry, cell.mesh.matrix);
          y++;
        }
        y = 0;
        x++;
      }
      mesh = new THREE.Mesh(base, baseMaterial);
      mesh.position.set((coords[0]*size)+ (coords[2] % 2==0 ? 0 : size / golden), (coords[1]*size) / 2, coords[2]*size);

     return {
			cell: coords,
			data: data,
			mesh: mesh
		 }
	}

	getMapKey () {
		var coords = this.coords;
		return coords[0]+"."+coords[1]+"."+coords[2];
	}

}
