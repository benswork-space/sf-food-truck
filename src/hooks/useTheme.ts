import { useState, useEffect } from 'react';
import SunCalc from 'suncalc';
import type { Theme } from '../types';

const SF_LAT = 37.7749;
const SF_LNG = -122.4194;

function calculateTheme(): Theme {
  const now = new Date();
  const times = SunCalc.getTimes(now, SF_LAT, SF_LNG);
  if (now >= times.sunrise && now < times.sunsetStart) {
    return 'day';
  }
  return 'night';
}

export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(calculateTheme);

  useEffect(() => {
    const interval = setInterval(() => {
      setTheme(calculateTheme());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return theme;
}
