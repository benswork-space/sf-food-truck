import PixelTruck from '../assets/pixel-truck';
import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="loading-truck">
        <PixelTruck />
      </div>
      <p className="loading-text">Hunting for trucks...</p>
      <div className="loading-dots">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}
