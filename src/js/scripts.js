import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
//import {Box3, Vector3} from 'three';
//import {planVertexShader} from 'three/examples/jsm/shaders/PlanVertexShader.js';
//import {planFragmentShader} from './shaders/planFragmentShader.js';
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

renderer.setClearColor(0xA3A3A3);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0,1,2);

orbit.update();

 const grid = new THREE.GridHelper(30, 30);
 scene.add(grid);

 const ambientLight = new THREE.AmbientLight(0xededed, 0.8);
 scene.add(ambientLight);

 const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
 scene.add(directionalLight);
 directionalLight.position.set(10, 11, 7);



 const gltfLoader = new GLTFLoader();

// const rgbeLoader = new RGBELoader();

//renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 4;

 let car;
     gltfLoader.load('./assets/scene.gltf', function(gltf) {
         const model = gltf.scene;
        //  gltf.scene.scale.set(0.25,0.25,0.25);
        //  gltf.scene.rotation.y = Math.PI/2;
        //  gltf.scene.rotation.y = 5
        //  gltf.scene.rotation.z = -8;
         model.scale.set(10,10,10);
         scene.add(model);
         car = model;
 });


//making the board
// for(let i = 0; i < 8; i++) {
//   for(let j = 0; j < 8; j++) {
//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshBasicMaterial({wireframe: true});
//     const boardTile = new THREE.Mesh(geometry, material);
//     //NOTE: POSITIONING THE BOARD
//     boardTile.position.x = i-8/2 +0.5;
//     boardTile.position.y =j-8/2+ 0.5;
//     scene.add(boardTile);
//   }

// }

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);


const page = document.getElementById('container');
const div = document.createElement('div');
console.log(page);
div.appendChild(page);
const label = new CSS2DObject(page);
scene.add(label);



//rend=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true,transparent:true,premultipliedAlpha:false});
const CanvasTexture = new THREE.CanvasTexture(scene);
//making the plane
const planeGeometry = new THREE.PlaneGeometry(32,32,32,32);
const planeMaterial = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  uniforms: {
    time: {type: "f", value: 1.0},
    uTime:{type: "f", value: 1.0},
    uTexture: {value: CanvasTexture.Texture},
    },

    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    

});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.scale.set(1.5,1.5,1.5);
scene.add(planeMesh);


function animate(time) {
  labelRenderer.render(scene, camera);
    //  if(car)
    //      car.rotation.y = - time / 3000;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
});