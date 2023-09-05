// var movementSpeed = 130;
// var totalObjects = 2000;
// var objectSize = 6;
// var sizeRandomness = 9000;
// var colors = ["#FFE55E", "#D79346", "#F66B3F"];
// /////////////////////////////////
// var dirs = [];
// var parts = [];

// const canvas = document.querySelector("canvas.particalsExplosion");

// var camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   1,
//   10000
// );
// camera.position.z = 400;

// var scene = new THREE.Scene();

// function ExplodeAnimation(x, y, color) {
//   var geometry = new THREE.Geometry();

//   for (let i = 0; i < totalObjects; i++) {
//     var vertex = new THREE.Vector3();
//     vertex.x = x;
//     vertex.y = y;
//     vertex.z = 0;

//     geometry.vertices.push(vertex);
//     dirs.push({
//       x: Math.random() * movementSpeed - movementSpeed / 2,
//       y: Math.random() * movementSpeed - movementSpeed / 2,
//       z: Math.random() * movementSpeed - movementSpeed / 2,
//     });
//   }

//   var material = new THREE.ParticleBasicMaterial({
//     size: objectSize,
//     color: color,
//   });
//   var particles = new THREE.ParticleSystem(geometry, material);

//   this.object = particles;
//   this.status = true;

//   this.xDir = Math.random() * movementSpeed - movementSpeed / 2;
//   this.yDir = Math.random() * movementSpeed - movementSpeed / 2;
//   this.zDir = Math.random() * movementSpeed - movementSpeed / 2;

//   scene.add(this.object);

//   this.update = function () {
//     if (this.status == true) {
//       var pCount = totalObjects;
//       while (pCount--) {
//         var particle = this.object.geometry.vertices[pCount];
//         particle.y += dirs[pCount].y;
//         particle.x += dirs[pCount].x;
//         particle.z += dirs[pCount].z;
//       }
//       this.object.geometry.verticesNeedUpdate = true;
//     }
//   };
// }

// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
//   alpha: true,
//   antialias: true,
//   powerPreference: "high-performance",
//   stencil: false,
//   depth: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);

// renderer.render(scene, camera);
// // parts.push(new ExplodeAnimation(0, 0,'#b49986'));
// render();
// particalsExplosion();

// function render() {
//   requestAnimationFrame(render);

//   var pCount = parts.length;
//   while (pCount--) {
//     parts[pCount].update();
//   }

//   renderer.render(scene, camera);
// }

// window.addEventListener("mousedown", onclick, false);
// window.addEventListener("resize", onWindowResize, false);

// function onclick() {}

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const canvas = document.querySelector("canvas.particalsExplosion");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
  powerPreference: "high-performance",
  stencil: false,
  depth: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Function to create particles
function createParticles() {
  const particleGeometry = new THREE.BufferGeometry();

  // Create a texture for the particles
  const particleTexture = new THREE.TextureLoader().load("flare_01.png"); // Provide your own texture path
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.5,
    map: particleTexture, // Apply the texture to the particles
    blending: THREE.AdditiveBlending,
    transparent: true,
    vertexColors: true, // Enable vertex colors for custom colors
  });

  const particlesCount = 10000;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  const velocities = new Float32Array(particlesCount * 3); // Declare the velocities array
  var selectColors = [
    new THREE.Color("#FFE55E"),
    new THREE.Color("#D79346"),
    new THREE.Color("#F66B3F"),
  ];

  for (let i = 0; i < particlesCount; i++) {
    const index = i * 3;

    // Set particles initially at the origin (0, 0, 0)
    positions[index] = 0;
    positions[index + 1] = 0;
    positions[index + 2] = 0;

    // Assign random colors
    const color = new THREE.Color(
      Math.random(), // Red component
      Math.random(), // Green component
      Math.random() // Blue component
    );

    // Assign the color to the particle
    let xcolor = selectColors[(Math.random() * 2).toFixed(0)];

    colors[index] = xcolor.r;
    colors[index + 1] = xcolor.g;
    colors[index + 2] = xcolor.b;

    // Assign random velocities for explosion effect
    velocities[index] = (Math.random() - 0.5) * 80;
    velocities[index + 1] = (Math.random() - 0.5) * 80;
    velocities[index + 2] = (Math.random() - 0.5) * 80;
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // Set camera position
  camera.position.z = 5;

  // Create an animation loop
  const animate = () => {
    requestAnimationFrame(animate);

    // Update particle positions based on velocities
    for (let i = 0; i < particlesCount; i++) {
      const index = i * 3;
      positions[index] += velocities[index] * 0.01;
      positions[index + 1] += velocities[index + 1] * 0.01;
      positions[index + 2] += velocities[index + 2] * 0.01;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    // Render the scene
    renderer.render(scene, camera);
  };

  // Handle window resize
  window.addEventListener("resize", () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
  });

  // Start the animation
  animate();
}

particalsExplosion();
// Add a click event listener to reset and play the animation on every click
// renderer.domElement.addEventListener("click", createParticles);

function particalsExplosion() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to("abc", {
    scrollTrigger: {
      trigger: ".trigger3",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        console.log("Clicked :)");
        setTimeout(() => {
          createParticles();
        }, 400);
      },
      onLeaveBack: () => {},
    },
  });
}
