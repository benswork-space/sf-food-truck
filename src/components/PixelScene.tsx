import type { Theme } from '../types';
import PixelBridge from '../assets/pixel-bridge';
import PixelTower from '../assets/pixel-tower';
import './PixelScene.css';

interface Props {
  theme: Theme;
}

export default function PixelScene({ theme }: Props) {
  return (
    <div className="pixel-scene">
      {/* Sky gradient is handled by CSS */}

      {/* Stars (night only) */}
      {theme === 'night' && (
        <div className="stars">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${(i * 37 + 13) % 100}%`,
                top: `${(i * 23 + 7) % 45}%`,
                animationDelay: `${(i * 0.3) % 2}s`,
                width: i % 3 === 0 ? '3px' : '2px',
                height: i % 3 === 0 ? '3px' : '2px',
              }}
            />
          ))}
        </div>
      )}

      {/* Sun or Moon */}
      <div className={`celestial-body ${theme}`}>
        {theme === 'day' ? (
          <div className="sun" />
        ) : (
          <div className="moon" />
        )}
      </div>

      {/* Landmarks */}
      <div className="landmarks">
        <PixelBridge className="bridge" />
        <PixelTower className="tower" />
      </div>

      {/* Hills/land in foreground */}
      <div className="hills" />
    </div>
  );
}
