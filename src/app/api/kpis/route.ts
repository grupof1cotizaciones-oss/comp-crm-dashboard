import { NextResponse } from 'next/server';
import { crmApi } from '@/lib/api/crm';

export async function GET() {
  try {
    const result = await crmApi.leads.list({ limit: 1000 });
    const leads = (result.data || []) as any[];
    
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.stage === 'new').length;
    const qualifiedLeads = leads.filter(l => l.stage === 'qualified').length;
    const proposalsSent = leads.filter(l => l.stage === 'proposal').length;
    const dealsWon = leads.filter(l => l.stage === 'won').length;
    const dealsLost = leads.filter(l => l.stage === 'lost').length;
    
    const totalValue = leads.reduce((sum, l) => sum + (l.value || 0), 0);
    const avgDealSize = dealsWon > 0 
      ? leads.filter(l => l.stage === 'won').reduce((sum, l) => sum + (l.value || 0), 0) / dealsWon 
      : 0;
    
    const conversionRate = totalLeads > 0 ? (dealsWon / totalLeads) * 100 : 0;
    
    const kpis = {
      totalLeads,
      newLeads,
      qualifiedLeads,
      proposalsSent,
      dealsWon,
      dealsLost,
      totalValue,
      avgDealSize,
      conversionRate: parseFloat(conversionRate.toFixed(1)),
      avgCycleDays: 45, // Placeholder
    };

    return NextResponse.json({ data: kpis });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}