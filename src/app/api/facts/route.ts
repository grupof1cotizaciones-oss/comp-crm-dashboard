import { NextRequest, NextResponse } from 'next/server';
import { crmApi } from '@/lib/api/crm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: any = {};
    
    if (searchParams.get('entityId')) filters.entityId = searchParams.get('entityId');
    if (searchParams.get('entityType')) filters.entityType = searchParams.get('entityType');
    if (searchParams.get('factType')) filters.factType = searchParams.get('factType')?.split(',');
    if (searchParams.get('dateFrom')) filters.dateFrom = searchParams.get('dateFrom');
    if (searchParams.get('dateTo')) filters.dateTo = searchParams.get('dateTo');

    const result = await crmApi.facts.list(filters);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await crmApi.facts.create(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}