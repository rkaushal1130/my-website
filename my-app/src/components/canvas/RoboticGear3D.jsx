import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const RoboticGear3D = () => {
  const gear1Ref = useRef();
  const gear2Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (gear1Ref.current) gear1Ref.current.rotation.z = time * 0.8;
    if (gear2Ref.current) gear2Ref.current.rotation.z = -time * 0.8;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={[0, 0, 0]}>
        {/* Main Robotic Gear */}
        <group ref={gear1Ref} position={[-0.4, 0.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 0.16, 8]} />
            <meshStandardMaterial
              color="#111111"
              roughness={0.2}
              metalness={0.9}
              emissive="#FF1F26"
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[0.72, 0.03, 16, 32]} />
            <meshBasicMaterial color="#FF1F26" />
          </mesh>
        </group>

        {/* Interlocking Secondary Gear */}
        <group ref={gear2Ref} position={[0.5, -0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.48, 0.48, 0.16, 6]} />
            <meshStandardMaterial
              color="#111111"
              roughness={0.2}
              metalness={0.95}
              emissive="#FF3030"
              emissiveIntensity={0.4}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[0.5, 0.025, 16, 32]} />
            <meshBasicMaterial color="#FF3030" />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

export default RoboticGear3D;
