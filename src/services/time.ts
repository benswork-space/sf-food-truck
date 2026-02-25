const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function getCurrentDayOfWeek(): string {
  return DAYS[new Date().getDay()];
}

export function getCurrentTime24(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function isOpenNow(start24: string, end24: string): boolean {
  const current = getCurrentTime24();
  if (end24 > start24) {
    return current >= start24 && current < end24;
  }
  // Overnight case (e.g., 20:00 - 02:00)
  return current >= start24 || current < end24;
}
