/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import WeatherDisplay from '../components/WeatherDisplay';
import SearchBar from '../components/Searchbar';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_WEATHER_API_URL;

  const searchCity = async (city: string) => {
    setLoading(true);
    setError('');
    try {
      setWeatherData(null);
      const response = await fetch(`${apiUrl}/api/weather/${city}`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError((err as any)?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Weather Forecast</h1>
        <SearchBar onSearch={searchCity} />
        {loading && <div className="text-center mt-4">Loading...</div>}
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        {weatherData && <WeatherDisplay data={weatherData} />}
      </div>
    </main>
  );
}