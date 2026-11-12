import { NextRequest, NextResponse } from 'next/server';
import { crmApi } from '@/lib/api/crm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: any = {};
    
    if (searchParams.get('leadId')) filters.leadId = searchParams.get('leadId');
    if (searchParams.get('type')) filters.type = searchParams.get('type')?.split(',');
    if (searchParams.get('dateFrom')) filters.dateFrom = searchParams.get('dateFrom');
    if (searchParams.get('dateTo')) filters.dateTo = searchParams.get('dateTo');
    if (searchParams.get('page')) filters.page = parseInt(searchParams.get('page') || '1');
    if (searchParams.get('limit')) filters.limit = parseInt(searchParams.get('limit') || '20');

    const result = await crmApi.activities.list(filters);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await crmApi.activities.create(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}