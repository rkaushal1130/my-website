import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const GraduationPrism3D = () => {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.3;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group>
        {/* Knowledge Diamond Prism (Cap Top) */}
        <mesh ref={meshRef} position={[0, 0.1, 0]}>
          <octahedronGeometry args={[0.75, 0]} />
          <meshStandardMaterial
            color="#111111"
            roughness={0.15}
            metalness={0.95}
            emissive="#FF1F26"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Emissive Base Ring */}
        <mesh ref={ringRef} position={[0, -0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.85, 0.02, 16, 64]} />
          <meshBasicMaterial color="#FF1F26" />
        </mesh>
      </group>
    </Float>
  );
};

export default GraduationPrism3D;
