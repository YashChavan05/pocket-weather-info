
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
      {/* Enhanced Background decoration with animations */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-200"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-yellow-300/40 rounded-full animate-bounce delay-700"></div>
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-1000"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Enhanced Header with animations */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight transform hover:scale-105 transition-transform duration-300">
            Weather<span className="text-yellow-300 animate-pulse">Cast</span>
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
            Experience real-time weather updates with stunning visuals for cities worldwide
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-400 mx-auto mt-6 rounded-full animate-pulse"></div>
        </div>

        {/* Enhanced Controls with stagger animation */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-center animate-fade-in delay-200">
          <div className="transform hover:scale-105 transition-all duration-300">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>
          <div className="flex gap-4">
            <div className="transform hover:scale-105 transition-all duration-300">
              <GeolocationButton onClick={handleGeolocation} loading={loading} />
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <TemperatureToggle unit={unit} onToggle={toggleUnit} />
            </div>
          </div>
        </div>

        {/* Enhanced Weather Display with slide-in animation */}
        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 animate-fade-in delay-300">
            <div className="lg:col-span-2 transform hover:scale-[1.02] transition-all duration-500">
              <WeatherDisplay 
                data={weatherData} 
                unit={unit}
                convertTemperature={convertTemperature}
              />
            </div>
            <div className="lg:col-span-1 transform hover:scale-[1.02] transition-all duration-500 delay-100">
              <ForecastDisplay 
                data={forecastData} 
                unit={unit}
                convertTemperature={convertTemperature}
              />
            </div>
          </div>
        )}

        {/* Enhanced Loading state */}
        {loading && !weatherData && (
          <div className="text-center animate-fade-in">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              <div className="absolute w-12 h-12 border-4 border-transparent border-t-yellow-300 rounded-full animate-spin animate-reverse"></div>
            </div>
            <p className="text-white text-xl mt-6 font-medium animate-pulse">Fetching weather data...</p>
            <div className="flex justify-center space-x-1 mt-4">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
