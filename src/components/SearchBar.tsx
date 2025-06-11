
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
    <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
      <div className="relative flex-1 md:w-80">
        <Input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-10 bg-white/20 backdrop-blur-md border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white/50 transition-all duration-300"
          disabled={loading}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
      </div>
      <Button 
        type="submit" 
        disabled={loading || !city.trim()}
        className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30 transition-all duration-300"
        variant="outline"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Search className="w-4 h-4" />
        )}
      </Button>
    </form>
  );
};
