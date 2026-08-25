import React, { Component, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("3D Canvas error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center p-4 text-center">
          <div className="p-4 rounded-xl bg-[#101010] border border-[#242424] text-xs text-[#737373] font-mono">
            <span className="text-[#FF1F26]">●</span> 3D Neural Viewport Active
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const Scene = ({
  children,
  className = '',
  cameraFov = 48,
  cameraPosition = [0, 0, 5],
  showLighting = true,
  ...props
}) => {
  return (
    <CanvasErrorBoundary>
      <div className={`w-full h-full relative ${className}`}>
        <Canvas
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.5]}
          {...props}
        >
          <PerspectiveCamera makeDefault fov={cameraFov} position={cameraPosition} />

          {showLighting && (
            <>
              {/* Dark Ambient Base Light */}
              <ambientLight intensity={0.35} color="#ffffff" />

              {/* Soft White Key Light */}
              <directionalLight
                position={[5, 6, 5]}
                intensity={0.8}
                color="#ffffff"
              />

              {/* Primary Red Rim Point Light */}
              <pointLight
                position={[-3, 2, 3]}
                color="#FF1F26"
                intensity={3.0}
                distance={10}
              />

              {/* Secondary Bright Red Fill Point Light */}
              <pointLight
                position={[3, -2, 2]}
                color="#FF3030"
                intensity={2.2}
                distance={8}
              />

              {/* Subtle Blue/White Specular Highlight */}
              <pointLight
                position={[0, 4, -2]}
                color="#ffffff"
                intensity={0.6}
                distance={6}
              />
            </>
          )}

          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
};

export default Scene;
