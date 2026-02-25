import type { ReactElement } from 'react';

interface Props {
  className?: string;
}

// Food truck - pixel art (16x12 grid)
export default function PixelTruck({ className }: Props) {
  const P = (x: number, y: number, color: string) => (
    <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
  );

  const body = 'var(--truck-body, #FF6B35)';
  const bodyDark = 'var(--truck-body-dark, #E55A2B)';
  const window = 'var(--truck-window, #87CEEB)';
  const wheel = '#333';
  const wheelHub = '#888';
  const stripe = 'var(--truck-stripe, #FFD700)';

  const pixels: ReactElement[] = [];

  // Roof / top
  for (let x = 2; x <= 12; x++) pixels.push(P(x, 1, body));
  for (let x = 1; x <= 13; x++) pixels.push(P(x, 2, body));

  // Serving window area
  for (let x = 1; x <= 13; x++) pixels.push(P(x, 3, body));
  // Window opening
  for (let x = 3; x <= 8; x++) pixels.push(P(x, 3, window));

  // Stripe
  for (let x = 1; x <= 13; x++) pixels.push(P(x, 4, stripe));

  // Body
  for (let y = 5; y <= 7; y++) {
    for (let x = 1; x <= 13; x++) {
      pixels.push(P(x, y, y === 7 ? bodyDark : body));
    }
  }

  // Cab front
  for (let y = 4; y <= 7; y++) {
    pixels.push(P(14, y, bodyDark), P(15, y, bodyDark));
  }
  // Cab windshield
  pixels.push(P(14, 4, window), P(15, 4, window));
  pixels.push(P(14, 5, window), P(15, 5, window));

  // Bumper / undercarriage
  for (let x = 0; x <= 15; x++) pixels.push(P(x, 8, '#444'));

  // Wheels
  // Front wheel
  pixels.push(P(12, 9, wheel), P(13, 9, wheel));
  pixels.push(P(12, 10, wheel), P(13, 10, wheel));
  pixels.push(P(12, 9, wheelHub));
  // Back wheel
  pixels.push(P(3, 9, wheel), P(4, 9, wheel));
  pixels.push(P(3, 10, wheel), P(4, 10, wheel));
  pixels.push(P(3, 9, wheelHub));

  return (
    <svg
      className={className}
      viewBox="0 0 16 11"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated' }}
    >
      {pixels}
    </svg>
  );
}
