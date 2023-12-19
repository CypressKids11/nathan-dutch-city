import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const objects = [];
let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let isSprinting = false;
let isCrouching = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const loader = new GLTFLoader();
let camera, scene, controls, renderer;

init();
animate();
function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("rgb(135,206,235)");
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 2;
  controls = new PointerLockControls(camera, document.body);
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  instructions.addEventListener("click", function () {
    controls.lock();
  });
  controls.addEventListener("lock", function () {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });
  controls.addEventListener("unlock", function () {
    blocker.style.display = "block";
    instructions.style.display = "";
  });
  scene.add(controls.getObject());

  const onKeyDown = function (event) {
    switch (event.code) {
      case "KeyW":
        moveForward = true;
        break;
      case "KeyS":
        moveBackward = true;
        break;
      case "KeyA":
        moveLeft = true;
        break;
      case "KeyD":
        moveRight = true;
        break;
      case "Space":
        if (canJump === true) velocity.y += 50;
        canJump = false;
        break;
      case "ShiftLeft":
        isSprinting = true;
        break;
      case "KeyC":
        if (isCrouching != true) camera.position.y -= 0.4;
        isCrouching = true;
        break;
    }
  };

  const onKeyUp = function (event) {
    switch (event.code) {
      case "KeyW":
        moveForward = false;
        break;
      case "KeyS":
        moveBackward = false;
        break;
      case "KeyA":
        moveLeft = false;
        break;
      case "KeyD":
        moveRight = false;
        break;
      case "ShiftLeft":
        isSprinting = false;
        break;
      case "KeyC":
        camera.position.y += 0.4;
        isCrouching = false;
        break;
    }
  };
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  raycaster = new THREE.Raycaster(new THREE.Vector3(),new THREE.Vector3(0, -1,0),0,2);

  const light = new THREE.AmbientLight(0xffffff, 1)
  scene.add(light);

  const sunlight = new THREE.PointLight(0xffffff, 10000000);
  sunlight.position.set(0,800,0)
  scene.add(sunlight);

  const sunGeo = new THREE.CircleGeometry(100,64);
  const sunMat = new THREE.MeshLambertMaterial({color: 0xfdb813});
  const sun = new THREE.Mesh(sunGeo,sunMat);
  sun.rotateX(1.57);
  sun.position.set(0,950,0);
  scene.add(sun);


  loader.load("./NathanCity.glb", function(gltf){   //load city file
    let NathanCity = gltf.scene;    //THREE group
    scene.add(NathanCity);  //add city to scene
    NathanCity.traverse(function(obj){  //push each object in city to objects array
        objects.push(obj);
    })
  })

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener('resize',onWindowResize);
}

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}



function animate() {
  requestAnimationFrame(animate);
  const time = performance.now();
  if(controls.isLocked === true){
        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 2;

        const intersections = raycaster.intersectObjects(objects,false);
        const onObjects = intersections.length > 0;
        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 10.0 * delta;

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);   
        direction.normalize();

        if(isSprinting){
          camera.fov = 80
          camera.updateProjectionMatrix();
          if(moveForward||moveBackward) velocity.z -= direction.z * 600.0 * delta;
          if(moveLeft||moveRight) velocity.x -= direction.x *600.0 * delta;
        }else if(isCrouching){
          camera.fov = 70
          camera.updateProjectionMatrix();
          if(moveForward||moveBackward) velocity.z -= direction.z * 150.0 * delta;
          if(moveLeft||moveRight) velocity.x -= direction.x *150.0 * delta;
        }else{
          camera.fov = 75
          camera.updateProjectionMatrix();
          if(moveForward||moveBackward) velocity.z -= direction.z * 400.0 * delta;
          if(moveLeft||moveRight) velocity.x -= direction.x *400.0 * delta;
        }
        if(onObjects === true){
            velocity.y = Math.max(0,velocity.y);
            canJump = true;
        }
        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);
        controls.getObject().position.y += (velocity.y * delta);
        if(controls.getObject().position.y < -100) {

            velocity.y = 0;
            controls.getObject().position.y = 1;

            canJump = true;
        }
    }
    prevTime = time;
    renderer.render(scene, camera);
}
