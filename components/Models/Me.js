
import * as THREE from 'three'
import React, { useState, useRef, useEffect, lazy } from 'react'
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useGLTF } from "@react-three/drei"


export default function Me(props) {


  const {node,materials} = useGLTF(require('assets/3d-models/me-old.gltf'))
  //const { nodes, materials} = useLoader(GLTFLoader, require('assets/3d-models/me-old.gltf'));

  let group = useRef();
  return (
<group ref={group} {...props} dispose={null}>
  <mesh
    material={materials}
    geometry={nodes}
    material-color="red" />
</group>
  )
}
