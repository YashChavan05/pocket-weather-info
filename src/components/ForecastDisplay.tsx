
import React from 'react';
import { Cloud, Wind, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ForecastData } from '@/pages/Index';

interface ForecastDisplayProps {
  data: ForecastData[];
  unit: 'celsius' | 'fahrenheit';
  convertTemperature: (temp: number) => number;
}

export const ForecastDisplay = ({ data, unit, convertTemperature }: ForecastDisplayProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    return <Cloud className="w-8 h-8 text-white/90 hover:text-white transition-colors duration-300" />;
  };

  return (
    <Card className="bg-white/15 backdrop-blur-md border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-2xl h-fit group hover:bg-white/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-2xl font-bold flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-full"></div>
          3-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((day, index) => (
          <div 
            key={index}
            className={`bg-white/10 backdrop-blur-sm rounded-xl p-5 transition-all duration-500 hover:bg-white/20 hover:scale-[1.02] cursor-pointer group/item animate-fade-in`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-white font-bold text-lg mb-1">
                  {formatDate(day.date)}
                </div>
                <div className="text-white/80 text-sm capitalize mb-2 font-medium">
                  {day.description}
                </div>
                <div className="flex items-center gap-4 text-white/70 text-xs">
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="w-3 h-3" />
                    <span>{day.windSpeed} km/h</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="transform group-hover/item:scale-110 transition-transform duration-300">
                  {getWeatherIcon(day.icon)}
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-xl">
                    {convertTemperature(day.temperature.max)}°
                  </div>
                  <div className="text-white/70 text-sm">
                    {convertTemperature(day.temperature.min)}°
                  </div>
                </div>
              </div>
            </div>
            
            {/* Temperature range bar */}
            <div className="mt-3 bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full transition-all duration-1000"
                style={{ 
                  width: `${Math.min(100, (convertTemperature(day.temperature.max) + 10) * 2)}%` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
