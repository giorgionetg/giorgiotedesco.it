"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";


export default function CanvasComponent () {
    return (
        <main >
            <Canvas style={{ width: "100vw", height: "100vh", position: "fixed", 
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                }} camera={{ position: [3, 3, 3] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />
                <mesh>
                    <boxGeometry />
                    <boxGeometry position={{ position: [1, 0, 0]}} />
                    <meshStandardMaterial color="orange" />
                </mesh>
                <OrbitControls />
            </Canvas>
        </main>
    );
}