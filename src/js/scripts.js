import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
//import {Box3, Vector3} from 'three';


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

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const gltfLoader = new GLTFLoader();

const rgbeLoader = new RGBELoader();

//renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 4;

let car;
    gltfLoader.load('./assets/scene.gltf', function(gltf) {
        const model = gltf.scene;
        model.scale.set(0.006,0.006,0.006);
        scene.add(model);
        car = model;
});

function animate(time) {
     if(car)
         car.rotation.y = - time / 3000;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});