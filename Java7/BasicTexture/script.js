
import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('textures/bota.jpg');

// texture.wrapS = THREE.RepeatWrapping; // Enable repeat horizontally
// texture.wrapT = THREE.RepeatWrapping; // Enable repeat vertically
// texture.repeat.set(4, 4); // Tile the texture 4 times in both directions

const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32), material);

//

scene.add(sphere);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();