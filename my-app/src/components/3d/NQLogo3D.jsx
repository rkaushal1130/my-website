import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Rounded Rectangle / Squircle Path Generator
function createRoundedRectPath(x, y, width, height, radius) {
  const path = new THREE.Shape();
  const x0 = x - width / 2;
  const x1 = x + width / 2;
  const y0 = y - height / 2;
  const y1 = y + height / 2;
  const r = Math.min(radius, width / 2, height / 2);

  path.moveTo(x0 + r, y0);
  path.lineTo(x1 - r, y0);
  path.quadraticCurveTo(x1, y0, x1, y0 + r);
  path.lineTo(x1, y1 - r);
  path.quadraticCurveTo(x1, y1, x1 - r, y1);
  path.lineTo(x0 + r, y1);
  path.quadraticCurveTo(x0, y1, x0, y1 - r);
  path.lineTo(x0, y0 + r);
  path.quadraticCurveTo(x0, y0, x0 + r, y0);

  return path;
}

// 1. Build the exact "N" shape with smooth rounded corners matching reference
function createNShape() {
  const shape = new THREE.Shape();
  const r = 0.16; // corner radius

  // Left vertical leg outer: x = -2.35, right vertical leg outer: x = -0.32
  // Top: y = 1.45, Bottom: y = -1.35
  const xL_out = -2.35;
  const xL_in = -1.72;
  const xR_in = -0.95;
  const xR_out = -0.32;
  const yTop = 1.45;
  const yBot = -1.35;

  // Start at bottom-left corner
  shape.moveTo(xL_out + r, yBot);
  shape.lineTo(xL_in, yBot);
  // Diagonal inner cut going up to top-right inner
  shape.lineTo(xL_in, yBot + 0.65);
  shape.lineTo(xR_in, yTop);
  // Top of right leg
  shape.lineTo(xR_out - r, yTop);
  shape.quadraticCurveTo(xR_out, yTop, xR_out, yTop - r);
  // Right outer edge
  shape.lineTo(xR_out, yBot + r);
  shape.quadraticCurveTo(xR_out, yBot, xR_out - r, yBot);
  // Bottom of right leg
  shape.lineTo(xR_in, yBot);
  // Diagonal inner cut going down from top-left inner
  shape.lineTo(xR_in, yBot + 0.65);
  shape.lineTo(xL_in, yTop);
  // Top of left leg
  shape.lineTo(xL_out + r, yTop);
  shape.quadraticCurveTo(xL_out, yTop, xL_out, yTop - r);
  // Left outer edge
  shape.lineTo(xL_out, yBot + r);
  shape.quadraticCurveTo(xL_out, yBot, xL_out + r, yBot);

  return shape;
}

// 2. Build the exact "Q" body shape (Squircle with inner squircle hole) matching reference
function createQBodyShape() {
  // Outer squircle
  const shape = createRoundedRectPath(1.22, 0.08, 2.55, 2.65, 0.62);

  // Inner cutout squircle (hole)
  const hole = new THREE.Path();
  const hx = 1.22;
  const hy = 0.16;
  const hw = 1.32;
  const hh = 1.38;
  const hr = 0.28;
  const x0 = hx - hw / 2;
  const x1 = hx + hw / 2;
  const y0 = hy - hh / 2;
  const y1 = hy + hh / 2;

  hole.moveTo(x0 + hr, y0);
  hole.lineTo(x1 - hr, y0);
  hole.quadraticCurveTo(x1, y0, x1, y0 + hr);
  hole.lineTo(x1, y1 - hr);
  hole.quadraticCurveTo(x1, y1, x1 - hr, y1);
  hole.lineTo(x0 + hr, y1);
  hole.quadraticCurveTo(x0, y1, x0, y1 - hr);
  hole.lineTo(x0, y0 + hr);
  hole.quadraticCurveTo(x0, y0, x0 + hr, y0);

  shape.holes.push(hole);
  return shape;
}

// 3. Build the bold diagonal "Q-Tail" shape matching reference
function createQTailShape() {
  // A rounded diagonal bar angled at -45 degrees
  const shape = createRoundedRectPath(0, 0, 0.64, 1.85, 0.14);
  return shape;
}

// 4. Inner Q glowing lining hole shape (for inner cavity glow band)
function createQInnerLiningShape() {
  const shape = new THREE.Shape();
  const hx = 1.22;
  const hy = 0.16;
  const hw = 1.34;
  const hh = 1.40;
  const hr = 0.28;
  const x0 = hx - hw / 2;
  const x1 = hx + hw / 2;
  const y0 = hy - hh / 2;
  const y1 = hy + hh / 2;

  shape.moveTo(x0 + hr, y0);
  shape.lineTo(x1 - hr, y0);
  shape.quadraticCurveTo(x1, y0, x1, y0 + hr);
  shape.lineTo(x1, y1 - hr);
  shape.quadraticCurveTo(x1, y1, x1 - hr, y1);
  shape.lineTo(x0 + hr, y1);
  shape.quadraticCurveTo(x0, y1, x0, y1 - hr);
  shape.lineTo(x0, y0 + hr);
  shape.quadraticCurveTo(x0, y0, x0 + hr, y0);

  return shape;
}

const NQLogo3D = ({
  isHovered = false,
  onHoverChange = () => {},
  scrollOffset = 0,
}) => {
  const groupRef = useRef();
  const qCoreLightRef = useRef();
  const redTrimMatRef = useRef();
  const qInnerGlowMatRef = useRef();

  const [reducedMotion, setReducedMotion] = useState(false);
  const { pointer } = useThree();

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const handler = (e) => setReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Main 3D Extrusion settings - Thick, heavy, architectural with smooth round bevels
  const extrudeSettings = useMemo(
    () => ({
      depth: 0.62,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.065,
      bevelThickness: 0.075,
      curveSegments: 48,
    }),
    []
  );

  // Red edge contour / trim extrude settings (slightly offset behind and outwards)
  const trimExtrudeSettings = useMemo(
    () => ({
      depth: 0.66,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.085,
      bevelThickness: 0.05,
      curveSegments: 36,
    }),
    []
  );

  // Geometries for N, Q, Tail, and Trims
  const nGeom = useMemo(() => new THREE.ExtrudeGeometry(createNShape(), extrudeSettings), [extrudeSettings]);
  const qGeom = useMemo(() => new THREE.ExtrudeGeometry(createQBodyShape(), extrudeSettings), [extrudeSettings]);
  const tailGeom = useMemo(() => new THREE.ExtrudeGeometry(createQTailShape(), extrudeSettings), [extrudeSettings]);

  const nTrimGeom = useMemo(() => new THREE.ExtrudeGeometry(createNShape(), trimExtrudeSettings), [trimExtrudeSettings]);
  const qTrimGeom = useMemo(() => new THREE.ExtrudeGeometry(createQBodyShape(), trimExtrudeSettings), [trimExtrudeSettings]);
  const tailTrimGeom = useMemo(() => new THREE.ExtrudeGeometry(createQTailShape(), trimExtrudeSettings), [trimExtrudeSettings]);

  // Premium Black Chrome / Obsidian Metallic Material matching reference screenshot
  const blackObsidianMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#070709'),
        metalness: 0.96,
        roughness: 0.18,
        clearcoat: 0.92,
        clearcoatRoughness: 0.12,
        reflectivity: 0.98,
        ior: 1.55,
      }),
    []
  );

  // Brilliant Red Emissive Edge Trim Material
  const redNeonMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FF1F26',
        emissive: '#FF1F26',
        emissiveIntensity: 3.5,
        toneMapped: false,
        roughness: 0.1,
        metalness: 0.2,
      }),
    []
  );

  // Vibrant Red Inner Q Emissive Material
  const qInnerEmissiveMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#FF0D18'),
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Default angle matching reference (slight 3/4 perspective)
    const baseRotY = -0.16; // -9 degrees
    const baseRotX = 0.05;  // 3 degrees

    if (!reducedMotion) {
      // 1. Floating hovering motion (smooth oscillation)
      const floatY = Math.sin(t * 1.3) * 0.07;
      const targetY = 0.12 + floatY - scrollOffset * 0.45;

      // 2. Slow breathing rotation
      const rotY = baseRotY + Math.sin(t * 0.7) * 0.04;
      const rotX = baseRotX + Math.cos(t * 0.85) * 0.02;

      // 3. Pointer parallax tilt
      const mouseTiltX = pointer.y * 0.06;
      const mouseTiltY = pointer.x * 0.09;

      // Smooth interpolation
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        isHovered ? 0.35 : 0,
        0.06
      );

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rotX - mouseTiltX,
        0.04
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotY + mouseTiltY,
        0.04
      );
    }

    // Dynamic Q inner light pulse and breathing glow
    const pulse = Math.sin(t * 2.5) * 0.5;
    const hoverMult = isHovered ? 1.4 : 1.0;

    if (qCoreLightRef.current) {
      qCoreLightRef.current.intensity = (5.5 + pulse) * hoverMult;
    }

    if (redTrimMatRef.current) {
      redTrimMatRef.current.emissiveIntensity = (3.5 + pulse * 0.4) * hoverMult;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0.12, 0]}
      rotation={[0.05, -0.16, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHoverChange(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHoverChange(false);
      }}
    >
      {/* ========================================================
          1. RED ILLUMINATED REAR RIM / EDGE TRIMS
          Creates the sharp red glowing silhouette from reference
         ======================================================== */}
      <group position={[0, 0, -0.035]}>
        {/* N Red Edge Trim */}
        <mesh geometry={nTrimGeom} material={redNeonMaterial} scale={[1.015, 1.015, 0.98]} />
        
        {/* Q Body Red Edge Trim */}
        <mesh geometry={qTrimGeom} material={redNeonMaterial} scale={[1.015, 1.015, 0.98]} />

        {/* Q Tail Red Edge Trim */}
        <group position={[1.82, -0.58, 0.05]} rotation={[0, 0, -Math.PI / 4.1]}>
          <mesh geometry={tailTrimGeom} material={redNeonMaterial} scale={[1.018, 1.018, 0.98]} />
        </group>
      </group>

      {/* ========================================================
          2. MAIN BLACK OBSIDIAN METALLIC NQ MONOGRAM BODY
         ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* The "N" Letterform */}
        <mesh
          geometry={nGeom}
          material={blackObsidianMaterial}
          castShadow
          receiveShadow
        />

        {/* The "Q" Squircle Body */}
        <mesh
          geometry={qGeom}
          material={blackObsidianMaterial}
          castShadow
          receiveShadow
        />

        {/* The "Q" Diagonal Tail (Angled at ~45deg through bottom-right) */}
        <group position={[1.82, -0.58, 0.05]} rotation={[0, 0, -Math.PI / 4.1]}>
          <mesh
            geometry={tailGeom}
            material={blackObsidianMaterial}
            castShadow
            receiveShadow
          />
        </group>
      </group>

      {/* ========================================================
          3. INTENSE RED INTERNAL GLOW INSIDE THE "Q" CAVITY
          Matches the vibrant glowing red center in the reference
         ======================================================== */}
      <group position={[1.22, 0.16, 0.28]}>
        {/* Inner cavity red glow band */}
        <mesh>
          <boxGeometry args={[1.22, 1.28, 0.52]} />
          <meshBasicMaterial
            ref={qInnerGlowMatRef}
            color="#FF0D18"
            transparent
            opacity={0.38}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Dedicated Point Light inside Q Hole */}
        <pointLight
          ref={qCoreLightRef}
          color="#FF1F26"
          intensity={5.8}
          distance={5.5}
          decay={1.8}
        />

        {/* Soft Volumetric Red Core Flare */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.55, 20, 20]} />
          <meshBasicMaterial
            color="#FF3333"
            transparent
            opacity={0.32}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* ========================================================
          4. RED GLOW REFLECTION ON INNER "N" VERTICAL CAVITY
         ======================================================== */}
      <mesh position={[-1.34, 0.05, 0.22]} rotation={[0, 0, Math.PI / 4.2]}>
        <boxGeometry args={[0.04, 1.6, 0.48]} />
        <meshBasicMaterial
          color="#FF1F26"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default NQLogo3D;
