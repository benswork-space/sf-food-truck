export interface ScheduleEntry {
  permit: string;
  applicant: string;
  dayofweekstr: string;
  starttime: string;
  endtime: string;
  start24: string;
  end24: string;
  location: string;
  locationdesc?: string;
  latitude: string;
  longitude: string;
  optionaltext?: string;
  coldtruck?: string;
}

export interface PermitEntry {
  permit: string;
  applicant: string;
  facilitytype: string;
  fooditems: string;
  address: string;
  latitude: string;
  longitude: string;
  status: string;
}

export interface ProcessedTruck {
  name: string;
  cuisineType: string;
  cuisineTags: string[];
  distance: number;
  distanceDisplay: string;
  walkingTime: string;
  address: string;
  hoursToday: string;
  lat: number;
  lng: number;
  yelpUrl: string;
  permit: string;
}

export type Screen = 'search' | 'results';
export type Theme = 'day' | 'night';
export type GeoStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable';
