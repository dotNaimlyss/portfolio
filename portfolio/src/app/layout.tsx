"use client";

import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ParticlesBackground from "./components/ParticlesBackground";
import './globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <ThemeProvider>
      <html lang="en" className={`${isDarkMode ? "dark" : ""}`}>
        <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <ParticlesBackground />
          <div className="relative z-10 max-w-4xl mx-auto p-8 min-h-screen">
            <header className="flex justify-between items-center py-4">
              <div className="text-4xl font-bold">Thurein Tun</div>
              <div>
                <nav className="space-x-4">
                  <Link href="/" className={pathname === "/" ? "font-bold underline" : ""}>
                    Home
                  </Link>
                  <Link href="/projects" className={pathname === "/projects" ? "font-bold underline" : ""}>
                    Projects
                  </Link>
                  <Link href="/contact" className={pathname === "/contact" ? "font-bold underline" : ""}>
                    Contact
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
    </ThemeProvider>
  );
};

export default Layout;
