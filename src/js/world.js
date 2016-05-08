import Cell from './vr/cell.js';
import Tile from './vr/tile.js';
import Avatar from './vr/avatar.js';

export default class World {
	constructor() {
		var scene = new THREE.Scene(),
            camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 2, 100000 ),
            renderer = new THREE.WebGLRenderer(),
			mobile = app.mobile,
			self = this,
            sunGeom = new THREE.OctahedronGeometry( 3, 0),
            material = new THREE.MeshBasicMaterial( {color: 0xffffff, opacity: 0.9, transparent: true} ),
            cube = new THREE.Mesh(sunGeom, material ),
            light = new THREE.PointLight(0xffffff, 1.1, 400000 ),
            panelMat = new THREE.MeshLambertMaterial({ color: 0xe1e1e1 }),
            cellGeometry = new THREE.CylinderGeometry(192, 192, 128, 6),
            cell = null,
            x = 0,
            y = 0,
            r = 4000;

            renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
			renderer.domElement.setAttribute("id", "viewport");

			this.three = {
				scene: scene,
				camera: camera,
				renderer: renderer
			};

			window.three = this.three;
    	scene.add(light);
			light.position.set(0, 60000, 0);
			renderer.setClearColor(0x2B7CA1);
			scene.add(cube);
			camera.position.z = 15;
			this.skybox = null;

			function render (last) {
				var sys = app,
					camera = three.camera,
					delta = ((Date.now() - last) / 10000),
					time = (Date.now() / 4600),
					image = "";

				if (!! sys.userInput) {
					sys.userInput.update(delta);
				}
				if (sys.sendUpdatePacket == 30) { // send image
					image = "image uri";
					sys.sendUpdatePacket = 0;
				}

				sys.sendUpdatePacket += 1;
				if (sys.sendUpdatePacket %2 == 0 && sys.mode == "vr") {
					socket.emit('user update','{"user":"'+sys.username+'","position": {"x":'+camera.position.x+',"y":'+camera.position.y+',"z":'+camera.position.z+'},'
						+'"quaternion":{"x":'+camera.quaternion.x+',"y":'+camera.quaternion.y+',"z":'+camera.quaternion.z+',"w":'+camera.quaternion.w+'}}');

				}

				cube.rotation.x += 0.0025;
				cube.rotation.y += 0.005;
				sys.world.skybox.position.set(camera.position.x, camera.position.y, camera.position.z);
				renderer.render(scene, camera);
				last = Date.now();
				requestAnimationFrame( function () { render(last); } );
			};

			var skyTexture = THREE.ImageUtils.loadTexture("/images/data-sky-neon-2.jpg", null, function () {
				var skybox = new THREE.Object3D(), // used to use larger jpeg version sunset-5.jpg
				    skyboxFace = null,
				    skyboxSideMat = new THREE.MeshBasicMaterial({
				        map: skyTexture,
								side: 1,
								fog: false,
                color: 0xffffff // too dark.. not dark enough? 0x60daff//  0x80faff too green
				    }),
					x = 0;


				skybox = new THREE.Mesh(new THREE.OctahedronGeometry(80000, 4), skyboxSideMat);
				self.skybox = skybox;
				three.scene.add(skybox);
				skybox.position.set(three.camera.position.x, 0, three.camera.position.z);
				skyTexture.needsUpdate = true;

				render(0);
			});

			var configure = {
				 baseURL: 'https://vpylon.net',
				 timeout: 1000,
				 headers: {'x-access-token': localStorage.getItem("token")}
			};

			//load cells
			axios.get('/api/cells/all', configure)
				.then(function (response) {
					app.cells = response.data;
					app.cells.forEach(function (userCell){
						var cell = new Cell(userCell.cell);
					});
				})
				.catch(function (response) {
					console.log(response);
				});

			while (x < 10) {
				while (y < 10) {
					cell = new Cell([x, Math.floor(Math.sin((x/5)*Math.PI)*Math.cos((y/5)*Math.PI)*1.5), y], mobile);
//						three.scene.add(cell);
//						cell.position.set(-24000 + (x*r), -2000 + Math.floor(Math.random()*4)*256, -24000 + ((y*r)+((x%2)*0.5*r)));
					y++;
				}
				y = 0;
				x++;
			}

//			var groundGeom = new THREE.PlaneGeometry(100000, 100000, 12, 12);
//			var groundMat = new THREE.MeshBasicMaterial({color: 0xf0f0f0});
//			var ground = new THREE.Mesh(groundGeom, groundMat);
//			ground.rotateX(Math.PI / 2);
//			three.scene.add(ground);
    }

};
