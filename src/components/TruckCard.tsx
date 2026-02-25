import type { ProcessedTruck } from '../types';
import './TruckCard.css';

interface Props {
  truck: ProcessedTruck;
  index: number;
}

export default function TruckCard({ truck, index }: Props) {
  return (
    <div className="truck-card" style={{ animationDelay: `${index * 0.15}s` }}>
      <div className="truck-card-header">
        <span className="truck-rank">#{index + 1}</span>
        <h3 className="truck-name">{truck.name}</h3>
      </div>

      <div className="truck-cuisine">
        {truck.cuisineTags.map((tag, i) => (
          <span key={i} className="cuisine-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="truck-details">
        <div className="truck-detail">
          <span className="detail-icon">📍</span>
          <span className="detail-text">{truck.address}</span>
        </div>
        <div className="truck-detail">
          <span className="detail-icon">🚶</span>
          <span className="detail-text">
            {truck.distanceDisplay} · {truck.walkingTime}
          </span>
        </div>
        <div className="truck-detail">
          <span className="detail-icon">🕐</span>
          <span className="detail-text">{truck.hoursToday}</span>
        </div>
      </div>

      <a
        className="maps-link"
        href={truck.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Google Maps ↗
      </a>
    </div>
  );
}
