import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { XRButton } from './libs/XRButton.js'; // Assuming you have downloaded XRButton.js locally
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Add an AR button to enter AR mode
document.body.appendChild(XRButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

// Add lights to the scene
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.5); // Reduced intensity
scene.add(hemisphereLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 5); // New ambient light
scene.add(ambientLight);

// Create a torus knot and add it to the scene
const geometry = new THREE.TorusKnotGeometry(0.1, 0.03, 100, 16);
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
const torusKnot = new THREE.Mesh(geometry, material);
torusKnot.visible = false; // Hide the torus knot initially
// scene.add(torusKnot);

// Particle system
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 1000;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 2;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.01 });
const particles = new THREE.Points(particleGeometry, particleMaterial);
particles.visible = false; // Hide the particles initially
scene.add(particles);

// Load GLTF model
let gltfModel;
let mixer;
const loader = new GLTFLoader();
loader.load('./model.glb', (gltf) => {
  gltfModel = gltf.scene;
  gltfModel.scale.set(0.5, 0.5, 0.5);
  gltfModel.traverse((node) => {
    if (node.isMesh) {
      node.material.transparent = false; // Ensure transparency is off
      node.material.depthWrite = true; // Ensure depth writing is enabled
    }
  });
  gltfModel.visible = false; // Hide the model initially
  scene.add(gltfModel);

  // Setup animation mixer and play animations
  if (gltf.animations && gltf.animations.length) {
    mixer = new THREE.AnimationMixer(gltfModel);
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
  }
});

// Hit testing variables
let hitTestSource = null;
let hitTestSourceRequested = false;

// Event listener for session start
renderer.xr.addEventListener('sessionstart', async () => {
  const session = renderer.xr.getSession();
  const viewerSpace = await session.requestReferenceSpace('viewer');
  hitTestSource = await session.requestHitTestSource({ space: viewerSpace });

  // Add event listener for user interactions
  session.addEventListener('select', (event) => {
    if (hitTestSource) {
      const frame = event.frame;
      const referenceSpace = renderer.xr.getReferenceSpace();
      const hitTestResults = frame.getHitTestResults(hitTestSource);

      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0];
        const hitPose = hit.getPose(referenceSpace);

        // Set the position of the torus knot, particles, and GLTF model to the hit position
        const position = new THREE.Vector3(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z);
        
        torusKnot.position.copy(position);
        particles.position.copy(position);
        if (gltfModel) {
          gltfModel.position.copy(position);
          gltfModel.visible = true; // Make the GLTF model visible when a hit is detected
        }
        
        torusKnot.visible = true; // Make the torus knot visible when a hit is detected
        particles.visible = true; // Make the particles visible when a hit is detected
      }
    }
  });
});

// Event listener for session end
renderer.xr.addEventListener('sessionend', () => {
  hitTestSourceRequested = false;
  hitTestSource = null;
});

// Animation loop
function animate() {
  renderer.setAnimationLoop(render);
}

function render(timestamp, frame) {
  if (hitTestSourceRequested === false) {
    const session = renderer.xr.getSession();

    if (session) {
      session.requestReferenceSpace('viewer').then((referenceSpace) => {
        session.requestHitTestSource({ space: referenceSpace }).then((source) => {
          hitTestSource = source;
        });
      });

      session.addEventListener('end', () => {
        hitTestSourceRequested = false;
        hitTestSource = null;
      });

      hitTestSourceRequested = true;
    }
  }

  // Rotate the torus knot for a dynamic effect
  if (torusKnot.visible) {
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
  }

  // Move the particles for a dynamic effect
  if (particles.visible) {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] -= 0.01;
      if (positions[i * 3 + 1] < -1) {
        positions[i * 3 + 1] = 1;
      }
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  // Update animation mixer
  if (mixer) {
    const delta = clock.getDelta();
    mixer.update(delta); // Update mixer with delta time
  }

  renderer.render(scene, camera);
}

const clock = new THREE.Clock(); // Add a clock to manage time delta
animate();
