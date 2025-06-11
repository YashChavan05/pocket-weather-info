
import React from 'react';
import { Cloud } from 'lucide-react';
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
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    return <Cloud className="w-8 h-8 text-white/80" />;
  };

  return (
    <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-xl h-fit">
      <CardHeader>
        <CardTitle className="text-white text-xl">3-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((day, index) => (
          <div 
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-white/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-white font-medium">
                  {formatDate(day.date)}
                </div>
                <div className="text-white/80 text-sm capitalize">
                  {day.description}
                </div>
                <div className="text-white/70 text-xs mt-1">
                  Humidity: {day.humidity}% • Wind: {day.windSpeed} km/h
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getWeatherIcon(day.icon)}
                <div className="text-right">
                  <div className="text-white font-bold">
                    {convertTemperature(day.temperature.max)}°
                  </div>
                  <div className="text-white/70">
                    {convertTemperature(day.temperature.min)}°
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
