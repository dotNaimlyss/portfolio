import React from "react";
import { useLocale } from "../context/LocaleContext";

const HighlightsSection: React.FC = () => {
  const { t } = useLocale();
  const cards = [
    {
      title: t("highlights.cards.frontend.title"),
      description: t("highlights.cards.frontend.description"),
    },
    {
      title: t("highlights.cards.api.title"),
      description: t("highlights.cards.api.description"),
    },
    {
      title: t("highlights.cards.performance.title"),
      description: t("highlights.cards.performance.description"),
    },
  ];

  return (
    <section className="relative py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-x-10 top-8 -z-10 h-64 rounded-full bg-gradient-to-r from-cyan-400/20 via-sky-400/20 to-emerald-400/20 blur-3xl dark:from-cyan-500/10 dark:via-sky-500/10 dark:to-emerald-500/10" />

      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            {t("highlights.badge")}
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {t("highlights.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-300">
            {t("highlights.description")}
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-white/60 bg-white/75 p-5 shadow-lg shadow-slate-900/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 sm:p-6 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-black/25"
            >
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
