import { useState, useEffect, useRef } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { isValidSFZip, getZipCoordinates } from '../data/sf-zipcodes';
import './SearchScreen.css';

interface Props {
  onLocationFound: (lat: number, lng: number) => void;
}

export default function SearchScreen({ onLocationFound }: Props) {
  const [zipCode, setZipCode] = useState('');
  const [zipError, setZipError] = useState<string | null>(null);
  const { status, position, error: geoError, requestLocation } = useGeolocation();
  const hasAutoProceeded = useRef(false);

  const handleGPSClick = () => {
    requestLocation();
  };

  // Auto-proceed when GPS position is received
  useEffect(() => {
    if (status === 'granted' && position && !hasAutoProceeded.current) {
      hasAutoProceeded.current = true;
      onLocationFound(position.lat, position.lng);
    }
  }, [status, position, onLocationFound]);

  const handleSubmit = () => {
    setZipError(null);

    // If GPS was granted, use that
    if (position) {
      onLocationFound(position.lat, position.lng);
      return;
    }

    // Otherwise validate zip
    if (!zipCode.trim()) {
      setZipError('Enter a zip code or use your location.');
      return;
    }

    if (zipCode.length !== 5) {
      setZipError('Enter a 5-digit zip code.');
      return;
    }

    if (!isValidSFZip(zipCode)) {
      setZipError("That's not an SF zip code. Try 94102–94134.");
      return;
    }

    const coords = getZipCoordinates(zipCode);
    if (coords) {
      onLocationFound(coords.lat, coords.lng);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="search-screen">
      <div className="search-content">
        <h1 className="search-title">
          SF Food Truck<br />Finder
        </h1>
        <p className="search-subtitle">What's cookin' near you?</p>

        <div className="search-form">
          <button
            className="gps-button"
            onClick={handleGPSClick}
            disabled={status === 'requesting'}
          >
            {status === 'requesting' ? (
              '📡 Getting location...'
            ) : status === 'granted' ? (
              '✓ Location found!'
            ) : (
              '📍 Use my location'
            )}
          </button>

          {geoError && <p className="error-text">{geoError}</p>}

          <div className="divider">
            <span className="divider-line" />
            <span className="divider-text">OR</span>
            <span className="divider-line" />
          </div>

          <input
            className="zip-input"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            placeholder="Enter SF zip code"
            value={zipCode}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setZipCode(val);
              setZipError(null);
            }}
            onKeyDown={handleKeyDown}
          />

          {zipError && <p className="error-text">{zipError}</p>}

          <button className="cta-button" onClick={handleSubmit}>
            Find me a food truck!
          </button>
        </div>
      </div>
    </div>
  );
}
