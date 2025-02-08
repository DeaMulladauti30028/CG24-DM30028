import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 0); // Start inside the cube

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);

// Pointer Lock Controls (First-Person Movement)
const controls = new PointerLockControls(camera, document.body);

document.addEventListener('click', () => {
    controls.lock();
});

scene.add(controls.getObject());

const loader = new GLTFLoader();
loader.load(
    'school_desk/scene.gltf',  // Update the path if needed
    function (gltf) {
        const model = gltf.scene;

        // Positions and rotation angles for three desks
        const positions = [
            { x: -7, y: -9.5, z: 5, rotationY: -Math.PI / 4 }, // ~11.25 degrees
            { x: 0, y: -9.5, z: 5, rotationY: -Math.PI / 4  }, // ~9 degrees
            { x: 7, y: -9.5, z: 5, rotationY: -Math.PI / 4 }  // ~10 degrees
        ];

        positions.forEach(pos => {
            const clone = model.clone(); // Clone the model
            clone.position.set(pos.x, pos.y, pos.z);
            clone.scale.set(0.05, 0.05, 0.05); // Adjust scale if necessary
            clone.rotation.y = pos.rotationY; // Apply slight rotation
            scene.add(clone);
        });
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error('Error loading model:', error);
    }
);


// Classroom Cube (Walls)
const classroomGeometry = new THREE.BoxGeometry(30, 20, 20);
const classroomMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.BackSide });
const classroom = new THREE.Mesh(classroomGeometry, classroomMaterial);
scene.add(classroom);

// Floor
const floorGeometry = new THREE.PlaneGeometry(30, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -9.9;
scene.add(floor);

// Window Texture (Outdoor View)
const windowTexture = new THREE.TextureLoader().load('textures/skopje.jpg');
const windowMaterial = new THREE.MeshBasicMaterial({ map: windowTexture, side: THREE.DoubleSide });

// Function to Create a Window with a Frame
function createWindow(position) {
    const frameThickness = 0.2; // Thickness of the frame
    const windowWidth = 5;
    const windowHeight = 6;

    const group = new THREE.Group();

    // Window Pane (Glass)
    const windowGeometry = new THREE.PlaneGeometry(windowWidth, windowHeight);
    const windowPane = new THREE.Mesh(windowGeometry, windowMaterial);
    windowPane.position.set(position.x, position.y, position.z);
    windowPane.rotation.y = -Math.PI / 2; // Rotate 90 degrees on Y-axis
    group.add(windowPane);

    // Window Frame (Border)
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

    // Top and Bottom Frames
    const horizontalFrameGeometry = new THREE.BoxGeometry(windowWidth + frameThickness, frameThickness, frameThickness);
    const topFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
    topFrame.position.set(position.x, position.y + windowHeight / 2, position.z);
    topFrame.rotation.y = -Math.PI / 2; // Rotate frame as well

    const bottomFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
    bottomFrame.position.set(position.x, position.y - windowHeight / 2, position.z);
    bottomFrame.rotation.y = -Math.PI / 2;

    // Left and Right Frames
    const verticalFrameGeometry = new THREE.BoxGeometry(frameThickness, windowHeight, frameThickness);
    const leftFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
    leftFrame.position.set(position.x, position.y, position.z - windowWidth / 2);
    leftFrame.rotation.y = -Math.PI / 2;

    const rightFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
    rightFrame.position.set(position.x, position.y, position.z + windowWidth / 2);
    rightFrame.rotation.y = -Math.PI / 2;

    // Add Frames to Group
    group.add(topFrame);
    group.add(bottomFrame);
    group.add(leftFrame);
    group.add(rightFrame);

    scene.add(group);
}


// Create Two Windows on the Right Wall
createWindow({ x: 14, y: 2, z: -3}); // First Window
createWindow({ x: 14, y: 2, z: 4 });  // Second Window

// Lighting Inside the Cube
// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Overhead Lights (Multiple PointLights for better distribution)
const overheadLightsPositions = [
    { x: -5, y: 8, z: -5 },
    { x: 5, y: 8, z: -5 },
    { x: -5, y: 8, z: 5 },
    { x: 5, y: 8, z: 5 }
];

overheadLightsPositions.forEach(pos => {
    const overheadLight = new THREE.PointLight(0xffffff, 0.8, 20);
    overheadLight.position.set(pos.x, pos.y, pos.z);
    scene.add(overheadLight);

    // Optional: Add light helpers to visualize
    const lightHelper = new THREE.PointLightHelper(overheadLight, 0.5);
    scene.add(lightHelper);
});

// Movement Variables
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const moveSpeed = 0.1;

// Key Controls
const keys = { w: false, s: false, a: false, d: false };

document.addEventListener("keydown", (event) => {
    if (event.code === "KeyW") keys.w = true;
    if (event.code === "KeyS") keys.s = true;
    if (event.code === "KeyA") keys.a = true;
    if (event.code === "KeyD") keys.d = true;
});

document.addEventListener("keyup", (event) => {
    if (event.code === "KeyW") keys.w = false;
    if (event.code === "KeyS") keys.s = false;
    if (event.code === "KeyA") keys.a = false;
    if (event.code === "KeyD") keys.d = false;
});

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);

    if (controls.isLocked) {
        direction.set(0, 0, 0);
        if (keys.w) direction.z -= moveSpeed;
        if (keys.s) direction.z += moveSpeed;
        if (keys.a) direction.x -= moveSpeed;
        if (keys.d) direction.x += moveSpeed;

        direction.applyQuaternion(camera.quaternion);
        velocity.add(direction);
        controls.getObject().position.add(velocity);
        velocity.multiplyScalar(0.9); // Smooth out movement
    }

    renderer.render(scene, camera);
};

animate();

// Responsive Handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});