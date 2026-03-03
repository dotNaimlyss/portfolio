"use client";

import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useTheme } from "../context/ThemeContext";

const ParticlesBackground: React.FC = () => {
  const { isDarkMode } = useTheme();

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      className="pointer-events-none"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -10 },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 70,
            density: {
              enable: true,
              area: 900,
            },
          },
          color: {
            value: isDarkMode ? ["#7dd3fc", "#22d3ee", "#f472b6"] : ["#0284c7", "#06b6d4", "#fb7185"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.22,
          },
          size: {
            value: { min: 1, max: 3 },
          },
          links: {
            enable: true,
            distance: 130,
            color: isDarkMode ? "#38bdf8" : "#0ea5e9",
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.6,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: false,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.35,
              },
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;

