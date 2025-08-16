// src/lib/supabaseClient.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Devuelve un cliente de Supabase o null si faltan las envs.
 * No rompe el build: en dev avisa y sigue en modo mock.
 */
export function getSupabase(): SupabaseClient | null {
  if (client) return client;

  const url = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
  const anon = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!url || !anon) {
    if (import.meta.env.DEV) {
      console.warn(
        '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY no están definidos — se continúa en modo mock.'
      );
    }
    return null;
  }

  client = createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return client;
}
