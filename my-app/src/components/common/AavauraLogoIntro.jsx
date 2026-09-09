import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import brandLogo from '../../assets/images/logo.png';
import { FastForward } from 'lucide-react';

/**
 * AavauraLogoIntro
 * 
 * Cinematic 3D Logo Intro Animation:
 * 1. Pure black void start.
 * 2. Visual fragmentation of the official AAVAURA logo into 32 distinct 3D pieces.
 * 3. Fragments hurtle toward center from ALL directions (top, bottom, left, right, diagonals).
 * 4. 3D rotation, dynamic motion blur, and glowing red light trails.
 * 5. Progressive magnetic locking into place in the center.
 * 6. Climax: Radiant red shockwave & anamorphic light sweep as seams fuse.
 * 7. Completed logo hold with ambient red backlight and subtle float.
 * 8. Cinematic reveal of tagline: "Innovating Today. Building Tomorrow."
 * 9. Total duration: ~6.8s with Skip button and onComplete callback.
 */
const AavauraLogoIntro = ({ onComplete, allowSkip = true }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const isSkippedRef = useRef(false);

  const [taglineVisible, setTaglineVisible] = useState(false);
  const [taglineExpand, setTaglineExpand] = useState(false);
  const [containerOpacity, setContainerOpacity] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Trigger smooth skip & completion
  const handleSkip = useCallback(() => {
    if (isSkippedRef.current) return;
    isSkippedRef.current = true;
    setIsFadingOut(true);
    setContainerOpacity(0);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450);
  }, [onComplete]);

  // Keyboard shortcut listener (Escape or Space to skip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL initialization failed, skipping intro:', e);
      handleSkip();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015);

    // Responsive Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const updateCameraDistance = () => {
      const aspect = window.innerWidth / window.innerHeight;
      // On mobile/portrait screens, back camera away so full logo fits comfortably
      if (aspect < 1.0) {
        camera.position.z = 15.5 / (aspect * 1.15);
      } else if (aspect < 1.5) {
        camera.position.z = 16.5;
      } else {
        camera.position.z = 14.2;
      }
      camera.position.y = 0.4; // slight vertical offset to center composition with tagline
      camera.lookAt(0, 0, 0);
    };
    updateCameraDistance();

    // Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const redPointLight = new THREE.PointLight(0xff1f26, 4.0, 40);
    redPointLight.position.set(0, 0, 8);
    scene.add(redPointLight);

    const silverDirLight = new THREE.DirectionalLight(0xe8f0ff, 2.2);
    silverDirLight.position.set(12, 16, 18);
    scene.add(silverDirLight);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    let texture = null;
    let isDisposed = false;

    // Disposables array for clean memory release
    const disposables = [];
    const registerDisposable = (item) => {
      if (item) disposables.push(item);
    };

    textureLoader.load(
      brandLogo,
      (loadedTexture) => {
        if (isDisposed) {
          loadedTexture.dispose();
          return;
        }

        texture = loadedTexture;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        registerDisposable(texture);

        // Build 3D Fragment Assembly Scene
        setupAnimationScene(texture);
      },
      undefined,
      (err) => {
        console.warn('Failed to load logo texture:', err);
        handleSkip();
      }
    );

    let setupAnimationScene = (logoTex) => {};

    setupAnimationScene = (logoTex) => {
      const LOGO_WIDTH = 11.2;
      const LOGO_HEIGHT = 11.2 / 3.0; // 3.733 units
      const COLS = 8;
      const ROWS = 4;
      const TOTAL_FRAGMENTS = COLS * ROWS; // 32 fragments

      const cellW = LOGO_WIDTH / COLS;
      const cellH = LOGO_HEIGHT / ROWS;

      // Group that holds the entire logo assembly for subtle global float
      const logoGroup = new THREE.Group();
      scene.add(logoGroup);

      // --- 1. FULL ASSEMBLED LOGO (Fades in seamlessly during lock) ---
      const fullLogoGeom = new THREE.PlaneGeometry(LOGO_WIDTH, LOGO_HEIGHT);
      registerDisposable(fullLogoGeom);
      const fullLogoMat = new THREE.MeshBasicMaterial({
        map: logoTex,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      registerDisposable(fullLogoMat);
      const fullLogoMesh = new THREE.Mesh(fullLogoGeom, fullLogoMat);
      fullLogoMesh.position.set(0, 0, 0.02);
      logoGroup.add(fullLogoMesh);

      // --- 2. AMBIENT RED VOLUMETRIC BACKLIGHT ---
      const glowCanvas = document.createElement('canvas');
      glowCanvas.width = 256;
      glowCanvas.height = 256;
      const gctx = glowCanvas.getContext('2d');
      const grad = gctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(255, 31, 38, 0.85)');
      grad.addColorStop(0.35, 'rgba(255, 31, 38, 0.35)');
      grad.addColorStop(0.7, 'rgba(180, 10, 20, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 256, 256);
      const glowTex = new THREE.CanvasTexture(glowCanvas);
      registerDisposable(glowTex);

      const glowGeom = new THREE.PlaneGeometry(LOGO_WIDTH * 1.8, LOGO_HEIGHT * 2.8);
      registerDisposable(glowGeom);
      const glowMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      registerDisposable(glowMat);
      const glowMesh = new THREE.Mesh(glowGeom, glowMat);
      glowMesh.position.set(0, 0, -0.6);
      logoGroup.add(glowMesh);

      // --- 3. ANAMORPHIC HORIZONTAL LIGHT SWEEP ---
      const sweepCanvas = document.createElement('canvas');
      sweepCanvas.width = 512;
      sweepCanvas.height = 64;
      const sctx = sweepCanvas.getContext('2d');
      const sgrad = sctx.createLinearGradient(0, 0, 512, 0);
      sgrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      sgrad.addColorStop(0.42, 'rgba(255, 31, 38, 0.3)');
      sgrad.addColorStop(0.49, 'rgba(255, 255, 255, 0.95)');
      sgrad.addColorStop(0.50, 'rgba(255, 255, 255, 1.0)');
      sgrad.addColorStop(0.51, 'rgba(255, 255, 255, 0.95)');
      sgrad.addColorStop(0.58, 'rgba(255, 31, 38, 0.3)');
      sgrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sctx.fillStyle = sgrad;
      sctx.fillRect(0, 0, 512, 64);
      const sweepTex = new THREE.CanvasTexture(sweepCanvas);
      registerDisposable(sweepTex);

      const sweepGeom = new THREE.PlaneGeometry(LOGO_WIDTH * 0.85, LOGO_HEIGHT * 1.6);
      registerDisposable(sweepGeom);
      const sweepMat = new THREE.MeshBasicMaterial({
        map: sweepTex,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      registerDisposable(sweepMat);
      const sweepMesh = new THREE.Mesh(sweepGeom, sweepMat);
      sweepMesh.position.set(-LOGO_WIDTH, 0, 0.15);
      logoGroup.add(sweepMesh);

      // --- 4. RADIAL ENERGY SHOCKWAVE RING (Connect climax) ---
      const ringGeom = new THREE.RingGeometry(0.1, 0.5, 48);
      registerDisposable(ringGeom);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xff1f26,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      registerDisposable(ringMat);
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      // Center ring around the AAVAURA emblem star position (left quadrant)
      ringMesh.position.set(-3.2, 0.1, 0.1);
      logoGroup.add(ringMesh);

      // --- 5. 32 3D FRAGMENTS & RED MOTION TRAILS ---
      const fragments = [];

      // Create red trail gradient texture
      const trailCanvas = document.createElement('canvas');
      trailCanvas.width = 128;
      trailCanvas.height = 32;
      const tctx = trailCanvas.getContext('2d');
      const tgrad = tctx.createLinearGradient(0, 0, 128, 0);
      tgrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      tgrad.addColorStop(0.4, 'rgba(255, 31, 38, 0.4)');
      tgrad.addColorStop(0.85, 'rgba(255, 60, 70, 0.9)');
      tgrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
      tctx.fillStyle = tgrad;
      tctx.fillRect(0, 0, 128, 32);
      const trailTex = new THREE.CanvasTexture(trailCanvas);
      registerDisposable(trailTex);

      // Pre-assigned launch sectors covering ALL 8 cardinal & diagonal directions:
      // [Top-Left, Top, Top-Right, Right, Bottom-Right, Bottom, Bottom-Left, Left]
      const SECTOR_ANGLES = [
        (3 * Math.PI) / 4, // Top-Left (135°)
        Math.PI / 2,        // Top (90°)
        Math.PI / 4,        // Top-Right (45°)
        0,                  // Right (0°)
        -Math.PI / 4,       // Bottom-Right (-45°)
        -Math.PI / 2,       // Bottom (-90°)
        (-3 * Math.PI) / 4, // Bottom-Left (-135°)
        Math.PI,            // Left (180°)
      ];

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const index = r * COLS + c;

          // Target resting coordinates in assembled logo
          const targetX = -LOGO_WIDTH / 2 + (c + 0.5) * cellW;
          const targetY = -LOGO_HEIGHT / 2 + (r + 0.5) * cellH;
          const targetZ = 0;

          // Custom UV slice mapping
          const u0 = c / COLS;
          const u1 = (c + 1) / COLS;
          const v0 = r / ROWS;
          const v1 = (r + 1) / ROWS;

          const fragGeom = new THREE.PlaneGeometry(cellW * 0.985, cellH * 0.985);
          registerDisposable(fragGeom);

          // Update UV coordinates to sample the exact tile of the logo
          const uvAttr = fragGeom.attributes.uv;
          uvAttr.setXY(0, u0, v1); // top-left
          uvAttr.setXY(1, u1, v1); // top-right
          uvAttr.setXY(2, u0, v0); // bottom-left
          uvAttr.setXY(3, u1, v0); // bottom-right
          uvAttr.needsUpdate = true;

          const fragMat = new THREE.MeshStandardMaterial({
            map: logoTex,
            transparent: true,
            opacity: 0,
            roughness: 0.25,
            metalness: 0.85,
            side: THREE.DoubleSide,
            depthWrite: false,
          });
          registerDisposable(fragMat);

          const fragMesh = new THREE.Mesh(fragGeom, fragMat);

          // High-tech glowing red perimeter seam outline
          const edgeGeom = new THREE.EdgesGeometry(fragGeom);
          registerDisposable(edgeGeom);
          const edgeMat = new THREE.LineBasicMaterial({
            color: 0xff1f26,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
          });
          registerDisposable(edgeMat);
          const edgeLines = new THREE.LineSegments(edgeGeom, edgeMat);
          fragMesh.add(edgeLines);

          // Dedicated Motion Blur Red Light Trail
          const trailGeom = new THREE.PlaneGeometry(1, cellH * 0.6);
          registerDisposable(trailGeom);
          // Shift trail origin so it stretches backwards from the fragment center
          trailGeom.translate(-0.5, 0, 0);

          const trailMat = new THREE.MeshBasicMaterial({
            map: trailTex,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false,
          });
          registerDisposable(trailMat);
          const trailMesh = new THREE.Mesh(trailGeom, trailMat);
          scene.add(trailMesh);

          // Trajectory: 4 fragments per sector evenly distribute all directions
          const sectorIdx = index % 8;
          const baseAngle = SECTOR_ANGLES[sectorIdx];
          // Slight procedural jitter so pieces don't fly in identical parallel tracks
          const jitter = (((index * 7) % 11) - 5) * 0.05;
          const angle = baseAngle + jitter;

          // Distance far outside the view frustum (28 to 44 world units)
          const distance = 28 + (index % 5) * 4;
          const startX = targetX + Math.cos(angle) * distance;
          const startY = targetY + Math.sin(angle) * distance * 0.9;
          // Diverse 3D depth: some rushing in from camera foreground, some from deep space
          const startZ = (((index * 3) % 7) - 3) * 6.5;

          // Complex 3D initial spins
          const startRotX = (((index * 1.7) % 3.0) - 1.5) * Math.PI * 2.5;
          const startRotY = (((index * 2.3) % 3.0) - 1.5) * Math.PI * 2.5;
          const startRotZ = (((index * 0.9) % 2.0) - 1.0) * Math.PI * 1.8;

          // Staggered launch timing: wave from 0.45s to 1.15s
          const startTime = 0.45 + (index % 8) * 0.08 + (Math.floor(index / 8) * 0.06);
          // Flight duration: 1.65s to 2.05s
          const duration = 1.7 + ((index * 3) % 5) * 0.08;

          fragments.push({
            mesh: fragMesh,
            edgeMat,
            trailMesh,
            trailMat,
            targetX,
            targetY,
            targetZ,
            startX,
            startY,
            startZ,
            startRotX,
            startRotY,
            startRotZ,
            startTime,
            duration,
            prevX: startX,
            prevY: startY,
            prevZ: startZ,
            isLocked: false,
          });

          logoGroup.add(fragMesh);
        }
      }

      // --- ANIMATION TIMELINE LOOP ---
      const animStartTime = performance.now();
      let hasTriggeredTagline = false;
      let hasTriggeredComplete = false;

      // Custom high-tech magnetic lock easing
      const magneticEase = (p) => {
        if (p >= 1.0) return 1.0;
        // High-speed acceleration + rapid deceleration (quintic ease-out)
        const p1 = 1.0 - Math.pow(1.0 - p, 4.2);
        // Magnetic latch: 0.94 -> 1.0 micro-spring snap
        if (p > 0.93) {
          const snapT = (p - 0.93) / 0.07;
          const damp = Math.exp(-snapT * 5) * Math.sin(snapT * Math.PI * 2) * 0.015;
          return p1 + damp;
        }
        return p1;
      };

      const animate = (now) => {
        if (isDisposed) return;
        animFrameRef.current = requestAnimationFrame(animate);

        const elapsedSec = (now - animStartTime) * 0.001;

        // Subtle camera breath
        if (elapsedSec > 3.0) {
          camera.position.x = Math.sin(elapsedSec * 0.8) * 0.15;
          camera.position.y = 0.4 + Math.cos(elapsedSec * 0.6) * 0.1;
        }

        // --- PHASE 1: FRAGMENTS FLIGHT & MAGNETIC LOCK ---
        fragments.forEach((frag) => {
          if (elapsedSec < frag.startTime) {
            frag.mesh.visible = false;
            frag.trailMesh.visible = false;
            return;
          }

          frag.mesh.visible = true;
          frag.trailMesh.visible = true;

          const rawP = Math.min(1.0, (elapsedSec - frag.startTime) / frag.duration);
          const p = magneticEase(rawP);

          // Current 3D position
          const curX = THREE.MathUtils.lerp(frag.startX, frag.targetX, p);
          const curY = THREE.MathUtils.lerp(frag.startY, frag.targetY, p);
          const curZ = THREE.MathUtils.lerp(frag.startZ, frag.targetZ, p);

          frag.mesh.position.set(curX, curY, curZ);

          // 3D Rotations align as fragment converges
          const rotP = Math.min(1.0, rawP * 1.15);
          frag.mesh.rotation.x = THREE.MathUtils.lerp(frag.startRotX, 0, rotP);
          frag.mesh.rotation.y = THREE.MathUtils.lerp(frag.startRotY, 0, rotP);
          frag.mesh.rotation.z = THREE.MathUtils.lerp(frag.startRotZ, 0, rotP);

          // Opacity fade in
          frag.mesh.material.opacity = Math.min(1.0, rawP * 2.5);

          // Seamline red edge illumination
          if (rawP < 0.85) {
            frag.edgeMat.opacity = 0.45;
          } else if (rawP < 1.0) {
            // Laser flare when locking into place
            frag.edgeMat.opacity = 0.95;
          } else {
            // Fuse seams smoothly to 0 once fully locked
            const fuseP = Math.min(1.0, (elapsedSec - (frag.startTime + frag.duration)) / 0.5);
            frag.edgeMat.opacity = 0.95 * (1.0 - fuseP);
          }

          // Red Motion Trail calculation
          const dx = curX - frag.prevX;
          const dy = curY - frag.prevY;
          const dz = curZ - frag.prevZ;
          const speed = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (speed > 0.015 && rawP < 0.98) {
            frag.trailMesh.visible = true;
            frag.trailMesh.position.set(curX, curY, curZ);

            // Angle of the trail aligns with movement vector
            const moveAngle = Math.atan2(dy, dx);
            frag.trailMesh.rotation.z = moveAngle;

            // Trail stretches according to speed
            const trailLen = Math.min(speed * 12.0, 9.5);
            frag.trailMesh.scale.set(trailLen, 1, 1);
            frag.trailMat.opacity = Math.min(speed * 3.8, 0.85);
          } else {
            frag.trailMesh.visible = false;
            frag.trailMat.opacity = 0;
          }

          frag.prevX = curX;
          frag.prevY = curY;
          frag.prevZ = curZ;
        });

        // --- PHASE 2: CLIMAX CONNECTION & LIGHT SWEEP ---
        // Occurs between t = 3.1s and 4.2s
        if (elapsedSec >= 3.1) {
          const climaxP = Math.min(1.0, (elapsedSec - 3.1) / 0.9);

          // 1. Crossfade from fragments to seamless unified full logo
          const fullFadeP = Math.min(1.0, (elapsedSec - 3.1) / 0.35);
          fullLogoMat.opacity = fullFadeP;

          // Fade out individual fragment meshes to prevent z-fighting
          fragments.forEach((frag) => {
            frag.mesh.material.opacity = 1.0 - fullFadeP;
          });

          // 2. Anamorphic Horizontal Light Sweep
          if (climaxP < 1.0) {
            sweepMesh.visible = true;
            const sweepEase = Math.sin(climaxP * Math.PI * 0.5);
            sweepMesh.position.x = -LOGO_WIDTH * 0.8 + sweepEase * (LOGO_WIDTH * 1.6);
            // Bell curve intensity: peaks at center
            sweepMat.opacity = Math.sin(climaxP * Math.PI) * 0.95;
            sweepMesh.scale.x = 0.8 + Math.sin(climaxP * Math.PI) * 0.4;
          } else {
            sweepMesh.visible = false;
            sweepMat.opacity = 0;
          }

          // 3. Expanding Radial Shockwave Ring from star emblem
          if (elapsedSec >= 3.15 && elapsedSec <= 3.9) {
            const ringP = (elapsedSec - 3.15) / 0.75;
            ringMesh.visible = true;
            const ringScale = 0.2 + ringP * 7.5;
            ringMesh.scale.set(ringScale, ringScale, 1);
            ringMat.opacity = Math.sin(ringP * Math.PI) * 0.75;
          } else {
            ringMesh.visible = false;
          }

          // 4. Volumetric Red Backlight Breathing
          glowMat.opacity = 0.35 + Math.sin(elapsedSec * 1.5) * 0.08;
        }

        // --- PHASE 3: HOLD COMPLETED LOGO & 3D FLOATING ---
        if (elapsedSec >= 3.4) {
          logoGroup.rotation.x = Math.sin(elapsedSec * 1.1) * 0.035;
          logoGroup.rotation.y = Math.cos(elapsedSec * 0.8) * 0.045;
          logoGroup.position.y = Math.sin(elapsedSec * 1.4) * 0.07;
        }

        // --- PHASE 4: TAGLINE REVEAL ---
        if (elapsedSec >= 4.6 && !hasTriggeredTagline) {
          hasTriggeredTagline = true;
          setTaglineVisible(true);
          setTimeout(() => {
            setTaglineExpand(true);
          }, 80);
        }

        // --- PHASE 5: OUTRO FADE & COMPLETION ---
        // Animation duration ~6.7s
        if (elapsedSec >= 6.3 && !hasTriggeredComplete) {
          hasTriggeredComplete = true;
          setIsFadingOut(true);
          setContainerOpacity(0);

          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }

        renderer.render(scene, camera);
      };

      animFrameRef.current = requestAnimationFrame(animate);
    };

    // Responsive resize handler
    const handleResize = () => {
      if (!canvas || !renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      updateCameraDistance();
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup resources
    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      disposables.forEach((d) => {
        try {
          if (d && typeof d.dispose === 'function') d.dispose();
        } catch (e) {
          // ignore
        }
      });

      if (renderer) {
        try {
          renderer.dispose();
          renderer.forceContextLoss();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [handleSkip, onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        opacity: containerOpacity,
        transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="fixed inset-0 z-[99999] bg-[#000000] select-none overflow-hidden flex flex-col items-center justify-center cursor-default pointer-events-auto"
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)]" />

      {/* Cinematic Tagline Reveal Overlay */}
      <div className="absolute bottom-[20vh] sm:bottom-[22vh] inset-x-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4 text-center">
        {/* Subtle Horizontal Red Laser Divider */}
        <div
          style={{
            transform: taglineExpand ? 'scaleX(1)' : 'scaleX(0)',
            opacity: taglineVisible ? 1 : 0,
            transition: 'transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms ease-out',
          }}
          className="h-[1.5px] w-48 sm:w-64 md:w-80 bg-gradient-to-r from-transparent via-[#FF1F26] to-transparent mb-4 shadow-[0_0_12px_#FF1F26]"
        />

        {/* Tagline Text with Futuristic Typography */}
        <div
          style={{
            opacity: taglineVisible ? 1 : 0,
            transform: taglineVisible ? 'translateY(0px)' : 'translateY(12px)',
            transition: 'opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="flex items-center justify-center gap-1.5"
        >
          <h2
            style={{
              letterSpacing: taglineExpand ? '0.28em' : '0.15em',
              transition: 'letter-spacing 1600ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-[0.25em] uppercase text-[#E2E8F0] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            <span>Innovating Today</span>
            <span className="text-[#FF1F26] mx-2 font-normal">.</span>
            <span>Building Tomorrow</span>
            <span className="text-[#FF1F26]">.</span>
          </h2>
        </div>
      </div>

      {/* Minimal Futuristic Skip Option in Bottom Corner */}
      {allowSkip && (
        <button
          type="button"
          onClick={handleSkip}
          disabled={isFadingOut}
          aria-label="Skip intro animation"
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 hover:border-[#FF1F26]/70 text-white/50 hover:text-white text-xs font-mono tracking-wider flex items-center gap-2 transition-all duration-300 backdrop-blur-md cursor-pointer active:scale-95 group shadow-xl"
        >
          <span className="group-hover:text-white transition-colors duration-200">SKIP</span>
          <FastForward className="w-3 h-3 text-[#FF1F26] group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      )}

      {/* Ambient Micro Grid Overlay for Cybernetic Feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  );
};

export default AavauraLogoIntro;
