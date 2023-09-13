import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm//loaders/GLTFLoader";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js';


import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
import * as dat from "lil-gui";

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 LOADERS & INIT                                 ||
// ! ||--------------------------------------------------------------------------------||
let orbitRotationStatus = "null";
const debug = new dat.GUI();
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const textureLoader = new THREE.TextureLoader();
const imageLoader = new THREE.ImageLoader();
let zindexScore=0;

// ! ||--------------------------------------------------------------------------------||
// ! ||                                     CANVAS                                     ||
// ! ||--------------------------------------------------------------------------------||
const canvas = document.querySelector("canvas.webgl");
// ! ||--------------------------------------------------------------------------------||
// ! ||                                     SCENES                                     ||
// ! ||--------------------------------------------------------------------------------||
const scene = new THREE.Scene();
// LDR cube texture
// const environmentMap = cubeTextureLoader.load([
//   "/environmentMaps/studio/px.png",
//   "/environmentMaps/studio/nx.png",
//   "/environmentMaps/studio/py.png",
//   "/environmentMaps/studio/ny.png",
//   "/environmentMaps/studio/pz.png",
//   "/environmentMaps/studio/nz.png",
// ]);
// scene.background = environmentMap;
// scene.environment = environmentMap;
// ! ||--------------------------------------------------------------------------------||
// ! ||                                      MODELS                                    ||
// ! ||--------------------------------------------------------------------------------||

// Bottle1 Model
let bottle01 = "";
let bottle02 = "";
let b1Scale= [60, 60, 60];
let b2Scale= [60, 60, 60];
const model1 = "https://cdn.jsdelivr.net/gh/mgohar/argonBottleAnim@1.0.1/dist/models/bottle1.gltf";
const model2 = "https://cdn.jsdelivr.net/gh/mgohar/argonBottleAnim@1.0.1/dist/models/bottle2.gltf";
// IMPORT BOTTLE 1 MODEL
gltfLoader.load(model1, (gltf) => {
  gltf.scene.position.set(180, -20, 0);
  gltf.scene.rotation.set(-163.786, 0, -176.3);
  gltf.scene.scale.set(...b1Scale);
  bottle01 = gltf.scene;
  bottle01.name = "bottle1";
  scene.add(gltf.scene);
  // IMPORT BOTTLE 2 MODEL
  gltfLoader.load(model2, (gltf) => {
    gltf.scene.position.set(100, -650, 0);
    gltf.scene.rotation.set(-163.786, 0, -176.3);
    gltf.scene.scale.set(...b2Scale);
    bottle02 = gltf.scene;
    bottle02.name = "bottle2";
    scene.add(gltf.scene);
    // bottlesDebugger();
    // light1Degugger();
    // light2Degugger();
    // light3Degugger();
    // light4Degugger();
    // positionDegugger(scene.getObjectByName("__honey1"));
    bottleAnimation();
    bottleHideAnimation(); 
    assetsSpreadAnimation();
    particalsExplosion();
  });
});



checkViewportWidth(scaleBottle1,[[80, 80, 80]],3000);




window.addEventListener("resize", checkViewportWidth);


// Argoan 1
// 1200 TO 1500
checkViewportWidth(createAssets,["__double_argon1", "argon1.png", 440, -57, 0, 60, 60]);
checkViewportWidth(createAssets,["__double_argon2", "argon1.png", 293.2911,-81.7248, 0, 40, 40]);
// 1500 TO 3000
checkViewportWidth(createAssets,["__double_argon1", "argon1.png", 470, -57, 0, 60, 60],3000);
checkViewportWidth(createAssets,["__double_argon2", "argon1.png", 293.2911,-81.7248, 0, 40, 40],3000);

// Argan 2
// 1200 TO 1500
checkViewportWidth(createAssets,["__argon1", "argon2.png", 440, -57, 0, 60, 60]);
checkViewportWidth(createAssets,["__argon2", "argon2.png", 440, -57, 0, 40, 40]);
checkViewportWidth(createAssets,["__argon3", "argon2.png", 244.1218,25, 0, 30, 30]);
checkViewportWidth(createAssets,["__argon4", "argon2.png", 550,-120, 0, 20, 20]);
checkViewportWidth(createAssets,["__argon5", "argon2.png", 440, -57, 0, 20, 20]);
checkViewportWidth(createAssets,["__argon6", "argon2.png", 440, -57, 0, 10, 10]);
checkViewportWidth(createAssets,["__argon7", "argon2.png", 440, -57, 0, 10, 10]);
checkViewportWidth(createAssets,["__argon8", "argon2.png", 440, -57, 0, 10, 10]);
checkViewportWidth(createAssets,["__argon9", "argon2.png", 440, -57, 0, 10, 10]);
checkViewportWidth(createAssets,["__argon10", "argon2.png", 440, -57, 0, 10, 10]);

// 1500 TO 3000
checkViewportWidth(createAssets,["__argon1", "argon2.png", 470, -57, 0, 60, 60],3000);
checkViewportWidth(createAssets,["__argon2", "argon2.png", 470, -57, 0, 40, 40],3000);
checkViewportWidth(createAssets,["__argon3", "argon2.png", 244.1218,25, 0, 30, 30],3000);
checkViewportWidth(createAssets,["__argon4", "argon2.png", 700,-120, 0, 20, 20],3000);
checkViewportWidth(createAssets,["__argon5", "argon2.png", 470, -57, 0, 20, 20],3000);
checkViewportWidth(createAssets,["__argon6", "argon2.png", 470, -57, 0, 10, 10],3000);
checkViewportWidth(createAssets,["__argon7", "argon2.png", 470, -57, 0, 10, 10],3000);
checkViewportWidth(createAssets,["__argon8", "argon2.png", 470, -57, 0, 10, 10],3000);
checkViewportWidth(createAssets,["__argon9", "argon2.png", 470, -57, 0, 10, 10],3000);
checkViewportWidth(createAssets,["__argon10", "argon2.png", 470, -57, 0, 10, 10],3000);


// Macadamia
// 1200 TO 1500
checkViewportWidth(createAssets,["__macadamia1", "macadamia.png", 440, -57, 0, 70, 60]);
checkViewportWidth(createAssets,["__macadamia2", "macadamia.png", 194.9525,-155.4787, 0, 60, 45]);
checkViewportWidth(createAssets,["__macadamia3", "macadamia.png", 440, -57, 0, 40, 30]);
checkViewportWidth(createAssets,["__macadamia4", "macadamia.png", 440, -57, 0, 35, 25]);
checkViewportWidth(createAssets,["__macadamia5", "macadamia.png", 440, -57, 0, 35, 25]);
checkViewportWidth(createAssets,["__macadamia6", "macadamia.png", 440, -57, 0, 20, 15]);
// 1500 TO 3000
checkViewportWidth(createAssets,["__macadamia1", "macadamia.png", 470, -57, 0, 70, 60],3000);
checkViewportWidth(createAssets,["__macadamia2", "macadamia.png", 194.9525,-155.4787, 0, 60, 45],3000);
checkViewportWidth(createAssets,["__macadamia3", "macadamia.png", 470, -57, 0, 40, 30],3000);
checkViewportWidth(createAssets,["__macadamia4", "macadamia.png", 470, -57, 0, 35, 25],3000);
checkViewportWidth(createAssets,["__macadamia5", "macadamia.png", 470, -57, 0, 35, 25],3000);
checkViewportWidth(createAssets,["__macadamia6", "macadamia.png", 470, -57, 0, 20, 15],3000);



// Macadamia Double
// 1200 TO 1500
checkViewportWidth(createAssets,["__double_macadamia1", "macadamia2.png", 514.553,-240, 0, 60, 50]);
// 1500 TO 3000
checkViewportWidth(createAssets,["__double_macadamia1", "macadamia2.png", 650.553,-240, 0, 60, 50],3000);


// ShellMacadamia
// 1200 TO 1500
checkViewportWidth(createAssets,["__shellmacadamia1", "shellmacadamia.png", 268.7064,65.7832, 0, 65, 65]);
checkViewportWidth(createAssets,["__shellmacadamia2", "shellmacadamia.png", 440, -57, 0, 37, 37]);
checkViewportWidth(createAssets,["__shellmacadamia3", "shellmacadamia.png", 470,-155.4787, 0, 37, 37]);
checkViewportWidth(createAssets,["__shellmacadamia4", "shellmacadamia.png", 588.3069,-115, 0, 30, 30]);
checkViewportWidth(createAssets,["__shellmacadamia5", "shellmacadamia.png", 440, -57, 0, 20, 20]);
checkViewportWidth(createAssets,["__shellmacadamia6", "shellmacadamia.png", 440, -57, 0, 18, 18]);
checkViewportWidth(createAssets,["__shellmacadamia7", "shellmacadamia.png", 268.7064,13, 0, 15, 15]);
checkViewportWidth(createAssets,["__shellmacadamia8", "shellmacadamia.png", 440, -57, 0, 10, 10]);
checkViewportWidth(createAssets,["__shellmacadamia9", "shellmacadamia.png", 440, -57, 0, 8, 8]);
checkViewportWidth(createAssets,["__shellmacadamia10", "shellmacadamia.png", 440, -57, 0, 8, 8]);
checkViewportWidth(createAssets,["__shellmacadamia11", "shellmacadamia.png", 440, -57, 0, 8, 8]);
checkViewportWidth(createAssets,["__shellmacadamia12", "shellmacadamia.png", 440, -57, 0, 8, 8]);
// 1500 TO 3000
checkViewportWidth(createAssets,["__shellmacadamia1", "shellmacadamia.png", 268.7064,65.7832, 0, 65, 65],3000);
checkViewportWidth(createAssets,["__shellmacadamia2", "shellmacadamia.png", 470, -57, 0, 37, 37],3000);
checkViewportWidth(createAssets,["__shellmacadamia3", "shellmacadamia.png", 580,-155.4787, 0, 37, 37],3000);
checkViewportWidth(createAssets,["__shellmacadamia4", "shellmacadamia.png", 760.3069,-115, 0, 30, 30],3000);
checkViewportWidth(createAssets,["__shellmacadamia5", "shellmacadamia.png", 470, -57, 0, 20, 20],3000);
checkViewportWidth(createAssets,["__shellmacadamia6", "shellmacadamia.png", 470, -57, 0, 18, 18],3000);
checkViewportWidth(createAssets,["__shellmacadamia7", "shellmacadamia.png", 268.7064,13, 0, 15, 15],3000);
checkViewportWidth(createAssets,["__shellmacadamia8", "shellmacadamia.png", 470, -57, 0, 10, 10],3000);
checkViewportWidth(createAssets,["__shellmacadamia9", "shellmacadamia.png", 470, -57, 0, 8, 8],3000);
checkViewportWidth(createAssets,["__shellmacadamia10", "shellmacadamia.png", 470, -57, 0, 8, 8],3000);
checkViewportWidth(createAssets,["__shellmacadamia11", "shellmacadamia.png", 470, -57, 0, 8, 8],3000);
checkViewportWidth(createAssets,["__shellmacadamia12", "shellmacadamia.png", 470, -57, 0, 8, 8],3000);



// Honey
// 1200 TO 1500
checkViewportWidth(createAssets,["__honey1", "honey3.png", 563.7223,-57.1401, 0, 180, 180]);
checkViewportWidth(createAssets,["__honey2", "honey4.png", 170.3678,-32.5555, 0, 60, 60]);
checkViewportWidth(createAssets,["__honey3", "honey2.png", 440, -57, 0, 50, 50]);
checkViewportWidth(createAssets,["__honey4", "honey1.png", 440, -57, 0, 50, 50]);
// 1500 TO 3000
checkViewportWidth(createAssets,["__honey1", "honey3.png", 729.7223,-32.1401, 0, 180, 180],3000);
checkViewportWidth(createAssets,["__honey2", "honey4.png", 170.3678,-32.5555, 0, 60, 60],3000);
checkViewportWidth(createAssets,["__honey3", "honey2.png", 470, -57, 0, 50, 50],3000);
checkViewportWidth(createAssets,["__honey4", "honey1.png", 470, -57, 0, 50, 50],3000);

positionDegugger(scene.getObjectByName("__honey1"));


// checkViewportWidth(createAssets,["__honey1", "honey3.png", 563.7223,-0, 0, 180, 180],1500);






// ! ||--------------------------------------------------------------------------------||
// ! ||                                 SIZE OF CANVAS                                 ||
// ! ||--------------------------------------------------------------------------------||
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// RESIZE CANVAS
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
// ! ||--------------------------------------------------------------------------------||
// ! ||                                     CAMERA                                     ||
// ! ||--------------------------------------------------------------------------------||
const camera = new THREE.OrthographicCamera(
  sizes.width / -2,
  sizes.width / 2,
  sizes.height / 2,
  sizes.height / -2,
  1,
  1000
);
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 0, 600);
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(camera);
// ! ||--------------------------------------------------------------------------------||
// ! ||                                     LIGHTS                                     ||
// ! ||--------------------------------------------------------------------------------||

const AmbientLight = new THREE.AmbientLight("#ffffff", 0.4);

const rectLight1 = new THREE.RectAreaLight(0xffffff, 4, 500, 200);
rectLight1.position.set(-500, 192.692, 480);
rectLight1.rotation.set(-163.786, 0, 0);

const rectLight2 = new THREE.RectAreaLight(0xffffff, 5, 200, 200);
rectLight2.position.set(-212.955, 192.692, 57.476);
rectLight2.rotation.set(0, 168.107, 0);

const rectLight3 = new THREE.RectAreaLight(0xffffff, 5, 200, 200);
rectLight3.position.set(155.705, 192.692, -286.709);
rectLight3.rotation.set(-200.663, -40.9, 0);

const rectLight4 = new THREE.RectAreaLight(0xffffff, 3, 200, 200);
rectLight4.position.set(500, 192.692, 57.476);
rectLight4.rotation.set(0, 32.97, 0);
const rectLight5 = new THREE.RectAreaLight(0xffffff, 5, 300, 400);
rectLight5.position.set(360.799, -204.648, 400);
rectLight5.rotation.set(0, -106.3094, 0);
// const rectLight6 = new THREE.RectAreaLight(0xffffff, 5, 300, 300);
// rectLight6.position.set(360.799, -253.8173, 287.045);
// rectLight6.rotation.set(-352.156, 0, 0);

// rectLight1.lookAt(0, 0, 0);

scene.add(AmbientLight, rectLight1, rectLight2, rectLight3, rectLight4,rectLight5);
RectAreaLightUniformsLib.init();
const rectLightHelper1 = new RectAreaLightHelper(rectLight1);
const rectLightHelper2 = new RectAreaLightHelper(rectLight2);
const rectLightHelper3 = new RectAreaLightHelper(rectLight3);
const rectLightHelper4 = new RectAreaLightHelper(rectLight4);
const rectLightHelper5 = new RectAreaLightHelper(rectLight5);
// scene.add(
//   rectLightHelper1,
//   rectLightHelper2,
//   rectLightHelper3,
//   rectLightHelper4,
//   rectLightHelper5
// );
// scene.add(rectLightHelper5)
// positionDegugger(rectLight5);

// ! ||--------------------------------------------------------------------------------||
// ! ||                                  ORBIT CONTROL                                 ||
// ! ||--------------------------------------------------------------------------------||
// const controls = new OrbitControls(camera, canvas);
// controls.target.y = 3.5;
// controls.enableDamping = true;

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    RENDERER                                    ||
// ! ||--------------------------------------------------------------------------------||
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
  powerPreference: "high-performance",
  stencil: false,
  depth: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ! ||--------------------------------------------------------------------------------||
// ! ||                                   Blur Effect                                  ||
// ! ||--------------------------------------------------------------------------------||
// Create an effect composer
const composer = new EffectComposer(renderer);

// RenderPass renders the scene to the composer
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Create horizontal and vertical blur shaders
const horizontalBlurPass = new ShaderPass(HorizontalBlurShader);
const verticalBlurPass = new ShaderPass(VerticalBlurShader);

// Adjust blur parameters (optional)
// horizontalBlurPass.uniforms.h.value = 1;
// verticalBlurPass.uniforms.v.value = 1;

// Add the blur passes to the composer
composer.addPass(horizontalBlurPass);
composer.addPass(verticalBlurPass);

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    ANIMATION                                   ||
// ! ||--------------------------------------------------------------------------------||
const clock = new THREE.Clock();

const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();
  // Bottles Animations:
  animateModel(elapsedTime, scene.getObjectByName("bottle1"), 0.3, 1);
  animateModel(elapsedTime, scene.getObjectByName("bottle2"), 0.5, 1);
  // Assets Animation:
  assetsAnimation(elapsedTime, 0.1 ,"__double_argon1",-130,400,100,-550,360, -57),
  assetsAnimation(elapsedTime, .2 ,"__double_argon2",-130,400,100,-550,213.2911,-81.7248),
  // assetsAnimation(elapsedTime, .8 ,"__double_argon2",-130,400,100,-550,217.276, 0.8),
  assetsAnimation(elapsedTime, .4 ,"__argon1",-130,400,100, -550 ,360, -57),
  assetsAnimation(elapsedTime, .5 ,"__argon2",-130,400,100, -550 ,360, -57),
  assetsAnimation(elapsedTime, .6 ,"__argon3",-130,400,100, -550 ,164.1218,25),
  assetsAnimation(elapsedTime, .7 ,"__argon4",-130,400,100, -550 ,470,-120),
  assetsAnimation(elapsedTime, .15 ,"__argon5",-130,400,100, -550 ,360, -57),
  assetsAnimation(elapsedTime, .25 ,"__argon6",-130,400,100, -550 ,360, -57),
  assetsAnimation(elapsedTime, .35 ,"__argon7",-130,400,100, -550 ,360, -57),
  assetsAnimation(elapsedTime, .45 ,"__argon8",-130,400,100, -550 ,360, -57),
  assetsAnimation(elapsedTime, .55 ,"__argon9",-130,400,100, -550 ,360, -57),
  assetsAnimation(elapsedTime, .65 ,"__argon10",-130,400,100, -550 ,360, -57),
  assetsAnimation(elapsedTime, .75 ,"__macadamia1",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .13 ,"__macadamia2",-130,400,100, -550, 114.9525,-155.4787),
  assetsAnimation(elapsedTime, .23 ,"__macadamia3",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .43 ,"__macadamia4",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .53 ,"__macadamia5",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .63 ,"__macadamia6",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .73 ,"__double_macadamia1",-130,400,100, -550, 434.553,-240),  
  assetsAnimation(elapsedTime, .18 ,"__shellmacadamia1",-130,430,100, -550, 188.7064,65.7832),
  assetsAnimation(elapsedTime, .28 ,"__shellmacadamia2",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .38 ,"__shellmacadamia3",-130,400,100, -550, 390,-155.4787),
  assetsAnimation(elapsedTime, .48 ,"__shellmacadamia4",-130,400,100, -550, 508.3069,-115),
  assetsAnimation(elapsedTime, .58 ,"__shellmacadamia5",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .68 ,"__shellmacadamia6",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .78 ,"__shellmacadamia7",-130,400,100, -550, 188.7064,13),
  assetsAnimation(elapsedTime, .135 ,"__shellmacadamia8",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .235 ,"__shellmacadamia9",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .335 ,"__shellmacadamia10",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .435 ,"__shellmacadamia11",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .535 ,"__shellmacadamia12",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .635 ,"__honey1",-130,450,100, -550, 483.7223,-57.1401),
  assetsAnimation(elapsedTime, .735 ,"__honey2",-130,400,100, -550, 90.3678,-32.5555),
  assetsAnimation(elapsedTime, .835 ,"__honey3",-130,400,100, -550, 360, -57),
  assetsAnimation(elapsedTime, .175 ,"__honey4",-130,400,100, -550, 360, -57),
  

  
    // Breathing animation
  animateModel(elapsedTime,scene.getObjectByName("__double_argon1"),.1,1);
  animateModel(elapsedTime,scene.getObjectByName("__double_argon2"),.2,1);
  animateModel(elapsedTime,scene.getObjectByName("__argon1"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__argon2"),.5,1);
  animateModel(elapsedTime,scene.getObjectByName("__argon3"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__argon4"),.7,1);
  animateModel(elapsedTime,scene.getObjectByName("__argon5"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__argon6"),.5,1);
  animateModel(elapsedTime,scene.getObjectByName("__argon7"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__argon8"),.3,1);
  animateModel(elapsedTime,scene.getObjectByName("__argon9"),.2,1);
  animateModel(elapsedTime,scene.getObjectByName("__argon10"),.3,1);
  animateModel(elapsedTime,scene.getObjectByName("__macadamia1"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__macadamia2"),.5,1);
  animateModel(elapsedTime,scene.getObjectByName("__macadamia3"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__macadamia4"),.5,1);
  animateModel(elapsedTime,scene.getObjectByName("__macadamia5"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__macadamia6"),.3,1);
  animateModel(elapsedTime,scene.getObjectByName("__double_macadamia1"),.2,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia1"),.3,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia2"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia3"),.5,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia4"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia5"),.5,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia6"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia7"),.3,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia8"),.2,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia9"),.3,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia10"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia11"),.5,1);
  animateModel(elapsedTime,scene.getObjectByName("__shellmacadamia12"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__honey1"),.5,1);
  animateModel(elapsedTime,scene.getObjectByName("__honey2"),.4,1);
  animateModel(elapsedTime,scene.getObjectByName("__honey3"),.3,1);
  animateModel(elapsedTime,scene.getObjectByName("__honey4"),.2,1);

  
  

  // Update controls
  // controls.update();
  // Render
  renderer.render(scene, camera);
  // composer.render();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// ! ||--------------------------------------------------------------------------------||
// ! ||                                 OTEHR FUNCTIONS                                ||
// ! ||--------------------------------------------------------------------------------||

function animateModel(Clock, targetModel, amplitude = 1, frequency = 1) {
  if (targetModel) {
    const yPos = Math.sin(frequency * Clock) * amplitude;
    targetModel.position.y += yPos;
  }
}
function assetsAnimation(
  clock,
  speed = 0.5,
  targetModel,
  distance = 300,
  px = 120,
  py = 80,
  pz = -500,
  defaultX = 0,
  defaultY = 0,
  defaultDuration = 1
) {
  targetModel = scene.getObjectByName(targetModel);

  if (orbitRotationStatus == "start") {
    
    const psi = Math.PI / 10;

    const angle = (5 + clock) * speed; // Adjust the rotation speed as needed
    gsap.to(targetModel.position, {
      x:
        150 +
        px * Math.cos(angle) * Math.cos(psi) -
        py * Math.sin(angle) * Math.sin(psi),
    });
    gsap.to(targetModel.position, {
      y:
        50 +
        py * Math.cos(psi) * Math.sin(angle) +
        px * Math.cos(angle) * Math.sin(psi),

      duration: 1.5,
    });
    gsap.to(targetModel.position, {
      z: pz * Math.sin(angle) * Math.cos(0.8),
      duration: 1.5,
      onComplete: () => {
        // Access the z index and log it here
        let zindexScore = targetModel.position.z;
        // console.log(zindexScore.toFixed(0));
        if(targetModel.position.z<0){
          const modulationValue =zindexScore;
            let result = 0.00002 * modulationValue;
            result= Math.abs(result);
            
            
            targetModel.material.uniforms.radius.value=result;
        }else{
          targetModel.material.uniforms.radius.value=0;
        }
      },
    });

    
  }
   else if (orbitRotationStatus == "stop"){
   
    gsap.to(targetModel.position, { x: defaultX, duration: defaultDuration });
    gsap.to(targetModel.position, { y: defaultY, duration: defaultDuration });
    gsap.to(targetModel.position, { z: 0, duration: defaultDuration });
    
    setTimeout(() => {
      orbitRotationStatus = "null";
    }, 500);
  }else if (orbitRotationStatus == "particalsExplosion"){
    
    gsap.to(targetModel.position, { x: 0, duration: 0.6,ease:'power1.out' });
    gsap.to(targetModel.position, { y: 0, duration: 0.6,ease:'power1.out' });
    gsap.to(targetModel.position, { z: -450, duration: 0.6,ease:'power1.out' });
    
    setTimeout(() => {
      orbitRotationStatus = "null";
    }, 500);
  }else if(orbitRotationStatus=="spreadAssets"){
   
  }
}
function createAssets(modelName, img, px, py, pz, sx, sy, sz = 20) {
  const geometry = new THREE.BoxGeometry(sx, sy, sz);
  const material = new THREE.MeshBasicMaterial();
  
  
  // const material = new THREE.MeshStandardMaterial();
  const newMesh = new THREE.Mesh(geometry, material);
  const texture = textureLoader.load(`https://cdn.jsdelivr.net/gh/mgohar/argonBottleAnim@1.0.1/dist/models/arroundAssets/${img}`);
  newMesh.position.set(px, py, pz);
  newMesh.name = modelName;
  newMesh.material.map = texture;
  newMesh.material.transparent = true;
  scene.add(newMesh);

  const vertexShaderLoader = new THREE.FileLoader();
vertexShaderLoader.load("https://cdn.jsdelivr.net/gh/mgohar/argonBottleAnim@1.0.1/src/Shaders/AssetShader/vertexShader.glsl", (vertexShaderCode) => {
  const fragmentShaderLoader = new THREE.FileLoader();
  fragmentShaderLoader.load("https://cdn.jsdelivr.net/gh/mgohar/argonBottleAnim@1.0.1/src/Shaders/AssetShader/fragmentShader.glsl", (fragmentShaderCode) => {
    // var texture = new THREE.TextureLoader().load('/macadamia1.png'); // Replace with your texture URL

    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        inputTexture: { value: texture },
            resolution: {
              value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
            radius: { value: 0 },
    },
      vertexShader: vertexShaderCode,
      fragmentShader: fragmentShaderCode,
      transparent: true,
    });
    newMesh.material = customMaterial;
  });
});


}
function bottleAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(bottle02, {
    scrollTrigger: {
      trigger: ".trigger1",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        // Bottle 1
        orbitRotationStatus = "start";
        gsap.to(bottle01.position, { x: -16.278, duration: 0.8 });
        gsap.to(bottle01.rotation, { x: -163.786, duration: 0.8 });
        gsap.to(bottle01.position, { y: 100, duration: 0.8 });
        gsap.to(bottle01.rotation, { y: 6.233, duration: 0.8 }); //-471.094
        gsap.to(bottle01.position, { z: 0, duration: 0.8 });
        gsap.to(bottle01.rotation, { z: -176.078, duration: 0.8 });
        // Bottle 2
        gsap.to(bottle02.position, { x: -163.786, duration: 0.8 });
        gsap.to(bottle02.rotation, { x: -163.99, duration: 0.8 });
        gsap.to(bottle02.position, { y: -50, duration: 0.8 });
        gsap.to(bottle02.rotation, { y: 6.233, duration: 0.8 }); //6.361
        gsap.to(bottle02.position, { z: 0, duration: 0.8 });
        gsap.to(bottle02.rotation, { z: -175.8, duration: 0.8 });
      },
      onLeaveBack: () => {
        orbitRotationStatus = "stop";
        // Bottle 1
        gsap.to(bottle01.position, { x: 100, duration: 1.2 });
        gsap.to(bottle01.rotation, { x: -163.786, duration: 1.2 });
        gsap.to(bottle01.position, { y: -20, duration: 1.2 });
        gsap.to(bottle01.rotation, { y: 0, duration: 1.2 });
        gsap.to(bottle01.position, { z: 0, duration: 1.2 });
        gsap.to(bottle01.rotation, { z: -176.3, duration: 1.2 });
        // Bottle 2

        gsap.to(bottle02.position, { x: 100, duration: 1.2 });
        gsap.to(bottle02.rotation, { x: -163.786, duration: 1.2 });
        gsap.to(bottle02.position, { y: -600, duration: 1.2 });
        gsap.to(bottle02.rotation, { y: 0, duration: 1.2 });
        gsap.to(bottle02.position, { z: 0, duration: 1.2 });
        gsap.to(bottle02.rotation, { z: -176.3, duration: 1.2 });
      },
    },
  });
}
function bottleHideAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(bottle02, {
    scrollTrigger: {
      trigger: ".trigger2",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        
        // Bottle 1
        gsap.to(bottle01.position, { x: -1500, duration: 0.5,delay:1,ease: "power1.inOut" });
        gsap.to(bottle02.rotation, { y: 12.233, duration: 0.5,delay:1,ease: "power1.inOut" });
        // gsap.to(bottle01.rotation, { y: 15.233, duration: 0.5,delay:1.5,ease: "power1.inOut"});
        gsap.to(bottle01.scale, { x: 100, duration: 0.5,delay:1,ease: "power1.inOut" });
        gsap.to(bottle01.scale, { y: 100, duration: 0.5,delay:1,ease: "power1.inOut" });
        gsap.to(bottle01.scale, { z: 100, duration: 0.5,delay:1,ease: "power1.inOut" });
        
        // Bottle 2

        gsap.to(bottle02.position, { x: -600, duration: 0.5,delay:1,ease: "power1.inOut" });
        gsap.to(bottle02.rotation, { y: 10.233, duration: 0.5,delay:1,ease: "power1.inOut" });
        gsap.to(bottle02.scale, { x: 100, duration: 0.5,delay:1,ease: "power1.inOut" });
        gsap.to(bottle02.scale, { y: 100, duration: 0.5,delay:1,ease: "power1.inOut" });
        gsap.to(bottle02.scale, { z: 100, duration: 0.5,delay:1,ease: "power1.inOut" });
      },
      onLeaveBack: () => {
        gsap.to(bottle01.position, { x: -16.278, duration: 0.8 });
        gsap.to(bottle01.rotation, { x: -163.786, duration: 0.8 });
        gsap.to(bottle01.position, { y: 100, duration: 0.8 });
        gsap.to(bottle01.rotation, { y: 6.233, duration: 0.8 }); //-471.094
        gsap.to(bottle01.position, { z: 0, duration: 0.8 });
        gsap.to(bottle01.rotation, { z: -176.078, duration: 0.8 });
        // Bottle 2
        gsap.to(bottle02.position, { x: -163.786, duration: 0.8 });
        gsap.to(bottle02.rotation, { x: -163.99, duration: 0.8 });
        gsap.to(bottle02.position, { y: -50, duration: 0.8 });
        gsap.to(bottle02.rotation, { y: 6.233, duration: 0.8 }); //6.361
        gsap.to(bottle02.position, { z: 0, duration: 0.8 });
        gsap.to(bottle02.rotation, { z: -175.8, duration: 0.8 });

        gsap.to(bottle01.scale, { x: 60, duration: 1 });
        gsap.to(bottle01.scale, { y: 60, duration: 1 });
        gsap.to(bottle01.scale, { z: 60, duration: 1 });
        gsap.to(bottle02.scale, { x: 60, duration: 1 });
        gsap.to(bottle02.scale, { y: 60, duration: 1 });
        gsap.to(bottle02.scale, { z: 60, duration: 1 });
      },
    },
  });
}
function assetsSpreadAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(scene.getObjectByName("__honey1"), {
    scrollTrigger: {
      trigger: ".trigger2",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        orbitRotationStatus = "spreadAssets";
        console.log("spread");
        gsap.to(scene.getObjectByName("__double_argon1").position, { x: -315.249,y:261.488,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__double_argon2").position, { x: 520.892,y:-130.894,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        // Argon
        gsap.to(scene.getObjectByName("__argon1").position, { x: 90.368,y:262.46,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__argon2").position, { x: 236.656,y:-170.46,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__argon3").position, { x: -278.402,y:-32.555,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__argon4").position, { x: -57.14,y:139.522,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__argon5").position, { x: 213.291,y:-155.479,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__argon6").position, { x: 41.199,y:16.614,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__argon7").position, { x: 139.537,y:-81.725,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__argon8").position, { x: -155.479,y:-130.894,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__argon9").position, { x: 606.646,y:41.199,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        // __macadamia1
        gsap.to(scene.getObjectByName("__macadamia1").position, { x: 360.799,y:-180.063,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__macadamia2").position, { x: -401.325,y:-57.14,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__macadamia3").position, { x: 360.799,y:139.537,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__macadamia4").position, { x: -180.063,y:237.876,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__macadamia5").position, { x: -352.156,y:90.368,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__macadamia6").position, { x: 128,y:-91,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__double_macadamia1").position, { x: -35.913,y:-213.887,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        // __shellmacadamia12
        gsap.to(scene.getObjectByName("__shellmacadamia1").position, { x: 328,y: 90.366,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__shellmacadamia2").position, { x: -49.291,y: 109.706,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__shellmacadamia3").position, { x: 487.028,y: 187.817,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__shellmacadamia4").position, { x: 323.324,y: 240.034,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__shellmacadamia5").position, { x: 25,y: -0.422,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__shellmacadamia6").position, { x: 107.731,y: 132.387,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__shellmacadamia7").position, { x: -362.27,y: 109,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__shellmacadamia8").position, { x: 205,y: -193.347,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__shellmacadamia9").position, { x: 459.231,y: 23.936,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        // __honey1
        gsap.to(scene.getObjectByName("__honey1").position, { x: -155.479,y: 16.614,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__honey2").position, { x: -302.987,y: -278.402,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__honey3").position, { x: 582.061,y: 65.783,z:0, duration: 0.8,delay:1,ease: "power1.out" });
        gsap.to(scene.getObjectByName("__honey4").position, { x: 287.045,y: -253.817,z:0, duration: 0.8,delay:1,ease: "power1.out" });
      },
      onLeaveBack: () => {
        orbitRotationStatus = "start";
        // Double Argon
        // gsap.to(scene.getObjectByName("__double_argon1").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__double_argon2").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__argon1").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__argon2").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__argon3").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__argon4").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__argon5").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__argon6").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__argon7").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__argon8").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__argon9").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__macadamia1").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__macadamia2").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__macadamia3").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__macadamia4").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__macadamia5").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__macadamia6").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__double_macadamia1").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__shellmacadamia1").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__shellmacadamia2").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__shellmacadamia3").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__shellmacadamia4").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__shellmacadamia5").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__shellmacadamia6").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__shellmacadamia7").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__shellmacadamia8").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__shellmacadamia9").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__honey1").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__honey2").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__honey3").position, { x: 0,y:0,z:-450, duration: 0.27 });
        // gsap.to(scene.getObjectByName("__honey4").position, { x: 0,y:0,z:-450, duration: 0.27 });
      },
    },
  });
}
function particalsExplosion() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(scene.getObjectByName("__honey1"), {
    scrollTrigger: {
      trigger: ".trigger3",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        orbitRotationStatus="particalsExplosion"
      },
      onLeaveBack: () => {
        orbitRotationStatus="spreadAssets"
      },
    },
  });
}
function checkViewportWidth(cb,params,dimension=1500) {
  const viewportWidth = window.innerWidth;

  if (viewportWidth >0 && viewportWidth <= 576) {
    console.log("Viewport width is <= 576px",dimension);
  } else if (viewportWidth >576 && viewportWidth <= 769) {
    console.log("Viewport width is <= 769px",dimension);
  } else if (viewportWidth >769 && viewportWidth <= 992) {
    console.log("Viewport width is <= 992px",dimension);
  } else if (viewportWidth >992 && viewportWidth <= 1200) {
    console.log("Viewport width is <= 1200",dimension);
  } else if (viewportWidth >1200 && viewportWidth <= 1500) {
    if(dimension >1200 && dimension <= 1500){
      cb(...params)
    }
    console.log("Viewport width is <= 1500px");
  } else if (viewportWidth >1500 && viewportWidth <= 3000) {
    if(dimension >1500 && dimension <= 3000){
      console.log("params__:",...params);
      cb(...params);
      console.log("Viewport width is > 3000px");
    }
  }


}

function scaleBottle1(scale) {
  console.log("scale___",scale);
  b1Scale=scale;
}
function scaleBottle2(scale) {
  b2Scale=scale;
}


// ! ||--------------------------------------------------------------------------------||
// ! ||                                    DEBUGERS                                    ||
// ! ||--------------------------------------------------------------------------------||
function updateAllMesh() {
  scene.traverse((child) => {
    if (child.isMesh && child.material.isMeshStandardMaterial) {
      child.material.envMapIntensity = 5;
    }
  });
}
function light1Degugger() {
  debug
    .add(rectLight1.position, "x")
    .name("L1 position x")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight1.rotation, "x")
    .name("L1 rotation x")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight1.position, "y")
    .name("L1 position y")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight1.rotation, "y")
    .name("L1 rotation y")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight1.position, "z")
    .name("L1 position z")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight1.rotation, "z")
    .name("L1 rotation z")
    .min(-500)
    .max(500)
    .step(0.001);
}
function light2Degugger() {
  debug
    .add(rectLight2.position, "x")
    .name("L2 position x")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight2.rotation, "x")
    .name("L2 rotation x")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight2.position, "y")
    .name("L2 position y")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight2.rotation, "y")
    .name("L2 rotation y")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight2.position, "z")
    .name("L2 position z")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight2.rotation, "z")
    .name("L2 rotation z")
    .min(-500)
    .max(500)
    .step(0.001);
}
function light3Degugger() {
  debug
    .add(rectLight3.position, "x")
    .name("L3 position x")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight3.rotation, "x")
    .name("L3 rotation x")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight3.position, "y")
    .name("L3 position y")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight3.rotation, "y")
    .name("L3 rotation y")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight3.position, "z")
    .name("L3 position z")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight3.rotation, "z")
    .name("L3 rotation z")
    .min(-500)
    .max(500)
    .step(0.001);
}
function light4Degugger() {
  debug
    .add(rectLight4.position, "x")
    .name("L4 position x")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight4.rotation, "x")
    .name("L4 rotation x")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight4.position, "y")
    .name("L4 position y")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight4.rotation, "y")
    .name("L4 rotation y")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight4.position, "z")
    .name("L4 position z")
    .min(-500)
    .max(500)
    .step(0.001);
  debug
    .add(rectLight4.rotation, "z")
    .name("L4 rotation z")
    .min(-500)
    .max(500)
    .step(0.001);
}
function bottlesDebugger() {
  // BOTTLE 1 DEBUGGER
  debug
    .add(bottle01.position, "x")
    .name("b1 position x")
    .min(-2000)
    .max(2000)
    .step(0.001);
  debug
    .add(bottle01.rotation, "x")
    .name("b1 rotation x")
    .min(-2000)
    .max(2000)
    .step(0.001);
  debug
    .add(bottle01.position, "y")
    .name("b1 position y")
    .min(-100)
    .max(100)
    .step(0.001);
  debug
    .add(bottle01.rotation, "y")
    .name("b1 position y")
    .min(-2000)
    .max(2000)
    .step(0.001);
  debug
    .add(bottle01.position, "z")
    .name("b1 position z")
    .min(-2000)
    .max(2000)
    .step(0.001);
  debug
    .add(bottle01.rotation, "z")
    .name("b1 position z")
    .min(-2000)
    .max(2000)
    .step(0.001);
  // BOTTLE 2 DEBUGGER
  debug
    .add(bottle02.position, "x")
    .name("b2 position x")
    .min(-2000)
    .max(2000)
    .step(0.001);
  debug
    .add(bottle02.rotation, "x")
    .name("b2 rotation x")
    .min(-2000)
    .max(2000)
    .step(0.001);
  debug
    .add(bottle02.position, "y")
    .name("b2 position y")
    .min(-2000)
    .max(2000)
    .step(0.001);
  debug
    .add(bottle02.rotation, "y")
    .name("b2 position y")
    .min(-2000)
    .max(2000)
    .step(0.001);
  debug
    .add(bottle02.position, "z")
    .name("b2 position z")
    .min(-2000)
    .max(2000)
    .step(0.001);
  debug
    .add(bottle02.rotation, "z")
    .name("b2 position z")
    .min(-2000)
    .max(2000)
    .step(0.001);
}
function positionDegugger(targetModel,name) {
  debug
    .add(targetModel.position, "x")
    .name(name+" p x")
    .min(-1000)
    .max(1000)
    .step(0.0001);

  debug
    .add(targetModel.position, "y")
    .name(name+" p y")
    .min(-1000)
    .max(1000)
    .step(0.0001);

  debug
    .add(targetModel.position, "z")
    .name(name+" p z")
    .min(-1000)
    .max(1000)
    .step(0.001);
  debug
    .add(targetModel.rotation, "x")
    .name(name+" r x")
    .min(-1000)
    .max(1000)
    .step(0.0001);

  debug
    .add(targetModel.rotation, "y")
    .name(name+" r y")
    .min(-1000)
    .max(1000)
    .step(0.0001);

  debug
    .add(targetModel.rotation, "z")
    .name(name+" r z")
    .min(-1000)
    .max(1000)
    .step(0.001);
}

const asexhelper = new THREE.AxesHelper(1000);
asexhelper.visible=false;
// scene.add(asexhelper);
// debug.add(asexhelper, "visible").name("Axes");


// ! ||--------------------------------------------------------------------------------||
// ! ||                                      Blur                                      ||
// ! ||--------------------------------------------------------------------------------||
