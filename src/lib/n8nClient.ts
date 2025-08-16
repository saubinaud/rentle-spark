// src/lib/n8nClient.ts

const BASE = (import.meta as any).env?.VITE_N8N_BASE_URL as string | undefined;

export function hasN8n(): boolean {
  return Boolean(BASE && BASE.startsWith("http"));
}

export function n8nUrl(path: string) {
  if (!hasN8n()) throw new Error("N8N base URL not configured");
  return `${BASE.replace(/\/+$/,'')}/${path.replace(/^\/+/, '')}`;
}

export async function fetchJson<T>(path: string, options?: RequestInit, timeoutMs = 20000): Promise<T> {
  const url = n8nUrl(path);
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(id);
  }
}
