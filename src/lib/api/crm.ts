// Comp CRM API Client
const API_BASE_URL = process.env.COMP_CRM_API_URL || 'https://api.trycrm.ai';
const API_KEY = process.env.COMP_CRM_API_KEY;

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

function buildUrl(endpoint: string, params?: Record<string, string>): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.append(key, value);
      }
    }
  }
  return url.toString();
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;
  
  const url = buildUrl(endpoint, params);
  
  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json();
}

export const crmApi = {
  // Leads
  leads: {
    list: (filters?: {
      stage?: string[];
      intent?: string[];
      search?: string;
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    }) => request('/api/v1/leads', { params: filters }),

    get: (id: string) => request(`/api/v1/leads/${id}`),

    create: (data: any) => request('/api/v1/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

    update: (id: string, data: any) => request(`/api/v1/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

    delete: (id: string) => request(`/api/v1/leads/${id}`, {
      method: 'DELETE',
    }),

    moveStage: (id: string, stage: string) => request(`/api/v1/leads/${id}/stage`, {
      method: 'PATCH',
      body: JSON.stringify({ stage }),
    }),

    history: (id: string) => request(`/api/v1/leads/${id}/history`),
  },

  // Companies
  companies: {
    list: (filters?: {
      industry?: string[];
      size?: string[];
      search?: string;
      page?: number;
      limit?: number;
    }) => request('/api/v1/companies', { params: filters }),

    get: (id: string) => request(`/api/v1/companies/${id}`),

    enrich: (data: { name: string; domain?: string; linkedin?: string }) => 
      request('/api/v1/companies/enrich', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  // Facts
  facts: {
    list: (filters?: {
      entityId?: string;
      entityType?: 'person' | 'company';
      factType?: string[];
      dateFrom?: string;
      dateTo?: string;
    }) => request('/api/v1/facts', { params: filters }),

    create: (data: {
      entityId: string;
      entityType: 'person' | 'company';
      factType: string;
      value: string;
      evidence: string[];
    }) => request('/api/v1/facts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },

  // Activities
  activities: {
    list: (filters?: {
      leadId?: string;
      type?: string[];
      dateFrom?: string;
      dateTo?: string;
      page?: number;
      limit?: number;
    }) => request('/api/v1/activities', { params: filters }),

    create: (data: {
      leadId: string;
      type: string;
      details: string;
      userId: string;
    }) => request('/api/v1/activities', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },

  // Search
  search: (query: string, entityType?: 'person' | 'company' | 'all') => 
    request('/api/v1/search', { 
      params: { q: query, entity_type: entityType } 
    }),

  // WebSocket
  getWebSocketUrl: () => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://api.trycrm.ai/ws';
    return `${wsUrl}?token=${API_KEY}`;
  },
};

// Re-export types
export type {
  Lead,
  Company,
  Fact,
  LeadHistory,
  PipelineStage,
  PipelineData,
  KPIData,
  Activity,
  LeadStage,
  IntentLevel,
  Evidence,
  Fact,
  LeadHistory,
  Activity,
  KPIData,
  LeadFilters,
  CompanyFilters,
  FactFilters,
} from '@/types';