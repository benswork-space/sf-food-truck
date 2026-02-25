import type { ReactElement } from 'react';

interface Props {
  className?: string;
}

// Golden Gate Bridge - simplified pixel art (32x20 grid)
export default function PixelBridge({ className }: Props) {
  const P = (x: number, y: number, color: string) => (
    <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
  );

  const cable = 'var(--pixel-bridge)';
  const tower = 'var(--pixel-bridge)';
  const road = 'var(--pixel-road, #555)';
  const water = 'var(--pixel-water)';

  const pixels: ReactElement[] = [];

  // Tower 1 (left) - x: 8-9, y: 2-15
  for (let y = 2; y <= 15; y++) {
    pixels.push(P(8, y, tower), P(9, y, tower));
  }
  // Tower 1 top cap
  pixels.push(P(7, 2, tower), P(10, 2, tower));
  pixels.push(P(7, 3, tower), P(10, 3, tower));

  // Tower 2 (right) - x: 22-23, y: 2-15
  for (let y = 2; y <= 15; y++) {
    pixels.push(P(22, y, tower), P(23, y, tower));
  }
  // Tower 2 top cap
  pixels.push(P(21, 2, tower), P(24, 2, tower));
  pixels.push(P(21, 3, tower), P(24, 3, tower));

  // Main cables (catenary curves between towers)
  // Top cable
  const cableTopY = [6, 5, 4, 3, 3, 3, 3, 3, 3, 4, 5, 6, 7];
  for (let i = 0; i < cableTopY.length; i++) {
    pixels.push(P(9 + i, cableTopY[i], cable));
  }
  // Left approach cable
  pixels.push(P(0, 12, cable), P(1, 11, cable), P(2, 10, cable), P(3, 9, cable));
  pixels.push(P(4, 8, cable), P(5, 8, cable), P(6, 7, cable), P(7, 7, cable));
  // Right approach cable
  pixels.push(P(31, 12, cable), P(30, 11, cable), P(29, 10, cable), P(28, 9, cable));
  pixels.push(P(27, 8, cable), P(26, 8, cable), P(25, 7, cable), P(24, 7, cable));

  // Vertical suspender cables
  for (let x = 10; x <= 22; x += 2) {
    const topY = cableTopY[x - 9] ?? 6;
    for (let y = topY + 1; y <= 11; y++) {
      pixels.push(P(x, y, cable));
    }
  }

  // Road deck - y: 12-13
  for (let x = 0; x <= 31; x++) {
    pixels.push(P(x, 12, road), P(x, 13, road));
  }

  // Water - y: 16-19
  for (let y = 16; y <= 19; y++) {
    for (let x = 0; x <= 31; x++) {
      pixels.push(P(x, y, water));
    }
  }

  return (
    <svg
      className={className}
      viewBox="0 0 32 20"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated' }}
    >
      {pixels}
    </svg>
  );
}
