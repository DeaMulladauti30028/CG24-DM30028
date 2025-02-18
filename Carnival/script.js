import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls

// Create scene
const scene = new THREE.Scene();

const loader = new GLTFLoader();
loader.load('/carnival_entrance/scene.gltf', function (gltf) {
    const model = gltf.scene;
    model.position.set(0, 0.1, 34); // Move the model above the ground
    model.scale.set(1.5, 1.5, 1.5); // Resize if needed
    scene.add(model);
}, undefined, function (error) {
    console.error('Error loading model:', error);
});


const textureLoader = new THREE.TextureLoader();
const concreteTexture = textureLoader.load('/Unknown-3/textures/concrete_floor_worn_001_rough_4k.jpg'); 

const groundMaterial = new THREE.MeshStandardMaterial({ 
    map: concreteTexture 
});


const groundGeometry = new THREE.BoxGeometry(70, 2, 70); 
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = -1; 
scene.add(ground);


const exrLoader = new EXRLoader();
exrLoader.load('../syferfontein_18d_clear_puresky_4k.exr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});


const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20); 
camera.lookAt(0, 0, 0);
scene.add(camera);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = "0"; 
document.body.style.overflow = "hidden"; 
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.05; 
controls.screenSpacePanning = false; 
controls.minDistance = 5; 
controls.maxDistance = 100; 
controls.maxPolarAngle = Math.PI / 2; 


function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}
animate();


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
