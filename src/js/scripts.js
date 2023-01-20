import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
//import {Box3, Vector3} from 'three';

var action;
var mixer = null;
var clock = new THREE.Clock();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );
            renderer.setClearColor(0x606060);
            
            var loader = new GLTFLoader();
        loader.load( 'assets/scene.gltf', function ( gltf ) {
                    
                    var model = gltf.scene;
                    scene.add(model);
                    mixer = new THREE.AnimationMixer(model);
                    action = mixer.clipAction(gltf.animations[0]);
                    action.setLoop( THREE.LoopOnce );

                    gltf.scene.position.set(0, -1, 0);
                    },  
                );
            
         document.addEventListener( 'mousedown', onDocumentMouseDown, false );

            function onDocumentMouseDown( event ) 
            {
                if ( action !== null ) {

                    action.stop();
                    action.play();
                    
                  }
            }


            

            //LIGHT
            var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);
            light = new THREE.PointLight(0xffffff, 0.8, 18);
            light.position.set(0,2,4);
            light.castShadow = true;
            light.shadow.camera.near = 0.1;
            light.shadow.camera.far = 25;
            scene.add(light);

            camera.position.z = 5;
            camera.position.set( 0, 0, 5 );
            
            var controls = new OrbitControls( camera, renderer.domElement );
            controls.update();

        var animate = function () {
            requestAnimationFrame( animate );

            var delta = clock.getDelta();
          
            if (mixer !== null) {
              mixer.update(delta);
            };
          
            renderer.render( scene, camera );
      };

      animate();