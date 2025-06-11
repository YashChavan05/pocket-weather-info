
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full md:w-auto group">
      <div className="relative flex-1 md:w-96">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-12 pr-4 py-3 bg-white/15 backdrop-blur-md border-white/30 text-white placeholder:text-white/60 focus:bg-white/25 focus:border-white/50 transition-all duration-500 rounded-xl shadow-lg hover:shadow-xl focus:shadow-2xl text-lg font-medium group-hover:bg-white/20"
          disabled={loading}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5 transition-all duration-300 group-hover:text-white group-focus-within:text-white group-focus-within:scale-110" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      <Button 
        type="submit" 
        disabled={loading || !city.trim()}
        className="bg-white/15 backdrop-blur-md hover:bg-white/25 active:bg-white/30 text-white border-white/30 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl px-6 py-3 font-semibold hover:scale-105 active:scale-95 disabled:hover:scale-100"
        variant="outline"
      >
        {loading ? (
          <div className="relative">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <Search className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        )}
      </Button>
    </form>
  );
};
