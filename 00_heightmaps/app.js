import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import textureHEIGHT from "./img/cotopaxi_height.jpg";
import textureCOLOR from "./img/cotopaxi_color.jpg";

export default class Sketch{
    constructor(options) {

        this.time = 0;
        this.container = options.dom;
        this.scene = new THREE.Scene();

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        
    
        this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
        this.camera.position.z = 5;
        
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( this.width, this.height );
        this.container.appendChild(this.renderer.domElement);
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        
        
        
        this.resize();
        this.setupResize();
        this.addObjects();
        this.render();
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }
    setupResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }
    addObjects() {
        this.loader = new THREE.TextureLoader();
        this.texture = this.loader.load(textureCOLOR);
        this.height = this.loader.load(textureHEIGHT);
        this.geometry = new THREE.PlaneBufferGeometry(3, 3, 128, 128)
        this.material = new THREE.MeshStandardMaterial(
            {
                color: '#ffffff',
                map: this.texture,
                displacementMap: this.height,
                displacementScale: 0.9,
                wireframe: true
            }
        );
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.rotation.x = 181;
        this.scene.add(this.plane);

        const pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.x = 2
        pointLight.position.y = 3
        pointLight.position.z = 4
        this.scene.add(pointLight)
    }

    render() {
        this.time += 0.5;
        this.plane.rotation.z = this.time / 200;
        // this.mesh.rotation.y = this.time / 1000;
        
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame(this.render.bind(this));
    }
}

new Sketch(
    {
        dom: document.getElementById('container')
    }
);