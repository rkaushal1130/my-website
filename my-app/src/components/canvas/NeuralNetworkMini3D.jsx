import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const NeuralNetworkMini3D = () => {
  const groupRef = useRef();

  const nodes = useMemo(() => [
    [-0.8, 0.5, 0.2],
    [0.7, 0.6, -0.3],
    [-0.6, -0.5, 0.4],
    [0.8, -0.4, -0.2],
    [0.0, 0.9, 0.0],
    [0.0, -0.8, 0.1],
    [0.0, 0.0, 0.0], // Center Hub
  ], []);

  const lines = useMemo(() => {
    const pts = [];
    nodes.forEach((n, idx) => {
      if (idx !== 6) {
        pts.push(new THREE.Vector3(...n));
        pts.push(new THREE.Vector3(0, 0, 0));
      }
    });
    return pts;
  }, [nodes]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(lines);
  }, [lines]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Glowing Connected Synapses */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#FF1F26"
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Neural Nodes */}
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[i === 6 ? 0.18 : 0.1, 16, 16]} />
            <meshStandardMaterial
              color={i === 6 ? "#FF1F26" : "#111111"}
              emissive="#FF1F26"
              emissiveIntensity={i === 6 ? 2.0 : 1.0}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

export default NeuralNetworkMini3D;
