
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
      className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30 transition-all duration-300 font-semibold"
    >
      °{unit === 'celsius' ? 'C' : 'F'}
    </Button>
  );
};
