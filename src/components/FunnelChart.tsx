'use client';

import { FunnelChartProps } from '@/types';
import { STAGE_LABELS, STAGE_COLORS, LeadStage } from '@/types';

export function FunnelChart({ data }: FunnelChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <p className="text-gray-500">No hay datos para mostrar el embudo</p>
      </div>
    );
  }

  const maxCount = Math.max(...data.map(d => d.count));
  const totalLeads = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Embudo de Ventas</div>
      <div className="space-y-3">
        {data.map((stage, index) => {
          const percentage = maxCount > 0 ? (stage.count / maxCount) * 100 : 0;
          const stageKey = stage.stage as keyof typeof STAGE_LABELS;
          
          return (
            <div key={stage.stage} className="relative">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-700 text-sm">
                  {STAGE_LABELS[stage.stage as keyof typeof STAGE_LABELS] || stage.stage}
                </span>
                <span className="font-semibold text-gray-900 text-sm">
                  {stage.count} ({(stage.count / totalLeads * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="relative h-8 overflow-hidden rounded-lg bg-gray-100">
                <div
                  className="h-full rounded-l-lg transition-all duration-500 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: (STAGE_COLORS as Record<string, string>)[stage.stage as keyof typeof STAGE_COLORS] || '#64748b',
                    minWidth: stage.count > 0 ? '24px' : '0',
                  }}
                >
                  {percentage > 15 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-xs font-medium">
                      {stage.count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Leads</span>
            <span className="font-semibold text-gray-900">{data.reduce((sum, d) => sum + d.count, 0)}</span>
          </div>
        </div>
      </div>
    );