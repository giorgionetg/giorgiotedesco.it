// eslint-disable-next-line no-unused-vars
import * as THREE from 'three';

import React, {
  useRef, useState, useEffect, Suspense,
} from 'react';

import { NextSeo } from 'next-seo';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import SectionMicroBio from '../pages-sections/Components-Sections/SectionMicroBio';

import Layout from '../components/Layout/Layout';

let GLTFLoader;

function Me(props) {
  const gltf = useLoader(GLTFLoader, '/me-old.gltf');

  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.z += 0.01;
  });

  return (
    <group {...props}>
      <mesh
        ref={mesh}
        material={gltf.materials.material_0001}
        geometry={gltf.nodes.model001.geometry}
      />
    </group>
  );
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    // mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function Page() {
  useEffect(() => {
    GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader').GLTFLoader;
  }, []);

  const style = {
    height: '500px',
  };

  return (
    <div>
      <NextSeo
        title="About Me with a 3D Sample | Giorgio Tedesco"
        description="the same about page with 3D data"
        canonical="https://wwww.giorgiotedesco.it/about-me-with-3d"
      />

      <Layout
        title="about Giorgio Tedesco"
        description="just a web developer"
        image="headway-5QgIuuBxKwM-unsplash.jpg"
      >
        <SectionMicroBio />
        <h3>Let an example of 3D...</h3>

        <Canvas style={style}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box scale={[0.1, 0.1, 0.1]} position={[-3, 0, 0]} />
          <Box position={[3, 0, 0]} scale={[0.1, 0.1, 0.1]} />
          <Suspense fallback={null}>
            <Me scale={[10, 10, 10]} rotation={[90, 0, 0]} />
          </Suspense>
        </Canvas>
      </Layout>
    </div>
  );
}
