import React from "react";

const cards = [
  {
    title: "Frontend Craft",
    description:
      "Modern React interfaces with intentional motion, clear hierarchy, and strong visual identity.",
  },
  {
    title: "API Integration",
    description:
      "Clean, resilient API layers with robust loading states and user-friendly error handling.",
  },
  {
    title: "Performance Focus",
    description:
      "Lean components, practical optimizations, and responsive layouts that stay smooth on mobile.",
  },
];

const HighlightsSection: React.FC = () => {
  return (
    <section className="relative py-5">
      <div className="pointer-events-none absolute inset-x-10 top-8 -z-10 h-64 rounded-full bg-gradient-to-r from-cyan-400/20 via-sky-400/20 to-emerald-400/20 blur-3xl dark:from-cyan-500/10 dark:via-sky-500/10 dark:to-emerald-500/10" />

      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            What I Build
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Interactive products that feel premium
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            A quick snapshot of how I approach design and engineering for
            production-ready apps.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-white/60 bg-white/75 p-6 shadow-lg shadow-slate-900/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/65 dark:shadow-black/25"
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
