"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const InteractiveParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null); // Initialize with null
  const particlesCount = 10000;
  const positions = new Float32Array(particlesCount * 3);

  useEffect(() => {
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    pointsRef.current?.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
  }, [particlesCount, positions]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.25;
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry attach="geometry" />
      <PointMaterial
        attach="material"
        color="#ffffff"
        size={0.05}
        sizeAttenuation
        transparent
      />
    </Points>
  );
};

const ParticlesBackground: React.FC = () => {
  return (
    <Canvas
      className="absolute inset-0 z-0"
      camera={{ position: [0, 0, 10], fov: 75 }}
    >
      <InteractiveParticles />
    </Canvas>
  );
};

export default ParticlesBackground;
