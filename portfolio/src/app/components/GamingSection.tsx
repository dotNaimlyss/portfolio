import React from "react";
import { useTheme } from "../context/ThemeContext";

const GamingBar: React.FC = () => {
  // Set a fixed percentage for the bar (e.g., 65%)
  const gamingPercentage = 65;

  return (
    <div className="text-center mt-12">
      <p className="text-xl font-semibold mb-4">Gaming Hours</p>
      <div className="w-full bg-gray-300 rounded-full h-6 mb-4 relative overflow-hidden">
        <div
          className="h-full bg-gray-800 rounded-full animate-shiny"
          style={{ width: `${gamingPercentage}%` }}
        />
        <span className="absolute top-0 left-0 right-0 bottom-0 m-auto text-white font-semibold text-">
          {gamingPercentage}% of my life was spent playing games
        </span>
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
