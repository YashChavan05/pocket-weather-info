
import React, { useState, useEffect } from 'react';
import { WeatherDisplay } from '@/components/WeatherDisplay';
import { SearchBar } from '@/components/SearchBar';
import { ForecastDisplay } from '@/components/ForecastDisplay';
import { TemperatureToggle } from '@/components/TemperatureToggle';
import { GeolocationButton } from '@/components/GeolocationButton';
import { useToast } from '@/hooks/use-toast';
import { weatherApi } from '@/utils/weatherApi';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  feelsLike: number;
  pressure: number;
  visibility: number;
}

export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const { toast } = useToast();

  const handleSearch = async (city: string) => {
    if (!city.trim()) return;
    
    setLoading(true);
    try {
      const weather = await weatherApi.getCurrentWeather(city);
      const forecast = await weatherApi.getForecast(city);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (error) {
      toast({
        title: "City not found",
        description: "Please check the city name and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weather = await weatherApi.getCurrentWeatherByCoords(latitude, longitude);
          const forecast = await weatherApi.getForecastByCoords(latitude, longitude);
          setWeatherData(weather);
          setForecastData(forecast);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch weather for your location.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        toast({
          title: "Location access denied",
          description: "Please allow location access or search for a city manually.",
          variant: "destructive",
        });
      }
    );
  };

  const toggleUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const convertTemperature = (temp: number) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  useEffect(() => {
    // Load default city on app start
    handleSearch('London');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-300/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Weather<span className="text-yellow-300">Cast</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl">
            Get real-time weather updates for any city worldwide
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
          <SearchBar onSearch={handleSearch} loading={loading} />
          <div className="flex gap-3">
            <GeolocationButton onClick={handleGeolocation} loading={loading} />
            <TemperatureToggle unit={unit} onToggle={toggleUnit} />
          </div>
        </div>

        {/* Weather Display */}
        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <WeatherDisplay 
                data={weatherData} 
                unit={unit}
                convertTemperature={convertTemperature}
              />
            </div>
            <div className="lg:col-span-1">
              <ForecastDisplay 
                data={forecastData} 
                unit={unit}
                convertTemperature={convertTemperature}
              />
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && !weatherData && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white mt-4">Fetching weather data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
