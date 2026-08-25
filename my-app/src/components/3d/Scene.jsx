import React from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import CanvasWrapper from './CanvasWrapper';

const Scene = ({
  children,
  className = '',
  cameraFov = 48,
  cameraPosition = [0, 0, 4.8],
  showLighting = true,
  ...props
}) => {
  return (
    <CanvasWrapper className={className} {...props}>
      <PerspectiveCamera makeDefault fov={cameraFov} position={cameraPosition} />

      {showLighting && (
        <>
          {/* Dark Ambient Base Light */}
          <ambientLight intensity={0.35} color="#ffffff" />

          {/* Soft White Key Directional Light */}
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

          {/* Subtle Specular Highlight */}
          <pointLight
            position={[0, 4, -2]}
            color="#ffffff"
            intensity={0.5}
            distance={6}
          />
        </>
      )}

      {children}
    </CanvasWrapper>
  );
};

export default Scene;
