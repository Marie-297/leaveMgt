import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // const apiKey = process.env.API_NINJAS_KEY; 
  const apiKey = '4VNgztGgx/eOny4W1Np+ig==1zeABxkPlk2Oy9LS'
  const url = `https://api.api-ninjas.com/v1/holidays?country=GH&year=2024`;

  try {
    const headers: HeadersInit = {};
    if (apiKey) {
      headers['X-Api-Key'] = apiKey;
    } else {
      throw new Error('API key is undefined');
    }

    const response = await fetch(url, {
      headers,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch holidays');
    }
    const data = await response.json();
    console.log('Fetched holiday data:', data);
    return  NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return NextResponse.json({ error: 'Error fetching holidays' }, { status: 500 });
  }
};
