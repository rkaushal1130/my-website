import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const AboutCTA3D = () => {
  const sphereRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.15;
      sphereRef.current.rotation.x = time * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.2;
      ringRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group>
        {/* Transparent Red Holographic Sphere */}
        <mesh ref={sphereRef}>
          <sphereGeometry args={[2.0, 32, 32]} />
          <meshBasicMaterial
            color="#FF1F26"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Emissive Red Center Core */}
        <mesh>
          <icosahedronGeometry args={[1.0, 1]} />
          <meshStandardMaterial
            color="#0A0A0A"
            emissive="#FF1F26"
            emissiveIntensity={1.5}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Orbital Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.4, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#FF3030"
            emissive="#FF3030"
            emissiveIntensity={1.6}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default AboutCTA3D;
