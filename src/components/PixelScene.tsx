import type { Theme } from '../types';
import dayBg from '../assets/day.png';
import nightBg from '../assets/night.png';
import './PixelScene.css';

interface Props {
  theme: Theme;
}

export default function PixelScene({ theme }: Props) {
  return (
    <div className="pixel-scene">
      <img
        className={`scene-bg ${theme === 'day' ? 'active' : ''}`}
        src={dayBg}
        alt=""
        aria-hidden="true"
      />
      <img
        className={`scene-bg ${theme === 'night' ? 'active' : ''}`}
        src={nightBg}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
