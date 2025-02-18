import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create scene
const scene = new THREE.Scene();

// Function to load models dynamically
function loadModel(path, position, scale, rotationY = 0) {
    const loader = new GLTFLoader();
    loader.load(path, function (gltf) {
        const model = gltf.scene;
        model.position.set(position.x, position.y, position.z);
        model.scale.set(scale, scale, scale);
        model.rotation.y = rotationY;
        scene.add(model);
    }, undefined, function (error) {
        console.error('Error loading model:', error);
    });
}

// Load existing models
loadModel('/carnival_entrance/scene.gltf', { x: 0, y: 0.1, z: 34 }, 1.5);
loadModel('/stylized_carnival_booth/scene.gltf', { x: 0, y: 0.1, z: 34 }, 1.5);

// Load new models with better positioning and size
loadModel('/models/roller_coaster.glb', { x: -18, y: 0, z: 8 }, 1.6, Math.PI /1);
loadModel('/models/ferriswheel.glb', { x: 7, y: -25, z: -25 }, 1, Math.PI / 2);
loadModel('/models/christmas_carousel.glb', { x: 20, y: -1, z: -1}, 1.6);

// Load ground texture
const textureLoader = new THREE.TextureLoader();
const concreteTexture = textureLoader.load('/Unknown-3/textures/concrete_floor_worn_001_rough_4k.jpg');

const groundMaterial = new THREE.MeshStandardMaterial({ map: concreteTexture });
const groundGeometry = new THREE.BoxGeometry(70, 2, 70);
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = -1;
scene.add(ground);

// Load EXR background
const exrLoader = new EXRLoader();
exrLoader.load('../syferfontein_18d_clear_puresky_4k.exr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);
scene.add(camera);

// Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.appendChild(renderer.domElement);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 5;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize listener
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
