import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//https://unpkg.com/browse/three@0.146.0/examples/jsm/controls/OrbitControls.js
//esse antilias da uma suavização no objeto
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
//vamos colocar sombreamento
renderer.shadowMap.enabled= true;
//existem 4 tipos de matas de sombra, vale a pena pesquisar sobre os outros
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// definir a taxa de pixeis
//a relação de pixel com valor ou janela que a proporção de pixel do dispositivo
renderer.setPixelRatio(window.devicePixelRatio);

//definir o tamanho
renderer.setSize(window.innerWidth, window.innerHeight);

// adcionar na minha árvore do dom
document.body.appendChild(renderer.domElement);

//setar a camera mas vamos setar os parametros primeiro
//O rpimeiro parametro é o campo de visão
const fov = 60;

//o second parametro is in relação de aspecto
const aspect = 1920/1080;

//the next parametro is in relação a proximidade e distancia
const near = 1;
const far = 1000;

// vamos criar a camera
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

//setar a posição da camera
camera.position.set(75,20,0);

//now let's go criar bossa cena
const scene = new THREE.Scene();

//now vamos add uma luz, essa vai ser uma directionalLight
let light = new THREE.DirectionalLight(0xffffff, 1.0)
//posicionamento da luz
light.position.set(20,100,10);
//posição para onde vai iluminar
light.target.position.set(0,0,0);

//lançar sombra
light.castShadow = true;

scene.add(light);

//now vou add a camera em orbita
const controls = new OrbitControls(camera, renderer.domElement);

//criar um plano para ver a sombra
let geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
let material = new THREE.MeshStandardMaterial({
    color: 0xffffff
})

const plane = new THREE.Mesh(geometry, material)
plane.castShadow = true;
//para receber a sombra
plane.receiveShadow = true;

plane.rotateX = Math.PI/2;
scene.add(plane);

camera.position.y = 600

const animate = function(){
    //solicitar quadros de animação
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
} 

animate();