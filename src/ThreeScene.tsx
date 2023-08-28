import React, {useRef, useEffect} from "react";

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { Collada, ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import {OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import Stats from "three/examples/jsm/libs/stats.module";


//const ThreeSchene: React.FC = () =>{
const App = () => {

    const w = window.innerWidth;
    const h = window.innerHeight;

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined'){
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
            camera.position.x = -10;
            camera.position.y = 0;
            camera.position.z = 5;
            camera.up.set(0,0,1);

            const renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize(w, h);
            //containerRef.current?.appendChild(renderer.domElement);
            document.body.appendChild(renderer.domElement);

            const hemisphereLight = new THREE.HemisphereLight(
                /* sky color = */ 0x51a8dd,
                /* ground color = */ 0xe83015
            );
            scene.add(hemisphereLight);

            const container = document.createElement('div');
            document.body.appendChild( container );
            container.appendChild(renderer.domElement);

            const controls = new OrbitControls( camera, document.body);

            const geometry = new THREE.BufferGeometry();
            const material = new THREE.PointsMaterial({
                size: 2, 
                sizeAttenuation: false, 
                alphaTest: 0.5, 
                transparent: true ,
                vertexColors: true
            });

            const project_points = new THREE.Points(geometry, material);
            scene.add(project_points);


            // daeファイルは必ずpublicファイルの直下に入れる。
            var file = "./FullpartsColored_930at.dae" ;
            console.log(file);
            const loader = new ColladaLoader();
            loader.load(file, function ReadCollada(collada)
                {
                    var local_object = collada.scene;
                    local_object.rotation.x = 0;
                    local_object.rotation.y = 0;
                    local_object.rotation.z = 0;

                    local_object.scale.x = 0.5;
                    local_object.scale.y = 0.5;
                    local_object.scale.z = 0.5;
                    scene.add(local_object);
                },
            //const loader = new OBJLoader();
            //loader.load(obj_file, 
                //(object) =>
                //{

                //    scene.add(object);
                //    console.log("Read!!");
                //},
                function( xhr){
                    console.log( (xhr.loaded / xhr.total * 100)+ '% loaded');
                },
                function (error){
                    console.log('An error happend : ' + error)
                }


            )


            //const geometry = new THREE.BoxGeometry();
            //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
            //const cube = new THREE.Mesh(geometry, material);
            //scene.add(cube);
            //renderer.render(scene, camera);
    //    }
    //}, []);

    //useEffect(() => {
    //    if (typeof window !== 'undefined'){
            const renderScene = () => {
                //cube.rotation.x += 0.01;
                //cube.rotation.y += 0.01;
                renderer.render(scene, camera);
                requestAnimationFrame(renderScene);

            };

            renderScene();
    //    }

    //}, []);

    //useEffect(() => {
    //    if (typeof window !== 'undefined'){
            const handleResize = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;

                camera.aspect = width/height;

                camera.updateProjectionMatrix();

                renderer.setSize(width, height);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize',handleResize);
            }


        }

    }, []);

    return (
        <main>
            <div ref={containerRef} />
        </main>
    );

};

export default App;