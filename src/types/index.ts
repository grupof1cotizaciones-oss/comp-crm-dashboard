// Comp CRM API Types

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  seniority?: string;
  stage: LeadStage;
  score?: number;
  intent?: IntentLevel;
  evidence: Evidence[];
  lastContact?: string;
  nextFollowUp?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export type LeadStage = 
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'lost';

export type IntentLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Evidence {
  type: 'email' | 'linkedin' | 'website' | 'registry' | 'conversation' | 'document';
  source: string;
  content: string;
  timestamp: string;
  confidence: 'low' | 'medium' | 'high';
}

export interface Company {
  id: string;
  name: string;
  domain?: string;
  linkedin?: string;
  size?: string;
  industry?: string;
  techStack?: string[];
  funding?: string;
  revenue?: string;
  location?: string;
  employees?: number;
  competitors?: string[];
  technologies?: string[];
  evidence: Evidence[];
}

export interface Fact {
  id: string;
  entityId: string;
  entityType: 'person' | 'company';
  factType: string;
  value: string;
  evidence: Evidence[];
  recordedAt: string;
  recordedBy: string;
}

export interface LeadHistory {
  id: string;
  leadId: string;
  action: string;
  details: string;
  performedBy: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface PipelineStage {
  id: LeadStage;
  name: string;
  order: number;
  color: string;
  leads: Lead[];
}

export interface PipelineData {
  stages: PipelineStage[];
  totalLeads: number;
  totalValue: number;
  conversionRate: number;
}

export interface KPIData {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  proposalsSent: number;
  dealsWon: number;
  dealsLost: number;
  totalValue: number;
  avgDealSize: number;
  conversionRate: number;
  avgCycleDays: number;
}

export interface Activity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'task' | 'fact_recorded';
  leadId: string;
  leadName: string;
  userId: string;
  userName: string;
  details: string;
  timestamp: string;
}

export interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'danger';
}

export interface PipelineKanbanProps {
  stages: PipelineStage[];
  onLeadMove?: (leadId: string, newStage: LeadStage) => void;
  onLeadClick?: (lead: Lead) => void;
}

export interface FunnelChartProps {
  data: Array<{
    stage: string;
    count: number;
    value: number;
  }>;
}

export interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'danger';
}

export interface LeadCardProps {
  lead: Lead;
  onClick?: (lead: Lead) => void;
  onStageChange?: (leadId: string, newStage: LeadStage) => void;
}

export interface RealTimeUpdate {
  type: 'lead_created' | 'lead_updated' | 'lead_moved' | 'fact_recorded' | 'activity';
  payload: any;
  timestamp: string;
}

export interface WebSocketMessage {
  type: 'subscribe' | 'unsubscribe' | 'event';
  channel: string;
  payload?: any;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface LeadFilters {
  stage?: LeadStage[];
  intent?: IntentLevel[];
  assignedTo?: string[];
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CompanyFilters {
  industry?: string[];
  size?: string[];
  location?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

export interface FactFilters {
  entityId?: string;
  entityType?: 'person' | 'company';
  factType?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export type IntentLevel = 'low' | 'medium' | 'high' | 'critical';

export const STAGE_COLORS: Record<LeadStage, string> = {
  new: '#64748b',
  contacted: '#0ea5e9',
  qualified: '#22c55e',
  proposal: '#f59e0b',
  negotiation: '#8b5cf6',
  won: '#22c55e',
  lost: '#ef4444',
};

export const STAGE_LABELS: Record<LeadStage, string> = {
  new: 'Nuevo',
  contacted: 'Contactado',
  qualified: 'Calificado',
  proposal: 'Propuesta',
  negotiation: 'Negociación',
  won: 'Ganado',
  lost: 'Perdido',
};

export const INTENT_COLORS: Record<IntentLevel, string> = {
  low: '#64748b',
  medium: '#0ea5e9',
  high: '#f59e0b',
  critical: '#ef4444',
};

export const INTENT_LABELS: Record<IntentLevel, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  critical: 'Crítica',
};