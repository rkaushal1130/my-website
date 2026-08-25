import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const LabWorkspace3D = () => {
  const groupRef = useRef();
  const screen1Ref = useRef();
  const screen2Ref = useRef();
  const holoGraphRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Smooth subtle camera/mouse tracking
    const pointerX = state.pointer.x * 0.35;
    const pointerY = state.pointer.y * 0.35;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointerX + time * 0.08,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointerY + Math.sin(time * 0.2) * 0.05,
        0.05
      );
    }

    if (screen1Ref.current) {
      screen1Ref.current.position.y = 0.5 + Math.sin(time * 1.5) * 0.04;
    }

    if (screen2Ref.current) {
      screen2Ref.current.position.y = 0.6 + Math.cos(time * 1.3) * 0.04;
    }

    if (holoGraphRef.current) {
      holoGraphRef.current.rotation.y = time * 0.25;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef}>
        
        {/* 1. Floating Dark Metallic Workstation Desk */}
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[3.2, 0.12, 1.8]} />
          <meshStandardMaterial
            color="#0E0E0E"
            roughness={0.2}
            metalness={0.95}
          />
        </mesh>

        {/* Desk Perimeter Red Glow Trim */}
        <mesh position={[0, -0.66, 0]}>
          <boxGeometry args={[3.24, 0.02, 1.84]} />
          <meshBasicMaterial
            color="#FF1F26"
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* 2. Main Center Holographic Screen */}
        <mesh ref={screen1Ref} position={[0, 0.5, -0.2]}>
          <boxGeometry args={[1.8, 1.1, 0.02]} />
          <meshPhysicalMaterial
            color="#FF1F26"
            emissive="#FF1F26"
            emissiveIntensity={0.35}
            transmission={0.85}
            roughness={0.1}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Center Screen Emissive Red Border */}
        <mesh position={[0, 0.5, -0.2]}>
          <boxGeometry args={[1.82, 1.12, 0.022]} />
          <meshBasicMaterial
            color="#FF3030"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* 3. Left Angled Code / Telemetry Screen */}
        <group position={[-1.2, 0.45, 0.2]} rotation={[0, 0.4, 0]}>
          <mesh>
            <boxGeometry args={[1.1, 0.9, 0.02]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              roughness={0.1}
              metalness={0.1}
              transmission={0.8}
              transparent
              opacity={0.4}
            />
          </mesh>
          <mesh>
            <boxGeometry args={[1.12, 0.92, 0.022]} />
            <meshBasicMaterial
              color="#FF1F26"
              wireframe
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>

        {/* 4. Right Angled Holographic Graph Screen */}
        <group ref={screen2Ref} position={[1.2, 0.5, 0.2]} rotation={[0, -0.4, 0]}>
          <mesh>
            <boxGeometry args={[1.1, 0.9, 0.02]} />
            <meshPhysicalMaterial
              color="#FF3030"
              emissive="#FF3030"
              emissiveIntensity={0.3}
              transmission={0.8}
              transparent
              opacity={0.45}
            />
          </mesh>
          <mesh>
            <boxGeometry args={[1.12, 0.92, 0.022]} />
            <meshBasicMaterial
              color="#FF3030"
              wireframe
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>

        {/* 5. Center Floating AI Holographic Core / Graph */}
        <group ref={holoGraphRef} position={[0, 0.45, 0.1]}>
          <mesh>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#FF1F26"
              emissiveIntensity={2.0}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[0.5, 0.012, 16, 64]} />
            <meshBasicMaterial color="#FF3030" />
          </mesh>
        </group>

      </group>
    </Float>
  );
};

export default LabWorkspace3D;
