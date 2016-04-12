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
					color: 0xf1f1f1
			//		color: 0x333333
				} ),
				cube = new THREE.Mesh(geometry, material );

			renderer.setClearColor(0xfafafa);
			scene.add(cube);
			camera.position.z = 15;

			this.skybox = null;


			var skyTexture = THREE.ImageUtils.loadTexture("/images/data-sky.png", null, function () {
				var skybox = new THREE.Object3D(), // used to use larger jpeg version sunset-5.jpg
				    skyboxFace = null,
				    skyboxSideMat = new THREE.MeshBasicMaterial({
				        map: skyTexture,
						side: 1,
						fog: false
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




			function render () {
				requestAnimationFrame( render );
				cube.rotation.x += 0.005;
				cube.rotation.y += 0.015;
				renderer.render(scene, camera);
			};

			render();


			window.onresize = function () {
				if (!! three.renderer) {
					three.renderer.setSize(innerWidth, innerHeight);
					three.camera.aspect = innerWidth / innerHeight;
					three.camera.updateProjectionMatrix();
				}
			};
    }

};

