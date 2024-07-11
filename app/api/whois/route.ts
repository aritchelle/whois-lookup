import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WHOIS_API_KEY as string;
const API_URL = "https://www.whoisxmlapi.com/whoisserver/WhoisService";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain name is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(API_URL, {
      params: {
        apiKey: API_KEY,
        domainName: domain,
        outputFormat: 'JSON',
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
