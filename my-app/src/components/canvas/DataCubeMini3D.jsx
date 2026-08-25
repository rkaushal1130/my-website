import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const DataCubeMini3D = () => {
  const cubeRef = useRef();
  const wireframeRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.25;
      cubeRef.current.rotation.y = time * 0.3;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.2;
      wireframeRef.current.rotation.z = time * 0.25;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group>
        {/* Inner Metallic Box */}
        <mesh ref={cubeRef}>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial
            color="#111111"
            roughness={0.2}
            metalness={0.95}
            emissive="#FF1F26"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Outer Red Wireframe */}
        <mesh ref={wireframeRef}>
          <boxGeometry args={[1.15, 1.15, 1.15]} />
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

export default DataCubeMini3D;
