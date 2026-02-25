# SF Food Truck Finder

A fun, mobile-first webapp that helps you find the nearest open food truck in San Francisco.

## Features

- **GPS or zip code** — use your location or enter an SF zip code
- **Real-time data** — pulls from SF Open Data APIs for live truck schedules
- **Top 3 nearest** — shows the closest open food trucks with cuisine type, distance, and hours
- **Day/night themes** — sunny daytime aesthetic before sunset, neon nightlife vibes after dark
- **Pixel art style** — retro pixelated Golden Gate Bridge, Sutro Tower, and more
- **View on Yelp** — quick link to check reviews for each truck

## Tech Stack

- React 18 + TypeScript + Vite
- SF Open Data SODA API (no auth required)
- SunCalc for sunset/sunrise calculation
- Press Start 2P pixel font
- Pure CSS theming with custom properties

## Getting Started

```bash
npm install
npm run dev
```

## Data Sources

- [Mobile Food Facility Permits](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat)
- [Mobile Food Schedule](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Schedule/jjew-r69b)
