"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useLocale } from "../context/LocaleContext";

interface WeatherPayload {
  city: string;
  country: string;
  timezone: string;
  current: {
    observedAt: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    precipitation: number;
    weatherCode: number;
    windSpeed: number;
    isDay: boolean;
  };
}

function describeWeather(code: number, isDay: boolean, locale: string): string {
  const lexicon: Record<string, Record<string, string>> = {
    en: {
      clear: isDay ? "Clear sky" : "Clear night",
      partlyCloudy: "Partly cloudy",
      cloudy: "Cloudy",
      fog: "Fog",
      drizzle: "Drizzle",
      rain: "Rain",
      snow: "Snow",
      storm: "Thunderstorm",
      unknown: "Unknown conditions",
    },
    my: {
      clear: isDay ? "ကောင်းကင်ကြည်လင်" : "ညအခါ ကောင်းကင်ကြည်လင်",
      partlyCloudy: "တိမ်အနည်းငယ်ရှိ",
      cloudy: "မိုးအုံ့",
      fog: "မြူထူ",
      drizzle: "မိုးဖွဲ",
      rain: "မိုးရွာ",
      snow: "နှင်းကျ",
      storm: "မိုးကြိုးမုန်တိုင်း",
      unknown: "မသိရှိသော ရာသီဥတုအခြေအနေ",
    },
    jp: {
      clear: isDay ? "快晴" : "晴れ（夜）",
      partlyCloudy: "一部曇り",
      cloudy: "曇り",
      fog: "霧",
      drizzle: "霧雨",
      rain: "雨",
      snow: "雪",
      storm: "雷雨",
      unknown: "不明な天候",
    },
  };

  const terms = lexicon[locale] ?? lexicon.en;
  const groups = {
    clear: [0],
    partlyCloudy: [1, 2],
    cloudy: [3],
    fog: [45, 48],
    drizzle: [51, 53, 55, 56, 57],
    rain: [61, 63, 65, 66, 67, 80, 81, 82],
    snow: [71, 73, 75, 77, 85, 86],
    storm: [95, 96, 99],
  };

  const found = (
    Object.entries(groups) as Array<[keyof typeof groups, number[]]>
  ).find(([, values]) => values.includes(code))?.[0];

  return found ? terms[found] : terms.unknown;
}

const WeatherStatus: React.FC = () => {
  const { locale, t } = useLocale();
  const [data, setData] = useState<WeatherPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadWeather() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/weather-status?locale=${encodeURIComponent(locale)}`,
          { signal: abortController.signal, cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error("Weather API request failed.");
        }

        const payload = (await response.json()) as WeatherPayload;
        setData(payload);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(t("weather.error"));
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadWeather();

    return () => abortController.abort();
  }, [locale, t]);

  const updatedAt = useMemo(() => {
    if (!data?.current?.observedAt) {
      return "--";
    }

    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(data.current.observedAt));
  }, [data, locale]);

  const weatherLabel = useMemo(() => {
    if (!data) {
      return "--";
    }
    return describeWeather(
      data.current.weatherCode,
      data.current.isDay,
      locale,
    );
  }, [data, locale]);

  return (
    <div className="mt-8 w-full max-w-2xl rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/30 backdrop-blur-md p-6 text-left shadow-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {t("weather.badge")}
          </p>
          <h2 className="text-lg font-semibold">{t("weather.title")}</h2>
          {data && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("weather.location", {
                city: data.city,
                country: data.country,
              })}
            </p>
          )}
        </div>
      </div>

      {isLoading && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("weather.loading")}
        </p>
      )}

      {!isLoading && error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {!isLoading && !error && data && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-black/5 dark:bg-white/10 p-4">
            <p className="text-4xl font-bold leading-none">
              {Math.round(data.current.temperature)} deg C
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {weatherLabel}
            </p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {t("weather.feelsLike", {
                temperature: Math.round(data.current.feelsLike),
              })}
            </p>
          </div>

          <div className="rounded-xl bg-black/5 dark:bg-white/10 p-4 space-y-2">
            <p className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {t("weather.wind")}:
              </span>{" "}
              {Math.round(data.current.windSpeed)} km/h
            </p>
            <p className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {t("weather.humidity")}:
              </span>{" "}
              {data.current.humidity}%
            </p>
            <p className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {t("weather.rain")}:
              </span>{" "}
              {data.current.precipitation} mm
            </p>
            <p className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                {t("weather.updated")}:
              </span>{" "}
              {updatedAt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherStatus;
