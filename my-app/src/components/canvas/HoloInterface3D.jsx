import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const HoloInterface3D = () => {
  const panel1Ref = useRef();
  const panel2Ref = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (panel1Ref.current) {
      panel1Ref.current.rotation.y = Math.sin(time * 0.4) * 0.2 + 0.3;
      panel1Ref.current.rotation.x = Math.cos(time * 0.3) * 0.15;
    }
    if (panel2Ref.current) {
      panel2Ref.current.rotation.y = -Math.sin(time * 0.4) * 0.2 - 0.3;
      panel2Ref.current.rotation.x = -Math.cos(time * 0.3) * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.z = time * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Holographic Panel 1 */}
        <mesh ref={panel1Ref} position={[-0.3, 0.1, 0.2]}>
          <boxGeometry args={[0.9, 0.65, 0.02]} />
          <meshPhysicalMaterial
            color="#FF1F26"
            emissive="#FF1F26"
            emissiveIntensity={0.4}
            transmission={0.8}
            transparent
            opacity={0.5}
            roughness={0.1}
          />
        </mesh>

        {/* Holographic Panel 2 */}
        <mesh ref={panel2Ref} position={[0.3, -0.1, -0.2]}>
          <boxGeometry args={[0.85, 0.6, 0.02]} />
          <meshPhysicalMaterial
            color="#FF3030"
            emissive="#FF3030"
            emissiveIntensity={0.5}
            transmission={0.8}
            transparent
            opacity={0.5}
            roughness={0.1}
          />
        </mesh>

        {/* Center Floating Core Emblem */}
        <mesh ref={coreRef} position={[0, 0, 0]}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FF1F26"
            emissiveIntensity={1.8}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default HoloInterface3D;
