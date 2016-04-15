export default class World {
	constructor() {
		var scene = new THREE.Scene(),
				camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 2, 100000 ),
				renderer = new THREE.WebGLRenderer(),
			self = this;
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			this.three = {
				scene: scene,
				camera: camera,
				renderer: renderer
			};

			window.three = this.three;

			var geometry = new THREE.OctahedronGeometry( 3, 0),
				material = new THREE.MeshBasicMaterial( {
			//		wireframe: true,
					color: 0xffffff
			//		color: 0x333333
				} ),
				cube = new THREE.Mesh(geometry, material );

			renderer.setClearColor(0x383838);
			scene.add(cube);
			camera.position.z = 15;

			this.skybox = null;


			var skyTexture = THREE.ImageUtils.loadTexture("/images/data-sky.jpg", null, function () {
				var skybox = new THREE.Object3D(), // used to use larger jpeg version sunset-5.jpg
				    skyboxFace = null,
				    skyboxSideMat = new THREE.MeshBasicMaterial({
				        map: skyTexture,
						side: 1,
						fog: false,
                        color:0x50eaff // too dark.. not dark enough? 0x60daff//  0x80faff too green
				    }),
					skyboxTopMat = new THREE.MeshBasicMaterial(),
					x = 0;
				while (x < 4) {
					skyboxFace = new THREE.Mesh(new THREE.PlaneGeometry(60000, 60000, 1, 1), skyboxSideMat);
					skyboxFace.position.set(Math.sin(x*(Math.PI / 2))*30000, 0, Math.cos(x*(Math.PI / 2))*30000 );
					skyboxFace.rotation.y = x*(Math.PI / 2);
					skybox.add(skyboxFace);
					x++;
				}
				self.skybox = skybox;
				three.scene.add(skybox);
				skybox.position.set(three.camera.position.x, 0, three.camera.position.z);
				skyTexture.needsUpdate = true;
			});



//			var groundGeom = new THREE.PlaneGeometry(100000, 100000, 12, 12);
//			var groundMat = new THREE.MeshBasicMaterial({color: 0xf0f0f0});
//			var ground = new THREE.Mesh(groundGeom, groundMat);
//			ground.rotateX(Math.PI / 2);
//			three.scene.add(ground);


			function render () {
				requestAnimationFrame( render );
				cube.rotation.x += 0.0025;
				cube.rotation.y += 0.005;
				renderer.render(scene, camera);
			};

			render();
    }

};

