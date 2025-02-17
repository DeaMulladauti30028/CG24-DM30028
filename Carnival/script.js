import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

// Create scene
const scene = new THREE.Scene();

// Create ground plane
const groundGeometry = new THREE.PlaneGeometry(50, 50); // Large flat ground
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Green ground
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Lay it flat
scene.add(ground);


const exrLoader = new EXRLoader();
exrLoader.load('../syferfontein_18d_clear_puresky_4k.exr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture; // Adds reflections to objects
});

// Add ambient light (General brightness)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// Add directional light (Creates shadows and depth)
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20); // Position the camera for a better view
camera.lookAt(0, 0, 0); // Look at the center of the scene
scene.add(camera);

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = "0"; // Remove margins
document.body.style.overflow = "hidden"; // Prevent scrolling
document.body.appendChild(renderer.domElement);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
