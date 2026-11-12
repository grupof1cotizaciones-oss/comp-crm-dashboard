import { NextRequest, NextResponse } from 'next/server';
import { crmApi } from '@/lib/api/crm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: any = {};
    
    if (searchParams.get('stage')) filters.stage = searchParams.get('stage')?.split(',');
    if (searchParams.get('intent')) filters.intent = searchParams.get('intent')?.split(',');
    if (searchParams.get('search')) filters.search = searchParams.get('search');
    if (searchParams.get('page')) filters.page = parseInt(searchParams.get('page') || '1');
    if (searchParams.get('limit')) filters.limit = parseInt(searchParams.get('limit') || '20');
    if (searchParams.get('sortBy')) filters.sortBy = searchParams.get('sortBy');
    if (searchParams.get('sortOrder')) filters.sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc';

    const result = await crmApi.leads.list(filters);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await crmApi.leads.create(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}