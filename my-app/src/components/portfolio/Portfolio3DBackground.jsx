import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// WebGL Availability Detection
const checkWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

/**
 * 1. Floating Metallic Geometric Objects (Cubes, Octahedrons, Icosahedrons)
 */
const FloatingShapes = ({ isMobile, reducedMotion }) => {
  const groupRef = useRef();

  // Create deterministic shape positions
  const shapesData = useMemo(() => {
    const count = isMobile ? 4 : 8;
    const items = [];
    const types = ['octahedron', 'box', 'icosahedron', 'tetrahedron'];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = isMobile ? 3.5 + Math.random() * 2 : 4.5 + Math.random() * 3.5;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5;
      const y = (Math.random() - 0.5) * 6;
      const z = -2 - Math.random() * 4;
      const scale = isMobile ? 0.25 + Math.random() * 0.2 : 0.35 + Math.random() * 0.35;
      const rotSpeed = {
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.012,
        z: (Math.random() - 0.5) * 0.006,
      };

      items.push({
        id: i,
        type: types[i % types.length],
        pos: [x, y, z],
        scale,
        rotSpeed,
      });
    }
    return items;
  }, [isMobile]);

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle global float
    groupRef.current.position.y = Math.sin(time * 0.2) * 0.15;

    // Rotate individual shapes
    groupRef.current.children.forEach((child, index) => {
      const data = shapesData[index];
      if (data) {
        child.rotation.x += data.rotSpeed.x;
        child.rotation.y += data.rotSpeed.y;
        child.rotation.z += data.rotSpeed.z;
        child.position.y = data.pos[1] + Math.sin(time * 0.4 + index) * 0.12;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {shapesData.map((s) => (
        <mesh key={s.id} position={s.pos} scale={s.scale}>
          {s.type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
          {s.type === 'box' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
          {s.type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
          {s.type === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color="#0e0e14"
            roughness={0.25}
            metalness={0.88}
            emissive="#1f0507"
            emissiveIntensity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * 2. Thin Glowing Red Neon Rings
 */
const NeonRings = ({ isMobile, reducedMotion }) => {
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (ring1.current) {
      ring1.current.rotation.x = time * 0.1;
      ring1.current.rotation.y = time * 0.08;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -time * 0.07;
      ring2.current.rotation.z = time * 0.09;
    }
  });

  return (
    <group position={[0, 0, -3]}>
      {/* Primary Ring */}
      <mesh ref={ring1} position={isMobile ? [1.8, 1, -1] : [3.5, 1.2, -1]}>
        <torusGeometry args={[isMobile ? 1.2 : 1.8, 0.015, 12, isMobile ? 36 : 64]} />
        <meshBasicMaterial color="#FF1F26" transparent opacity={0.65} />
      </mesh>

      {/* Secondary Distant Ring */}
      {!isMobile && (
        <mesh ref={ring2} position={[-4, -1.5, -2]}>
          <torusGeometry args={[2.2, 0.015, 12, 64]} />
          <meshBasicMaterial color="#FF1F26" transparent opacity={0.45} />
        </mesh>
      )}
    </group>
  );
};

/**
 * 3. Lightweight Particles
 */
const BackgroundParticles = ({ isMobile, reducedMotion }) => {
  const pointsRef = useRef();
  const count = isMobile ? 35 : 90;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const redColor = new THREE.Color('#FF1F26');
    const whiteColor = new THREE.Color('#CCCCCC');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = -1 - Math.random() * 8;

      // 70% white / gray, 30% red
      const isRed = Math.random() < 0.3;
      const c = isRed ? redColor : whiteColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (reducedMotion || !pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.04 : 0.055}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

/**
 * 4. Camera Parallax Controller (Smooth Lerping)
 */
const CameraRig = ({ reducedMotion }) => {
  const { camera, pointer } = useThree();

  useFrame(() => {
    if (reducedMotion) return;
    // Micro parallax: damp camera to mouse position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.4, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.3, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

/**
 * Main Portfolio 3D Canvas Background Component
 */
const Portfolio3DBackground = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setHasWebGL(checkWebGL());

    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // Detect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    const handleResize = () => checkMobile();

    mediaQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('resize', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Graceful CSS fallback if WebGL is unavailable
  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF1F26]/5 rounded-full blur-[140px]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-45 sm:opacity-60 transition-opacity duration-700"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: true,
        }}
      >
        {/* Subtle Ambient & Red Accent Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 3, 2]} color="#FF1F26" intensity={isMobile ? 1.5 : 2.5} distance={12} />
        <pointLight position={[-4, -2, -1]} color="#ffffff" intensity={0.4} distance={10} />

        {/* 3D Scene Elements */}
        <FloatingShapes isMobile={isMobile} reducedMotion={reducedMotion} />
        <NeonRings isMobile={isMobile} reducedMotion={reducedMotion} />
        <BackgroundParticles isMobile={isMobile} reducedMotion={reducedMotion} />

        {/* Camera Parallax Rig */}
        <CameraRig reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};

export default Portfolio3DBackground;
