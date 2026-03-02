"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { defaultLocale, type Locale } from "@/i18n/locales";
import { messages, type MessageSchema } from "@/i18n/messages";

interface LocaleContextProps {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

function getByPath(source: MessageSchema, path: string): string | undefined {
  const value = path
    .split(".")
    .reduce<unknown>(
      (acc, segment) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[segment]
          : undefined,
      source
    );

  return typeof value === "string" ? value : undefined;
}

function applyReplacements(
  template: string,
  replacements?: Record<string, string | number>
): string {
  if (!replacements) {
    return template;
  }

  return Object.entries(replacements).reduce((result, [token, value]) => {
    return result.replaceAll(`{${token}}`, String(value));
  }, template);
}

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const value = useMemo<LocaleContextProps>(() => {
    const t = (
      key: string,
      replacements?: Record<string, string | number>
    ): string => {
      const localized = getByPath(messages[locale], key);
      const fallback = getByPath(messages[defaultLocale], key);
      const template = localized ?? fallback ?? key;

      return applyReplacements(template, replacements);
    };

    return {
      locale,
      setLocale,
      t,
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextProps => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
