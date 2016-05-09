import Cell from './cell.js';
import Tile from './tile.js';
import Avatar from './avatar.js';

export default class Chunk {
	constructor(coords, mobile, data) {
			var golden = 1.61803398875,
					material = new THREE.MeshBasicMaterial(),
			    size = 2666.667 * 12,
			    mesh = null,
          cellWidth = 12,
          base = new THREE.Geometry(),
          baseMaterial = (app.mobile ? new THREE.MeshLambertMaterial({
             color: 0xffffff
          }) : new THREE.MeshPhongMaterial({
             color: 0xffffff
          })),
          cell = null,
          localTurbulence = 0,
          globalTurbulence = 0,
          x = 0,
          y = 0;

      while (x < cellWidth) {
        while (y < cellWidth) {
          localTurbulence = Math.sin((x/(cellWidth)/2)*Math.PI) * Math.cos((y/(cellWidth)/2)*Math.PI)*2;
          globalTurbulence = Math.sin((x/(cellWidth)/6)*Math.PI) * Math.cos((y/(cellWidth)/6)*Math.PI)*6;
          cell = new Cell([-(cellWidth/2)+x, Math.floor(localTurbulence + globalTurbulence), -(cellWidth/2)+y], mobile);
          cell.mesh.updateMatrix();
          base.merge(cell.geometry, cell.mesh.matrix);
          y++;
        }
        y = 0;
        x++;
      }
      mesh = new THREE.Mesh(base, baseMaterial);
      mesh.position.set((coords[0]*size*1.1)+ (coords[2] % 2==0 ? 0 : size / 1.618), (coords[1]*size) / golden, coords[2]*size);

     return {
			cell: coords,
			data: data,
			mesh: mesh
		 }
	}
}
