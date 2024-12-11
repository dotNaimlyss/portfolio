// components/greet.tsx

import React from "react";
import { useTheme } from "../context/ThemeContext"; // Import the hook

const Greet: React.FC = () => {
  const { isDarkMode } = useTheme(); // Access the dark mode state

  return (
    <section>
      <div className="text-center h-screen pt-16 grid place-items-center">
          <div className="text-center">
              <p className="text-2xl font-bold sm:text-3xl md:text-4xl mb-4">
                Thurein Tun's Portfolio
              </p>
              <p className="text-lg animate-fade-in-delayed">
                Freshly graduated and passionate about growth, I’m a budding
                freelancer diving into the world of development with Node.js,
                JavaScript, Python, and beyond, eager to learn, build, and innovate.
              </p>
          </div>
      </div>
    </section>
  );
};

export default Greet;
