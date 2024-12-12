import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const GamingBar: React.FC = () => {
  const gamingPercentage = 65;
  const [isHovered, setIsHovered] = useState(false);
  const games = [
    {
      name: "The Legend of Zelda: Breath of the Wild",
      logo: "C:/42Singapore(SUTD)/Preparation/portfolio/portfolio/public/logos/HD Dota 2 Official Logo PNG.jpg",
    },
    {
      name: "Elden Ring",
      logo: "https://example.com/elden-ring-logo.png",
    },
    {
      name: "Cyberpunk 2077",
      logo: "https://example.com/cyberpunk-logo.png",
    },
    {
      name: "Final Fantasy XVI",
      logo: "https://example.com/ffxvi-logo.png",
    },
    {
      name: "Overwatch 2",
      logo: "https://example.com/overwatch-logo.png",
    },
  ];

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <div className="text-center mt-12">
      <p className="text-xl font-semibold mb-4">Gaming Hours</p>
      <div
        className="w-full bg-gray-300 rounded-full h-6 mb-4 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="h-full bg-gray-800 rounded-full animate-shiny"
          style={{ width: `${gamingPercentage}%` }}
        />
        <span className="absolute top-0 left-0 right-0 bottom-0 m-auto text-white font-semibold ">
          {gamingPercentage}% of my life was spent playing games
        </span>

        {isHovered && (
          <div
            className="absolute top-full left-0 mt-2 w-full bg-gray-300 rounded-md transition-all ease-in-out duration-300 p-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0)" : "translateY(-10px)",
            }}
          >
            <ul className="list-none space-y-1">
              {games.map((game, index) => (
                <li key={index} className="text-black text-sm text-center">
                  {game.logo}
                </li>
              ))}
            </ul>
          </div>
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
            I’ve spent much of my life immersed in video games, honing skills in
            critical thinking, teamwork, and collaboration, which now fuel my
            passion for problem-solving and innovation.
          </p>
          <GamingBar />
        </div>
      </div>
    </section>
  );
};

export default GamingSection;
