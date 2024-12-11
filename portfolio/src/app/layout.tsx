/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ParticlesBackground from "./components/ParticlesBackground";
import "./globals.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const pathname = usePathname();

  // State to manage header visibility
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Track scroll position to hide/show header
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsHeaderVisible(false); // Hide header when scrolled down 50px
    } else {
      setIsHeaderVisible(true); // Show header when scrolled back up
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, []);

  return (
    <html lang="en">
      <body
        className={`${
          isDarkMode ? "dark" : ""
        } bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        <div className="relative overflow-hidden min-h-screen">
          <ParticlesBackground />

          {/* Header */}
          <div
            className={`fixed top-0 left-0 right-0 z-10 transition-transform duration-300 ${
              isHeaderVisible ? "transform-none" : "-translate-y-full"
            }`}
          >
            <div className="bg-white dark:bg-gray-900 p-4 shadow-md">
              <header className="flex justify-between items-center">
                <nav>
                  <Link
                    href="/"
                    className={`mr-4 hover:underline ${
                      pathname === "/" ? "font-bold underline" : ""
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/projects"
                    className={`mr-4 hover:underline ${
                      pathname === "/projects" ? "font-bold underline" : ""
                    }`}
                  >
                    Projects
                  </Link>
                  <Link
                    href="/contact"
                    className={`hover:underline ${
                      pathname === "/contact" ? "font-bold underline" : ""
                    }`}
                  >
                    Contact
                  </Link>
                </nav>
              </header>
            </div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto p-8">
            <main>{children}</main>
            <button
              onClick={toggleTheme}
              className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg 
    bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 
    dark:hover:bg-gray-300 text-gray-200 dark:text-gray-800 
    transition-colors duration-300 `}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            <footer className="text-center mt-16">
              <p className="transition-colors duration-300">
                &copy; 2024 Thurein
              </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
};

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <Layout>{children}</Layout>
  </ThemeProvider>
);

export default App;
