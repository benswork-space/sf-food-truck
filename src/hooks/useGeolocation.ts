import { useState, useCallback } from 'react';
import type { GeoStatus } from '../types';

interface GeolocationState {
  status: GeoStatus;
  position: { lat: number; lng: number } | null;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: 'idle',
    position: null,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({
        status: 'unavailable',
        position: null,
        error: 'Geolocation is not supported by your browser.',
      });
      return;
    }

    setState((prev) => ({ ...prev, status: 'requesting', error: null }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          status: 'granted',
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          error: null,
        });
      },
      (err) => {
        let message = 'Could not get your location.';
        if (err.code === err.PERMISSION_DENIED) {
          message = 'Location access denied. Try entering a zip code instead.';
        } else if (err.code === err.TIMEOUT) {
          message = 'Location request timed out. Try entering a zip code.';
        }
        setState({
          status: 'denied',
          position: null,
          error: message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  return { ...state, requestLocation };
}
