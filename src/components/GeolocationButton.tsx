
import React from 'react';
import { MapPin } from 'lucide-react';
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
      className="bg-white/15 backdrop-blur-md hover:bg-white/25 active:bg-white/30 text-white border-white/30 transition-all duration-300 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:hover:scale-100 group relative overflow-hidden"
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span className="font-medium">Locating...</span>
        </div>
      ) : (
        <div className="flex items-center gap-3 relative z-10">
          <MapPin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-medium">Use My Location</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-white/5 scale-0 group-active:scale-100 transition-transform duration-150 rounded-xl"></div>
    </Button>
  );
};
