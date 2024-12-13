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
  const games = [
    {
      name: "Dota2",
      logo: "/logos/dtwologo.jpg",
      extraDetails: "This is a description of Game 1.",
    },
    {
      name: "League of Legends",
      logo: "/logos/lol-logo.jpg",
      extraDetails: "This is a description of Game 1.",
    },
    {
      name: "left 4 death",
      logo: "/logos/lol-logo.jpg",
      extraDetails: "This is a description of Game 1.",
    },
    {
      name: "Mortal Combat",
      logo: "/logos/lol-logo.jpg",
      extraDetails: "This is a description of Game 1.",
    },
    {
      name: "GTA: Vice City",
      logo: "/logos/lol-logo.jpg",
      extraDetails: "This is a description of Game 1.",
    },
    {
      name: "Army Man",
      logo: "/logos/lol-logo.jpg",
      extraDetails: "This is a description of Game 1.",
    },
  ];

  return (
    <div
      className="text-center mt-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className="text-xl font-semibold mb-4">Gaming Hours</p>
      <div className={`w-full bg-gray-300 rounded-full h-6 mb-4 relative`}>
        <div
          className="h-full bg-gray-800 rounded-full animate-shiny"
          style={{ width: `${gamingPercentage}%` }}
        />
        <span className="absolute top-0 left-0 right-0 bottom-0 m-auto text-white font-semibold ">
          {gamingPercentage}% of my life was spent playing games
        </span>

        {isVisible && (
          <>
            <div
              className={`absolute top-full left-0 mt-2 w-full bg-gray-300 rounded-md transition-all ease-in-out duration-300 p-4 shadow-lg grid grid-cols-5 gap-4 ${
                isHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-5"
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {games.map((game, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center relative"
                  onMouseEnter={() => handleMouseEnterGame(index)}
                  onMouseLeave={handleMouseLeaveGame}
                >
                  <Image
                    src={game.logo}
                    alt={game.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-md"
                  />
                  <p className="text-sm text-black mt-2">{game.name}</p>
                </div>
              ))}
            </div>
            {hoveredGameIndex !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-transform duration-500 ease-out scale-100">
                <div className="relative bg-white text-black p-6 rounded-lg shadow-2xl w-1/3 h-auto text-center">
                  <h3 className="text-lg font-bold mb-4">
                    {games[hoveredGameIndex].name}
                  </h3>
                  <p className="text-sm">
                    {games[hoveredGameIndex].extraDetails}
                  </p>
                  <button
                    onClick={closePopup}
                    className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const GamingSection: React.FC = () => {
  const { isDarkMode } = useTheme(); // Example value for dark mode

  return (
    <section>
      <div className="text-center h-screen pt-16 grid place-items-center">
        <div className="text-center">
          <p className={`text-lg animate-fade-in-delayed`}>
            I&apos;ve spent much of my life immersed in video games, honing
            skills in critical thinking, teamwork, and collaboration, which now
            fuel my passion for problem-solving and innovation.
          </p>
          <GamingBar />
        </div>
      </div>
    </section>
  );
};

export default GamingSection;
