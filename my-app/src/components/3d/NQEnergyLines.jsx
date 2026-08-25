import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NQEnergyLines = ({ isHovered = false, scrollOffset = 0 }) => {
  const groupRef = useRef();

  // Generate 5 aesthetic 3D curved energy splines in the background
  const splineCurves = useMemo(() => {
    const curves = [];

    // Curve 1: Sweeping left-to-back arc
    curves.push({
      curve: new THREE.CatmullRomCurve3([
        new THREE.Vector3(-4.5, -1.8, -2.5),
        new THREE.Vector3(-3.2, 0.5, -1.8),
        new THREE.Vector3(-1.8, 2.2, -2.2),
        new THREE.Vector3(0.5, 2.8, -3.0),
        new THREE.Vector3(3.2, 2.2, -3.5),
      ]),
      radius: 0.016,
      opacity: 0.35,
      speed: 0.6,
      color: '#FF1F26',
    });

    // Curve 2: Sweeping right-to-front arc
    curves.push({
      curve: new THREE.CatmullRomCurve3([
        new THREE.Vector3(4.2, -1.5, -2.0),
        new THREE.Vector3(3.0, -0.2, -1.0),
        new THREE.Vector3(1.8, 1.2, -1.5),
        new THREE.Vector3(-0.2, 1.8, -2.2),
        new THREE.Vector3(-2.8, 1.5, -2.8),
      ]),
      radius: 0.014,
      opacity: 0.28,
      speed: 0.8,
      color: '#FF3333',
    });

    // Curve 3: Low orbital energy trail around the platform base
    curves.push({
      curve: new THREE.CatmullRomCurve3([
        new THREE.Vector3(-3.8, -2.1, 1.2),
        new THREE.Vector3(-2.2, -2.0, 2.8),
        new THREE.Vector3(1.2, -1.9, 3.0),
        new THREE.Vector3(3.5, -2.1, 1.5),
        new THREE.Vector3(3.8, -2.2, -1.2),
      ]),
      radius: 0.018,
      opacity: 0.42,
      speed: 0.5,
      color: '#FF1F26',
    });

    // Curve 4: Vertical diagonal energy stream behind the Q
    curves.push({
      curve: new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.2, -2.4, -1.8),
        new THREE.Vector3(2.2, -0.6, -1.4),
        new THREE.Vector3(2.6, 1.4, -1.6),
        new THREE.Vector3(1.8, 3.2, -2.4),
      ]),
      radius: 0.015,
      opacity: 0.38,
      speed: 0.9,
      color: '#FF1F26',
    });

    // Curve 5: Ascending spiral streak behind the N
    curves.push({
      curve: new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.5, -2.3, -1.2),
        new THREE.Vector3(-3.0, -0.8, -1.5),
        new THREE.Vector3(-2.6, 1.1, -1.8),
        new THREE.Vector3(-1.5, 2.6, -2.5),
      ]),
      radius: 0.012,
      opacity: 0.25,
      speed: 0.7,
      color: '#FF4444',
    });

    return curves.map((cfg) => {
      const geometry = new THREE.TubeGeometry(cfg.curve, 64, cfg.radius, 8, false);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(cfg.color),
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      return { geometry, material, ...cfg };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle breathing rotation and floating wave
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.04;
    groupRef.current.position.y = Math.cos(t * 0.3) * 0.05;

    // Pulse material opacities gently
    splineCurves.forEach((item, i) => {
      const pulse = Math.sin(t * item.speed + i) * 0.12;
      const hoverBoost = isHovered ? 0.15 : 0;
      item.material.opacity = Math.max(0.1, Math.min(0.85, item.opacity + pulse + hoverBoost));
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -0.5]}>
      {splineCurves.map((item, idx) => (
        <mesh key={idx} geometry={item.geometry} material={item.material} />
      ))}
    </group>
  );
};

export default NQEnergyLines;
