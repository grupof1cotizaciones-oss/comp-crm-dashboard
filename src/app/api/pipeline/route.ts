import { NextResponse } from 'next/server';
import { crmApi } from '@/lib/api/crm';

export async function GET() {
  try {
    const result = await crmApi.leads.list({ limit: 1000 });
    const leads = result.data || [];
    
    const stages = [
      { id: 'new', name: 'Nuevo', leads: [] },
      { id: 'contacted', name: 'Contactado', leads: [] },
      { id: 'qualified', name: 'Calificado', leads: [] },
      { id: 'proposal', name: 'Propuesta', leads: [] },
      { id: 'negotiation', name: 'Negociación', leads: [] },
      { id: 'won', name: 'Ganado', leads: [] },
      { id: 'lost', name: 'Perdido', leads: [] },
    ];

    const stageMap = new Map(stages.map(s => [s.id, s]));
    
    (leads as any[]).forEach(lead => {
      const stage = stageMap.get(lead.stage);
      if (stage) stage.leads.push(lead);
    });

    return NextResponse.json({ data: stages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}