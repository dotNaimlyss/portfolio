import React, { useState, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

const GamingBar: React.FC = () => {
  const gamingPercentage = 65;
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredGameIndex, setHoveredGameIndex] = useState<number | null>(null);
  const closePopup = () => setHoveredGameIndex(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null); // Use useRef for hoverTimeout

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current); // Cancel any pending timeout
    }
    setIsVisible(true); // Show the dropdown immediately
  };
  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsVisible(false); // Hide the dropdown after a delay
    }, 500); // Delay for smoother UX
  };
  const handleMouseEnterGame = (index: number) => {
    setHoveredGameIndex(index);
    console.log(index);
  };
  const handleMouseLeaveGame = () => {
    setHoveredGameIndex(null);
  };

  return <div></div>;
};

const GamingSection: React.FC = () => {
  const { isDarkMode } = useTheme(); // Example value for dark mode

  return (
    <section>
      <div className="text-center h-screen pt-16 grid place-items-center">
        <div className="text-center"></div>
      </div>
    </section>
  );
};

export default GamingSection;
