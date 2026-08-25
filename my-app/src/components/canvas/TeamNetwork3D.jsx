import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const TeamNetwork3D = () => {
  const groupRef = useRef();

  const members = useMemo(() => [
    [-0.6, 0.4, 0.2],
    [0.6, 0.4, -0.2],
    [-0.5, -0.4, -0.2],
    [0.5, -0.4, 0.3],
    [0.0, 0.1, 0.5], // Center peer
  ], []);

  const lines = useMemo(() => {
    const pts = [];
    members.forEach((m1, i) => {
      members.forEach((m2, j) => {
        if (i < j) {
          pts.push(new THREE.Vector3(...m1));
          pts.push(new THREE.Vector3(...m2));
        }
      });
    });
    return pts;
  }, [members]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(lines);
  }, [lines]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.35;
      groupRef.current.rotation.x = Math.sin(time * 0.25) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Network Synapse Lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#FF1F26"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Member Node Spheres */}
        {members.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={i === 4 ? "#FF1F26" : "#111111"}
              emissive="#FF1F26"
              emissiveIntensity={i === 4 ? 2.0 : 0.8}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

export default TeamNetwork3D;
