import * as THREE from 'three';

const scene = new THREE.Scene();

// Plane geometry
const planeGeometry = new THREE.PlaneGeometry(5, 5, 5, 5);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Cube geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000,
    wireframe: true });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-1, 0.25, -1);
scene.add(cube);

// Sphere geometry
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00,
    wireframe: true });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(1, 0.3, -1);
scene.add(sphere);

// Cone geometry
const coneGeometry = new THREE.ConeGeometry(0.3, 0.6, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff,
    wireframe: true });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(-1, 0.3, 1);
scene.add(cone);

// Cylinder geometry
const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 32);
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00,
    wireframe: true });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(1, 0.3, 1);
scene.add(cylinder);

// Torus geometry
const torusGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff,
    wireframe: true });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(0, 0.3, 0);
scene.add(torus);

// Camera setup
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 2; 
camera.lookAt(0, 0, 0); 
scene.add(camera);

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(1000, 800);
document.getElementById("scene").appendChild(renderer.domElement);

// Render the scene
renderer.render(scene, camera);