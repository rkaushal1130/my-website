import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const TargetSphere3D = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.x = time * 0.4;
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group>
        {/* Center Target Bullseye Sphere */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#FF1F26"
            emissive="#FF1F26"
            emissiveIntensity={2.2}
          />
        </mesh>

        {/* Inner Ring */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[0.58, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#111111"
            emissive="#FF3030"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Outer Crosshair Ring */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[0.85, 0.015, 16, 64]} />
          <meshBasicMaterial color="#FF1F26" />
        </mesh>
      </group>
    </Float>
  );
};

export default TargetSphere3D;
