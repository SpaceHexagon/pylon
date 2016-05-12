import Cell from './cell.js';
import Tile from './tile.js';
import Avatar from './avatar.js';

export default class Chunk {
	constructor(coords, mobile, data) {
			var golden = 1.61803398875,
					material = new THREE.MeshBasicMaterial(),
          cellSize = 2666.667,
			    mesh = null,
          cellWidth = 16,
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
          localTurbulence = Math.sin((x/cellWidth)*Math.PI*2) * Math.cos((y/cellWidth)*Math.PI*2)*3*(x/cellWidth);
					globalTurbulence = Math.sin(((coords[0]*cellWidth+x)/cellWidth) * Math.PI*2) * Math.cos(((coords[0]*cellWidth+y)/cellWidth)*Math.PI*2);
					altitude = Math.floor(localTurbulence + globalTurbulence);
					cell = new Cell([x, altitude, y], mobile, 1500);
          cell.mesh.updateMatrix();
          base.merge(cell.geometry, cell.mesh.matrix);
          y++;
        }
        y = 0;
        x++;
      }
      mesh = new THREE.Mesh(base, baseMaterial);
      mesh.position.set((coords[0]*size)+ (coords[2] % 2==0 ? 0 : size / golden), (coords[1]*size) / golden, coords[2]*size);

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
