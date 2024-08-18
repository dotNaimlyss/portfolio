"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const InteractiveParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesCount = 10000;

  // Create positions array
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [particlesCount]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.25;
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Points ref={pointsRef} args={[geometry]}>
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
    <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 10], fov: 75 }}>
      <InteractiveParticles />
    </Canvas>
  );
};

export default ParticlesBackground;
