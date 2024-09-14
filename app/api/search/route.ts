// app/api/search/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    const results = [
      { id: '1', name: 'portal' },
      { id: '2', name: 'leave' },
    ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
