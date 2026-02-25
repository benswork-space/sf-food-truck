import { useFoodTrucks } from '../hooks/useFoodTrucks';
import TruckCard from './TruckCard';
import LoadingSpinner from './LoadingSpinner';
import './ResultsScreen.css';

interface Props {
  userLat: number;
  userLng: number;
  onBack: () => void;
}

export default function ResultsScreen({ userLat, userLng, onBack }: Props) {
  const { trucks, loading, error } = useFoodTrucks(userLat, userLng);

  return (
    <div className="results-screen">
      <div className="results-content">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <h2 className="results-title">Nearby Open Trucks</h2>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="results-error">
            <p className="error-emoji">😵</p>
            <p className="error-message">{error}</p>
            <button className="retry-button" onClick={onBack}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && trucks.length === 0 && (
          <div className="results-empty">
            <p className="empty-emoji">🌫️</p>
            <p className="empty-title">Karl the Fog ate all the food trucks...</p>
            <p className="empty-subtitle">
              No trucks are open near you right now. Try again later!
            </p>
            <button className="retry-button" onClick={onBack}>
              Search again
            </button>
          </div>
        )}

        {!loading && !error && trucks.length > 0 && (
          <div className="truck-list">
            {trucks.map((truck, i) => (
              <TruckCard key={truck.permit + truck.address} truck={truck} index={i} />
            ))}
          </div>
        )}

        {!loading && trucks.length > 0 && (
          <button className="search-again-button" onClick={onBack}>
            Search again
          </button>
        )}
      </div>
    </div>
  );
}
