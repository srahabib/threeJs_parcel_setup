import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
//import {Box3, Vector3} from 'three';
//import {planVertexShader} from 'three/examples/jsm/shaders/PlanVertexShader.js';
//import {planFragmentShader} from './shaders/planFragmentShader.js';
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import stars from '../img/windows.jpg';


//const canvas = document.getElementById("canvasID");

// var bitmap = document.createElement('canvas');
//  var ctx = bitmap.getContext('2d');
//  bitmap.width = 100;
//  bitmap.height = 100;
//  ctx.font = 'Bold 20px Arial';

//  ctx.fillStyle = 'red';
//  ctx.fillText('death lol ', 0, 20);
//  ctx.strokeStyle = 'black';

 
 

//var bitmap = document.getElementsByTagName('html')[0].innerHTML;


const renderer = new THREE.WebGLRenderer({
  //canvas: canvas,
  antialias: true,
});
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = 0;
renderer.setPixelRatio(window.devicePixelRatio);

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

//  let labelRenderer = new CSS3DRenderer();
//  labelRenderer.setSize(window.innerWidth, window.innerHeight);
//  labelRenderer.domElement.style.position = 'absolute';
//  labelRenderer.domElement.style.top = 0;
//  labelRenderer.domElement.style.pointerEvents = 'none';
//  document.getElementById('canvasID').appendChild(labelRenderer.domElement);
 
//  let el = document.getElementById("canvasID");
//  el.innerHTML="<h1>Hello world</h1>";
//  let label = new CSS3DObject(el);
//  scene.add(label);

 const gltfLoader = new GLTFLoader();
// const rgbeLoader = new RGBELoader();

//renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 4;

  let car;
      gltfLoader.load('./assets/scene.gltf', function(gltf) {
          const model = gltf.scene;
          model.scale.set(10,10,10);
          scene.add(model);
          car = model;
  });



// Render target
let labelRenderer = new CSS3DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  //labelRenderer.domElement.style.pointerEvents = 'none';
  document.body.appendChild(labelRenderer.domElement);


  
//const p = document.createElement('p');
//ar link = document.createTextNode("This is a link");
//p.appendChild(link);
// p.title = "This is Link";
// p.href = "https://www.google.com";
 //p.textContent = 'hi';
 //p.style.fontSize = '5px';

//p.style.color = 'red';
//  const cPoint = new CSS3DObject(p);
//  cPoint.position.set(0,0,0);
//  scene.add(cPoint);



//render target
  // NOTE: Render target.
  const rtFov = 75;
  const rtNear = 0.1;
  const rtFar = 100;
  const rtWidth = 100;
  const rtHeight = 100;
  const rtAspect = rtWidth / rtHeight;
  const rtscene = new THREE.Scene();
  const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight);
  
  const rtCamera = new THREE.PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
  rtCamera.position.z = 36;

  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 0, 200);
  rtscene.add(light);
  rtscene.background = new THREE.Color(0xF8C8DC);


//

const div = document.createElement( 'div' );
				div.style.width = '1px';
				div.style.height = '1px';
				div.style.backgroundColor = '#000';

				const iframe = document.getElementById( 'i' );
				iframe.style.width = '310px';
				iframe.style.height = '250px';
				iframe.style.border = '0px';
				iframe.src = [ 'page.html' ];
				div.appendChild( iframe );
        

				const object = new CSS3DObject( div );
         object.position.set( -8, 21, 0 );
        // object.rotation.x = 0;
        object.scale.set( 0.05, 0.05, 0.05 );
        rtscene.add(object);





//



//making the plane
const planeGeometry = new THREE.PlaneGeometry(8,8,8,8);
const planeMaterial = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  blending: THREE.NoBlending,
  
  uniforms: {
    time: {type: "f", value: 1.0},
    uTime:{type: "f", value: 1.0},
    //uTexture: {type: "t",value: new THREE.CanvasTexture(bitmap)},
    uTexture: { value: renderTarget.texture },
    //image: {type: "t", value: new THREE.TextureLoader().load(stars)},
    
    },

    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    // wireframe: false


});

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.scale.set(0.1,0.1,0.2);
planeMesh.position.set(0,0.8,0);
planeMesh.rotation.x = -Math.PI/48;
scene.add(planeMesh);


function animate(time) {
  labelRenderer.render(rtscene, rtCamera);
  // rtCamera.rotation.x= camera.rotation.x;
  // rtCamera.rotation.y= camera.rotation.y;
  // rtCamera.rotation.z= camera.rotation.z;
  
  renderer.setRenderTarget(renderTarget);
  renderer.render(rtscene, rtCamera);
  renderer.setRenderTarget(null);
  //label.rotation.y += 0.01;
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
