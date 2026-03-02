import React from "react";
import { useLocale } from "../context/LocaleContext";
import WeatherStatus from "./WeatherStatus";

const Greet: React.FC = () => {
  const { locale, t } = useLocale();

  return (
    <section lang={locale}>
      <div className="text-center min-h-screen pt-16 grid place-items-center">
        <div className="text-center flex flex-col items-center">
          <p className="text-2xl font-bold sm:text-3xl md:text-4xl mb-4">
            {t("thurein.title")}
          </p>
          <p className="text-lg animate-fade-in-delayed max-w-2xl">
            {t("thurein.description")}
          </p>
          <a
            href="/Thurein-Resume.pdf"
            download="Thurein-Resume.pdf"
            className="mt-6 inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 px-5 py-2.5 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm transition hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {t("actions.downloadResume")}
          </a>
          <WeatherStatus />
        </div>
      </div>
    </section>
  );
};

export default Greet;
