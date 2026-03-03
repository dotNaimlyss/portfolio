import React from "react";
import { useLocale } from "../context/LocaleContext";
import WeatherStatus from "./WeatherStatus";
import Reveal from "./Reveal";

const Greet: React.FC = () => {
  const { locale, t } = useLocale();

  return (
    <section lang={locale}>
      <div className="relative grid min-h-screen place-items-center py-14 sm:py-16">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-400/25 via-cyan-300/15 to-orange-300/15 blur-3xl sm:h-[26rem] sm:w-[26rem] dark:from-sky-500/20 dark:via-cyan-400/15 dark:to-pink-400/10" />

        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-1 text-center sm:px-0">
          <Reveal delayMs={0}>
            <p className="rounded-full border border-slate-300/70 bg-white/70 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-slate-600 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
              {t("hero.badge")}
            </p>
          </Reveal>

          <Reveal delayMs={80}>
            <h1 className="mt-6 text-balance text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
              <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-orange-500 bg-clip-text text-transparent">
                {t("thurein.title")}
              </span>
            </h1>
          </Reveal>

          <Reveal delayMs={160} className="w-full">
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 animate-fade-in-delayed sm:mt-6 sm:text-lg dark:text-slate-300">
              {t("thurein.description")}
            </p>
          </Reveal>

          <Reveal delayMs={240}>
            <div className="relative mt-7 w-full max-w-xs sm:mt-8 sm:w-auto sm:max-w-none">
              <a
                href="/Thurein-Resume.pdf"
                download="Thurein-Resume.pdf"
                className="resume-download-button group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/60 bg-white/85 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/10 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white sm:w-auto dark:border-white/20 dark:bg-slate-900/70 dark:text-white dark:shadow-black/25"
              >
                <span className="relative z-10">
                  {t("actions.downloadResume")}
                </span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">
                  -&gt;
                </span>
                <span
                  aria-hidden="true"
                  className="resume-reflection pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-sky-500/70 to-transparent opacity-0 mix-blend-multiply blur-[1px] transition-opacity duration-300 animate-reflection-sweep dark:via-white/35 dark:mix-blend-screen"
                />
              </a>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-3 right-3 top-[calc(100%+2px)] h-5 rounded-full bg-gradient-to-b from-slate-500/35 to-transparent opacity-70 blur-md dark:from-sky-100/25 dark:opacity-50"
              />
            </div>
          </Reveal>

          <Reveal delayMs={320} className="w-full">
            <WeatherStatus />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Greet;
