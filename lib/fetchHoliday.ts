import type { NextApiRequest, NextApiResponse } from 'next';

const fetchHolidays = async (year: number, countryCode: string) => {
  const apiKey = '00c72375-7682-47ab-b7fd-0c232d981f9f'; 
  const url = `https://holidayapi.com/v1/holidays?pretty&key=${apiKey}&country=${countryCode}&year=${year}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch holidays');
    }
    const data = await response.json();
    console.log('Fetched holidays:', data);
    return data.holidays;
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return [];
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { year, countryCode } = req.query;

  const holidays = await fetchHolidays(Number(year), String(countryCode));
  res.status(200).json(holidays);
};