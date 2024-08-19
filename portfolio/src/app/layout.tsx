/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ParticlesBackground from "./components/ParticlesBackground";
import './globals.css'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${isDarkMode ? "dark" : ""} bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        <div className="relative overflow-hidden min-h-screen">
          <ParticlesBackground />
          <div className="relative z-10 max-w-3xl mx-auto p-8">
            <header className="text-center">
              <h1 className="text-4xl font-bold">Thurein Tun's Portfolio</h1>
              <nav className="mt-4">
                <Link href="/" className={`mr-4 hover:underline ${pathname === "/" ? "font-bold underline" : ""}`}>
                  Home
                </Link>
                <Link href="/projects" className={`mr-4 hover:underline ${pathname === "/projects" ? "font-bold underline" : ""}`}>
                  Projects
                </Link>
                <Link href="/contact" className={`hover:underline ${pathname === "/contact" ? "font-bold underline" : ""}`}>
                  Contact
                </Link>
              </nav>
              <button
                onClick={toggleTheme}
                className="mt-4 p-2 border rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </header>

            <main>{children}</main>

            <footer className="text-center mt-16">
              <p className="transition-colors duration-300">
                &copy; 2024 Thurein Tun
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
