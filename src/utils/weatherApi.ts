
import { WeatherData, ForecastData } from '@/pages/Index';

// Mock weather API - In a real app, you'd use OpenWeatherMap or similar
class WeatherAPI {
  private generateMockWeather(city: string): WeatherData {
    const descriptions = ['Clear sky', 'Few clouds', 'Scattered clouds', 'Broken clouds', 'Shower rain', 'Rain', 'Thunderstorm', 'Snow', 'Mist'];
    const countries = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'IN'];
    
    return {
      city: city,
      country: countries[Math.floor(Math.random() * countries.length)],
      temperature: Math.floor(Math.random() * 30) + 5, // 5-35°C
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      icon: '01d',
      feelsLike: Math.floor(Math.random() * 30) + 5,
      pressure: Math.floor(Math.random() * 100) + 1000, // 1000-1100 hPa
      visibility: Math.floor(Math.random() * 20) + 5, // 5-25 km
    };
  }

  private generateMockForecast(): ForecastData[] {
    const descriptions = ['Clear sky', 'Few clouds', 'Scattered clouds', 'Rain', 'Thunderstorm'];
    const forecast: ForecastData[] = [];
    
    for (let i = 1; i <= 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      forecast.push({
        date: date.toISOString(),
        temperature: {
          min: Math.floor(Math.random() * 15) + 5, // 5-20°C
          max: Math.floor(Math.random() * 15) + 20, // 20-35°C
        },
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        icon: '01d',
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
      });
    }
    
    return forecast;
  }

  async getCurrentWeather(city: string): Promise<WeatherData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate API error for invalid cities
    if (city.toLowerCase() === 'xyz' || city.toLowerCase() === 'invalid') {
      throw new Error('City not found');
    }
    
    return this.generateMockWeather(city);
  }

  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.generateMockWeather('Your Location');
  }

  async getForecast(city: string): Promise<ForecastData[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (city.toLowerCase() === 'xyz' || city.toLowerCase() === 'invalid') {
      throw new Error('City not found');
    }
    
    return this.generateMockForecast();
  }

  async getForecastByCoords(lat: number, lon: number): Promise<ForecastData[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.generateMockForecast();
  }
}

export const weatherApi = new WeatherAPI();
