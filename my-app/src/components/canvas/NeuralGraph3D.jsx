import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const NeuralGraph3D = () => {
  const groupRef = useRef();

  const nodes = useMemo(() => [
    [-1.2, 0.8, -0.2],
    [1.1, 0.9, 0.4],
    [-0.9, -0.9, 0.5],
    [1.3, -0.7, -0.3],
    [0.0, 1.4, 0.1],
    [0.0, -1.3, -0.4],
    [-1.5, 0.0, 0.6],
    [1.6, 0.1, -0.5],
    [0.0, 0.0, 0.0], // Central Hub
  ], []);

  const connections = useMemo(() => {
    const lines = [];
    const nodeCount = nodes.length;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const p1 = new THREE.Vector3(...nodes[i]);
        const p2 = new THREE.Vector3(...nodes[j]);
        if (p1.distanceTo(p2) < 2.2) {
          lines.push(p1, p2);
        }
      }
    }
    return lines;
  }, [nodes]);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(connections);
    return geom;
  }, [connections]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.12;
      groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef}>
        
        {/* Glowing Connected Lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#FF1F26"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Nodes */}
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[i === 8 ? 0.22 : 0.12, 16, 16]} />
            <meshStandardMaterial
              color={i === 8 ? "#FF1F26" : "#111111"}
              emissive="#FF1F26"
              emissiveIntensity={i === 8 ? 1.6 : 0.6}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        ))}

      </group>
    </Float>
  );
};

export default NeuralGraph3D;
