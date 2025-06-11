
import React from 'react';
import { Button } from '@/components/ui/button';

interface TemperatureToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: () => void;
}

export const TemperatureToggle = ({ unit, onToggle }: TemperatureToggleProps) => {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      className="bg-white/15 backdrop-blur-md hover:bg-white/25 active:bg-white/30 text-white border-white/30 transition-all duration-300 font-bold text-lg px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group relative overflow-hidden"
    >
      <span className="relative z-10">
        °{unit === 'celsius' ? 'C' : 'F'}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-white/5 scale-0 group-active:scale-100 transition-transform duration-150 rounded-xl"></div>
    </Button>
  );
};
