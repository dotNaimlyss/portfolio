"use client";

import React from "react";
import { useTheme } from "../../context/ThemeContext";

const HomePage: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className="text-center mt-12">
      <h2 className={`text-5xl font-extrabold ${isDarkMode ? "text-gray-100" : "text-gray-900"} animate-fade-in`}>
        Welcome to My Portfolio!
      </h2>
      <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"} animate-fade-in-delayed`}>
        I'm a developer skilled in Node.js, JavaScript, Python, and more.
      </p>
    </section>
  );
};

export default HomePage;
