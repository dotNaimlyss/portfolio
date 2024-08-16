"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomePage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen max-w-3xl mx-auto p-8 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Thurein Tun's Portfolio</h1>
        <nav className="mt-4">
          <Link
            href="/"
            className={`mr-4 hover:underline ${
              pathname === "/" ? "font-bold underline" : ""
            } ${isDarkMode ? "text-gray-300" : "text-blue-500"}`}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={`mr-4 hover:underline ${
              pathname === "/projects" ? "font-bold underline" : ""
            } ${isDarkMode ? "text-gray-300" : "text-blue-500"}`}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className={`hover:underline ${
              pathname === "/contact" ? "font-bold underline" : ""
            } ${isDarkMode ? "text-gray-300" : "text-blue-500"}`}
          >
            Contact
          </Link>
        </nav>
        <button
          onClick={toggleTheme}
          className={`mt-4 p-2 border rounded ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-gray-200 border-gray-300 text-gray-800"
          }`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <main className="text-center mt-12">
        {/* Hero Section */}
        <section className="space-y-4">
          <h2
            className={`text-5xl font-extrabold animate-fade-in ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Welcome to My Portfolio!
          </h2>
          <p
            className={`text-lg animate-fade-in-delayed ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            I'm a developer skilled in Node.js, JavaScript, Python, and more.
          </p>
        </section>

        {/* Content Section */}
        <section className="mt-8">
          {isClient ? <p>Explore my projects below.</p> : <p>Loading...</p>}
        </section>
      </main>

      <footer className="text-center mt-16">
        <p
          className={`${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          } transition-colors duration-300`}
        >
          &copy; 2024 Thurein Tun
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
