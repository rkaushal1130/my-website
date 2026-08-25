import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const ContactHoloSphereCTA3D = () => {
  const sphereRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.12;
      sphereRef.current.rotation.x = time * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.18;
      ringRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        {/* Large Transparent Red Holographic Sphere */}
        <mesh ref={sphereRef}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial
            color="#FF1F26"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Inner Glowing Red Core */}
        <mesh>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial
            color="#0A0A0A"
            emissive="#FF1F26"
            emissiveIntensity={1.4}
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Orbital Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.6, 0.016, 16, 100]} />
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

export default ContactHoloSphereCTA3D;
