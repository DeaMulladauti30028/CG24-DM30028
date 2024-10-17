import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(5, 5, 5);
scene.add(light);

function createHouse() {
  const houseGroup = new THREE.Group();

  const baseGeometry = new THREE.BoxGeometry(2, 1.5, 2);
  const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  houseGroup.add(base);

  const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
  const roofMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 1.25;
  roof.rotation.y = Math.PI / 4;
  houseGroup.add(roof);

  return houseGroup;
}

const house1 = createHouse();
house1.position.set(-5, 0, 0);
scene.add(house1);

const house2 = createHouse();
house2.position.set(5, 0, 0);
scene.add(house2);

const house3 = createHouse();
house3.position.set(0, 0, -10);
scene.add(house3);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const perspectiveCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height / 2, 0.1, 1000);
perspectiveCamera.position.set(5, 5, 10);

const aspectRatio = sizes.width / sizes.height;
const orthographicCamera = new THREE.OrthographicCamera(-10 * aspectRatio, 10 * aspectRatio, 10, -10, 0.1, 1000);
orthographicCamera.position.set(5, 5, 10);

const renderer1 = new THREE.WebGLRenderer();
renderer1.setSize(sizes.width / 2, sizes.height);
document.getElementById('perspective-scene').appendChild(renderer1.domElement);

const renderer2 = new THREE.WebGLRenderer();
renderer2.setSize(sizes.width / 2, sizes.height);
document.getElementById('orthographic-scene').appendChild(renderer2.domElement);

const controls1 = new OrbitControls(perspectiveCamera, renderer1.domElement);
const controls2 = new OrbitControls(orthographicCamera, renderer2.domElement);

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  controls1.update();
  controls2.update();

  renderer1.render(scene, perspectiveCamera);
  renderer2.render(scene, orthographicCamera);
}

animate();

window.addEventListener('resize', () => {
  renderer1.setSize(window.innerWidth / 2, window.innerHeight);
  renderer2.setSize(window.innerWidth / 2, window.innerHeight);

  perspectiveCamera.aspect = window.innerWidth / window.innerHeight / 2;
  perspectiveCamera.updateProjectionMatrix();

  const aspectRatio = window.innerWidth / window.innerHeight;
  orthographicCamera.left = -10 * aspectRatio;
  orthographicCamera.right = 10 * aspectRatio;
  orthographicCamera.top = 10;
  orthographicCamera.bottom = -10;
  orthographicCamera.updateProjectionMatrix();
});