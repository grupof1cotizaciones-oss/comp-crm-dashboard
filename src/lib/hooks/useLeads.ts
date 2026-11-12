'use client';

import useSWR from 'swr';
import { crmApi } from '@/lib/api/crm';
import type { Lead, LeadFilters, PipelineData, KPIData, Company, Fact, Activity } from '@/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useLeads(filters?: {
  stage?: string[];
  intent?: string[];
  search?: string;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (filters?.stage) params.append('stage', filters.stage.join(','));
  if (filters?.intent) params.append('intent', filters.intent.join(','));
  if (filters?.search) params.append('search', filters.search);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const { data, error, isLoading, mutate } = useSWR(
    `/api/leads?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    leads: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
    mutate,
  };
}

export function useLead(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/leads/${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return { lead: data?.data, isLoading, error, mutate };
}

export function useCompanies(filters?: {
  industry?: string[];
  size?: string[];
  search?: string;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (filters?.industry) params.append('industry', filters.industry.join(','));
  if (filters?.size) params.append('size', filters.size.join(','));
  if (filters?.search) params.append('search', filters.search);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const { data, error, isLoading, mutate } = useSWR(
    `/api/companies?${params.toString()}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    companies: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
    mutate,
  };
}

export function usePipeline() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/pipeline',
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 10000 }
  );

  return { pipeline: data?.data, isLoading, error, mutate };
}

export function useKPIs() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/kpis',
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 30000 }
  );

  return { kpis: data?.data, isLoading, error, mutate };
}

export function useActivities(filters?: {
  leadId?: string;
  type?: string[];
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (filters?.leadId) params.append('leadId', filters.leadId);
  if (filters?.type) params.append('type', filters.type.join(','));
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const { data, error, isLoading, mutate } = useSWR(
    `/api/activities?${params.toString()}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 5000 }
  );

  return {
    activities: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
    mutate,
  };
}

export function useLeadHistory(leadId: string) {
  const { data, error, isLoading } = useSWR(
    leadId ? `/api/leads/${leadId}/history` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return { history: data?.data || [], isLoading, error };
}

export function useCompany(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/companies/${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return { company: data?.data, isLoading, error };
}

export function useSearch(query: string, entityType?: 'person' | 'company' | 'all') {
  const { data, error, isLoading } = useSWR(
    query ? `/api/search?q=${encodeURIComponent(query)}${entityType ? `&entity_type=${entityType}` : ''}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return { results: data?.data || [], isLoading, error };
}

// Mutation helpers
export async function createLead(data: any) {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateLead(id: string, data: any) {
  const res = await fetch(`/api/leads/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function moveLeadStage(id: string, stage: string) {
  const res = await fetch(`/api/leads/${id}/stage`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stage }),
  });
  return res.json();
}

export async function createFact(data: {
  entityId: string;
  entityType: 'person' | 'company';
  factType: string;
  value: string;
  evidence: string[];
}) {
  const res = await fetch('/api/facts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function createActivity(data: {
  leadId: string;
  type: string;
  details: string;
  userId: string;
}) {
  const res = await fetch('/api/activities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}