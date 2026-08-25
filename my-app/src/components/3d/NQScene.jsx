import React, { useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import NQLighting from './NQLighting';
import NQPlatform from './NQPlatform';
import NQParticles from './NQParticles';
import NQEnergyLines from './NQEnergyLines';
import NQLogo3D from './NQLogo3D';

// Camera controller with smooth lerping parallax & scroll interaction
const CameraController = ({ isHovered, scrollOffset, reducedMotion }) => {
  const { camera, pointer } = useThree();
  const initialX = 0.2;
  const initialY = 0.35;
  const initialZ = 7.1;

  useFrame((state, delta) => {
    if (reducedMotion) {
      camera.position.set(initialX, initialY, initialZ);
      camera.lookAt(0, 0, 0);
      return;
    }

    // Interactive mouse parallax (subtle 3-5 degree angle shift)
    const targetX = initialX + pointer.x * 0.45;
    const targetY = initialY + pointer.y * 0.35;
    const targetZ = initialZ + scrollOffset * 1.2;

    // Smooth lerping with damping
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);

    // Look slightly toward the center with smooth dampening
    const lookTarget = new THREE.Vector3(
      pointer.x * 0.08,
      -0.05 + pointer.y * 0.06,
      0
    );
    camera.lookAt(lookTarget);
  });

  return null;
};

const NQScene = ({ onLoaded = () => {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Monitor scroll for subtle 3D zoom & depth shift
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = window.innerHeight || 800;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      setScrollOffset(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor reduced motion preference
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const handler = (e) => setReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Signal loaded after scene mount
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  return (
    <>
      {/* 3D Perspective Camera (Framed for the 3D NQ Monogram) */}
      <PerspectiveCamera
        makeDefault
        fov={45}
        position={[0.2, 0.35, 7.1]}
        near={0.1}
        far={100}
      />

      {/* Camera Parallax & Scroll Controller */}
      <CameraController
        isHovered={isHovered}
        scrollOffset={scrollOffset}
        reducedMotion={reducedMotion}
      />

      {/* Cinematic Multi-Light Rig */}
      <NQLighting isHovered={isHovered} />

      {/* Background Energy Trails */}
      <NQEnergyLines isHovered={isHovered} scrollOffset={scrollOffset} />

      {/* Floating Red Particles Field */}
      <NQParticles isHovered={isHovered} scrollOffset={scrollOffset} />

      {/* Multi-layered Circular AI Platform */}
      <NQPlatform isHovered={isHovered} />

      {/* Main 3D Architectural NeverQuit NQ Monogram */}
      <NQLogo3D
        isHovered={isHovered}
        onHoverChange={setIsHovered}
        scrollOffset={scrollOffset}
      />
    </>
  );
};

export default NQScene;
