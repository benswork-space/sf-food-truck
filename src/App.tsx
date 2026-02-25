import { useState, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import PixelScene from './components/PixelScene';
import SearchScreen from './components/SearchScreen';
import ResultsScreen from './components/ResultsScreen';
import type { Screen } from './types';
import './App.css';

export default function App() {
  const theme = useTheme();
  const [screen, setScreen] = useState<Screen>('search');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationFound = useCallback((lat: number, lng: number) => {
    setUserLocation({ lat, lng });
    setScreen('results');
  }, []);

  const handleBack = useCallback(() => {
    setScreen('search');
    setUserLocation(null);
  }, []);

  return (
    <div className="app" data-theme={theme}>
      <PixelScene theme={theme} />

      {screen === 'search' && (
        <SearchScreen onLocationFound={handleLocationFound} />
      )}

      {screen === 'results' && userLocation && (
        <ResultsScreen
          userLat={userLocation.lat}
          userLng={userLocation.lng}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
