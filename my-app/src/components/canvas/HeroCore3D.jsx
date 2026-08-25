import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const HeroCore3D = () => {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const glassShellRef = useRef();
  const neuralLatticeRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const platformRingRef = useRef();
  const { viewport } = useThree();

  // Generate floating data cubes around the core
  const satelliteCubes = useMemo(() => [
    { pos: [1.8, 0.7, 0.4], size: 0.18, speed: 0.4 },
    { pos: [-1.7, -0.8, 0.6], size: 0.14, speed: 0.5 },
    { pos: [0.9, 1.6, -0.8], size: 0.16, speed: 0.35 },
    { pos: [-1.3, 1.2, 1.0], size: 0.15, speed: 0.45 },
    { pos: [1.4, -1.3, -0.5], size: 0.2, speed: 0.3 },
  ], []);

  // Neural network nodes inside outer shell
  const neuralNodes = useMemo(() => [
    [0.7, 0.5, 0.5], [-0.7, 0.5, -0.5], [0.5, -0.7, 0.5],
    [-0.5, -0.7, -0.5], [0.8, -0.3, -0.5], [-0.8, 0.3, 0.5],
    [0, 0.9, 0], [0, -0.9, 0]
  ], []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Mouse Parallax (slow and smooth)
    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.35;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetX + time * 0.12,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetY + Math.sin(time * 0.25) * 0.08,
        0.05
      );
    }

    // Inner Red Core Pulse
    if (innerCoreRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.08;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Rotating Neural Lattice
    if (neuralLatticeRef.current) {
      neuralLatticeRef.current.rotation.y = -time * 0.2;
      neuralLatticeRef.current.rotation.z = time * 0.15;
    }

    // Transparent Glass Shell
    if (glassShellRef.current) {
      glassShellRef.current.rotation.x = time * 0.08;
      glassShellRef.current.rotation.y = time * 0.1;
    }

    // Energy Rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.25;
      ring1Ref.current.rotation.y = time * 0.18;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.22;
      ring2Ref.current.rotation.z = time * 0.14;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.15;
      ring3Ref.current.rotation.z = -time * 0.2;
    }

    // Platform glow pulse
    if (platformRingRef.current) {
      platformRingRef.current.rotation.z = time * 0.05;
    }
  });

  const isMobile = viewport.width < 5;

  return (
    <group>
      {/* 1. Main Floating Digital Brain Core */}
      <group ref={groupRef} position={[0, 0.2, 0]}>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          
          {/* Inner Glowing Red Energy Sphere */}
          <mesh ref={innerCoreRef}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial
              color="#FF1F26"
              emissive="#FF1F26"
              emissiveIntensity={2.2}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>

          {/* Central Black Metallic Core Sphere */}
          <mesh>
            <sphereGeometry args={[0.92, 32, 32]} />
            <meshStandardMaterial
              color="#0A0A0A"
              roughness={0.15}
              metalness={0.95}
              transparent
              opacity={0.7}
            />
          </mesh>

          {/* Rotating Neural-Network Faceted Lattice */}
          <mesh ref={neuralLatticeRef}>
            <icosahedronGeometry args={[1.18, 1]} />
            <meshBasicMaterial
              color="#FF1F26"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Neural Node Spheres on Lattice */}
          {neuralNodes.map((pos, i) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial
                color="#FF1F26"
                emissive="#FF1F26"
                emissiveIntensity={1.8}
              />
            </mesh>
          ))}

          {/* Outer Glass Shell */}
          <mesh ref={glassShellRef}>
            <sphereGeometry args={[1.35, 32, 32]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              roughness={0.1}
              metalness={0.1}
              transmission={0.88}
              ior={1.45}
              transparent
              opacity={0.4}
            />
          </mesh>

          {/* Thin Red Energy Ring 1 */}
          <mesh ref={ring1Ref}>
            <torusGeometry args={[1.68, 0.016, 16, 100]} />
            <meshStandardMaterial
              color="#111111"
              emissive="#FF1F26"
              emissiveIntensity={1.2}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>

          {/* Thin Red Energy Ring 2 */}
          <mesh ref={ring2Ref}>
            <torusGeometry args={[1.96, 0.014, 16, 100]} />
            <meshStandardMaterial
              color="#111111"
              emissive="#FF3030"
              emissiveIntensity={1.0}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>

          {/* Thin Energy Ring 3 */}
          <mesh ref={ring3Ref}>
            <torusGeometry args={[2.24, 0.012, 16, 100]} />
            <meshStandardMaterial
              color="#242424"
              emissive="#FF1F26"
              emissiveIntensity={0.4}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>

          {/* Floating Orbiting Data Cubes */}
          {!isMobile && satelliteCubes.map((cube, i) => (
            <group key={i} position={cube.pos}>
              <Float speed={3 * cube.speed} rotationIntensity={0.6} floatIntensity={0.8}>
                <mesh>
                  <boxGeometry args={[cube.size, cube.size, cube.size]} />
                  <meshStandardMaterial
                    color="#111111"
                    emissive="#FF1F26"
                    emissiveIntensity={0.8}
                    roughness={0.15}
                    metalness={0.95}
                  />
                </mesh>
                <mesh>
                  <boxGeometry args={[cube.size * 1.15, cube.size * 1.15, cube.size * 1.15]} />
                  <meshBasicMaterial
                    color="#FF1F26"
                    wireframe
                    transparent
                    opacity={0.5}
                  />
                </mesh>
              </Float>
            </group>
          ))}

        </Float>
      </group>

      {/* 2. 3D Ground Platform Underneath */}
      <group position={[0, -2.1, 0]}>
        {/* Black Metallic Base Disc */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.8, 3.0, 0.08, 64]} />
          <meshStandardMaterial
            color="#080808"
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>

        {/* Outer Glowing Red Perimeter Ring */}
        <mesh ref={platformRingRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
          <ringGeometry args={[2.7, 2.78, 64]} />
          <meshBasicMaterial
            color="#FF1F26"
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Concentric Holographic Ring Grid Lines */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.043, 0]}>
          <ringGeometry args={[2.0, 2.03, 64]} />
          <meshBasicMaterial
            color="#FF1F26"
            side={THREE.DoubleSide}
            transparent
            opacity={0.4}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.042, 0]}>
          <ringGeometry args={[1.3, 1.32, 64]} />
          <meshBasicMaterial
            color="#FF3030"
            side={THREE.DoubleSide}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
};

export default HeroCore3D;
