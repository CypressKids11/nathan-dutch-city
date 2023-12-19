import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshLambertMaterial( {color:0x25b419});
const cube = new THREE.Mesh(geometry,material);
cube.position.x = -50;
cube.position.y = -20;
scene.add(cube);

const geometry1 = new THREE.BoxGeometry(10,10,10);
const material1 = new THREE.MeshLambertMaterial( {color:0x19b4ab});
const cube1 = new THREE.Mesh(geometry1,material1);
cube1.position.x = 50;
cube1.position.y = 20;
scene.add(cube1);

const geometry2 = new THREE.BoxGeometry(10,10,10);
const material2 = new THREE.MeshLambertMaterial( {color:0xb42222});
const cube2 = new THREE.Mesh(geometry2,material2);
cube2.position.x = 50;
cube2.position.y = -20
scene.add(cube2);

const geometry3 = new THREE.BoxGeometry(10,10,10);
const material3 = new THREE.MeshLambertMaterial( {color:0xffff00});
const cube3 = new THREE.Mesh(geometry3,material3);
cube3.position.x = -50;
cube3.position.y = 20;
scene.add(cube3);

const geometry7 = new THREE.BoxGeometry(10,10,10);
const material7 = new THREE.MeshLambertMaterial( {color:0x25b419});
const cube7 = new THREE.Mesh(geometry7,material7);
cube7.position.x = -50;
cube7.position.y = -20;
cube7.position.z = 50;
scene.add(cube7);

const geometry6 = new THREE.BoxGeometry(10,10,10);
const material6 = new THREE.MeshLambertMaterial( {color:0x19b4ab});
const cube6 = new THREE.Mesh(geometry6,material6);
cube6.position.x = 50;
cube6.position.y = 20;
cube6.position.z= 50;
scene.add(cube6);

const geometry5 = new THREE.BoxGeometry(10,10,10);
const material5 = new THREE.MeshLambertMaterial( {color:0xb42222});
const cube5 = new THREE.Mesh(geometry5,material5);
cube5.position.x = 50;
cube5.position.y = -20;
cube5.position.z = 50;
scene.add(cube5);

const geometry4 = new THREE.BoxGeometry(10,10,10);
const material4 = new THREE.MeshLambertMaterial( {color:0xffff00});
const cube4 = new THREE.Mesh(geometry4,material4);
cube4.position.x = -50;
cube4.position.y = 20;
cube4.position.z = 50;
scene.add(cube4);

const geometry10 = new THREE.BoxGeometry(10,10,10);
const material10 = new THREE.MeshLambertMaterial( {color:0x25b419});
const cube10 = new THREE.Mesh(geometry10,material10);
cube10.position.x = -50;
cube10.position.y = -20;
cube10.position.z = -50;
scene.add(cube10);

const geometry11 = new THREE.BoxGeometry(10,10,10);
const material11 = new THREE.MeshLambertMaterial( {color:0x19b4ab});
const cube11 = new THREE.Mesh(geometry11,material11);
cube11.position.x = 50;
cube11.position.y = 20;
cube11.position.z= -50;
scene.add(cube11);

const geometry8 = new THREE.BoxGeometry(10,10,10);
const material8 = new THREE.MeshLambertMaterial( {color:0xb42222});
const cube8 = new THREE.Mesh(geometry8,material8);
cube8.position.x = 50;
cube8.position.y = -20;
cube8.position.z = -50;
scene.add(cube8);

const geometry9 = new THREE.BoxGeometry(10,10,10);
const material9 = new THREE.MeshLambertMaterial( {color:0xffff00});
const cube9 = new THREE.Mesh(geometry9,material9);
cube9.position.x = -50;
cube9.position.y = 20;
cube9.position.z = -50;
scene.add(cube9);

const light = new THREE.PointLight(0xffffff, 10000);
scene.add(light)

camera.position.z = 50;

controls.update();

function animate(){
    requestAnimationFrame( animate );
    cube1.rotation.x += 0.08
    cube1.rotation.y += 0.01
    cube1.rotation.z += 0.10
    cube.rotation.x += 0.08
    cube.rotation.y += 0.01
    cube.rotation.z += 0.10
    cube2.rotation.x += 0.08
    cube2.rotation.y += 0.01
    cube2.rotation.z += 0.10
    cube3.rotation.x += 0.08
    cube3.rotation.y += 0.01
    cube3.rotation.z += 0.10
    
    cube4.rotation.x += 0.08
    cube4.rotation.y += 0.01
    cube4.rotation.z += 0.10
    cube5.rotation.x += 0.08
    cube5.rotation.y += 0.01
    cube5.rotation.z += 0.10
    cube6.rotation.x += 0.08
    cube6.rotation.y += 0.01
    cube6.rotation.z += 0.10
    cube7.rotation.x += 0.08
    cube7.rotation.y += 0.01
    cube7.rotation.z += 0.10

    cube11.rotation.x += 0.08
    cube11.rotation.y += 0.01
    cube11.rotation.z += 0.10
    cube10.rotation.x += 0.08
    cube10.rotation.y += 0.01
    cube10.rotation.z += 0.10
    cube9.rotation.x += 0.08
    cube9.rotation.y += 0.01
    cube9.rotation.z += 0.10
    cube8.rotation.x += 0.08
    cube8.rotation.y += 0.01
    cube8.rotation.z += 0.10    
    controls.update
    renderer.render(scene,camera);
}
animate();



