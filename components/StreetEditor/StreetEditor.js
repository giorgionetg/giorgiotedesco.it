
import * as THREE from 'three';

import { useRef, useState, useEffect, Suspense } from 'react';

import { Canvas, useFrame, useLoader, useUpdate } from 'react-three-fiber';
//import { OrbitControls } from '@react-three/drei'

let OrbitControls;

import Button from 'components/CustomButtons/Button';

let Road = (props) => {

  const mesh = useRef();

  const material = new THREE.MeshStandardMaterial( { color : 0x00cc00 } );

  const geometry = new THREE.Geometry();

  let corsia = 2.5;

  let h = false;
  let v = true;



  if (props.points.length = 2) {

    let spoint = props.points[0];
    let epoint = props.points[1];


    geometry.vertices.push( new THREE.Vector3(  spoint[0] - (2.5 / 2), 0, spoint[2] ) ); // 0
    geometry.vertices.push( new THREE.Vector3(  spoint.[0] + (2.5 / 2), 0, spoint[2] ) ); // 1

    geometry.vertices.push( new THREE.Vector3(  epoint.[0] , 0, epoint[2] - (2.5 / 2) ) ); // 2
    geometry.vertices.push( new THREE.Vector3(  epoint.[0] , 0, epoint[2] + (2.5 / 2) ) ); // 3

  }

  console.log(geometry.vertices)

  const normal = new THREE.Vector3( 0, 0, 1 ); //optional
  const color = new THREE.Color( 0xffaa00 ); //optional
  const colordo = new THREE.Color( 0x00aaff );
  const materialIndex = 0; //optional
  const matmat = 1;

  const face = new THREE.Face3( 0, 1, 2, normal, color, materialIndex );
  const fsd =new THREE.Face3( 2,3,1, normal, color, matmat );

  //geometry.faces.push( face );
  geometry.faces.push( fsd );

  /*geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
  geometry.vertices.push( new THREE.Vector3(  1, 0, 0 ) );
  geometry.vertices.push( new THREE.Vector3(  1,  1, 0 ) );
  geometry.vertices.push( new THREE.Vector3(  0,  1, 0 ) );

  const normal = new THREE.Vector3( 0, 0, 1 ); //optional
  const color = new THREE.Color( 0xffaa00 ); //optional
  const colordo = new THREE.Color( 0x00aaff );
  const materialIndex = 0; //optional
  const matmat = 1;
  const face = new THREE.Face3( 0, 1, 2, normal, color, materialIndex );
  const fsd =new THREE.Face3( 0, 2, 3, normal, colordo, matmat );

  geometry.faces.push( face );
  geometry.faces.push( fsd );*/


  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  /*useFrame(() => {
    mesh.current.rotation.y += 0.05
  })*/

  return (
    <mesh
      {...props}
      ref={mesh}
      material={material}
      geometry={geometry}
      />
  )
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    //mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    mesh.current.rotation.y += 0.01
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function StreetEditor() {

  //const [startRoad, setStartRoad] = useState([0, 0, 0]);
  //const [endRoad, setEndRoad] = useState([2,2,0]);
  const [position, setPosition] = useState([0,0,0]);
  const [rotation, setRotation] = useState([0,0,0])
  const [roads, setRoads] = useState([]);

  const addRoadHanler = () => {

    setRoads([...roads, { points: [[0, 0, 0], [0, 0, 10]] }])
  }


  const getSlope = (x, y) => {

  }


  /*useEffect(() => {
    OrbitControls = require('@react-three/drei').OrbitCOntrols
  })*/

  return (
    <>
      <Canvas camera={{ position: [-5, 2, 0], near: 0.001, far: 500 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box scale={[0.1, 0.1, 0.1]} position={[-3, 0, 0]} />
        { roads.map((road) => {

          return(<Road points={road.points} />)
        }) }

        {/*<Suspense>
          <OrbitControls />
        </Suspense>*/}

      </Canvas>

      <Button onClick={(e) => { e.preventDefault(); addRoadHanler(); }} >Add a Road</Button>

      <h4>Roads</h4>

      { roads.map((road) => {

        return(<>{road.points}<br /></>)
      })}

    </>
  )
}
