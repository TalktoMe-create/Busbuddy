import { BusService, BusStopOption, PostalCodeLocation } from '../types';

export const BUS_SERVICES: BusService[] = [
  {
    serviceNumber: '2',
    operator: 'GAS',
    operatorFullName: 'Go-Ahead Singapore',
    category: 'Trunk',
    directions: [
      {
        directionNumber: 1,
        originName: 'CHANGI VILLAGE TER',
        destinationName: 'KAMPONG BAHRU TER',
        firstBus: '05:30',
        lastBus: '23:45',
        stops: [
          {
            stopCode: '99009',
            stopName: 'Changi Village Ter',
            roadName: 'Changi Village Rd',
            sequence: 1,
            nextBus: {
              estimatedArrivalMinutes: 8,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:42'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 24,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:58'
            },
            thirdBus: {
              estimatedArrivalMinutes: 39,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'SD',
              exactTimestamp: '15:13'
            }
          },
          {
            stopCode: '99131',
            stopName: 'Blk 4',
            roadName: 'Changi Village Rd',
            sequence: 2,
            nextBus: {
              estimatedArrivalMinutes: 8,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:42'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 24,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:58'
            }
          },
          {
            stopCode: '97089',
            stopName: 'Opp Selarang Pk Drug Reh.',
            roadName: 'Loyang Way',
            sequence: 3,
            nextBus: {
              estimatedArrivalMinutes: 0, // Arriving
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:34'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 16,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:50'
            }
          },
          {
            stopCode: '97069',
            stopName: 'Lloyd Leas Work Rel Camp',
            roadName: 'Upp Changi Rd Nth',
            sequence: 4,
            nextBus: {
              estimatedArrivalMinutes: 1,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'SD',
              exactTimestamp: '14:35'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 18,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:52'
            }
          },
          {
            stopCode: '97059',
            stopName: 'Bef Changi Women Prison',
            roadName: 'Upp Changi Rd Nth',
            sequence: 5,
            nextBus: {
              estimatedArrivalMinutes: 3,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:37'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 19,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:53'
            }
          },
          {
            stopCode: '97049',
            stopName: 'Aft Changi Prison',
            roadName: 'Upp Changi Rd Nth',
            sequence: 6,
            nextBus: {
              estimatedArrivalMinutes: 5,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:39'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 21,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'SD',
              exactTimestamp: '14:55'
            }
          },
          {
            stopCode: '96049',
            stopName: 'Opp The Japanese Pr Sch',
            roadName: 'Upp Changi Rd East',
            sequence: 7,
            nextBus: {
              estimatedArrivalMinutes: 7,
              load: 'LIMITED_STANDING',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:41'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 23,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:57'
            }
          },
          {
            stopCode: '85079',
            stopName: 'Tanah Merah Stn Exit A',
            roadName: 'New Upp Changi Rd',
            sequence: 8,
            nextBus: {
              estimatedArrivalMinutes: 9,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:43'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 25,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:59'
            }
          },
          {
            stopCode: '84049',
            stopName: 'Bedok Stn Exit B',
            roadName: 'New Upp Changi Rd',
            sequence: 9,
            nextBus: {
              estimatedArrivalMinutes: 11,
              load: 'LIMITED_STANDING',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:45'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 27,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '15:01'
            }
          },
          {
            stopCode: '01012',
            stopName: 'Victoria Concert Hall',
            roadName: 'Hill St',
            sequence: 10,
            nextBus: {
              estimatedArrivalMinutes: 10,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'SD',
              exactTimestamp: '14:44'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 26,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '15:00'
            }
          },
          {
            stopCode: '10499',
            stopName: 'Kampong Bahru Ter',
            roadName: 'Spooner Rd',
            sequence: 11,
            nextBus: {
              estimatedArrivalMinutes: 12,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:46'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 28,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '15:02'
            }
          }
        ]
      },
      {
        directionNumber: 2,
        originName: 'KAMPONG BAHRU TER',
        destinationName: 'CHANGI VILLAGE TER',
        firstBus: '05:45',
        lastBus: '23:55',
        stops: [
          {
            stopCode: '10499',
            stopName: 'Kampong Bahru Ter',
            roadName: 'Spooner Rd',
            sequence: 1,
            nextBus: {
              estimatedArrivalMinutes: 4,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:38'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 19,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:53'
            }
          },
          {
            stopCode: '01013',
            stopName: 'Old Hill St Police Stn',
            roadName: 'Hill St',
            sequence: 2,
            nextBus: {
              estimatedArrivalMinutes: 6,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:40'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 22,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'SD',
              exactTimestamp: '14:56'
            }
          },
          {
            stopCode: '84041',
            stopName: 'Bedok Stn Exit A',
            roadName: 'New Upp Changi Rd',
            sequence: 3,
            nextBus: {
              estimatedArrivalMinutes: 0,
              load: 'LIMITED_STANDING',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:34'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 15,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:49'
            }
          },
          {
            stopCode: '85071',
            stopName: 'Tanah Merah Stn Exit B',
            roadName: 'New Upp Changi Rd',
            sequence: 4,
            nextBus: {
              estimatedArrivalMinutes: 7,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:41'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 21,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:55'
            }
          },
          {
            stopCode: '97041',
            stopName: 'Bef Changi Prison',
            roadName: 'Upp Changi Rd Nth',
            sequence: 5,
            nextBus: {
              estimatedArrivalMinutes: 10,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'SD',
              exactTimestamp: '14:44'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 25,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:59'
            }
          },
          {
            stopCode: '99009',
            stopName: 'Changi Village Ter',
            roadName: 'Changi Village Rd',
            sequence: 6,
            nextBus: {
              estimatedArrivalMinutes: 14,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:48'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 30,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '15:04'
            }
          }
        ]
      }
    ]
  },
  {
    serviceNumber: '12',
    operator: 'GAS',
    operatorFullName: 'Go-Ahead Singapore',
    category: 'Trunk',
    directions: [
      {
        directionNumber: 1,
        originName: 'PASIR RIS INT',
        destinationName: 'KAMPONG BAHRU TER',
        firstBus: '05:30',
        lastBus: '23:30',
        stops: [
          {
            stopCode: '77009',
            stopName: 'Pasir Ris Bus Int',
            roadName: 'Pasir Ris Central',
            sequence: 1,
            nextBus: {
              estimatedArrivalMinutes: 2,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:36'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 14,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:48'
            }
          },
          {
            stopCode: '77179',
            stopName: 'Blk 524B',
            roadName: 'Pasir Ris Dr 1',
            sequence: 2,
            nextBus: {
              estimatedArrivalMinutes: 5,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:39'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 17,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:51'
            }
          },
          {
            stopCode: '84049',
            stopName: 'Bedok Stn Exit B',
            roadName: 'New Upp Changi Rd',
            sequence: 3,
            nextBus: {
              estimatedArrivalMinutes: 0,
              load: 'LIMITED_STANDING',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:34'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 12,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'SD',
              exactTimestamp: '14:46'
            }
          },
          {
            stopCode: '10499',
            stopName: 'Kampong Bahru Ter',
            roadName: 'Spooner Rd',
            sequence: 4,
            nextBus: {
              estimatedArrivalMinutes: 15,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:49'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 32,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '15:06'
            }
          }
        ]
      }
    ]
  },
  {
    serviceNumber: '65',
    operator: 'SBS',
    operatorFullName: 'SBS Transit',
    category: 'Trunk',
    directions: [
      {
        directionNumber: 1,
        originName: 'TAMPINES CONCOURSE INT',
        destinationName: 'HARBOURFRONT INT',
        firstBus: '05:30',
        lastBus: '23:30',
        stops: [
          {
            stopCode: '76529',
            stopName: 'Tampines Concourse Int',
            roadName: 'Tampines Concourse',
            sequence: 1,
            nextBus: {
              estimatedArrivalMinutes: 3,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:37'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 15,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:49'
            }
          },
          {
            stopCode: '84049',
            stopName: 'Bedok Stn Exit B',
            roadName: 'New Upp Changi Rd',
            sequence: 2,
            nextBus: {
              estimatedArrivalMinutes: 8,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:42'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 20,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:54'
            }
          },
          {
            stopCode: '14141',
            stopName: 'HarbourFront Int',
            roadName: 'Seah Im Rd',
            sequence: 3,
            nextBus: {
              estimatedArrivalMinutes: 18,
              load: 'LIMITED_STANDING',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:52'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 35,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '15:09'
            }
          }
        ]
      }
    ]
  },
  {
    serviceNumber: '147',
    operator: 'SBS',
    operatorFullName: 'SBS Transit',
    category: 'Trunk',
    directions: [
      {
        directionNumber: 1,
        originName: 'HOUGANG CENTRAL INT',
        destinationName: 'CLEMENTI INT',
        firstBus: '05:30',
        lastBus: '23:45',
        stops: [
          {
            stopCode: '64009',
            stopName: 'Hougang Central Int',
            roadName: 'Hougang Ctrl',
            sequence: 1,
            nextBus: {
              estimatedArrivalMinutes: 0,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:34'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 11,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:45'
            }
          },
          {
            stopCode: '01012',
            stopName: 'Victoria Concert Hall',
            roadName: 'Hill St',
            sequence: 2,
            nextBus: {
              estimatedArrivalMinutes: 6,
              load: 'LIMITED_STANDING',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:40'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 18,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:52'
            }
          },
          {
            stopCode: '17179',
            stopName: 'Clementi Int',
            roadName: 'Clementi Ave 3',
            sequence: 3,
            nextBus: {
              estimatedArrivalMinutes: 14,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:48'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 27,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'SD',
              exactTimestamp: '15:01'
            }
          }
        ]
      }
    ]
  },
  {
    serviceNumber: '190',
    operator: 'SMRT',
    operatorFullName: 'SMRT Buses',
    category: 'Trunk',
    directions: [
      {
        directionNumber: 1,
        originName: 'CHOA CHU KANG INT',
        destinationName: 'KAMPONG BAHRU TER',
        firstBus: '05:30',
        lastBus: '23:30',
        stops: [
          {
            stopCode: '44009',
            stopName: 'Choa Chu Kang Int',
            roadName: 'Choa Chu Kang Loop',
            sequence: 1,
            nextBus: {
              estimatedArrivalMinutes: 1,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'BD',
              exactTimestamp: '14:35'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 10,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:44'
            }
          },
          {
            stopCode: '09048',
            stopName: 'Orchard Stn Exit 12',
            roadName: 'Orchard Rd',
            sequence: 2,
            nextBus: {
              estimatedArrivalMinutes: 7,
              load: 'LIMITED_STANDING',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:41'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 16,
              load: 'STANDING_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'BD',
              exactTimestamp: '14:50'
            }
          },
          {
            stopCode: '10499',
            stopName: 'Kampong Bahru Ter',
            roadName: 'Spooner Rd',
            sequence: 3,
            nextBus: {
              estimatedArrivalMinutes: 19,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '14:53'
            },
            subsequentBus: {
              estimatedArrivalMinutes: 34,
              load: 'SEATS_AVAILABLE',
              isWheelchairAccessible: true,
              busType: 'DD',
              exactTimestamp: '15:08'
            }
          }
        ]
      }
    ]
  }
];

export const ALL_BUS_STOPS: BusStopOption[] = [
  { stopCode: '99009', stopName: 'Changi Village Ter', roadName: 'Changi Village Rd', postalCode: '508528', services: ['2', '29', '59', '109'] },
  { stopCode: '99131', stopName: 'Blk 4', roadName: 'Changi Village Rd', postalCode: '500004', services: ['2', '29', '59', '109'] },
  { stopCode: '97089', stopName: 'Opp Selarang Pk Drug Reh.', roadName: 'Loyang Way', postalCode: '507980', services: ['2'] },
  { stopCode: '97069', stopName: 'Lloyd Leas Work Rel Camp', roadName: 'Upp Changi Rd Nth', postalCode: '507705', services: ['2'] },
  { stopCode: '97059', stopName: 'Bef Changi Women Prison', roadName: 'Upp Changi Rd Nth', postalCode: '507706', services: ['2'] },
  { stopCode: '97049', stopName: 'Aft Changi Prison', roadName: 'Upp Changi Rd Nth', postalCode: '507707', services: ['2'] },
  { stopCode: '96049', stopName: 'Opp The Japanese Pr Sch', roadName: 'Upp Changi Rd East', postalCode: '485957', services: ['2', '24'] },
  { stopCode: '85079', stopName: 'Tanah Merah Stn Exit A', roadName: 'New Upp Changi Rd', postalCode: '467355', services: ['2', '12', '24', '38'] },
  { stopCode: '84049', stopName: 'Bedok Stn Exit B', roadName: 'New Upp Changi Rd', postalCode: '469588', services: ['2', '12', '24', '65'] },
  { stopCode: '01012', stopName: 'Victoria Concert Hall', roadName: 'Hill St', postalCode: '179429', services: ['2', '12', '147', '190'] },
  { stopCode: '10499', stopName: 'Kampong Bahru Ter', roadName: 'Spooner Rd', postalCode: '168796', services: ['2', '12', '190'] },
  { stopCode: '77009', stopName: 'Pasir Ris Bus Int', roadName: 'Pasir Ris Central', postalCode: '519634', services: ['12', '15', '21', '58'] },
  { stopCode: '76529', stopName: 'Tampines Concourse Int', roadName: 'Tampines Concourse', postalCode: '528794', services: ['65', '18'] },
  { stopCode: '14141', stopName: 'HarbourFront Int', roadName: 'Seah Im Rd', postalCode: '099114', services: ['65', '80', '93', '100'] },
  { stopCode: '64009', stopName: 'Hougang Central Int', roadName: 'Hougang Ctrl', postalCode: '538776', services: ['147', '87', '151'] },
  { stopCode: '17179', stopName: 'Clementi Int', roadName: 'Clementi Ave 3', postalCode: '129905', services: ['147', '166', '175'] },
  { stopCode: '44009', stopName: 'Choa Chu Kang Int', roadName: 'Choa Chu Kang Loop', postalCode: '689810', services: ['190', '67', '188'] },
  { stopCode: '09048', stopName: 'Orchard Stn Exit 12', roadName: 'Orchard Rd', postalCode: '238872', services: ['190', '65', '143'] }
];

export const POSTAL_CODE_LOCATIONS: PostalCodeLocation[] = [
  {
    postalCode: '508528',
    buildingOrArea: 'Changi Village Hawker Centre & Terminal',
    roadName: 'Changi Village Rd',
    nearestStopCode: '99009',
    distanceMetres: 35,
  },
  {
    postalCode: '500004',
    buildingOrArea: 'Changi Coastal Walk / Blk 4 Flats',
    roadName: 'Changi Village Rd',
    nearestStopCode: '99131',
    distanceMetres: 50,
  },
  {
    postalCode: '507980',
    buildingOrArea: 'Selarang Park Complex & Loyang Industrial',
    roadName: 'Loyang Way',
    nearestStopCode: '97089',
    distanceMetres: 75,
  },
  {
    postalCode: '507705',
    buildingOrArea: 'Lloyd Leas Community Work Release Camp',
    roadName: 'Upp Changi Rd Nth',
    nearestStopCode: '97069',
    distanceMetres: 45,
  },
  {
    postalCode: '507706',
    buildingOrArea: 'Changi Women\'s Prison & Transit Complex',
    roadName: 'Upp Changi Rd Nth',
    nearestStopCode: '97059',
    distanceMetres: 60,
  },
  {
    postalCode: '507707',
    buildingOrArea: 'Changi Prison Complex Main Gate',
    roadName: 'Upp Changi Rd Nth',
    nearestStopCode: '97049',
    distanceMetres: 80,
  },
  {
    postalCode: '485957',
    buildingOrArea: 'The Japanese Primary School (Changi Campus)',
    roadName: 'Upp Changi Rd East',
    nearestStopCode: '96049',
    distanceMetres: 95,
  },
  {
    postalCode: '467355',
    buildingOrArea: 'Tanah Merah MRT Station (EW4)',
    roadName: 'New Upp Changi Rd',
    nearestStopCode: '85079',
    distanceMetres: 30,
  },
  {
    postalCode: '469588',
    buildingOrArea: 'Bedok Mall & Integrated Transport Hub',
    roadName: 'New Upp Changi Rd',
    nearestStopCode: '84049',
    distanceMetres: 40,
  },
  {
    postalCode: '179429',
    buildingOrArea: 'Victoria Theatre & Concert Hall / National Gallery',
    roadName: 'Hill St / Empress Place',
    nearestStopCode: '01012',
    distanceMetres: 50,
  },
  {
    postalCode: '168796',
    buildingOrArea: 'Kampong Bahru Bus Terminal & Spooner Road Estate',
    roadName: 'Spooner Rd',
    nearestStopCode: '10499',
    distanceMetres: 35,
  },
  {
    postalCode: '519634',
    buildingOrArea: 'White Sands Shopping Mall & Pasir Ris MRT',
    roadName: 'Pasir Ris Central',
    nearestStopCode: '77009',
    distanceMetres: 45,
  },
  {
    postalCode: '528794',
    buildingOrArea: 'Our Tampines Hub & Tampines Concourse',
    roadName: 'Tampines Concourse',
    nearestStopCode: '76529',
    distanceMetres: 65,
  },
  {
    postalCode: '099114',
    buildingOrArea: 'HarbourFront Centre / VivoCity / Sentosa Station',
    roadName: 'Seah Im Rd',
    nearestStopCode: '14141',
    distanceMetres: 55,
  },
  {
    postalCode: '538776',
    buildingOrArea: 'Hougang Mall & Central Interchange',
    roadName: 'Hougang Ctrl',
    nearestStopCode: '64009',
    distanceMetres: 40,
  },
  {
    postalCode: '129905',
    buildingOrArea: 'The Clementi Mall & 321 Clementi',
    roadName: 'Clementi Ave 3',
    nearestStopCode: '17179',
    distanceMetres: 35,
  },
  {
    postalCode: '689810',
    buildingOrArea: 'Lot One Shoppers\' Mall / Choa Chu Kang Bus Interchange',
    roadName: 'Choa Chu Kang Loop',
    nearestStopCode: '44009',
    distanceMetres: 50,
  },
  {
    postalCode: '238872',
    buildingOrArea: 'ION Orchard, Wisma Atria & Ngee Ann City',
    roadName: 'Orchard Rd',
    nearestStopCode: '09048',
    distanceMetres: 25,
  },
];

