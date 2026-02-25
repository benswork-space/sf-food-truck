import { useState, useEffect } from 'react';
import { fetchOpenSchedule, fetchApprovedPermits } from '../services/api';
import { haversineDistance, formatDistance, walkingTime } from '../services/distance';
import { getCurrentDayOfWeek, getCurrentTime24 } from '../services/time';
import type { ProcessedTruck, ScheduleEntry, PermitEntry } from '../types';

function parseFoodItems(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/[;:,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getCuisineType(items: string[]): string {
  if (items.length === 0) return 'Food Truck';
  // Return the first item, capitalized nicely
  const first = items[0];
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

function buildYelpUrl(applicant: string): string {
  const query = encodeURIComponent(applicant);
  return `https://www.yelp.com/search?find_desc=${query}&find_loc=San+Francisco%2C+CA`;
}

function processTrucks(
  schedules: ScheduleEntry[],
  permits: PermitEntry[],
  userLat: number,
  userLng: number
): ProcessedTruck[] {
  const permitMap = new Map<string, PermitEntry>();
  for (const p of permits) {
    permitMap.set(p.permit, p);
  }

  const trucks: ProcessedTruck[] = [];

  for (const s of schedules) {
    const lat = parseFloat(s.latitude);
    const lng = parseFloat(s.longitude);
    if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) continue;

    const permit = permitMap.get(s.permit);
    const foodItemsRaw = s.optionaltext || permit?.fooditems || '';
    const foodItems = parseFoodItems(foodItemsRaw);
    const dist = haversineDistance(userLat, userLng, lat, lng);

    trucks.push({
      name: s.applicant,
      cuisineType: getCuisineType(foodItems),
      cuisineTags: foodItems.slice(0, 4),
      distance: dist,
      distanceDisplay: formatDistance(dist),
      walkingTime: walkingTime(dist),
      address: s.location || permit?.address || 'Unknown location',
      hoursToday: `${s.starttime} – ${s.endtime}`,
      lat,
      lng,
      yelpUrl: buildYelpUrl(s.applicant),
      permit: s.permit,
    });
  }

  // Sort by distance
  trucks.sort((a, b) => a.distance - b.distance);

  // Deduplicate by name (keep closest)
  const seen = new Set<string>();
  const unique: ProcessedTruck[] = [];
  for (const t of trucks) {
    const key = t.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(t);
  }

  return unique.slice(0, 3);
}

interface UseFoodTrucksResult {
  trucks: ProcessedTruck[];
  loading: boolean;
  error: string | null;
}

export function useFoodTrucks(
  userLat: number | null,
  userLng: number | null
): UseFoodTrucksResult {
  const [trucks, setTrucks] = useState<ProcessedTruck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userLat === null || userLng === null) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    const dayOfWeek = getCurrentDayOfWeek();
    const currentTime = getCurrentTime24();

    Promise.all([
      fetchOpenSchedule(dayOfWeek, currentTime),
      fetchApprovedPermits(),
    ])
      .then(([schedules, permits]) => {
        if (cancelled) return;
        const result = processTrucks(schedules, permits, userLat, userLng);
        setTrucks(result);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Food truck fetch error:', err);
        setError("Couldn't reach SF food truck data. Check your connection and try again.");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userLat, userLng]);

  return { trucks, loading, error };
}
