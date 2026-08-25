import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create a radial soft red ground illumination texture for the platform surface
const createGroundGlowTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(255, 31, 38, 0.65)');
  gradient.addColorStop(0.25, 'rgba(255, 31, 38, 0.45)');
  gradient.addColorStop(0.55, 'rgba(200, 15, 25, 0.18)');
  gradient.addColorStop(0.85, 'rgba(120, 10, 15, 0.05)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const NQPlatform = ({ isHovered = false }) => {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const glyphsGroupRef = useRef();
  const outerNeonMatRef = useRef();
  const midNeonMatRef = useRef();
  const innerNeonMatRef = useRef();

  const groundGlowTex = useMemo(() => createGroundGlowTexture(), []);

  // Generate segmented cybernetic tick arcs around the middle perimeter
  const cyberArcs = useMemo(() => {
    const arcs = [];
    const count = 16;
    const radius = 2.45;
    const arcLength = (Math.PI * 2) / count;

    for (let i = 0; i < count; i++) {
      const isDashed = i % 2 === 0;
      const span = isDashed ? arcLength * 0.6 : arcLength * 0.25;
      const startAngle = i * arcLength;

      const curve = new THREE.EllipseCurve(
        0, 0,
        radius, radius,
        startAngle, startAngle + span,
        false, 0
      );
      const points = curve.getPoints(24);
      const geom = new THREE.BufferGeometry().setFromPoints(points);

      arcs.push({
        geometry: geom,
        isDashed,
      });
    }
    return arcs;
  }, []);

  // Generate radial grid line segments across the platform surface
  const radialGridLines = useMemo(() => {
    const lines = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const rInner = 1.6;
      const rOuter = 3.9;
      const p1 = new THREE.Vector3(Math.cos(angle) * rInner, 0.005, Math.sin(angle) * rInner);
      const p2 = new THREE.Vector3(Math.cos(angle) * rOuter, 0.005, Math.sin(angle) * rOuter);
      const geom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      lines.push(geom);
    }
    return lines;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speedMult = isHovered ? 1.4 : 1.0;

    // Slow counter-rotations for futuristic activation effect
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y += delta * 0.03 * speedMult;
    }
    if (glyphsGroupRef.current) {
      glyphsGroupRef.current.rotation.y -= delta * 0.05 * speedMult;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y += delta * 0.07 * speedMult;
    }

    // Emissive breathing intensity
    const pulse = 1.0 + Math.sin(t * 2.2) * 0.2;
    const hoverIntensity = isHovered ? 1.4 : 1.0;

    if (outerNeonMatRef.current) {
      outerNeonMatRef.current.emissiveIntensity = 2.8 * pulse * hoverIntensity;
    }
    if (midNeonMatRef.current) {
      midNeonMatRef.current.emissiveIntensity = 3.4 * pulse * hoverIntensity;
    }
    if (innerNeonMatRef.current) {
      innerNeonMatRef.current.emissiveIntensity = 4.0 * pulse * hoverIntensity;
    }
  });

  return (
    <group position={[0, -1.95, 0]}>
      {/* 1. Large Base Platform Tier - Dark Brushed Titanium Cylinder */}
      <mesh position={[0, -0.22, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.5, 0.25, 64]} />
        <meshStandardMaterial
          color="#0a0a0d"
          metalness={0.94}
          roughness={0.22}
        />
      </mesh>

      {/* 1b. Chamfered Outer Base Lip */}
      <mesh position={[0, -0.09, 0]}>
        <cylinderGeometry args={[4.15, 4.2, 0.03, 64]} />
        <meshStandardMaterial
          color="#141418"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* 2. Outer Glowing Red Neon Ring (matching reference) */}
      <mesh position={[0, -0.075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.95, 0.036, 16, 100]} />
        <meshStandardMaterial
          ref={outerNeonMatRef}
          color="#FF1F26"
          emissive="#FF1F26"
          emissiveIntensity={2.8}
          toneMapped={false}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* 3. Middle Tier Step */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[3.2, 3.3, 0.1, 64]} />
        <meshStandardMaterial
          color="#08080a"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* 4. Fine Radial Dark Sector Lines */}
      <group position={[0, 0.012, 0]}>
        {radialGridLines.map((geom, idx) => (
          <lineSegments key={idx} geometry={geom}>
            <lineBasicMaterial
              color="#2a0a0d"
              transparent
              opacity={0.4}
            />
          </lineSegments>
        ))}
      </group>

      {/* 5. Middle Glowing Red Neon Ring */}
      <mesh position={[0, 0.018, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.95, 0.028, 16, 80]} />
        <meshStandardMaterial
          ref={midNeonMatRef}
          color="#FF1F26"
          emissive="#FF1F26"
          emissiveIntensity={3.2}
          toneMapped={false}
          roughness={0.1}
        />
      </mesh>

      {/* 6. Rotating Segmented Cybernetic Arc Glyphs */}
      <group ref={glyphsGroupRef} position={[0, 0.022, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {cyberArcs.map((arc, idx) => (
          <line key={idx} geometry={arc.geometry}>
            <lineBasicMaterial
              color="#FF242B"
              transparent
              opacity={arc.isDashed ? 0.95 : 0.65}
              linewidth={2}
            />
          </line>
        ))}
      </group>

      {/* 7. Upper Raised Pedestal Tier */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[1.85, 1.9, 0.06, 64]} />
        <meshStandardMaterial
          color="#0f0f13"
          metalness={0.96}
          roughness={0.16}
        />
      </mesh>

      {/* 8. Inner Glowing Red Neon Core Ring */}
      <mesh
        ref={innerRingRef}
        position={[0, 0.062, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[1.75, 0.024, 16, 64]} />
        <meshStandardMaterial
          ref={innerNeonMatRef}
          color="#FF2B32"
          emissive="#FF1F26"
          emissiveIntensity={3.8}
          toneMapped={false}
          roughness={0.1}
        />
      </mesh>

      {/* 9. Central Mirrored Metallic Pad (Directly beneath NQ) */}
      <mesh position={[0, 0.061, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.72, 64]} />
        <meshStandardMaterial
          color="#050507"
          metalness={0.98}
          roughness={0.12}
        />
      </mesh>

      {/* 10. Intense Red Underglow Ground Light Flare (matching reference) */}
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.8, 3.8]} />
        <meshBasicMaterial
          map={groundGlowTex}
          transparent
          opacity={0.82}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default NQPlatform;
