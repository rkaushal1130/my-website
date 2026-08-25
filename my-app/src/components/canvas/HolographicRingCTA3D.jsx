import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const HolographicRingCTA3D = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.25;
      ring1Ref.current.rotation.x = time * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.3;
      ring2Ref.current.rotation.y = time * 0.2;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group>
        {/* Outer Red Holographic Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#FF1F26"
            emissive="#FF1F26"
            emissiveIntensity={2.0}
          />
        </mesh>

        {/* Inner Red Holographic Ring 2 */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.1, 0.016, 16, 100]} />
          <meshStandardMaterial
            color="#FF3030"
            emissive="#FF3030"
            emissiveIntensity={1.8}
          />
        </mesh>

        {/* Floating Center Octahedron */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#0A0A0A"
            emissive="#FF1F26"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default HolographicRingCTA3D;
