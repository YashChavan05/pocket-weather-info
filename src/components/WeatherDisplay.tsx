
import React from 'react';
import { Cloud, Wind, Eye, Thermometer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WeatherData } from '@/pages/Index';

interface WeatherDisplayProps {
  data: WeatherData;
  unit: 'celsius' | 'fahrenheit';
  convertTemperature: (temp: number) => number;
}

export const WeatherDisplay = ({ data, unit, convertTemperature }: WeatherDisplayProps) => {
  const getWeatherIcon = (iconCode: string) => {
    // For demo purposes, using Cloud icon. In real app, you'd map weather codes to appropriate icons
    return <Cloud className="w-16 h-16 text-white" />;
  };

  return (
    <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-xl">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {data.city}, {data.country}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            {getWeatherIcon(data.icon)}
            <div>
              <div className="text-5xl md:text-7xl font-bold text-white">
                {convertTemperature(data.temperature)}°
              </div>
              <div className="text-white/80 text-lg capitalize">
                {data.description}
              </div>
            </div>
          </div>
          <div className="text-white/80 text-lg">
            Feels like {convertTemperature(data.feelsLike)}°{unit === 'celsius' ? 'C' : 'F'}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <Wind className="w-6 h-6 text-white/80 mx-auto mb-2" />
            <div className="text-white/80 text-sm">Wind</div>
            <div className="text-white font-semibold">{data.windSpeed} km/h</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="w-6 h-6 bg-white/80 rounded-full mx-auto mb-2"></div>
            <div className="text-white/80 text-sm">Humidity</div>
            <div className="text-white font-semibold">{data.humidity}%</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <Thermometer className="w-6 h-6 text-white/80 mx-auto mb-2" />
            <div className="text-white/80 text-sm">Pressure</div>
            <div className="text-white font-semibold">{data.pressure} hPa</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <Eye className="w-6 h-6 text-white/80 mx-auto mb-2" />
            <div className="text-white/80 text-sm">Visibility</div>
            <div className="text-white font-semibold">{data.visibility} km</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
