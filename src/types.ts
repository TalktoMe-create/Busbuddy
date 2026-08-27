export type LoadStatus = 'SEATS_AVAILABLE' | 'STANDING_AVAILABLE' | 'LIMITED_STANDING';

export type BusType = 'SD' | 'DD' | 'BD'; // Single Deck, Double Decker, Bendy

export type SearchMode = 'service' | 'stop' | 'postal';

export interface BusArrivalInfo {
  estimatedArrivalMinutes: number; // 0 for arriving
  load: LoadStatus;
  isWheelchairAccessible: boolean;
  busType: BusType;
  exactTimestamp: string;
}

export interface BusStopTiming {
  stopCode: string;
  stopName: string;
  roadName: string;
  postalCode?: string;
  sequence: number;
  nextBus: BusArrivalInfo;
  subsequentBus: BusArrivalInfo;
  thirdBus?: BusArrivalInfo;
}

export interface BusRouteDirection {
  directionNumber: 1 | 2;
  originName: string;
  destinationName: string;
  firstBus: string;
  lastBus: string;
  stops: BusStopTiming[];
}

export interface BusService {
  serviceNumber: string;
  operator: 'GAS' | 'SBS' | 'SMRT' | 'TTS';
  operatorFullName: string;
  category: 'Trunk' | 'Feeder' | 'Express' | 'City Direct';
  color?: string;
  directions: BusRouteDirection[];
}

export interface BusStopOption {
  stopCode: string;
  stopName: string;
  roadName: string;
  postalCode?: string;
  services: string[];
}

export interface PostalCodeLocation {
  postalCode: string;
  buildingOrArea: string;
  roadName: string;
  nearestStopCode: string;
  distanceMetres: number;
}

