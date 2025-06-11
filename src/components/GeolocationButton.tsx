
import React from 'react';
import { Button } from '@/components/ui/button';

interface GeolocationButtonProps {
  onClick: () => void;
  loading: boolean;
}

export const GeolocationButton = ({ onClick, loading }: GeolocationButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      variant="outline"
      className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-white/30 transition-all duration-300"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <span className="text-sm">📍 Use My Location</span>
      )}
    </Button>
  );
};
