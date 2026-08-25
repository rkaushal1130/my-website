import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const CultureOffice3D = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef}>
        
        {/* Central Neural Hub Tower */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 2.2, 16]} />
          <meshStandardMaterial
            color="#0E0E0E"
            roughness={0.2}
            metalness={0.95}
            emissive="#FF1F26"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Central Holographic Sphere Core */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial
            color="#FF1F26"
            emissive="#FF1F26"
            emissiveIntensity={2.2}
          />
        </mesh>

        {/* Workstations (Pods Around Center) */}
        {[
          [-1.5, -0.4, 0.8, 0.4],
          [1.5, -0.4, 0.8, -0.4],
          [-1.2, -0.4, -1.2, 2.4],
          [1.2, -0.4, -1.2, -2.4],
        ].map(([x, y, z, rot], idx) => (
          <group key={idx} position={[x, y, z]} rotation={[0, rot, 0]}>
            {/* Pod Desk */}
            <mesh>
              <boxGeometry args={[1.4, 0.08, 0.8]} />
              <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Holographic Screen */}
            <mesh position={[0, 0.45, -0.2]}>
              <boxGeometry args={[0.9, 0.5, 0.02]} />
              <meshPhysicalMaterial
                color="#FF1F26"
                emissive="#FF1F26"
                emissiveIntensity={0.4}
                transmission={0.8}
                transparent
                opacity={0.5}
              />
            </mesh>
          </group>
        ))}

        {/* Outer Circular Base Platform */}
        <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.4, 2.48, 64]} />
          <meshBasicMaterial color="#FF1F26" />
        </mesh>

      </group>
    </Float>
  );
};

export default CultureOffice3D;
