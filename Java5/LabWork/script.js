import * as THREE from 'three';
import GUI from 'lil-gui';

const scene = new THREE.Scene();

// Plane geometry
const planeGeometry = new THREE.PlaneGeometry(5, 5, 5, 5);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;


// Sphere geometry
const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(1, 0.3, -1);

// Cone geometry
const coneGeometry = new THREE.ConeGeometry(0.3, 0.6, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(-1, 0.3, 1);


// Cylinder geometry
const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 32);
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00});
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(1, 0.3, 1);

const gui = new GUI();

const planeControls = gui.addFolder('Plane Controls');
const sphereControls = gui.addFolder('Sphere Controls');
const cylinderControls = gui.addFolder('Cylinder Controls');
const coneControls = gui.addFolder('Cone Controls');

planeControls.addColor(planeMaterial,'color');

sphereControls.add(sphere.position, 'y', 0.3, 3, 0.1).name('Position Y');
sphereControls.add(sphere.position, 'x', -2, 2.5, 0.1).name('Position X');
sphereControls.add(sphere.position, 'z', 0.3, 2.4, 0.1).name('Position Z');


scene.add(cylinder);
scene.add(cone);
scene.add(plane);
scene.add(sphere);


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
const animate = () => {
    requestAnimationFrame(animate);
    
    renderer.render(scene, camera)
}

animate();