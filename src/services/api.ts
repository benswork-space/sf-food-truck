import type { ScheduleEntry, PermitEntry } from '../types';

const SCHEDULE_URL = 'https://data.sfgov.org/resource/jjew-r69b.json';
const PERMITS_URL = 'https://data.sfgov.org/resource/rqzj-sfat.json';

export async function fetchOpenSchedule(
  dayOfWeek: string,
  currentTime: string
): Promise<ScheduleEntry[]> {
  const where = `dayofweekstr='${dayOfWeek}' AND start24<='${currentTime}' AND end24>'${currentTime}'`;
  const params = new URLSearchParams({
    $where: where,
    $limit: '5000',
  });

  const response = await fetch(`${SCHEDULE_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`Schedule API error: ${response.status}`);
  }
  return response.json();
}

export async function fetchApprovedPermits(): Promise<PermitEntry[]> {
  const today = new Date().toISOString().slice(0, 10);
  const params = new URLSearchParams({
    $where: `status='APPROVED' AND expirationdate>'${today}'`,
    $limit: '5000',
    $select:
      'permit,applicant,fooditems,address,latitude,longitude,facilitytype,status,expirationdate',
  });

  const response = await fetch(`${PERMITS_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`Permits API error: ${response.status}`);
  }
  return response.json();
}
