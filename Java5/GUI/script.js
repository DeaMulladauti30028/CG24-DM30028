import * as THREE from 'three';
import GUI from 'lil-gui';

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

const gui = new GUI();

const boxControls = gui.addFolder('Box Controls');

boxControls.add(mesh.position, 'y', -3 , 3, 0.1).name('Position Y');
boxControls.add(mesh.position, 'x', -3 , 3, 0.1).name('Position X');

boxControls.add(mesh.rotation, 'z', -Math.PI, Math.PI, 0.1);

boxControls.addColor(material,'color');

boxControls.add(material,'wireframe');

var rotateSpeed = {
    y: 0.1 // Default rotation speed
};

// Add a toggle button to start/stop rotation
const startRotate = () => {
    if (rotateSpeed.y !== 0) {
        rotateSpeed.y = 0;
    } else {
        rotateSpeed.y = 0.1;
    }
}

boxControls.add({ startRotate }, 'startRotate').name('Toggle Rotation');

scene.add(mesh)

const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600)
document.getElementById("scene").appendChild(renderer.domElement);

const animate = () => {
    requestAnimationFrame(animate);
    mesh.rotation.y += rotateSpeed.y; // Apply rotation using rotateSpeed.y
    renderer.render(scene, camera)
}

animate();