import React, {useRef, useEffect} from "react";

import * as THREE from 'three';

//const ThreeSchene: React.FC = () =>{
const App = () => {

    const w = window.innerWidth;
    const h = window.innerHeight;

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined'){
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(w, h);
            containerRef.current?.appendChild(renderer.domElement);
            camera.position.z = 5;

            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            //renderer.render(scene, camera);
    //    }
    //}, []);

    //useEffect(() => {
    //    if (typeof window !== 'undefined'){
            const renderScene = () => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
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