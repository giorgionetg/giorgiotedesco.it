import React, { Component, useRef, useState, Suspense, useEffect } from "react";
import { useLoader } from "react-three-fiber";

import MyCube from "components/Models/cube.gltf";
//import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

let GLTFLoader;

export default async function HomeBuild(props) {
  GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader").GLTFLoader;
  const { materials, nodes } = useLoader(GLTFLoader, MyCube);

  return (
    <group {...props} dispose={null}>
      <mesh material={materials.base} geometry={nodes.Cube.geometry} />
    </group>
  );
}

/*export async function getInitialProps (ctx) {
  //let useGLTF = await require('@react-three/drei/useGLTF');
  let loader = await require("three/examples/jsm/loaders/GLTFLoader");
  console.log('dio bacco')
  const { nodes, materials } = await useLoader(loader, MyCube);
  console.log('porco dio')
  let files = { nodes, materials };
  return { props: { files } };
}
*/
