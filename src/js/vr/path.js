import PathNode from './path-node.js';

export default class Path {
	constructor(coords, length, nodes, mobile, data) {
			var n = !!nodes ? nodes.length -1 : 0,
          size = 6200,
					geometry = new THREE.BoxGeometry(size, 600, length, 6),
          finalGeom = new THREE.Geometry(),
          matOptions = {
            color: 0xff8000
          },
          material = mobile ? new THREE.MeshLambertMaterial(options) : new THREE.MeshPhongMaterial(options);

      while (n >= 0) {
          // do something with nodes[n];
          n -= 1;
      }

			mesh = new THREE.Mesh(geometry, material);
			mesh.position.set((coords[0]*size)+ (coords[2] % 2==0 ? 0 : size / 2), (coords[1]*size)/3, coords[2]*size);

			this.cell = coords;
			this.data = data;
			this.mesh = mesh;
			this.geometry = geometry;
	}
}
