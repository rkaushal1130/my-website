import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const HolographicSphereCTA3D = () => {
  const sphereRef = useRef();
  const ringRef = useRef();
  const pointsRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.12;
      sphereRef.current.rotation.x = time * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.15;
      ringRef.current.rotation.x = time * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -time * 0.08;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        {/* Transparent Holographic Red Outer Sphere */}
        <mesh ref={sphereRef}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial
            color="#FF1F26"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#0A0A0A"
            emissive="#FF1F26"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Equatorial Holographic Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.7, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#FF3030"
            emissive="#FF3030"
            emissiveIntensity={1.5}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default HolographicSphereCTA3D;
