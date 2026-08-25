import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const ArchitectureScene3D = () => {
  const groupRef = useRef();
  const sphereRef = useRef();
  const ringRef = useRef();

  // Neural nodes positioned around the architecture
  const nodes = useMemo(() => [
    [-1.6, 1.2, 0.4], [1.5, 1.4, -0.6], [-1.2, -1.3, 0.8],
    [1.7, -1.0, 0.3], [0.0, 1.9, 0.0], [-1.9, 0.0, -0.5],
    [1.9, 0.2, 0.7], [0.0, -1.8, 0.2]
  ], []);

  // Connected red data lines
  const lines = useMemo(() => {
    const pts = [];
    nodes.forEach((n) => {
      pts.push(new THREE.Vector3(...n));
      pts.push(new THREE.Vector3(0, 0, 0)); // Connect to central core
    });
    return pts;
  }, [nodes]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(lines);
  }, [lines]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Subtle cursor tracking
    const pointerX = state.pointer.x * 0.35;
    const pointerY = state.pointer.y * 0.35;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointerX + time * 0.1,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointerY + Math.sin(time * 0.2) * 0.06,
        0.05
      );
    }

    if (sphereRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.06;
      sphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.15;
      ringRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.45}>
      <group ref={groupRef}>
        
        {/* 1. Central Glowing Red AI Sphere */}
        <mesh ref={sphereRef}>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial
            color="#FF1F26"
            emissive="#FF1F26"
            emissiveIntensity={2.0}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* 2. Concentric Equatorial Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.7, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#111111"
            emissive="#FF3030"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* 3. Metallic Black Architecture Pillars */}
        {[
          [-1.3, -0.4, 0.6],
          [1.3, 0.5, -0.5],
          [-0.6, 1.2, -0.8],
          [0.8, -1.2, 0.7],
        ].map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.3, 1.4, 0.3]} />
            <meshStandardMaterial
              color="#0D0D0D"
              roughness={0.15}
              metalness={0.95}
            />
          </mesh>
        ))}

        {/* 4. Floating Transparent Glass Panels */}
        {[
          [1.1, -0.2, 1.1, [0, 0.4, 0]],
          [-1.1, 0.3, -1.0, [0, -0.5, 0.2]],
          [0.0, 1.3, 0.9, [0.3, 0, 0]],
        ].map(([x, y, z, rot], i) => (
          <mesh key={i} position={[x, y, z]} rotation={rot}>
            <boxGeometry args={[1.2, 0.8, 0.04]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              roughness={0.1}
              metalness={0.1}
              transmission={0.85}
              transparent
              opacity={0.45}
            />
          </mesh>
        ))}

        {/* 5. Red Holographic Interconnecting Lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#FF1F26"
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* 6. Neural Network Nodes */}
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color="#111111"
              emissive="#FF1F26"
              emissiveIntensity={1.8}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        ))}

      </group>
    </Float>
  );
};

export default ArchitectureScene3D;
