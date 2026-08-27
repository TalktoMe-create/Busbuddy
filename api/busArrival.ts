import type { Request, Response } from 'express';

/**
 * LTA DataMall Bus Arrival v3 Handler
 * Endpoint: https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=<BusStopCode>&ServiceNo=<ServiceNo>
 */
export async function handleBusArrival(req: Request, res: Response) {
  const apiKey =
    process.env.LTA_DATAMALL_API_KEY ||
    process.env.LTA_API_KEY ||
    process.env.DATAMALL_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'credential not configured' });
  }

  const busStopCode =
    (req.query.BusStopCode as string) || (req.query.busStopCode as string) || '';
  const serviceNo =
    (req.query.ServiceNo as string) || (req.query.serviceNo as string) || '';

  if (!busStopCode) {
    return res.status(400).json({ error: 'BusStopCode query parameter is required' });
  }

  try {
    const url = new URL('https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival');
    url.searchParams.set('BusStopCode', busStopCode);
    if (serviceNo) {
      url.searchParams.set('ServiceNo', serviceNo);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        AccountKey: apiKey,
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `LTA DataMall API responded with status ${response.status}`,
        details: errorText,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(502).json({
      error: 'Failed to connect to LTA DataMall service',
      message: err?.message || 'Unknown network error',
    });
  }
}

/**
 * Health / Config status endpoint for frontend banner
 */
export function handleApiStatus(req: Request, res: Response) {
  const apiKey =
    process.env.LTA_DATAMALL_API_KEY ||
    process.env.LTA_API_KEY ||
    process.env.DATAMALL_API_KEY;

  return res.json({
    hasCredential: Boolean(apiKey),
    endpoint: '/api/bus-arrival',
  });
}
