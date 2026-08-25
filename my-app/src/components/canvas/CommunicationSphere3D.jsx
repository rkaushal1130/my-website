import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const CommunicationSphere3D = () => {
  const groupRef = useRef();
  const sphereRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const satellitesRef = useRef();

  const satellites = useMemo(() => [
    { pos: [1.6, 0.6, 0.4], size: 0.16 },
    { pos: [-1.5, -0.7, 0.5], size: 0.14 },
    { pos: [0.8, 1.5, -0.6], size: 0.15 },
    { pos: [-1.2, 1.1, 0.8], size: 0.13 },
    { pos: [1.3, -1.2, -0.4], size: 0.18 },
  ], []);

  // Connected red energy lines
  const lines = useMemo(() => {
    const pts = [];
    satellites.forEach((s) => {
      pts.push(new THREE.Vector3(...s.pos));
      pts.push(new THREE.Vector3(0, 0, 0));
    });
    return pts;
  }, [satellites]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(lines);
  }, [lines]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Mouse parallax
    const pointerX = state.pointer.x * 0.35;
    const pointerY = state.pointer.y * 0.35;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointerX + time * 0.12,
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

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.2;
      ring1Ref.current.rotation.x = time * 0.15;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.25;
      ring2Ref.current.rotation.y = time * 0.18;
    }

    if (satellitesRef.current) {
      satellitesRef.current.rotation.y = -time * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={groupRef}>
        
        {/* 1. Core Holographic Red Communication Sphere */}
        <mesh ref={sphereRef}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial
            color="#FF1F26"
            emissive="#FF1F26"
            emissiveIntensity={2.2}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* 2. Outer Transparent Glass Shell */}
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.1}
            metalness={0.1}
            transmission={0.88}
            ior={1.4}
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* 3. Outer Wireframe Red Lattice */}
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial
            color="#FF1F26"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* 4. Concentric Energy Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.75, 0.016, 16, 100]} />
          <meshStandardMaterial
            color="#FF1F26"
            emissive="#FF1F26"
            emissiveIntensity={1.5}
          />
        </mesh>

        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.05, 0.014, 16, 100]} />
          <meshStandardMaterial
            color="#FF3030"
            emissive="#FF3030"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* 5. Connected Lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#FF1F26"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* 6. Orbiting Communication Nodes / Message Satellites */}
        <group ref={satellitesRef}>
          {satellites.map((s, idx) => (
            <group key={idx} position={s.pos}>
              <mesh>
                <boxGeometry args={[s.size, s.size, s.size]} />
                <meshStandardMaterial
                  color="#111111"
                  emissive="#FF1F26"
                  emissiveIntensity={1.2}
                  roughness={0.15}
                  metalness={0.95}
                />
              </mesh>
              <mesh>
                <boxGeometry args={[s.size * 1.15, s.size * 1.15, s.size * 1.15]} />
                <meshBasicMaterial
                  color="#FF3030"
                  wireframe
                  transparent
                  opacity={0.6}
                />
              </mesh>
            </group>
          ))}
        </group>

      </group>
    </Float>
  );
};

export default CommunicationSphere3D;
