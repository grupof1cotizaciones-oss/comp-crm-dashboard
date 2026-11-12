'use client';

import { Lead, LeadStage, PipelineStage, STAGE_COLORS, STAGE_LABELS } from '@/types';
import { LeadCard } from './LeadCard';

interface PipelineKanbanProps {
  stages: Array<{
    id: LeadStage;
    name: string;
    leads: Lead[];
  }>;
  onLeadMove?: (leadId: string, newStage: string) => void;
  onLeadClick?: (lead: any) => void;
}

const STAGE_ORDER: Array<{ id: string; label: string }> = [
  { id: 'new', label: 'Nuevo' },
  { id: 'contacted', label: 'Contactado' },
  { id: 'qualified', label: 'Calificado' },
  { id: 'proposal', label: 'Propuesta' },
  { id: 'negotiation', label: 'Negociación' },
  { id: 'won', label: 'Ganado' },
  { id: 'lost', label: 'Perdido' },
];

export function PipelineKanban({ stages, onLeadMove, onLeadClick }: PipelineKanbanProps) {
  const stageMap = new Map(stages.map(s => [s.id, s]));

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 px-2">
      {STAGE_ORDER.map(({ id, label }) => {
        const stage = stageMap.get(id as any) || { id: id as any, name: label, leads: [] };
        const color = stage.id ? ['#64748b', '#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6', '#22c55e', '#ef4444'][
          ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'].indexOf(stage.id)
        ] : '#64748b';

        return (
          <div
            key={stage.id}
            className="flex-1 min-w-[280px] max-w-[320px] bg-gray-50 rounded-xl p-3"
            style={{ borderTop: `4px solid ${stage?.id ? ['#64748b', '#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6', '#22c55e', '#ef4444'][['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'].indexOf(stage.id)] : '#64748b'}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: ['#64748b', '#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6', '#22c55e', '#ef4444'][
                    ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'].indexOf(stage.id)
                  ] }}
                />
                {label}
              </h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {stage.leads?.length || 0}
              </span>
            </div>

            <div
              className="space-y-2 min-h-[200px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const leadId = e.dataTransfer.getData('leadId');
                const fromStage = e.dataTransfer.getData('fromStage');
                if (leadId && fromStage !== stage.id) {
                  // Trigger move
                }
              }}
            >
              {stage.leads?.map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('leadId', lead.id);
                    e.dataTransfer.setData('fromStage', stage.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  onClick={() => window.parent?.postMessage?.({ type: 'LEAD_CLICK', leadId: lead.id }, '*')}
                >
                  <div
                    className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-3"
                    style={{ borderLeft: `4px solid ${['#64748b', '#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6', '#22c55e', '#ef4444'][['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'].indexOf(stage.id)]}` }}
                  >
                    <h4 className="font-medium text-gray-900 truncate">{'name' in lead ? lead.name : 'Sin nombre'}</h4>
                    <p className="text-sm text-gray-500 mt-1 truncate">{'company' in lead ? lead.company || 'Sin empresa' : ''}</p>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{
                        backgroundColor: `${['#64748b', '#0ea5e9', '#f59e0b', '#ef4444']['low medium high critical'.split(' ').indexOf('medium')] || '#64748b'}20`,
                        color: ['#64748b', '#0ea5e9', '#f59e0b', '#ef4444']['low medium high critical'.split(' ').indexOf('medium')] || '#64748b'
                      }}>
                        Media
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}