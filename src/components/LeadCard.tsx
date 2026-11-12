'use client';

import { Lead, LeadStage, STAGE_COLORS, STAGE_LABELS, INTENT_COLORS, INTENT_LABELS } from '@/types';

interface LeadCardProps {
  lead: Lead;
  onClick?: (lead: Lead) => void;
  onStageChange?: (leadId: string, newStage: LeadStage) => void;
}

export function LeadCard({ lead, onClick, onStageChange }: LeadCardProps) {
  const stageColor = STAGE_COLORS[lead.stage];
  const intentColor = INTENT_COLORS[lead.intent || 'low'];

  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value as LeadStage;
    onStageChange?.(lead.id, newStage);
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={onClick}
      style={{ borderLeft: `4px solid ${stageColor}` }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{lead.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{lead.company || 'Sin empresa'}</p>
          </div>
          <select
            value={lead.stage}
            onChange={handleStageChange}
            onClick={(e) => e.stopPropagation()}
            className="text-xs px-2 py-1 rounded border bg-white"
            style={{ borderColor: stageColor, color: stageColor }}
          >
            {Object.entries({
              new: 'Nuevo',
              contacted: 'Contactado',
              qualified: 'Calificado',
              proposal: 'Propuesta',
              negotiation: 'Negociación',
              won: 'Ganado',
              lost: 'Perdido',
            }).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between text-sm mb-3">
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${intentColor}20`, color: intentColor }}
          >
            {lead.intent ? INTENT_LABELS[lead.intent] : 'Sin intención'}
          </span>
          {lead.score !== undefined && (
            <span className="text-xs text-gray-500">Score: {lead.score}</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          {lead.email && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate max-w-[150px]">{lead.email}</span>
            </span>
          )}
          {lead.phone && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 00-2.543 5.487l-.471 1.781a1 1 0 01-1.337-.327l-1.498-4.493a1 1 0 01-.502-1.21L5 19a2 2 0 01-2-2V7a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 00-2.543 5.487l-.471 1.781a1 1 0 01-1.337-.327l-1.498-4.493a1 1 0 01-.502-1.21L3 7a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 00-2.543 5.487l-.471 1.781a1 1 0 01-1.337-.327l-1.498-4.493a1 1 0 01-.502-1.21L3 7a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 00-2.543 5.487l-.471 1.781a1 1 0 01-1.337-.327l-1.498-4.493a1 1 0 01-.502-1.21L5 5a2 2 0 012-2h.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 00-2.543 5.487l-.471 1.781a1 1 0 01-1.337-.327l-1.498-4.493a1 1 0 01-.502-1.21L3 5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-1.5" />
              </svg>
              <span>{lead.phone}</span>
            </span>
          )}
        </div>

        {lead.nextFollowUp && (
          <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
            Próximo seguimiento: {new Date(lead.nextFollowUp).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', month: 'short' })}
          )}
        </div>
      </div>
    </div>
  );
}