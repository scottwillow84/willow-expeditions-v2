import { useCallback, useEffect, useState } from "react";

const weatherStops = {
  albury: { label: "Albury", date: "2026-09-25", latitude: -36.08, longitude: 146.916 },
  sep26: { label: "Geelong ferry terminal", date: "2026-09-26", latitude: -38.15, longitude: 144.354 },
  hadspen: { label: "Hadspen", date: "2026-09-27", latitude: -41.5, longitude: 147.07 },
  lulworth: { label: "Lulworth", date: "2026-09-29", latitude: -41.003, longitude: 147.198 },
  sthelens: { label: "St Helens", date: "2026-10-01", latitude: -41.319, longitude: 148.24 },
  bicheno: { label: "Bicheno", date: "2026-10-03", latitude: -41.874, longitude: 148.303 },
  carlton: { label: "Carlton River", date: "2026-10-05", latitude: -42.82, longitude: 147.816 },
  strahan: { label: "Strahan", date: "2026-10-09", latitude: -42.154, longitude: 145.329 },
  smithton: { label: "Smithton", date: "2026-10-12", latitude: -40.837, longitude: 145.123 },
  returnferry: { label: "Devonport ferry terminal", date: "2026-10-15", latitude: -41.18, longitude: 146.35 },
  home: { label: "Sydney", date: "2026-10-16", latitude: -33.869, longitude: 151.209 },
};

const weatherCode = (code) => {
  if (code === 0) return { icon: "☀️", label: "Clear" };
  if ([1, 2].includes(code)) return { icon: "🌤️", label: "Partly cloudy" };
  if (code === 3) return { icon: "☁️", label: "Overcast" };
  if ([45, 48].includes(code)) return { icon: "🌫️", label: "Fog" };
  if ([51, 53, 55, 56, 57].includes(code)) return { icon: "🌦️", label: "Drizzle" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: "🌧️", label: "Rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: "🌨️", label: "Snow" };
  if ([95, 96, 99].includes(code)) return { icon: "⛈️", label: "Thunderstorms" };
  return { icon: "🌦️", label: "Weather" };
};

const dayFormatter = new Intl.DateTimeFormat("en-AU", {
  weekday: "short", day: "numeric", month: "short", timeZone: "Australia/Sydney",
});
const timeFormatter = new Intl.DateTimeFormat("en-AU", {
  hour: "numeric", minute: "2-digit", timeZone: "Australia/Sydney",
});

export function useTripWeather() {
  const [forecasts, setForecasts] = useState({});
  const [status, setStatus] = useState("loading");
  const [updatedAt, setUpdatedAt] = useState(null);

  const refresh = useCallback(async () => {
    setStatus("loading");
    try {
      const stops = Object.entries(weatherStops);
      const params = new URLSearchParams({
        latitude: stops.map(([, stop]) => stop.latitude).join(","),
        longitude: stops.map(([, stop]) => stop.longitude).join(","),
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max",
        timezone: "Australia/Sydney",
        forecast_days: "16",
      });
      const response = await fetch("https://api.open-meteo.com/v1/forecast?" + params);
      if (!response.ok) throw new Error("Weather service unavailable");
      const payload = await response.json();
      const locations = Array.isArray(payload) ? payload : [payload];
      setForecasts(Object.fromEntries(stops.map(([stayId], index) => [stayId, locations[index]])));
      setUpdatedAt(new Date());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    refresh();
    const timer = window.setInterval(refresh, 30 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  return { forecasts, refresh, status, updatedAt };
}

export function WeatherTile({ stayId, weather }) {
  const stop = weatherStops[stayId];
  if (!stop) return null;

  const daily = weather.forecasts[stayId]?.daily;
  const dayIndex = daily?.time?.indexOf(stop.date) ?? -1;
  const hasForecast = dayIndex >= 0;
  const condition = hasForecast ? weatherCode(daily.weather_code[dayIndex]) : null;

  return (
    <section className="weatherTile" aria-live="polite">
      <div className="weatherTileHeader">
        <div>
          <p className="weatherEyebrow">🌦 Live forecast</p>
          <p className="weatherDate">{dayFormatter.format(new Date(stop.date + "T00:00:00Z"))} · {stop.label}</p>
        </div>
        <button className="weatherRefresh" type="button" onClick={weather.refresh} disabled={weather.status === "loading"}>
          {weather.status === "loading" ? "Updating…" : "Refresh"}
        </button>
      </div>

      {hasForecast ? (
        <div className="weatherDetails">
          <span className="weatherCondition">{condition.icon} {condition.label}</span>
          <span>🌡 {Math.round(daily.temperature_2m_min[dayIndex])}–{Math.round(daily.temperature_2m_max[dayIndex])}°C</span>
          <span>☔ {Math.round(daily.precipitation_probability_max[dayIndex])}%</span>
          <span>💨 {Math.round(daily.wind_speed_10m_max[dayIndex])} km/h</span>
        </div>
      ) : weather.status === "error" ? (
        <p className="weatherMessage">Forecast unavailable right now — try refresh again shortly.</p>
      ) : (
        <p className="weatherMessage">The live forecast will appear here once this stop is within the 16-day forecast window.</p>
      )}

      {weather.updatedAt && <p className="weatherUpdated">Updated {timeFormatter.format(weather.updatedAt)} Sydney time · refreshes every 30 min</p>}
    </section>
  );
}
