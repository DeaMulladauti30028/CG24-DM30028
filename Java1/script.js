import * as THREE from 'three';

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0055
});

const mesh = new THREE.Mesh(geometry,material);


const sizes = {
    width: 800,
    height: 600
};

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
scene.add(mesh);
scene.add(camera);

camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;

const renderer = new THREE.WebGLRenderer();
document.getElementById("model").appendChild(renderer.domElement);
renderer.render(scene,camera);

