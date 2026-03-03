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

interface WeatherTheme {
  icon: string;
  gradient: string;
  accent: string;
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
      clear: isDay ? "ကောင်းကင်ကြည်လင်" : "ညကောင်းကင်ကြည်လင်",
      partlyCloudy: "တိမ်အနည်းငယ်ရှိ",
      cloudy: "တိမ်ထူ",
      fog: "မြူထူ",
      drizzle: "မိုးဖွဲ",
      rain: "မိုးရွာ",
      snow: "နှင်းကျ",
      storm: "မိုးကြိုးမုန်တိုင်း",
      unknown: "မသိရသောရာသီဥတုအခြေအနေ",
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
      unknown: "不明な天気状況",
    },

    th: {
      clear: isDay ? "ท้องฟ้าแจ่มใส" : "ท้องฟ้าแจ่มใสตอนกลางคืน",
      partlyCloudy: "มีเมฆบางส่วน",
      cloudy: "มีเมฆมาก",
      fog: "หมอก",
      drizzle: "ฝนปรอย",
      rain: "ฝนตก",
      snow: "หิมะตก",
      storm: "พายุฝนฟ้าคะนอง",
      unknown: "สภาพอากาศไม่ทราบแน่ชัด",
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

function getWeatherTheme(code: number, isDay: boolean): WeatherTheme {
  if ([95, 96, 99].includes(code)) {
    return {
      icon: "\u26C8",
      gradient:
        "from-slate-950/95 via-indigo-950/90 to-slate-900/95 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900",
      accent: "from-indigo-500/40 to-sky-400/25",
    };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      icon: "\uD83C\uDF27",
      gradient:
        "from-slate-900/90 via-sky-950/85 to-cyan-950/90 dark:from-slate-900 dark:via-sky-950 dark:to-cyan-950",
      accent: "from-cyan-400/40 to-blue-300/30",
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      icon: "\u2744",
      gradient:
        "from-slate-100 via-sky-100 to-white dark:from-slate-800 dark:via-slate-700 dark:to-slate-800",
      accent: "from-sky-300/45 to-slate-200/45",
    };
  }

  if ([45, 48].includes(code)) {
    return {
      icon: "\uD83C\uDF2B",
      gradient:
        "from-zinc-200 via-slate-200 to-zinc-300 dark:from-zinc-800 dark:via-slate-800 dark:to-zinc-900",
      accent: "from-slate-300/50 to-zinc-200/40",
    };
  }

  if ([1, 2, 3].includes(code)) {
    return {
      icon: isDay ? "\u26C5" : "\u2601",
      gradient:
        "from-amber-100 via-sky-100 to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900",
      accent: "from-amber-300/45 to-cyan-300/35",
    };
  }

  return {
    icon: isDay ? "\u2600" : "\uD83C\uDF19",
    gradient:
      "from-amber-200 via-orange-100 to-sky-100 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-900",
    accent: "from-amber-300/55 to-orange-300/35",
  };
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

  const weatherTheme = useMemo(() => {
    return getWeatherTheme(
      data?.current.weatherCode ?? 0,
      data?.current.isDay ?? true,
    );
  }, [data]);

  return (
    <div
      className={`relative mt-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/45 p-4 text-left shadow-2xl shadow-slate-900/15 backdrop-blur-xl transition-all duration-300 sm:rounded-3xl sm:p-6 dark:border-white/10 ${weatherTheme.gradient}`}
    >
      <div
        className={`pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gradient-to-br blur-3xl ${weatherTheme.accent}`}
      />
      <div className="pointer-events-none absolute -bottom-20 -left-14 h-56 w-56 rounded-full bg-white/20 blur-3xl dark:bg-white/10" />

      <div className="relative mb-6 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-700/75 dark:text-slate-300/80">
            {t("weather.badge")}
          </p>
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
            {t("weather.title")}
          </h2>
          {data && (
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("weather.location", {
                city: data.city,
                country: data.country,
              })}
            </p>
          )}
        </div>

        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/60 bg-white/45 text-2xl shadow-lg dark:border-white/20 dark:bg-white/10">
          {weatherTheme.icon}
        </div>
      </div>

      {isLoading && (
        <div className="relative z-10 space-y-3">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {t("weather.loading")}
          </p>
          <div className="h-20 w-2/3 animate-pulse rounded-2xl bg-white/45 dark:bg-white/10" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="h-20 animate-pulse rounded-2xl bg-white/45 dark:bg-white/10" />
            <div className="h-20 animate-pulse rounded-2xl bg-white/45 dark:bg-white/10" />
            <div className="h-20 animate-pulse rounded-2xl bg-white/45 dark:bg-white/10" />
            <div className="h-20 animate-pulse rounded-2xl bg-white/45 dark:bg-white/10" />
          </div>
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-2xl border border-red-300/60 bg-red-50/80 p-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="relative z-10 space-y-4">
          <div className="rounded-2xl border border-white/45 bg-white/50 p-5 shadow-md dark:border-white/15 dark:bg-black/20">
            <p className="text-5xl font-black leading-none tracking-tight text-slate-900 sm:text-6xl dark:text-white">
              {Math.round(data.current.temperature)}°C
            </p>
            <p className="mt-2 text-base font-semibold text-slate-800 dark:text-slate-200">
              {weatherLabel}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400">
              {t("weather.feelsLike", {
                temperature: Math.round(data.current.feelsLike),
              })}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/45 bg-white/45 p-4 transition-transform duration-300 hover:-translate-y-1 dark:border-white/15 dark:bg-black/20">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                {t("weather.wind")}
              </p>
              <p className="mt-1 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                {Math.round(data.current.windSpeed)}{" "}
                <span className="text-sm font-semibold">km/h</span>
              </p>
            </div>

            <div className="rounded-2xl border border-white/45 bg-white/45 p-4 transition-transform duration-300 hover:-translate-y-1 dark:border-white/15 dark:bg-black/20">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                {t("weather.humidity")}
              </p>
              <p className="mt-1 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                {data.current.humidity}%
              </p>
            </div>

            <div className="rounded-2xl border border-white/45 bg-white/45 p-4 transition-transform duration-300 hover:-translate-y-1 dark:border-white/15 dark:bg-black/20">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                {t("weather.rain")}
              </p>
              <p className="mt-1 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                {data.current.precipitation}{" "}
                <span className="text-sm font-semibold">mm</span>
              </p>
            </div>

            <div className="rounded-2xl border border-white/45 bg-white/45 p-4 dark:border-white/15 dark:bg-black/20">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                {t("weather.updated")}
              </p>
              <p className="mt-1 break-words text-xs font-semibold text-slate-800 sm:text-sm dark:text-slate-200">
                {updatedAt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherStatus;
