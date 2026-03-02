import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/i18n/locales";

type SupportedLocale = Locale | "th";

interface CityConfig {
  city: string;
  language: string;
}

const CITY_BY_LOCALE: Record<SupportedLocale, CityConfig> = {
  en: { city: "London", language: "en" },
  my: { city: "Yangon", language: "my" },
  jp: { city: "Tokyo", language: "ja" },
  th: { city: "Bangkok", language: "th" },
};

const DEFAULT_CITY = CITY_BY_LOCALE.en;

function pickCity(localeParam: string | null): CityConfig {
  if (!localeParam) {
    return DEFAULT_CITY;
  }

  const normalized = localeParam.toLowerCase() as SupportedLocale;
  return CITY_BY_LOCALE[normalized] ?? DEFAULT_CITY;
}

export async function GET(request: NextRequest) {
  try {
    const localeParam = request.nextUrl.searchParams.get("locale");
    const { city, language } = pickCity(localeParam);

    const geocodeUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
    geocodeUrl.searchParams.set("name", city);
    geocodeUrl.searchParams.set("count", "1");
    geocodeUrl.searchParams.set("language", language);
    geocodeUrl.searchParams.set("format", "json");

    const geocodeResponse = await fetch(geocodeUrl, {
      next: { revalidate: 60 * 60 * 6 },
    });

    if (!geocodeResponse.ok) {
      return NextResponse.json(
        { error: "Unable to resolve city coordinates." },
        { status: 502 }
      );
    }

    const geocodeData = await geocodeResponse.json();
    const location = geocodeData?.results?.[0];

    if (!location) {
      return NextResponse.json({ error: "City not found." }, { status: 404 });
    }

    const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
    weatherUrl.searchParams.set("latitude", String(location.latitude));
    weatherUrl.searchParams.set("longitude", String(location.longitude));
    weatherUrl.searchParams.set("timezone", "auto");
    weatherUrl.searchParams.set(
      "current",
      [
        "temperature_2m",
        "apparent_temperature",
        "relative_humidity_2m",
        "precipitation",
        "weather_code",
        "wind_speed_10m",
        "is_day",
      ].join(",")
    );

    const weatherResponse = await fetch(weatherUrl, {
      next: { revalidate: 60 * 10 },
    });

    if (!weatherResponse.ok) {
      return NextResponse.json(
        { error: "Unable to fetch weather data." },
        { status: 502 }
      );
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData?.current;

    if (!current) {
      return NextResponse.json(
        { error: "Current weather data is unavailable." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      city: location.name,
      country: location.country,
      timezone: weatherData.timezone,
      current: {
        observedAt: current.time,
        temperature: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        precipitation: current.precipitation,
        weatherCode: current.weather_code,
        windSpeed: current.wind_speed_10m,
        isDay: current.is_day === 1,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while loading weather." },
      { status: 500 }
    );
  }
}
