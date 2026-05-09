/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Manrope, Space_Grotesk } from "next/font/google";
import ParticlesBackground from "./components/ParticlesBackground";
import { LocaleProvider, useLocale } from "./context/LocaleContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./globals.css";
import { localeLabels, locales } from "@/i18n/locales";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "700"],
});

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { setLocale, t, locale } = useLocale();
  const pathname = usePathname();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderVisible(window.scrollY <= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.2),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(249,115,22,0.18),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.15),transparent_45%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.14),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.14),transparent_45%)]" />
      <ParticlesBackground />

      <div
        className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto mt-2 w-[min(94%,72rem)] rounded-xl border border-white/50 bg-white/70 px-3 py-2 shadow-xl shadow-slate-900/10 backdrop-blur-xl sm:mt-4 sm:w-[min(92%,72rem)] sm:rounded-2xl sm:px-5 sm:py-3 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/25">
          <header className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap sm:gap-4">
            <nav className="flex items-center gap-2">
              {[
                { href: "/", label: t("nav.home") },
                { href: "/contact", label: t("nav.contact") },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                    pathname === item.href
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "text-slate-700 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex w-full items-center justify-between gap-2 text-sm sm:w-auto sm:justify-end sm:gap-3">
              <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.2em] dark:text-slate-400">
                {t("actions.language")}
              </label>
              <select
                className="w-28 cursor-pointer rounded-xl border border-slate-300/80 bg-white/90 px-2.5 py-1.5 text-xs font-medium text-slate-700 outline-none transition focus:border-sky-400 sm:min-w-32 sm:px-3 sm:py-2 sm:text-sm dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100"
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

      <div className="relative z-10 mx-auto w-[min(94%,80rem)] px-4 pb-10 pt-28 sm:px-6 sm:pt-20">
        <main>{children}</main>

        <button
          onClick={toggleTheme}
          className="fixed bottom-3 right-3 z-50 rounded-2xl border border-white/40 bg-white/80 px-3 py-2.5 text-lg shadow-xl shadow-slate-900/15 backdrop-blur-lg transition hover:-translate-y-0.5 hover:bg-white sm:bottom-5 sm:right-5 sm:px-4 sm:py-3 sm:text-xl dark:border-white/15 dark:bg-slate-900/80 dark:shadow-black/30 dark:hover:bg-slate-900"
          aria-label={t("actions.toggleTheme")}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        <footer className="mt-16 pb-6 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </footer>
      </div>
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { locale } = useLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} min-h-screen bg-neutral-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100`}
      >
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
};

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LocaleProvider>
    <Layout>{children}</Layout>
  </LocaleProvider>
);

export default App;
