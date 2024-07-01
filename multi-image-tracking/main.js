import {loadGLTF} from "./libs/loader.js"; // This can be removed since we're not using GLTF models anymore
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './musicband.mind'
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // Function to create a video texture
    const createVideoMesh = (videoSrc) => {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.play();

      const texture = new THREE.VideoTexture(video);
      const geometry = new THREE.PlaneGeometry(1, 0.56); // Adjust the size as needed
      const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, material);

      return mesh;
    };

    // Create video meshes for each video
    const raccoonVideo = createVideoMesh('./play.mp4'); // Replace with your video file
    raccoonVideo.position.set(0, -0.4, 0);

    const bearVideo = createVideoMesh('./play.mp4'); // Replace with your video file
    bearVideo.position.set(0, -0.4, 0);

    const raccoonAnchor = mindarThree.addAnchor(0);
    raccoonAnchor.group.add(raccoonVideo);

    const bearAnchor = mindarThree.addAnchor(1);
    bearAnchor.group.add(bearVideo);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
