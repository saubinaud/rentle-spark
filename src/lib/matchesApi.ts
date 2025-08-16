// src/lib/matchesApi.ts
import { hasN8n, fetchJson } from "./n8nClient";
import type { UserProfile } from "./profileService";
import type { MatchResult } from "./matchService";
import { generateMatchesMock } from "./matchService";
import { getProfilesMock } from "./profileService";

export async function getTopMatches(email: string, min = 0.94, limit = 10): Promise<MatchResult[]> {
  if (!hasN8n()) {
    // fallback: mock usando perfiles en memoria
    const all = await getProfilesMock();
    const me = all.find(p => p && (p as any).email === email) || all[0];
    if (!me) return [];
    const others = all.filter(p => p.id !== me.id);
    const raw = await generateMatchesMock(me as UserProfile, others);
    return raw
      .map(r => ({ ...r }))
      .filter(r => (r.compatibility / 100) >= min)
      .slice(0, limit);
  }

  // n8n real
  return await fetchJson<MatchResult[]>(
    `webhook/matches?email=${encodeURIComponent(email)}&min=${min}&limit=${limit}`,
    { method: "GET" }
  );
}
