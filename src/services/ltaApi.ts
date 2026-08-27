import { BusArrivalInfo, LoadStatus, BusType } from '../types';

export interface LtaBusUnit {
  OriginCode?: string;
  DestinationCode?: string;
  EstimatedArrival?: string;
  Latitude?: string;
  Longitude?: string;
  VisitNumber?: string;
  Load?: string; // SEA, SDA, LSD
  Feature?: string; // WAB
  Type?: string; // SD, DD, BD
}

export interface LtaServiceArrival {
  ServiceNo: string;
  Operator: string;
  NextBus?: LtaBusUnit;
  NextBus2?: LtaBusUnit;
  NextBus3?: LtaBusUnit;
}

export interface LtaArrivalResponse {
  'odata.metadata'?: string;
  BusStopCode: string;
  Services: LtaServiceArrival[];
}

export interface ApiConnectionStatus {
  hasCredential: boolean;
  endpoint: string;
  lastChecked?: string;
}

export function parseLtaBusUnit(bus?: LtaBusUnit): BusArrivalInfo | null {
  if (!bus || !bus.EstimatedArrival) return null;

  const arrivalDate = new Date(bus.EstimatedArrival);
  const now = new Date();
  const diffMs = arrivalDate.getTime() - now.getTime();
  const diffMinutes = Math.max(0, Math.round(diffMs / 60000));

  let load: LoadStatus = 'SEATS_AVAILABLE';
  if (bus.Load === 'SDA') load = 'STANDING_AVAILABLE';
  else if (bus.Load === 'LSD') load = 'LIMITED_STANDING';

  let busType: BusType = 'SD';
  if (bus.Type === 'DD') busType = 'DD';
  else if (bus.Type === 'BD') busType = 'BD';

  return {
    estimatedArrivalMinutes: diffMinutes,
    load,
    isWheelchairAccessible: bus.Feature === 'WAB',
    busType,
    exactTimestamp: bus.EstimatedArrival,
  };
}

export async function checkBackendApiStatus(): Promise<ApiConnectionStatus> {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) {
      return { hasCredential: false, endpoint: '/api/bus-arrival' };
    }
    const data = await res.json();
    return {
      hasCredential: Boolean(data.hasCredential),
      endpoint: data.endpoint || '/api/bus-arrival',
      lastChecked: new Date().toLocaleTimeString(),
    };
  } catch {
    return { hasCredential: false, endpoint: '/api/bus-arrival' };
  }
}

export async function fetchLiveBusArrival(
  busStopCode: string,
  serviceNo?: string
): Promise<{ success: boolean; data?: LtaArrivalResponse; error?: string; isCredentialMissing?: boolean }> {
  try {
    const params = new URLSearchParams();
    params.set('BusStopCode', busStopCode);
    if (serviceNo) {
      params.set('ServiceNo', serviceNo);
    }

    const response = await fetch(`/api/bus-arrival?${params.toString()}`);

    if (response.status === 500) {
      const errorJson = await response.json().catch(() => ({}));
      if (errorJson.error === 'credential not configured') {
        return {
          success: false,
          isCredentialMissing: true,
          error: 'credential not configured',
        };
      }
      return {
        success: false,
        error: errorJson.error || 'Server error',
      };
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      return {
        success: false,
        error: `HTTP ${response.status}: ${errorText}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error connecting to backend',
    };
  }
}
