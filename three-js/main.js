import * as THREE from "https://cdn.skypack.dev/three@0.132.2";

// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Add a light to the scene
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

// Create a cube and add it to the scene
const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -0.5);
scene.add(cube);

// Handle AR session
const enterARButton = document.getElementById('enter-ar');
if ('xr' in navigator) {
  console.log("WebXR is supported by the browser.");
  enterARButton.addEventListener('click', () => {
    navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
      if (supported) {
        console.log("AR session is supported.");
        navigator.xr.requestSession('immersive-ar').then(onSessionStarted).catch((error) => {
          console.error('Failed to start AR session:', error.name, error.message);
          alert('AR session could not be started. Please try again or use a compatible device.');
        });
      } else {
        alert('AR is not supported on this device/browser.');
        console.log('AR is not supported on this device/browser.');
      }
    }).catch((error) => {
      console.error('Failed to check AR session support:', error.name, error.message);
      alert('AR session support check failed.');
    });
  });
} else {
  console.log("WebXR is not supported by the browser.");
  enterARButton.addEventListener('click', () => {
    alert('AR is not supported on this device/browser.');
  });
}

function onSessionStarted(session) {
  renderer.xr.setSession(session);

  const referenceSpaceType = 'local';
  session.requestReferenceSpace(referenceSpaceType).then((referenceSpace) => {
    renderer.xr.setReferenceSpace(referenceSpace);
    console.log('Reference space set.');
  }).catch((error) => {
    console.error('Failed to request reference space:', error.name, error.message);
  });

  session.addEventListener('end', onSessionEnded);
}

function onSessionEnded() {
  console.log('Session ended');
}

// Animation loop
function animate() {
  renderer.setAnimationLoop(render);
}

function render(timestamp, frame) {
  if (frame) {
    const session = frame.session;
    const referenceSpace = renderer.xr.getReferenceSpace();

    // Hit testing
    const viewerPose = frame.getViewerPose(referenceSpace);
    if (viewerPose) {
      const hitTestSource = frame.getHitTestResults(renderer.xr.getHitTestSource());
      if (hitTestSource.length > 0) {
        const hit = hitTestSource[0];
        const hitPose = hit.getPose(referenceSpace);
        cube.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z);
        cube.updateMatrixWorld(true);
      }
    }
  }

  renderer.render(scene, camera);
}

animate();
