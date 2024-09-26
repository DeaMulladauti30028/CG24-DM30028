import * as THREE from 'three';

const scene = new THREE.Scene();
const boxGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
const boxMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff0000 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);

const sphereGeometry = new THREE.SphereGeometry( 0.5, 32, 32 ); 
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

const sphere1Geometry = new THREE.SphereGeometry( 0.4, 32, 32 ); 
const sphere1Material = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
const sphere1 = new THREE.Mesh( sphere1Geometry, sphere1Material );

const sphere2Geometry = new THREE.SphereGeometry( 0.6, 32, 32 ); 
const sphere2Material = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
const sphere2 = new THREE.Mesh( sphere2Geometry, sphere2Material );

scene.add(sphere1);

scene.add(sphere2);

scene.add(sphere);
scene.add(box)

const sizes = {
    width: 800,
    height: 600
}


// mesh.scale.x =1;
// mesh.scale.y =3;

// box.rotation.x = Math.PI/4;
// box.position.x= -1;

sphere1.position.y = 0.9;
sphere2.position.y = -1;
box.position.y = 1.5;


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 2;
camera.rotation.y = 3.14/4;

scene.add(camera);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600)
document.getElementById("scene").appendChild(renderer.domElement);


renderer.render(scene, camera)