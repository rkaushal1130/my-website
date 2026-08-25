import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const Globe3D = () => {
  const globeRef = useRef();
  const orbitRingRef = useRef();

  // Convert lat/long to 3D Cartesian coordinates
  const latLongToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return [x, y, z];
  };

  // San Francisco coordinate (approx 37.77, -122.41)
  const sfPos = useMemo(() => latLongToVector3(37.77, -122.41, 1.45), []);

  // Global continent dot points
  const continentDots = useMemo(() => {
    const dots = [];
    const count = 160;
    for (let i = 0; i < count; i++) {
      const lat = (Math.random() - 0.5) * 140;
      const lon = (Math.random() - 0.5) * 360;
      dots.push(latLongToVector3(lat, lon, 1.42));
    }
    return dots;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.12;
    }
    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.z = -time * 0.18;
      orbitRingRef.current.rotation.x = time * 0.1;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
      <group>
        {/* Main Rotating Globe */}
        <group ref={globeRef}>
          {/* Black Metallic Base Sphere */}
          <mesh>
            <sphereGeometry args={[1.4, 32, 32]} />
            <meshStandardMaterial
              color="#0A0A0A"
              roughness={0.2}
              metalness={0.95}
            />
          </mesh>

          {/* Glowing Red Wireframe Grid Shell */}
          <mesh>
            <sphereGeometry args={[1.41, 24, 24]} />
            <meshBasicMaterial
              color="#FF1F26"
              wireframe
              transparent
              opacity={0.25}
            />
          </mesh>

          {/* Red Glowing Continent Node Dots */}
          {continentDots.map((pos, i) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color="#FF1F26" />
            </mesh>
          ))}

          {/* San Francisco HQ Glowing Pin Marker */}
          <group position={sfPos}>
            {/* Glowing pin base */}
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color="#FF1F26"
                emissive="#FF1F26"
                emissiveIntensity={2.5}
              />
            </mesh>
            {/* Pulsing ring marker */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.15, 0.015, 16, 32]} />
              <meshBasicMaterial color="#FF3030" />
            </mesh>
          </group>
        </group>

        {/* Thin Red Orbit Lines Around Globe */}
        <mesh ref={orbitRingRef}>
          <torusGeometry args={[1.9, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#FF1F26"
            emissive="#FF1F26"
            emissiveIntensity={1.4}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default Globe3D;
