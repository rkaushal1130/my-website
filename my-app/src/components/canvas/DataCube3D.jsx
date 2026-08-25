import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const DataCube3D = ({ scale = 1 }) => {
  const cubeRef = useRef();
  const wireframeRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.2;
      cubeRef.current.rotation.y = time * 0.25;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.15;
      wireframeRef.current.rotation.y = -time * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group scale={scale}>
        {/* Metallic Core Cube */}
        <mesh ref={cubeRef}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial
            color="#111111"
            roughness={0.15}
            metalness={0.95}
            emissive="#FF1F26"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Outer Emissive Red Wireframe */}
        <mesh ref={wireframeRef}>
          <boxGeometry args={[1.35, 1.35, 1.35]} />
          <meshBasicMaterial
            color="#FF1F26"
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default DataCube3D;
