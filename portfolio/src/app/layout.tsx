"use client";
import React from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext"; // Adjust the path as needed
import Link from "next/link";
import { usePathname } from "next/navigation";
import ParticlesBackground from "./components/ParticlesBackground";
import "./globals.css";
import { Canvas } from "@react-three/fiber";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Access theme context
  const { isDarkMode, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <html lang="en" className={`${isDarkMode ? "dark" : ""}`}>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Canvas
          className="absolute inset-0 z-0 canvas-debug"
          camera={{ position: [0, 0, 10], fov: 75 }}
        >
          <ParticlesBackground />
        </Canvas>

        <div className="relative z-10 max-w-4xl mx-auto p-8 min-h-screen">
          <header className="flex justify-between items-center py-4">
            <div className="text-4xl font-bold">Thurein Tun</div>
            <div>
              <nav className="space-x-4">
                <Link
                  href="/"
                  className={pathname === "/" ? "font-bold underline" : ""}
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className={
                    pathname === "/projects" ? "font-bold underline" : ""
                  }
                >
                  Projects
                </Link>
                <Link
                  href="/contact"
                  className={
                    pathname === "/contact" ? "font-bold underline" : ""
                  }
                >
                  Contact
                </Link>
                <Link
                  href="/interactive"
                  className={
                    pathname === "/interactive" ? "font-bold underline" : ""
                  }
                >
                  Interactive
                </Link>
              </nav>
              <button
                onClick={toggleTheme}
                className="ml-4 p-2 border rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </header>
          <main>{children}</main>
          <footer className="text-center mt-16">
            <p className="transition-colors duration-300">
              &copy; 2024 Thurein Tun
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
};

// Wrap the Layout component with ThemeProvider
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <Layout>{children}</Layout>
  </ThemeProvider>
);

export default AppLayout;
