import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const AIBrainMini3D = () => {
  const coreRef = useRef();
  const cageRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.3;
    }
    if (cageRef.current) {
      cageRef.current.rotation.y = -time * 0.4;
      cageRef.current.rotation.x = time * 0.2;
    }
  });

  return (
    <Float speed={2.4} rotationIntensity={0.3} floatIntensity={0.45}>
      <group>
        {/* Core AI Sphere */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#FF1F26"
            emissive="#FF1F26"
            emissiveIntensity={1.8}
            roughness={0.2}
            metalness={0.2}
          />
        </mesh>

        {/* Outer Neural Wireframe Lattice */}
        <mesh ref={cageRef}>
          <dodecahedronGeometry args={[0.85, 1]} />
          <meshBasicMaterial
            color="#FF3030"
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default AIBrainMini3D;
