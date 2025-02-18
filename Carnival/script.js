import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls

// Create scene
const scene = new THREE.Scene();

// Load Concrete Texture
const textureLoader = new THREE.TextureLoader();
const concreteTexture = textureLoader.load('/Unknown-3/textures/concrete_floor_worn_001_rough_4k.jpg'); // Replace with your texture image

// Apply texture to material
const groundMaterial = new THREE.MeshStandardMaterial({ 
    map: concreteTexture 
});

// Create a solid rectangular ground block (BoxGeometry)
const groundGeometry = new THREE.BoxGeometry(50, 2, 50); // Width, Height (thickness), Depth
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = -1; // Lower it slightly so the top is at y=0
scene.add(ground);

// Load EXR environment
const exrLoader = new EXRLoader();
exrLoader.load('../syferfontein_18d_clear_puresky_4k.exr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
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
camera.lookAt(0, 0, 0);
scene.add(camera);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = "0"; 
document.body.style.overflow = "hidden"; 
document.body.appendChild(renderer.domElement);

// ✅ Add OrbitControls (Enable Camera Movements)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05; // Resistance to movement
controls.screenSpacePanning = false; // Prevent panning into the ground
controls.minDistance = 5; // Minimum zoom distance
controls.maxDistance = 100; // Maximum zoom distance
controls.maxPolarAngle = Math.PI / 2; // Restrict camera from going below ground

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls in every frame
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
