import axios from 'axios';
import type { CmsPaginatedResponse, CmsResponse } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface SearchOptions {
  filters?: { field: string; operator: string; value: unknown }[];
  orderBy?: { field: string; sort: 'asc' | 'desc' };
  limit?: number;
  pagination?: { page: number };
}

// ─── Auth ──────────────────────────────────────────────────────────────────────

export async function cmsLogin(email: string, password: string) {
  const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
  return res.data as CmsResponse<{ token: string; user: { id: string; email: string; role_id: string } }>;
}

// ─── Public Fetchers (server-side, no token) ──────────────────────────────────

export async function cmsSearch<T>(
  table: string,
  options: SearchOptions = {}
): Promise<T[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/${table}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filters: options.filters || [],
        orderBy: options.orderBy,
        limit: options.limit || 100,
        pagination: options.pagination || { page: 1 },
      }),
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    // crud-builder returns: { code, data: T[], total_data, total_pages, ... }
    const json = await res.json();
    if (Array.isArray(json?.data)) return json.data as T[];
    if (Array.isArray(json)) return json as T[];
    return [];
  } catch {
    return [];
  }
}

export async function cmsGetFirst<T>(
  table: string,
  options: SearchOptions = {}
): Promise<T | null> {
  const items = await cmsSearch<T>(table, { ...options, limit: 1 });
  return items[0] ?? null;
}

// ─── Authenticated Client Operations (used by admin panel) ───────────────────

export const cmsClient = {
  async create(table: string, data: Record<string, unknown>, token: string) {
    const res = await axios.post(`${BASE_URL}/api/${table}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async update(table: string, id: string, data: Record<string, unknown>, token: string) {
    const res = await axios.put(`${BASE_URL}/api/${table}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async remove(table: string, id: string, token: string) {
    const res = await axios.delete(`${BASE_URL}/api/${table}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async search<T>(table: string, options: SearchOptions = {}, token: string): Promise<T[]> {
    const res = await axios.post(
      `${BASE_URL}/api/${table}/search`,
      {
        filters: options.filters || [],
        orderBy: options.orderBy,
        limit: options.limit || 100,
        pagination: options.pagination || { page: 1 },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // crud-builder with auth returns: { code, data: T[], total_data, total_pages, ... }
    // data is a flat array (not nested {data: []})
    const d = res.data;
    if (Array.isArray(d?.data)) return d.data as T[];
    if (Array.isArray(d)) return d as T[];
    return [];
  },
};
