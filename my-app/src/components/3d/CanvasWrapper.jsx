import React, { Component, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("3D Canvas rendering caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center p-4 text-center">
          <div className="p-3 rounded-xl bg-[#101010] border border-[#242424] text-xs text-[#737373] font-mono">
            <span className="text-[#FF1F26]">●</span> 3D Neural Viewport
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const CanvasWrapper = ({ children, className = '', ...props }) => {
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
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
};

export default CanvasWrapper;
