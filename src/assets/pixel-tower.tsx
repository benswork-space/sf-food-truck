import type { ReactElement } from 'react';

interface Props {
  className?: string;
}

// Sutro Tower - simplified pixel art (12x28 grid)
export default function PixelTower({ className }: Props) {
  const P = (x: number, y: number, color: string) => (
    <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
  );

  const metal = 'var(--pixel-tower, #E0E0E0)';
  const metalDark = 'var(--pixel-tower-dark, #B0B0B0)';
  const light = 'var(--pixel-tower-light, #FF0000)';

  const pixels: ReactElement[] = [];

  // Antenna tip - single pixel
  pixels.push(P(6, 0, light));
  pixels.push(P(6, 1, metal));
  pixels.push(P(6, 2, metal));

  // Upper section - narrow (x: 5-7)
  for (let y = 3; y <= 7; y++) {
    pixels.push(P(5, y, metal), P(6, y, metalDark), P(7, y, metal));
  }

  // First cross brace (y: 8)
  pixels.push(P(4, 8, metal), P(5, 8, metal), P(6, 8, metalDark), P(7, 8, metal), P(8, 8, metal));

  // Middle section - widens (x: 4-8)
  for (let y = 9; y <= 14; y++) {
    pixels.push(P(4, y, metal), P(5, y, metalDark), P(7, y, metalDark), P(8, y, metal));
  }

  // Second cross brace (y: 15)
  pixels.push(
    P(3, 15, metal), P(4, 15, metal), P(5, 15, metalDark),
    P(6, 15, metal),
    P(7, 15, metalDark), P(8, 15, metal), P(9, 15, metal)
  );

  // Lower section - widest (x: 3-9)
  for (let y = 16; y <= 23; y++) {
    const spread = Math.floor((y - 15) * 0.3);
    pixels.push(
      P(3 - spread, y, metal),
      P(4 - spread, y, metalDark),
      P(8 + spread, y, metal),
      P(9 + spread, y, metalDark)
    );
  }

  // Three legs at bottom
  // Left leg
  pixels.push(P(1, 24, metal), P(0, 25, metal), P(0, 26, metal), P(0, 27, metal));
  // Center leg
  pixels.push(P(6, 24, metalDark), P(6, 25, metalDark), P(6, 26, metalDark), P(6, 27, metalDark));
  // Right leg
  pixels.push(P(11, 24, metal), P(12, 25, metal), P(12, 26, metal), P(12, 27, metal));

  // Red warning lights
  pixels.push(P(6, 8, light));
  pixels.push(P(6, 15, light));

  return (
    <svg
      className={className}
      viewBox="0 0 13 28"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated' }}
    >
      {pixels}
    </svg>
  );
}
