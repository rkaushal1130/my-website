import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const HolographicCube = ({ scale = 1 }) => {
  const outerCubeRef = useRef();
  const innerMeshRef = useRef();
  const nodesRef = useRef();

  const nodes = useMemo(() => [
    [0.4, 0.4, 0.4], [-0.4, 0.4, 0.4], [0.4, -0.4, 0.4], [-0.4, -0.4, 0.4],
    [0.4, 0.4, -0.4], [-0.4, 0.4, -0.4], [0.4, -0.4, -0.4], [-0.4, -0.4, -0.4],
    [0, 0, 0]
  ], []);

  const lines = useMemo(() => {
    const pts = [];
    nodes.forEach((n, idx) => {
      if (idx < 8) {
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

    if (outerCubeRef.current) {
      outerCubeRef.current.rotation.x = time * 0.15;
      outerCubeRef.current.rotation.y = time * 0.2;
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -time * 0.25;
      innerMeshRef.current.rotation.z = time * 0.18;
    }

    if (nodesRef.current) {
      nodesRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group scale={scale}>
        {/* Outer Glassmorphic Holographic Cube */}
        <mesh ref={outerCubeRef}>
          <boxGeometry args={[2.0, 2.0, 2.0]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.1}
            transmission={0.8}
            ior={1.4}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Outer Emissive Red Wireframe Border */}
        <mesh>
          <boxGeometry args={[2.02, 2.02, 2.02]} />
          <meshBasicMaterial
            color="#FF1F26"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Inner Rotating Faceted Core */}
        <mesh ref={innerMeshRef}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#111111"
            emissive="#FF1F26"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Internal Connected Red Data Lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#FF3030"
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Floating Internal AI Nodes */}
        <group ref={nodesRef}>
          {nodes.map((pos, i) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[i === 8 ? 0.14 : 0.08, 16, 16]} />
              <meshStandardMaterial
                color={i === 8 ? "#FF3030" : "#FF1F26"}
                emissive="#FF1F26"
                emissiveIntensity={1.8}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
};

export default HolographicCube;
