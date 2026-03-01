import React from "react";
import { useTheme } from "../context/ThemeContext"; // Import the hook
import { LocaleProvider, useLocale } from "../context/LocaleContext";

const Greet: React.FC = () => {
  const { isDarkMode } = useTheme(); // Access the dark mode state
  const { locale, setLocale, t } = useLocale();

  return (
    <section lang={locale}>
      <div className="text-center h-screen pt-16 grid place-items-center">
        <div className="text-center">
          <p className="text-2xl font-bold sm:text-3xl md:text-4xl mb-4">
            {t("thurein.title")}
          </p>
          <p className="text-lg animate-fade-in-delayed">
            {t("thurein.description")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Greet;
