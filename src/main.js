import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import gsap from 'gsap';


// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// HDRI lighting
const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/goegap_road_2k.hdr', function(texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  // scene.background = texture;
});

let lastWheelTime = 0;
let scrollCount = 0;

window.addEventListener('wheel', (event) => {
  const now = Date.now();
  if (now - lastWheelTime > 2000) {
    lastWheelTime = now;
    const direction = event.deltaY < 0 ? "Up" : "Down"
    scrollCount = (scrollCount+1)%4;
    const heading = document.querySelectorAll('.heading');
    gsap.to(heading,{
      duration: 1,
      y: direction=="Up" ? `+=${100}%`: `-=${100}%`,
      ease: 'power2.inOut'
    })
    gsap.to(spheres.rotation,{
      duration: 1,
      y: direction=="Up" ? `+=${Math.PI/2}%`: `-=${Math.PI/2}%`,
      ease: 'power2.inOut'
    })
    if(scrollCount==0){
      gsap.to(heading,{
        duration: 1,
        y:`0`,
        ease: 'power2.inOut'
      })
    }
  }
});


// Add spheres
const radius = 1.2;
const segments = 64;
const colors = ['green', 'blue', 'cyan', 'magenta'];
const textures = ['./csilla/color.png','./earth/map2.jpg','./venus/map.jpg','./volcanic/color.png']
const spheres = new THREE.Group();

const starTexture = new THREE.TextureLoader().load('./stars.jpg');
starTexture.colorSpace = THREE.SRGBColorSpace;
const bigSphereGeometry = new THREE.SphereGeometry(50, 64, 64);
const bigSphereMaterial = new THREE.MeshBasicMaterial({
  map: starTexture,
  transparent: true,
  opacity:0.3,
  side: THREE.BackSide
});
const bigSphere = new THREE.Mesh(bigSphereGeometry, bigSphereMaterial);
scene.add(bigSphere);

const spheresMesh = [];
for (let i = 0; i < 4; i++) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(textures[i]);
  texture.colorSpace = THREE.SRGBColorSpace;

  const geometry = new THREE.SphereGeometry(radius, segments, segments);
  const material = new THREE.MeshStandardMaterial({map: texture});
  const sphere = new THREE.Mesh(geometry, material);
  spheresMesh.push(sphere);

  const angle = (i / 4) * (Math.PI * 2);
  sphere.position.x = Math.cos(angle) * 4.2;
  sphere.position.z = Math.sin(angle) * 4.2;
  spheres.add(sphere);
}
spheres.rotation.x = 0.11;
spheres.position.y = -0.6;  
scene.add(spheres);
camera.position.z = 8;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  for(let i=0; i<spheresMesh.length; i++){
    const sphere = spheresMesh[i];
    sphere.rotation.y -= 0.0002;
  }
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
let autoCount = 0;

// Auto revolve planets + text every 2 seconds
setInterval(() => {
  autoCount = (autoCount + 1) % 4; // cycle between 0–3

  // Rotate spheres
  gsap.to(spheres.rotation, {
    duration: 1,
    y: spheres.rotation.y - Math.PI / 2,
    ease: "power2.inOut"
  }),2000;

  // Move headings
  const heading = document.querySelectorAll('.heading');
  if (autoCount === 0) {
    // Reset back to top
    gsap.to(heading, {
      duration: 1,
      y: "0%",
      ease: "power2.inOut"
    });
  } else {
    gsap.to(heading, {
      duration: 1,
      y: `-=${100}%`,
      ease: "power2.inOut"
    });
  }
}, 2000);


animate();
