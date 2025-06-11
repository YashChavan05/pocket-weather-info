
import React from 'react';
import { Cloud, Wind, Eye, Thermometer, Droplets, Gauge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WeatherData } from '@/pages/Index';

interface WeatherDisplayProps {
  data: WeatherData;
  unit: 'celsius' | 'fahrenheit';
  convertTemperature: (temp: number) => number;
}

export const WeatherDisplay = ({ data, unit, convertTemperature }: WeatherDisplayProps) => {
  const getWeatherIcon = (iconCode: string) => {
    return <Cloud className="w-20 h-20 text-white drop-shadow-lg animate-bounce" />;
  };

  const weatherStats = [
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${data.windSpeed} km/h`,
      color: "text-blue-200"
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${data.humidity}%`,
      color: "text-cyan-200"
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${data.pressure} hPa`,
      color: "text-purple-200"
    },
    {
      icon: Eye,
      label: "Visibility",
      value: `${data.visibility} km`,
      color: "text-green-200"
    }
  ];

  return (
    <Card className="bg-white/15 backdrop-blur-md border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-2xl overflow-hidden group hover:bg-white/20">
      <CardContent className="p-8">
        {/* Location Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-wide">
            {data.city}
          </h2>
          <p className="text-white/80 text-lg font-medium">{data.country}</p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mt-3"></div>
        </div>

        {/* Main Weather Display */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="transform group-hover:scale-110 transition-transform duration-500">
            {getWeatherIcon(data.icon)}
          </div>
          <div className="text-center">
            <div className="text-6xl md:text-8xl font-bold text-white mb-2 bg-gradient-to-br from-white to-white/80 bg-clip-text transition-all duration-300 hover:scale-105">
              {convertTemperature(data.temperature)}°
            </div>
            <div className="text-white/90 text-xl md:text-2xl capitalize font-medium mb-2">
              {data.description}
            </div>
            <div className="text-white/70 text-lg font-medium">
              Feels like {convertTemperature(data.feelsLike)}°{unit === 'celsius' ? 'C' : 'F'}
            </div>
          </div>
        </div>

        {/* Weather Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weatherStats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center transition-all duration-500 hover:bg-white/20 hover:scale-105 cursor-pointer animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-3 transition-all duration-300 hover:scale-125`} />
              <div className="text-white/80 text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-white font-bold text-lg">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </CardContent>
    </Card>
  );
};
