import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NQLighting = ({ isHovered = false }) => {
  const rimLight1 = useRef();
  const rimLight2 = useRef();
  const bottomLight = useRef();
  const keyLight = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const hoverMult = isHovered ? 1.35 : 1.0;
    const pulse = Math.sin(t * 1.8) * 0.35;

    if (rimLight1.current) {
      rimLight1.current.intensity = (5.5 + pulse) * hoverMult;
    }
    if (rimLight2.current) {
      rimLight2.current.intensity = (4.5 + pulse * 0.8) * hoverMult;
    }
    if (bottomLight.current) {
      bottomLight.current.intensity = (4.8 + pulse * 0.5) * hoverMult;
    }
  });

  return (
    <>
      {/* Dark Ambient Base Light preserving pitch-black shadows */}
      <ambientLight intensity={0.32} color="#0a0506" />

      {/* Soft White Key Directional Light for crisp metallic specular bevel highlights */}
      <directionalLight
        ref={keyLight}
        position={[4.0, 7.5, 5.0]}
        intensity={1.4}
        color="#edf2ff"
      />

      {/* Secondary Front-Left Fill Light */}
      <directionalLight
        position={[-3.5, 3.5, 4.0]}
        intensity={0.35}
        color="#fce8e8"
      />

      {/* Primary Red Rim Point Light (Directly Behind Left of NQ) */}
      <pointLight
        ref={rimLight1}
        position={[-3.0, 2.5, -3.0]}
        color="#FF1F26"
        intensity={5.5}
        distance={12}
        decay={1.8}
      />

      {/* Secondary Red Rim Point Light (Behind Right of Q) */}
      <pointLight
        ref={rimLight2}
        position={[3.8, 1.8, -2.8]}
        color="#FF242B"
        intensity={4.5}
        distance={10}
        decay={1.8}
      />

      {/* Top Red Rim / Backlight for top edge glints */}
      <pointLight
        position={[0, 4.2, -3.5]}
        color="#FF1F26"
        intensity={4.0}
        distance={9}
        decay={1.8}
      />

      {/* Bottom Red Uplight (Illuminating platform & bottom underside of NQ) */}
      <pointLight
        ref={bottomLight}
        position={[0.2, -1.8, 1.6]}
        color="#FF1F26"
        intensity={4.8}
        distance={8}
        decay={1.6}
      />

      {/* Left Red Side Light */}
      <pointLight
        position={[-4.5, -0.2, 2.0]}
        color="#FF3333"
        intensity={2.2}
        distance={9}
        decay={2}
      />

      {/* Top Front Specular Glint Light */}
      <pointLight
        position={[0.5, 5.0, 3.5]}
        color="#ffffff"
        intensity={0.5}
        distance={7}
        decay={2}
      />
    </>
  );
};

export default NQLighting;
