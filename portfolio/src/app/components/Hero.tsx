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
          <WeatherStatus />
        </div>
      </div>
    </section>
  );
};

export default Greet;
