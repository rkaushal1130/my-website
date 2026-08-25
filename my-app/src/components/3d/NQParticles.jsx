import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Create a smooth circular glow particle texture programmatically
const createParticleTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 80, 80, 0.9)');
  gradient.addColorStop(0.5, 'rgba(255, 31, 38, 0.5)');
  gradient.addColorStop(0.8, 'rgba(180, 10, 20, 0.15)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const NQParticles = ({ isHovered = false, scrollOffset = 0 }) => {
  const pointsRef = useRef();
  const { size } = useThree();

  // Responsive particle count: ~220 on mobile, ~520 on desktop
  const isMobile = size.width < 768;
  const count = isMobile ? 220 : 520;

  const particleTexture = useMemo(() => createParticleTexture(), []);

  // Generate particle buffer data: positions, colors, sizes, velocities, opacities
  const [positions, colors, scales, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const vel = new Float32Array(count * 3);

    // Color palette: Bright red (#FF1F26), Intense crimson (#FF4D4D), Deep ruby (#99000D), Specular white-red (#FFE5E5)
    const colorPalette = [
      new THREE.Color('#FF1F26'),
      new THREE.Color('#FF3B42'),
      new THREE.Color('#FF6666'),
      new THREE.Color('#9E0F14'),
      new THREE.Color('#D6151B'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Cylindrical distribution around the NQ platform
      const radius = 0.8 + Math.pow(Math.random(), 0.7) * 3.8;
      const angle = Math.random() * Math.PI * 2;
      const y = -2.2 + Math.random() * 5.6;

      pos[i3] = Math.cos(angle) * radius;
      pos[i3 + 1] = y;
      pos[i3 + 2] = Math.sin(angle) * radius * 0.85;

      // Velocities: upward drift with slight spiral & outwards drift
      vel[i3] = (Math.random() - 0.5) * 0.003;
      vel[i3 + 1] = 0.004 + Math.random() * 0.008; // upward speed
      vel[i3 + 2] = (Math.random() - 0.5) * 0.003;

      // Colors
      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i3] = chosenColor.r;
      col[i3 + 1] = chosenColor.g;
      col[i3 + 2] = chosenColor.b;

      // Scales
      sca[i] = 0.04 + Math.random() * 0.08;
    }

    return [pos, col, sca, vel];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position;
    const posArr = positionAttr.array;
    const t = state.clock.getElapsedTime();

    const speedMultiplier = isHovered ? 1.4 : 1.0;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Upward drift
      posArr[i3 + 1] += velocities[i3 + 1] * speedMultiplier * (1 + Math.sin(t + i) * 0.2);

      // Subtle outward spiral wobble
      posArr[i3] += Math.sin(t * 0.8 + i) * 0.002;
      posArr[i3 + 2] += Math.cos(t * 0.8 + i) * 0.002;

      // Wrap-around when particle goes above scene ceiling
      if (posArr[i3 + 1] > 3.6) {
        posArr[i3 + 1] = -2.2;
        const newRadius = 0.8 + Math.pow(Math.random(), 0.7) * 3.6;
        const newAngle = Math.random() * Math.PI * 2;
        posArr[i3] = Math.cos(newAngle) * newRadius;
        posArr[i3 + 2] = Math.sin(newAngle) * newRadius * 0.85;
      }
    }

    positionAttr.needsUpdate = true;

    // Slow overall group rotation
    pointsRef.current.rotation.y = t * 0.03;
  });

  useEffect(() => {
    return () => {
      if (particleTexture) particleTexture.dispose();
    };
  }, [particleTexture]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.09 : 0.12}
        map={particleTexture}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

export default NQParticles;
