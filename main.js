import { PCFSoftShadowMap } from 'three';
import * as THREE from './node_modules/three/build/three.module'


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.setClearColor(0x000000);
// two lines above are used to render shadows in renderer.
// PCFSoftShadowMap = Percentage Closer Filtering -> used to smooth out the 
// edges of shadows, reducing pixelation. Soft = a softer transition between light and shadow.

var geometry = new THREE.BoxGeometry(2,2,2);
var material = new THREE.MeshStandardMaterial({color:0xFF0000}); //requires lighting to be seen
var cube = new THREE.Mesh(geometry, material); 

cube.position.set(0,1,0);
camera.position.set(-10,3,10);
cube.castShadow = true;
cube.receiveShadow = true;

var ambient = new THREE.AmbientLight(0xFFFFFF, 0.15); //AmbientLight(color, intensity);
//var ambientIntensity = prompt("Enter intensity: ");
//ambient.intensity = ambientIntensity;

var spotLight = new THREE.SpotLight(0xFFFFFF, 1);
spotLight.position.set(0, 5, -5);
spotLight.angle = Math.PI/4;
spotLight.penumbra = 0.54;
spotLight.intensity = 100;
spotLight.distance = 50;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 2;

var directLight = new THREE.DirectionalLight(0xFFFFFF, 1);
directLight.position.set(0,5,-5);
directLight.angle = Math.PI/4;
directLight.penumbra = 0.54;
directLight.intensity = 100;
directLight.distance = 50;
//TODO: Finish implementing DirectionalLight;

var target = new THREE.Object3D();
spotLight.target = target;
directLight.target = target;

scene.add(cube);
scene.add(ambient);
//scene.add(spotLight);
scene.add(directLight);
var animate= function(){
    requestAnimationFrame(animate);
    //cube.rotation.x += 0.02;
    //cube.rotation.y += 0.02;
    renderer.render(scene, camera);
}
camera.lookAt(cube.position);

animate();