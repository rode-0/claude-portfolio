import type { Capability, Project } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return (json.data !== undefined ? json.data : json) as T;
}

export function getCapabilities(): Promise<Capability[]> {
  return fetchJson<Capability[]>('/capabilities');
}

export function getCapability(
  slug: string
): Promise<Capability & { projects?: Project[] }> {
  return fetchJson<Capability & { projects?: Project[] }>(
    `/capabilities/${slug}`
  );
}

export function getProjects(
  params?: Record<string, string>
): Promise<Project[]> {
  const query = params
    ? '?' + new URLSearchParams(params).toString()
    : '';
  return fetchJson<Project[]>(`/projects${query}`);
}

export function getFeaturedProjects(): Promise<Project[]> {
  return getProjects({ featured: 'true' });
}
