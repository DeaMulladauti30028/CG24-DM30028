import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const grassMaterial = new THREE.MeshBasicMaterial({ color: 'green' });
const grassPlane = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), grassMaterial);
grassPlane.rotation.x = -Math.PI / 2;
scene.add(grassPlane);

const verticalRoadMaterial = new THREE.MeshBasicMaterial({ color: 'gray' });
const diagonalRoadMaterial = new THREE.MeshBasicMaterial({ color: 'gray' });

const verticalRoad = new THREE.Mesh(new THREE.BoxGeometry(6, 0.5, 75), verticalRoadMaterial);
verticalRoad.position.set(-23, 0.1, -10);
verticalRoad.rotation.y = Math.PI / 4.5;
scene.add(verticalRoad);

const diagonalRoad = new THREE.Mesh(new THREE.BoxGeometry(100, 0.5, 6), diagonalRoadMaterial);
diagonalRoad.position.set(1, 0.1, 0);
diagonalRoad.rotation.y = Math.PI / 2;
scene.add(diagonalRoad);

const building1Material = new THREE.MeshBasicMaterial({ color: 'blue' });
const building2Material = new THREE.MeshBasicMaterial({ color: 'lightblue' });
const building3Material = new THREE.MeshBasicMaterial({ color: 'skyblue' });

const building1 = new THREE.Mesh(new THREE.BoxGeometry(30, 10, 15), building1Material);
building1.position.set(-12, 5, -28);
building1.rotation.y = Math.PI / 2;
scene.add(building1);

const building2 = new THREE.Mesh(new THREE.BoxGeometry(40, 10, 10), building2Material);
building2.position.set(-20, 5, 10);
building2.rotation.y = -Math.PI / 3.5;
scene.add(building2);

const building3 = new THREE.Mesh(new THREE.BoxGeometry(18, 10, 35), building3Material);
building3.position.set(17, 5, 10);
building3.rotation.y = Math.PI / 1;
scene.add(building3);

const dodecahedronMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
const dodecahedron = new THREE.Mesh(new THREE.DodecahedronGeometry(1), dodecahedronMaterial);
dodecahedron.position.set(-43, 1, -35); 
scene.add(dodecahedron);

const pathPoints = [
    { x: -43, y: 1, z: -35 }, 
    { x: 0, y: 1, z: 15 },    
    { x: 0, y: 1, z: 40 },    
    { x: 0, y: 1, z: -40 },   
    { x: 0, y: 1, z: 15 },    
    { x: -43, y: 1, z: -35 }  
];

function animateAlongPath() {
    const tl = gsap.timeline({ repeat: -1, yoyo: false });
    
    pathPoints.forEach((point) => {
        tl.to(dodecahedron.position, {
            x: point.x,
            y: point.y,
            z: point.z,
            duration: 2, 
            ease: "power1.inOut"
        });
    });
}

animateAlongPath();

camera.position.set(50, 50, 50);
camera.lookAt(0, 0, 0);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
