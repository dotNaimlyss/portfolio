/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ParticlesBackground from "./components/ParticlesBackground";
import { LocaleProvider, useLocale } from "./context/LocaleContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./globals.css";
import { localeLabels, locales } from "@/i18n/locales";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();
  const pathname = usePathname();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <html lang={locale}>
      <body
        className={`${
          isDarkMode ? "dark" : ""
        } bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        <div className="relative overflow-hidden min-h-screen">
          <ParticlesBackground />

          <div
            className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
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
                    {t("nav.home")}
                  </Link>
                  {/* <Link
                    href="/projects"
                    className={`mr-4 hover:underline ${
                      pathname === "/projects" ? "font-bold underline" : ""
                    }`}
                  >
                    {t("nav.projects")}
                  </Link>
                  <Link
                    href="/contact"
                    className={`hover:underline ${
                      pathname === "/contact" ? "font-bold underline" : ""
                    }`}
                  >
                    {t("nav.contact")}
                  </Link> */}
                </nav>

                <div className="text-sm flex items-center gap-2">
                  <span>{t("actions.language")}:</span>
                  <select
                    className="border rounded px-3 py-2 bg-transparent min-w-32 cursor-pointer"
                    value={locale}
                    onChange={(event) =>
                      setLocale(event.target.value as typeof locale)
                    }
                    aria-label={t("actions.language")}
                  >
                    {locales.map((supportedLocale) => (
                      <option key={supportedLocale} value={supportedLocale}>
                        {localeLabels[supportedLocale]}
                      </option>
                    ))}
                  </select>
                </div>
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
                {t("footer.copyright", { year: new Date().getFullYear() })}
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
    <LocaleProvider>
      <Layout>{children}</Layout>
    </LocaleProvider>
  </ThemeProvider>
);

export default App;
