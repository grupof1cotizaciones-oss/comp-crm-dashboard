import { NextRequest, NextResponse } from 'next/server';
import { crmApi } from '@/lib/api/crm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: any = {};
    
    if (searchParams.get('industry')) filters.industry = searchParams.get('industry')?.split(',');
    if (searchParams.get('size')) filters.size = searchParams.get('size')?.split(',');
    if (searchParams.get('search')) filters.search = searchParams.get('search');
    if (searchParams.get('page')) filters.page = parseInt(searchParams.get('page') || '1');
    if (searchParams.get('limit')) filters.limit = parseInt(searchParams.get('limit') || '20');

    const result = await crmApi.companies.list(filters);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await crmApi.companies.enrich(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}